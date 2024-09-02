import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { useOperationalContext } from "../context/OperationalContext";

function OperationalRegisterPage() {
    const navigate = useNavigate();

    const [carInfo, setCarInfo] = useState({
        licensePlate: "",
        customerName: "",
        cpf: "",
        model: "",
        year: "",
        engine: "",
        kilometersDriven: "",
        lastOilChange: new Date()
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const transformedValue = (name === "model" || name === "licensePlate") 
            ? value.toUpperCase() 
            : value;

        setCarInfo(prevInfo => ({
            ...prevInfo,
            [name]: name === "kilometersDriven" ? parseInt(transformedValue, 10) : transformedValue
        }));
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = e.target.value;
        setCarInfo(prevInfo => {
            const date = new Date(prevInfo.lastOilChange);
            date.setMonth(parseInt(month) - 1);
            return {
                ...prevInfo,
                lastOilChange: date
            };
        });
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = e.target.value;
        setCarInfo(prevInfo => {
            const date = new Date(prevInfo.lastOilChange);
            date.setFullYear(parseInt(year));
            return {
                ...prevInfo,
                lastOilChange: date
            };
        });
    };

    const { token } = useOperationalContext();

    const handleSubmit = async () => {
        try {
            await api.post("/vehicles", carInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/auth/home");
        } catch (error: any) {
            console.error("Error registering vehicle:", error.response.data);
        }
    };

    return (
        <>
            <LiaAngleLeftSolid size={30} onClick={() => navigate("/auth/home")} />
            <StyledH2>Cadastrar <br /> novo veículo</StyledH2>
            <LineDiv />
            <RegisterContainer>
                <h6>Nome</h6>
                <input name="customerName" value={carInfo.customerName} onChange={handleInputChange} />
                <h6>CPF</h6>
                <input name="cpf" maxLength={11} value={carInfo.cpf} onChange={handleInputChange} />
                <h6>Placa</h6>
                <input name="licensePlate" maxLength={7} value={carInfo.licensePlate.toUpperCase()} onChange={handleInputChange} />
                <h6>Modelo</h6>
                <input name="model" value={carInfo.model.toUpperCase()} onChange={handleInputChange} />
                <h6>Ano</h6>
                <input name="year" type="number" maxLength={4} minLength={4} value={carInfo.year} onChange={handleInputChange} />
                <h6>Motor</h6>
                <input name="engine" value={carInfo.engine} onChange={handleInputChange} />
                <h6>Quilometragem</h6>
                <input name="kilometersDriven" type="number" value={carInfo.kilometersDriven} onChange={handleInputChange} />
                <h6>Última troca de óleo</h6>
                <StyledSelect name="lastOilChangeMonth" onChange={handleMonthChange}>
                    <StyledSelectOption value="01">Janeiro</StyledSelectOption>
                    <StyledSelectOption value="02">Fevereiro</StyledSelectOption>
                    <StyledSelectOption value="03">Março</StyledSelectOption>
                    <StyledSelectOption value="04">Abril</StyledSelectOption>
                    <StyledSelectOption value="05">Maio</StyledSelectOption>
                    <StyledSelectOption value="06">Junho</StyledSelectOption>
                    <StyledSelectOption value="07">Julho</StyledSelectOption>
                    <StyledSelectOption value="08">Agosto</StyledSelectOption>
                    <StyledSelectOption value="09">Setembro</StyledSelectOption>
                    <StyledSelectOption value="10">Outubro</StyledSelectOption>
                    <StyledSelectOption value="11">Novembro</StyledSelectOption>
                    <StyledSelectOption value="12">Dezembro</StyledSelectOption>
                </StyledSelect>
                <StyledSelect name="lastOilChangeYear" onChange={handleYearChange}>
                    <StyledSelectOption value="2021">2021</StyledSelectOption>
                    <StyledSelectOption value="2022">2022</StyledSelectOption>
                    <StyledSelectOption value="2023">2023</StyledSelectOption>
                    <StyledSelectOption value="2024">2024</StyledSelectOption>
                    <StyledSelectOption value="2025">2025</StyledSelectOption>
                    <StyledSelectOption value="2026">2026</StyledSelectOption>
                </StyledSelect>
            </RegisterContainer>
            <button onClick={handleSubmit}>Cadastrar veículo</button>
        </>
    );
}

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
        font-size: 24px;
        text-transform: none;
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

const StyledSelect = styled.select`
    all: unset;
    background-color: #D9D9D9;
    border-radius: 10px;
    outline: none;
    border: none;
    width: 100%;
    height: 40px;
    font-size: 24px;
    text-transform: uppercase;
    margin-top: 8px;
    line-height: 40px; 
    text-align: center;
`;

const StyledSelectOption = styled.option`
    background-color: #D9D9D9;
    font-size: 24px;
`;

export default OperationalRegisterPage;