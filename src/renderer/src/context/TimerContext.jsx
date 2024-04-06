import { createContext, useContext } from "react";

const TimerContext = createContext();

export const TimerProvider = ({children}) => {
  const [startTime, setStartTime] = useState(null);
  
  return (
    <TimerContext.Provider value={{startTime, setStartTime}}>
      {children} 
    </TimerContext.Provider>
  )
}

export const useTimer = () => useContext(TimerContext);