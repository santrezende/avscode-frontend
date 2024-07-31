import styled from "styled-components";
import Footer from "../components/Footer";
import CarInfoCard from "../components/CarInfoCard";
import { VscThreeBars } from "react-icons/vsc";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

function ClientCarPage(){

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    };

    return(
        <>
            <HeaderButtons>
                <LiaAngleLeftSolid size={30} onClick={navigateToHome} className="backButton"/>
                <VscThreeBars size={30} />
            </HeaderButtons>
            <StyledH2>Informações do veículo</StyledH2>
            <LineDiv />
            <CarInfoCard />
            <Footer />
        </>
    );
};

const HeaderButtons = styled.div`
display: flex;
justify-content: space-between;
padding: 8px;
`

const StyledH2 = styled.h2`
  margin-left: 15px;
  font-weight: 500;
`

const LineDiv = styled.div`
  width: 100%;
  height: 2px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`


export default ClientCarPage;