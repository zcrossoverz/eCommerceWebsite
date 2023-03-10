import { useState } from 'react';
import { getAccessToken } from 'src/utils/auth';
import { createContext } from 'react';

interface AppContextInterface {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialAppContext: AppContextInterface = {
  isAuth: Boolean(getAccessToken()),
  setIsAuth: () => null,
};
export const AppContext = createContext<AppContextInterface>(initialAppContext);
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(initialAppContext.isAuth);
  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
