import styled from "styled-components";
import Footer from "../components/Footer";
import CarInfoCard from "../components/CarInfoCard";
import HeaderButtons from "../components/HeaderButtons";

function ClientCarPage(){

    return(
        <>
            <HeaderButtons />
            <StyledH2>Informações do veículo</StyledH2>
            <LineDiv />
            <CarInfoCard />
            <Footer />
        </>
    );
};

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