import { useState, useRef, useEffect } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import { TfiStar } from "react-icons/tfi";
import styled from "styled-components";

function ServiceCard() {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

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

    return (
        <CardContainer>
            <CardHeader onClick={toggleCard}>
                <h6>30/09/1999</h6>
                <div>
                    <h3>Revisão Geral</h3>
                    <IconWrapper isOpen={isOpen}>
                        <LiaAngleDownSolid size={30} />
                    </IconWrapper>
                </div>
            </CardHeader>

            <CardBody ref={contentRef}>
                <LineDiv />
                <DescriptionContainer>
                    <p>Descrição do serviço</p>
                </DescriptionContainer>
                <StyledH6>Quilometragem</StyledH6>
                <h5>76 mil km</h5>
                <StyledH6>Avalie o serviço</StyledH6>
                <StarsContainer>
                    {[...Array(5)].map((_, i) => (
                        <TfiStar key={i} size={30} />
                    ))}
                </StarsContainer>
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
`;

export default ServiceCard;
