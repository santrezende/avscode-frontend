import styled from "styled-components";
import HeaderButtons from "../components/HeaderButtons";
import ServiceCard from "../components/ServiceCard";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useClientContext } from "../context/ClientContext";

interface Service {
  id: number;
  kilometersDriven: number;
  rating: number;
  serviceData: string;
  serviceDate: string;
  serviceTitle: string;
  vehicleId: number;
}

function ClientHistoryPage() {

  const { carInfo, setCarInfo } = useClientContext();

  const getDataByLocalStorage = async () => {
    const licensePlate = localStorage.getItem('licensePlate');
    const cpf = localStorage.getItem('cpf')
    try{
      const response = await api.post(`/vehicles/${licensePlate}`, { licensePlate, cpf });
      setCarInfo(response.data);
      return;
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  if (!carInfo) {
    getDataByLocalStorage();
    return <p>Sem informações de histórico disponíveis, tente novamente.</p>;
  }

  const [services, setServices] = useState<Service[]>();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.post(`/services/${carInfo.licensePlate}`, { licensePlate: carInfo.licensePlate.toUpperCase(), cpf: carInfo.cpf });
            setServices(response.data);
        } catch (error: any) {
            console.log(error.response.data);
        }
    };

    fetchData();
}, [carInfo]);

  if (!services) {
  return <p>No services info available</p>;
  }
  return (
    <>
      <HeaderButtons />
      <StyledH2>Histórico</StyledH2>
      <LineDiv />
      {services.map((service: any) => (
                <ServiceCard
                    key={service.id}
                    id={service.id}
                    serviceDate={service.serviceDate}
                    serviceTitle={service.serviceTitle}
                    serviceDescription={service.serviceData}
                    kilometersDriven={service.kilometersDriven}
                    rating={service.rating}
                    contextType="client"
                />
            ))}
    </>
  );
};

const StyledH2 = styled.h2`
  margin-left: 15px;
  font-weight: 500;
`;

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`;

export default ClientHistoryPage;