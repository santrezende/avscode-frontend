import { useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";
import styled from "styled-components";
import { useOperationalContext } from "../context/OperationalContext";
import api from "../api/api";

interface CarInfoCardProps {
    editable?: boolean;
    carInfo: {
        id: number;
        licensePlate: string;
        customerName: string;
        cpf: string;
        model: string;
        year: number;
        engine: string;
        kilometersDriven: number;
        lastOilChange: Date;
    };
    onUpdate?: (updatedCarInfo: any) => void;
}

function CarInfoCard({ editable = false, carInfo, onUpdate }: CarInfoCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCarInfo, setEditedCarInfo] = useState(carInfo);

    const originalDate = new Date(editedCarInfo.lastOilChange);
    const [month, setMonth] = useState(String(originalDate.getMonth() + 1).padStart(2, "0"));
    const [year, setYear] = useState(String(originalDate.getFullYear()));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCarInfo({
            ...editedCarInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = e.target.value;
        setMonth(newMonth);
        const newDate = new Date(parseInt(year), parseInt(newMonth) - 1, originalDate.getDate());
        setEditedCarInfo({
            ...editedCarInfo,
            lastOilChange: newDate
        });
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = e.target.value;
        setYear(newYear);
        const newDate = new Date(parseInt(newYear), parseInt(month) - 1, originalDate.getDate());
        setEditedCarInfo({
            ...editedCarInfo,
            lastOilChange: newDate
        });
    };

    const { token } = useOperationalContext();

    const toggleEditing = async () => {
        const newEditingState = !isEditing;
        setIsEditing(newEditingState);

        if (!newEditingState) {
            try {
                const { id, ...dataToSend } = editedCarInfo;
                const response = await api.patch(`/vehicles/${editedCarInfo.id}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEditedCarInfo(response.data);
                if (onUpdate) {
                    onUpdate(response.data);
                }
            } catch (error: any) {
                console.log(error);
            }
        }
    };

    const formattedDate = new Date(carInfo.lastOilChange).toLocaleDateString('pt-BR', {
        month: 'numeric',
        year: 'numeric'
    });

    return (
        <CarInfoContainer>
            <h3>{carInfo.licensePlate}</h3>
            <LineDiv />
            <h6>Nome</h6>
            {isEditing ? (
                <StyledInput
                    type="text"
                    name="customerName"
                    value={editedCarInfo.customerName}
                    onChange={handleInputChange}
                />
            ) : (
                <h3>{carInfo.customerName}</h3>
            )}
            <h6>CPF</h6>
            {isEditing ? (
                <StyledInput
                    type="text"
                    name="customerCpf"
                    value={editedCarInfo.cpf}
                    onChange={handleInputChange}
                />
            ) : (
                <h3>{carInfo.cpf}</h3>
            )}
            <h6>Modelo</h6>
            {isEditing ? (
                <StyledInput
                    type="text"
                    name="model"
                    value={editedCarInfo.model}
                    onChange={handleInputChange}
                />
            ) : (
                <h3>{carInfo.model}</h3>
            )}
            <h6>Ano</h6>
            {isEditing ? (
                <StyledInput
                    type="number"
                    name="year"
                    value={editedCarInfo.year}
                    onChange={handleInputChange}
                />
            ) : (
                <h3>{carInfo.year}</h3>
            )}
            <h6>Motor</h6>
            {isEditing ? (
                <StyledInput
                    type="text"
                    name="engine"
                    value={editedCarInfo.engine}
                    onChange={handleInputChange}
                />
            ) : (
                <h3>{carInfo.engine}</h3>
            )}
            <h6>Quilometragem</h6>
            {isEditing ? (
                <StyledInput
                    type="number"
                    name="kilometersDriven"
                    value={editedCarInfo.kilometersDriven}
                    onChange={handleInputChange}
                />
            ) : (
                <h3>{carInfo.kilometersDriven} Km</h3>
            )}
            <h6>Última troca de óleo</h6>
            {isEditing ? (
                <>
                    <StyledSelect
                        name="lastOilChangeMonth"
                        value={month}
                        onChange={handleMonthChange}
                    >
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
                    <StyledSelect
                        name="lastOilChangeYear"
                        value={year}
                        onChange={handleYearChange}
                    >
                        <StyledSelectOption value="2021">2021</StyledSelectOption>
                        <StyledSelectOption value="2022">2022</StyledSelectOption>
                        <StyledSelectOption value="2023">2023</StyledSelectOption>
                        <StyledSelectOption value="2024">2024</StyledSelectOption>
                        <StyledSelectOption value="2025">2025</StyledSelectOption>
                        <StyledSelectOption value="2026">2026</StyledSelectOption>
                    </StyledSelect>
                </>
            ) : (
                <h3>{formattedDate}</h3>
            )}
            {editable && (
                <EditSection onClick={toggleEditing}>
                    {isEditing ? (
                        <>
                            <FaSave />
                            <p>Salvar</p>
                        </>
                    ) : (
                        <>
                            <FaPen />
                            <p>Editar</p>
                        </>
                    )}
                </EditSection>
            )}
        </CarInfoContainer>
    );
}

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const CarInfoContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 15px;
  h3, h6 {
    font-weight: 300;
    margin-top: 5px;
  }
  h6 {
    margin-top: 15px;
    width: 150px;
  }
`;

const EditSection = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;

  p {
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  margin-top: 8px;
  font-size: 24px;
  height: 40px;
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

export default CarInfoCard;
