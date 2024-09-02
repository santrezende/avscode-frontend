import styled from "styled-components";
import OperationalHeader from "../components/OperationalHeader";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useOperationalContext } from "../context/OperationalContext";

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
                        Authorization: `Bearer ${token}`
                    }
                });
                setServices(response.data);
            } catch (error: any) {
                console.log(error.response.data);
            }
        };
    
        fetchData();
    }, [carInfo, token]);

    const handleBackClick = () => navigate("/auth/findplate");
    const handleHomeClick = () => navigate("/auth/home")

    return(
        <>
            <OperationalHeader handleBackClick={handleBackClick} handleHomeClick={handleHomeClick} />
            <StyledH2>Histórico</StyledH2>
            <LineDiv />
            <StyledH3>{carInfo.licensePlate}</StyledH3>
            {services.map((service: any) => (
                <ServiceCard
                    key={service.id}
                    serviceDate={service.serviceDate}
                    serviceTitle={service.serviceTitle}
                    serviceDescription={service.serviceData}
                    kilometersDriven={service.kilometersDriven}
                />
            ))}
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

export default OperationalHistoryPage;