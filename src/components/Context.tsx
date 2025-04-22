import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  isList: boolean;
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newProject: boolean;
  setNewProject: React.Dispatch<React.SetStateAction<boolean>>;
};
const Context = createContext<ContextType | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({ children }: ProviderProps) => {
  const [isList, setIsList] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1040);
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1040);
  };

  return (
    <Context.Provider
      value={{
        isList,
        setIsList,
        isMobile,
        setIsMobile,
        isOpen,
        setIsOpen,
        newProject,
        setNewProject,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useMyContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("use  must be used within A  Provider");
  }
  return context;
};
