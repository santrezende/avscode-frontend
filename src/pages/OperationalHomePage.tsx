import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import HomeCard from "../components/HomeCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useOperationalContext } from "../context/OperationalContext";

function OperatinalHomePage() {
    const navigate = useNavigate();

    const navigateToFindPlate = () => {
        navigate("/auth/findplate");
    };
    const navigateToRegister = () => {
        navigate("/auth/register");
    };

    const { name } = useOperationalContext();

    return (
        <>
            <LogoHeader />
            <StyledH3>Olá, <br /> {name || localStorage.getItem('name')}</StyledH3>
            <HomeCard text={"Buscar placa"} onClick={navigateToFindPlate} />
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