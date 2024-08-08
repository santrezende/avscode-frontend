import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import styled from "styled-components";
import Footer from "../components/Footer";
import { ChangeEvent, useState } from "react";
import CarInfoCard from "../components/CarInfoCard";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import OperationalHeader from "../components/OperationalHeader";

function OperationalFindPlatePage() {
    const [plate, setPlate] = useState("");
    const handlePlateInput = (event: ChangeEvent<HTMLInputElement>) => setPlate(event.target.value);

    const navigate = useNavigate();

    const [insertedPlate, setInsertedPlate] = useState(false);
    const handleClick = () => {
        if (plate.length === 7) setInsertedPlate(true);
    }

    const handleBackClick = () => {
        setInsertedPlate(false);
        setPlate("");
    }

    const handleHomeClick = () => {
        navigate("/auth/home");
    }

    return (
        <>
            {!insertedPlate ? (
                <FindPlateContainer>
                    <LiaAngleLeftSolid size={30} onClick={handleHomeClick} />
                    <h2>Buscar <br /> Veículo</h2>
                    <Input type="text" maxLength={7} value={plate} onChange={handlePlateInput} />
                    <h6>Insira aqui a placa</h6>
                    <button onClick={handleClick}>Buscar</button>
                </FindPlateContainer>
            ) : (
                <>
                    <OperationalHeader handleBackClick={handleBackClick} handleHomeClick={handleHomeClick}/>
                    <CarInfoCard />
                    <HistoryButton onClick={() => navigate("/auth/history")}>
                        <h5>Histórico de <br/> atendimentos</h5>
                        <LiaAngleRightSolid size={30} className="icon"/>
                    </HistoryButton>
                    <CreateNewServiceButton>
                        <FaCirclePlus size={30} className="icon" />
                        <h5>Criar novo atendimento</h5>
                    </CreateNewServiceButton>
                </>
            )}
            <Footer />
        </>
    );
};

const HistoryButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #D9D9D9;
    color: #151515;
    font-weight: 300;
    margin-bottom: 12px;
    margin-top: 12px;
    height: 80px;

    h5 {
        text-align: left;
        margin-left: 12px;
    }

    .icon {
        margin-right: 12px;
    }
`;

const CreateNewServiceButton = styled.button`
    height: 80px;

    h5 {
        font-size: 20px;
        margin-bottom: 8px;
    };

    .icon{
        margin-top: 8px;
    };
`;

const FindPlateContainer = styled.div`
    h2 {
        margin-top: 40px;
        margin-bottom: 12px;
    }
    h6 {
        margin-bottom: 12px;
    }
`;

const Input = styled.input`
    margin-bottom: 8px;
`;

//     <WarningContainer>
//         <h4>*Placa não encontrada</h4>
//         <h6>Tente novamente ou fale com a gente pelo WhatsApp.</h6>
//     </WarningContainer>

// const WarningContainer = styled.div`
//     background-color: #FFFFFF;
//     border-radius: 10px;
//     height: 140px;
//     margin-top: 20px;
//     padding-left: 10px;
//     padding-top: 15px;
//     display: grid;
// `

export default OperationalFindPlatePage;
