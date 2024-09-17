import React, { createContext, useContext, useState, ReactNode } from "react";

interface CarInfo {
  id: number;
  customerName: string;
  licensePlate: string;
  cpf: string;
  model: string;
  engine: string;
  kilometersDriven: number;
  lastOilChange: Date;
  year: string;
}

interface ClientContextType {
  lastOilChange: string;
  setLastOilChange: (lastOilChange: string) => void;
  licensePlate: string;
  setLicensePlate: (licenseplate: string) => void;
  carInfo: CarInfo | undefined;
  setCarInfo: (carInfo: CarInfo | undefined) => void;
  token: null;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lastOilChange, setLastOilChange] = useState("");
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [carInfo, setCarInfo] = useState<CarInfo | undefined>(undefined);
  const token = null;

  return (
    <ClientContext.Provider
      value={{
        lastOilChange,
        setLastOilChange,
        licensePlate,
        setLicensePlate,
        carInfo,
        setCarInfo,
        token,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClientContext must be used within an AppProvider");
  }
  return context;
};
