import {
  createContext,
  FC,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
type IInputContext = {
  isFocus: boolean;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
};
export const InputContext = createContext<IInputContext>({} as IInputContext);
type IInputProvider = {
  children: ReactNode;
};
export const InputProvider: FC<IInputProvider> = ({ children }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <InputContext.Provider value={{ isFocus, setIsFocus }}>
      {children}
    </InputContext.Provider>
  );
};
