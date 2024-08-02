import { LiaAngleLeftSolid } from "react-icons/lia";
import styled from "styled-components";

function OperationalRegisterPage() {
    return(
        <RegisterContainer>
            <LiaAngleLeftSolid size={30} />
            <h2>Cadastrar <br /> novo veículo</h2>
            <LineDiv />
        </RegisterContainer>
    );
};

const RegisterContainer = styled.div`
    h2{
        margin-top: 20px;
    };
`;

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`;

export default OperationalRegisterPage;