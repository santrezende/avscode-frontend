import styled from "styled-components";
import Footer from "../components/Footer";
import CarInfoCard from "../components/CarInfoCard";
import HeaderButtons from "../components/HeaderButtons";
import { useClientContext } from "../context/ClientContext";
import api from "../api/api";

function ClientCarPage() {
  const { carInfo, setCarInfo } = useClientContext();

  const getDataByLocalStorage = async () => {
    const licensePlate = localStorage.getItem("licensePlate");
    const cpf = localStorage.getItem("cpf");
    try {
      const response = await api.post(`/vehicles/${licensePlate}`, {
        licensePlate,
        cpf,
      });
      setCarInfo(response.data);
      return;
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  if (!carInfo) {
    getDataByLocalStorage();
    return <p>Sem informações do veículo disponíveis, tente novamente.</p>;
  }

  return (
    <>
      <HeaderButtons />
      <StyledH2>Informações do veículo</StyledH2>
      <LineDiv />
      {carInfo ? (
        <CarInfoCard carInfo={carInfo} contextType="client" />
      ) : (
        <p>Nenhuma informação do veículo disponível.</p>
      )}
      <Footer />
    </>
  );
}
const StyledH2 = styled.h2`
  margin-left: 15px;
  font-weight: 500;
`;

const LineDiv = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`;

export default ClientCarPage;
