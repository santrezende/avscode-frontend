import { LiaAngleLeftSolid } from "react-icons/lia";
import styled from "styled-components";
import Footer from "../components/Footer";

function OperationalFindPlatePage() {
    return(
        <FindPlateContainer>
            <LiaAngleLeftSolid size={30} />
            <h2>Buscar <br /> Veículo</h2>
            <Input />
            <h6>Insira aqui a placa</h6>
            <button>Buscar</button>
            <Footer />
        </FindPlateContainer>
    );
};

const FindPlateContainer = styled.div`
    h2{
        margin-top: 40px;
        margin-bottom: 12px;
    };
    h6{
        margin-bottom: 12px;
    };
`;

const Input = styled.input`
    margin-bottom: 8px;
`;

export default OperationalFindPlatePage;