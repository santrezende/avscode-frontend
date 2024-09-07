import { useState, useRef, useEffect } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import { TfiStar } from "react-icons/tfi";
import styled from "styled-components";
import api from "../api/api";
import { useClientContext } from "../context/ClientContext";
import { useOperationalContext } from "../context/OperationalContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ServiceCardProps {
    serviceDate: string;
    serviceTitle: string;
    serviceDescription: string;
    kilometersDriven: number;
    id: number;
    rating: number;
    contextType: 'client' | 'operational';
}

function ServiceCard({ serviceDate, serviceTitle, serviceDescription, kilometersDriven, id, rating, contextType }: ServiceCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const { carInfo } = contextType === 'client' ? useClientContext() : useOperationalContext();

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        } else if (contentRef.current) {
            contentRef.current.style.maxHeight = '0px';
        }
    }, [isOpen]);

    const formattedDate = new Date(serviceDate).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });

    const [newRating, setNewRating] = useState(rating);

    const handleStarClick = (index: number) => {
      setNewRating(index + 1);
    };

    const handleSubmitRating = async () => {
      try {
        const payload = {
            rating: newRating,
            licensePlate: carInfo?.licensePlate,
            cpf: contextType === 'client' ? carInfo?.cpf : undefined,
        };
        
        await api.patch(`/services/${id}`, payload);
        toast.success('Avaliação salva com sucesso!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "light"
          });
          setIsOpen(!isOpen);
      } catch (error: any) {
        console.log(error.response.data);
      }
    }

    return (
        <CardContainer>
            <CardHeader onClick={toggleCard}>
                <h6>{formattedDate}</h6>
                <div>
                    <h3>{serviceTitle}</h3>
                    <IconWrapper isOpen={isOpen}>
                        <LiaAngleDownSolid size={30} />
                    </IconWrapper>
                </div>
            </CardHeader>

            <CardBody ref={contentRef}>
                <LineDiv />
                <DescriptionContainer>
                    <p>{serviceDescription}</p>
                </DescriptionContainer>
                <StyledH6>Quilometragem</StyledH6>
                <h5>{kilometersDriven} km</h5>
                <StyledH6>Avalie o serviço</StyledH6>
                <StarsContainer>
                    {[...Array(5)].map((_, i) => (
                        <TfiStar
                            key={i}
                            size={50}
                            onClick={() => handleStarClick(i)}
                            style={{ cursor: 'pointer', color: i < newRating ? '#FFD700' : '#ccc' }}  
                        />
                    ))}
                </StarsContainer>
                <button onClick={handleSubmitRating}>Salvar avaliação</button>
            </CardBody>
        </CardContainer>
    );
}

const CardContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  h6 {
    font-weight: 400;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-weight: 400;
    }
  }
`;

const IconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const CardBody = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-top: 10px;

  h6, h5 {
    font-weight: 400;
    margin-bottom: 12px;
  }

  button {
    height: 48px;
  }
`;

const StyledH6 = styled.h6`
  font-size: 16px;
  font-weight: bold;
`;

const LineDiv = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const DescriptionContainer = styled.div`
  height: 125px;
  background-color: #D9D9D9;
  border-radius: 10px;
  margin-top: -4px;
  margin-bottom: 12px;
  padding: 12px;

  p {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

export default ServiceCard;
