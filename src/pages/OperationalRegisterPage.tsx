import { LiaAngleLeftSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function OperationalRegisterPage() {
    const navigate = useNavigate()
    return (
        <>
            <LiaAngleLeftSolid size={30} onClick={() => navigate("/auth/home")} />
            <StyledH2>Cadastrar <br /> novo veículo</StyledH2>
            <LineDiv />
            <RegisterContainer>
                <h6>Nome</h6>
                <input />
                <h6>CPF</h6>
                <input />
                <h6>Placa</h6>
                <input />
                <h6>Modelo</h6>
                <input />
                <h6>Ano</h6>
                <input />
                <h6>Motor</h6>
                <input />
                <h6>Quilometragem</h6>
                <input />
                <h6>Última troca de óleo</h6>
                <input />
            </RegisterContainer>
            <button>Cadastrar veículo</button>
        </>
    );
};

const RegisterContainer = styled.div`
    background-color: #FFFFFF;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 16px;

    h6, input {
        margin-bottom: 8px;
    };

    h6 {
        width: 120px;
    }

    input {
        height: 40px;
    };
`;

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

export default OperationalRegisterPage;