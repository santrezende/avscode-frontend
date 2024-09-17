import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import styled from "styled-components";
import Footer from "../components/Footer";
import { ChangeEvent, useState } from "react";
import CarInfoCard from "../components/CarInfoCard";
import { FaCirclePlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import OperationalHeader from "../components/OperationalHeader";
import api from "../api/api";
import { useOperationalContext } from "../context/OperationalContext";
import { toast, ToastContainer } from "react-toastify";

function OperationalFindPlatePage() {
  const [plate, setPlate] = useState("");
  const [suggestedPlates, setSuggestedPlates] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { carInfo } = location.state || {};

  const [insertedPlate, setInsertedPlate] = useState(
    carInfo?.licensePlate ? true : false,
  );
  const [searchedPlate, setSearchedPlate] = useState(carInfo || null);

  const [renderWarning, setRenderWarning] = useState(false);

  const { token } = useOperationalContext();

  const handlePlateInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setPlate(value);

    if (value.length === 3) {
        const response = await api.get(`/vehicles/search/${value}`, {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        });

        const vehiclesArray = response.data.map((vehicle: any) => vehicle.licensePlate);

        setSuggestedPlates(vehiclesArray);
        setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClick = async () => {
    try {
      const promise = await api.get(`/vehicles/${plate}`, {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
      });
      setSearchedPlate(promise.data);
      setInsertedPlate(!insertedPlate);
      setRenderWarning(false);
      setShowSuggestions(false);
    } catch (error: any) {
      console.log(error.response.data);
      setRenderWarning(true);
    }
  };

  const handleSuggestionClick = (suggestedPlate: string) => {
    setPlate(suggestedPlate);
    setShowSuggestions(false);
  };

  return (
    <>
      {!insertedPlate ? (
        <FindPlateContainer>
          <LiaAngleLeftSolid size={30} onClick={() => navigate("/auth/home")} />
          <h2>
            Buscar <br /> Veículo
          </h2>
          <Input
            type="text"
            maxLength={7}
            value={plate}
            onChange={handlePlateInput}
          />
          {showSuggestions && suggestedPlates.length > 0 && (
            <SuggestionsContainer>
              {suggestedPlates.map((suggestedPlate) => (
                <SuggestionItem
                  key={suggestedPlate}
                  onClick={() => handleSuggestionClick(suggestedPlate)}
                >
                  {suggestedPlate}
                </SuggestionItem>
              ))}
            </SuggestionsContainer>
          )}
          <h6>Insira aqui a placa</h6>
          <button onClick={handleClick}>Buscar</button>
        </FindPlateContainer>
      ) : (
        <>
          <OperationalHeader
            handleBackClick={() => setInsertedPlate(!insertedPlate)}
            handleHomeClick={() => navigate("/auth/home")}
          />
          <CarInfoCard
            editable={true}
            carInfo={searchedPlate!}
            onUpdate={(updatedCarInfo) => setSearchedPlate(updatedCarInfo)}
            contextType="operational"
          />
          <HistoryButton
            onClick={() =>
              navigate("/auth/history", { state: { carInfo: searchedPlate } })
            }
          >
            <h5>
              Histórico de <br /> atendimentos
            </h5>
            <LiaAngleRightSolid size={30} className="icon" />
          </HistoryButton>
          <CreateNewServiceButton
            onClick={() =>
              navigate("/auth/newservice", {
                state: { carInfo: searchedPlate },
              })
            }
          >
            <FaCirclePlus size={30} className="icon" />
            <h5>Criar novo atendimento</h5>
          </CreateNewServiceButton>
          <DeleteButton onClick={async () => {
            try {
              await api.delete(`/vehicles/${searchedPlate.id}`, {
                headers: {
                  Authorization: `Bearer ${token || localStorage.getItem("token")}`,
                },
              });
              toast.success("Veículo deletado com sucesso!");
              navigate("/auth/home");
            } catch (error) {
              toast.error("Delete os atendimentos antes de deletar o veículo!");
            }
          }}>
            Deletar Veículo
          </DeleteButton>
        </>
      )}
      {renderWarning && (
        <WarningContainer>
          <h4>Placa não encontrada!</h4>
          <h5>Tente novamente.</h5>
        </WarningContainer>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
}

const HistoryButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d9d9d9;
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
  }

  .icon {
    margin-top: 8px;
  }
`;

const FindPlateContainer = styled.div`
  h2 {
    margin-top: 40px;
    margin-bottom: 12px;
  }
  h6 {
    margin-bottom: 12px;
  }

  position: relative;
`;

const Input = styled.input`
  margin-bottom: 8px;
`;

const WarningContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  height: 100px;
  margin-top: 20px;
  padding-left: 10px;
  padding-top: 15px;
  display: grid;
`;

const DeleteButton = styled.button`
  background-color: #ff6060;
  margin-top: 12px;
`;

const SuggestionsContainer = styled.div`
  background-color: #D9D9D9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 1000;
  width: 100%;
  position: absolute;
  margin-top: -16px;
`;

const SuggestionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default OperationalFindPlatePage;
