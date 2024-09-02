import { useEffect, useState } from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import { useOperationalContext } from "../context/OperationalContext";

function NewServicePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const carInfo = location.state?.carInfo;

    const [date, setDate] = useState({
        day: "",
        month: "",
        year: ""
    });

    const [serviceTitle, setServiceTitle] = useState("");
    const [serviceData, setServiceData] = useState("");
    const [kilometersDriven, setKilometersDriven] = useState("");

    useEffect(() => {
        const today = new Date();
        setDate({
            day: today.getDate().toString().padStart(2, '0'),
            month: (today.getMonth() + 1).toString().padStart(2, '0'),
            year: today.getFullYear().toString()
        });
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDate((prevDate) => ({
            ...prevDate,
            [name]: value
        }));
    };

    const { token } = useOperationalContext();

    const handleSave = () => {
        const serviceDate = new Date(`${date.year}-${date.month}-${date.day}T00:00:00`);
        
        const newService = {
            serviceDate,
            serviceTitle,
            serviceData,
            kilometersDriven: Number(kilometersDriven),
            vehicleId: carInfo.id,
        };

        try {
            api.post('services', newService, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(newService);
            navigate('/auth/history', { state: { carInfo } });
        }
        catch (error: any) {
            console.log(error.response.data);
        };
    };

    return (
        <>
            <LiaAngleLeftSolid size={30} onClick={() => navigate('/auth/findplate')} />
            <Container>
                <h3>{carInfo.licensePlate}</h3>
                <LineDiv />
                <h6>Data</h6>
                <div style={{ display: 'flex', gap: '10px', fontSize: '40px' }}>
                    <input 
                        name="day" 
                        type="number" 
                        min="1" 
                        max="31" 
                        value={date.day} 
                        onChange={handleDateChange} 
                    />
                    /
                    <input 
                        name="month" 
                        type="number" 
                        min="1" 
                        max="12" 
                        value={date.month} 
                        onChange={handleDateChange} 
                    />
                    /
                    <input 
                        name="year" 
                        type="number" 
                        min="1900" 
                        max="2100" 
                        value={date.year} 
                        onChange={handleDateChange} 
                    />
                </div>
                <h6>Serviço</h6>
                <input 
                    name="Service Title" 
                    value={serviceTitle} 
                    onChange={(e) => setServiceTitle(e.target.value)} 
                />
                <h6>Descrição</h6>
                <DescriptionInput 
                    name="Description" 
                    value={serviceData} 
                    onChange={(e) => setServiceData(e.target.value)} 
                />
                <h6>Quilometragem</h6>
                <div style={{ display: 'flex', gap: '10px', fontSize: '40px' }}>
                    <input 
                        name="Kilometers Driven" 
                        type="number" 
                        value={kilometersDriven} 
                        onChange={(e) => setKilometersDriven(e.target.value)} 
                    />
                    KM
                </div>
            </Container>
            <button onClick={handleSave}>Salvar alterações</button>
        </>
    );
};

const Container = styled.div`
background-color: #FFFFFF;
padding: 12px;
border-radius: 10px;
margin-bottom: 16px;
margin-top: 8px;

h3 {
    font-weight: 400;
}

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
}
`;

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const DescriptionInput = styled.textarea`
  all: unset;
  height: 200px;
  width: 100%;
  resize: vertical;
  font-size: 16px;
  background-color: #D9D9D9;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

export default NewServicePage;