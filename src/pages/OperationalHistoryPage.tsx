import styled from "styled-components";
import OperationalHeader from "../components/OperationalHeader";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

function OperationalHistoryPage() {
    const navigate = useNavigate();

    const handleBackClick = () => navigate("/auth/findplate");
    const handleHomeClick = () => navigate("/auth/home")

    return(
        <>
            <OperationalHeader handleBackClick={handleBackClick} handleHomeClick={handleHomeClick} />
            <StyledH2>Histórico</StyledH2>
            <LineDiv />
            <StyledH3>PXZ8194</StyledH3>
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
        </>
    );
};

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