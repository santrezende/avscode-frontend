import styled from "styled-components";
import OperationalHeader from "../components/OperationalHeader";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useOperationalContext } from "../context/OperationalContext";
import { FaCirclePlus } from "react-icons/fa6";

function OperationalHistoryPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const carInfo = location.state?.carInfo;

    const { token } = useOperationalContext();
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/services/${carInfo.licensePlate}`, {
                    headers: {
                        Authorization: `Bearer ${token || localStorage.getItem('token')}`
                    }
                });
                setServices(response.data);
            } catch (error: any) {
                console.log(error.response.data);
            }
        };

        fetchData();
    }, [carInfo, token]);

    const handleBackClick = () => navigate("/auth/findplate", { state: { carInfo } });
    const handleHomeClick = () => navigate("/auth/home");

    return (
        <>
            <OperationalHeader handleBackClick={handleBackClick} handleHomeClick={handleHomeClick} />
            <StyledH2>Histórico</StyledH2>
            <LineDiv />
            <StyledH3>{carInfo.licensePlate}</StyledH3>
            
            {services.length > 0 ? (
                services.map((service: any) => (
                    <ServiceCard
                        key={service.id}
                        serviceDate={service.serviceDate}
                        serviceTitle={service.serviceTitle}
                        serviceDescription={service.serviceData}
                        kilometersDriven={service.kilometersDriven}
                        id={service.id}
                        rating={service.rating}
                        contextType="operational"
                    />
                ))
            ) : (
                <NoServicesContainer>
                    <h6>Nenhum registro de atendimento encontrado para este veículo.</h6>
                    <CreateNewServiceButton onClick={() => navigate("/auth/newservice", { state: { carInfo } })}>
                        <FaCirclePlus size={30} className="icon" />
                        <h5>Criar novo atendimento</h5>
                    </CreateNewServiceButton>
                </NoServicesContainer>
            )}
        </>
    );
}

const StyledH2 = styled.h2`
    margin-top: 20px;
`;

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const StyledH3 = styled.h3`
  margin-bottom: 12px;
`;

const NoServicesContainer = styled.div`
  h6 {
    margin-bottom: 12px;
  }
`

const CreateNewServiceButton = styled.button`
    height: 80px;

    h5 {
        font-size: 20px;
        margin-bottom: 8px;
    };

    .icon{
        margin-top: 8px;
    };
`;

export default OperationalHistoryPage;