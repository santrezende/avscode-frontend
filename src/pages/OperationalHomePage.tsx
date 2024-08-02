import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import HomeCard from "../components/HomeCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function OperatinalHomePage(){
    const navigate = useNavigate();

    const navigateToFindPlate = () => {
        navigate("/auth/findplate");
    };
    const navigateToRegister = () => {
        navigate("/auth/register");
    };

    return(
        <>
            <LogoHeader />
            <StyledH3>Olá, <br /> Nome</StyledH3>
            <HomeCard text={"Buscar Placa"} onClick={navigateToFindPlate}/>
            <HomeCard text={"Cadastrar novo veículo"} onClick={navigateToRegister} />
            <Footer />
        </>
    );
};

const StyledH3 = styled.h3`
    font-weight: 400;
    margin-bottom: 20px;
`;

export default OperatinalHomePage;