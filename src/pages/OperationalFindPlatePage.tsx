import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import styled from "styled-components";
import Footer from "../components/Footer";
import { ChangeEvent, useState } from "react";
import CarInfoCard from "../components/CarInfoCard";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import OperationalHeader from "../components/OperationalHeader";
import api from "../api/api";
import { useOperationalContext } from "../context/OperationalContext";

function OperationalFindPlatePage() {
    const [plate, setPlate] = useState("");
    const handlePlateInput = (event: ChangeEvent<HTMLInputElement>) => setPlate(event.target.value);

    const navigate = useNavigate();

    const [insertedPlate, setInsertedPlate] = useState(false);
    const [searchedPlate, setSearchedPlate] = useState(null);

    const [renderWarning, setRenderWarning] = useState(false);

    const { token } = useOperationalContext();
    const handleClick = async () => {
        if (plate.length === 7) {
            try{
                const promise = await api.get(`/vehicles/${plate.toUpperCase()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSearchedPlate(promise.data);
                setInsertedPlate(true);
                setRenderWarning(false);   
            }
            catch (error: any) {
                console.log(error.response.data);
                setRenderWarning(true);
            }
        } else {

        }
    }

    const handleCarInfoUpdate = (updatedCarInfo: any) => {
        setSearchedPlate(updatedCarInfo);
    };

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
                    <CarInfoCard editable={true} carInfo={searchedPlate!} onUpdate={handleCarInfoUpdate} />
                    <HistoryButton onClick={() => navigate('/auth/history', { state: { carInfo: searchedPlate } })}>
                        <h5>Histórico de <br/> atendimentos</h5>
                        <LiaAngleRightSolid size={30} className="icon"/>
                    </HistoryButton>
                    <CreateNewServiceButton onClick={() => navigate("/auth/newservice", { state: { carInfo: searchedPlate } })}>
                        <FaCirclePlus size={30} className="icon" />
                        <h5>Criar novo atendimento</h5>
                    </CreateNewServiceButton>
                </>
            )}
            {renderWarning ? (
                <WarningContainer>
                    <h4>Placa não encontrada!</h4>
                    <h5>Tente novamente.</h5>
                </WarningContainer>
            ) : ('')}
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
    font-weight: 600;
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

const WarningContainer = styled.div`
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 100px;
    margin-top: 20px;
    padding-left: 10px;
    padding-top: 15px;
    display: grid;
`;

export default OperationalFindPlatePage;
