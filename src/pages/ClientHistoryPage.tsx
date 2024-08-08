import styled from "styled-components";
import HeaderButtons from "../components/HeaderButtons";
import ServiceCard from "../components/ServiceCard";

function ClientHistoryPage() {
  return (
    <>
      <HeaderButtons />
      <StyledH2>Histórico</StyledH2>
      <LineDiv />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
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