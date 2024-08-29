import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OperationalContextType {
  name: string;
  setName: (name: string) => void;
  token: string;
  setToken: (token: string) => void;
}

const OperationalContext = createContext<OperationalContextType | undefined>(undefined);

export const OperationalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [token, setToken] = useState<string>('');

  return (
    <OperationalContext.Provider value={{ name, setName, token, setToken }}>
      {children}
    </OperationalContext.Provider>
  );
};

export const useOperationalContext = (): OperationalContextType => {
  const context = useContext(OperationalContext);
  if (context === undefined) {
    throw new Error('useOperationalContext must be used within an AppProvider');
  }
  return context;
};
