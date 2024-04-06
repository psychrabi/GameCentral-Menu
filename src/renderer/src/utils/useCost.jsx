import { useEffect, useMemo } from 'react';

export default function useCost(startTime, COST_PER_HOUR) {

  const durationInSeconds = useMemo(() => {
    return (Date.now() - startTime) / 1000;
  }, [startTime]);

  const [cost, setCost] = useState('0.00');

  const calculateCost = (durationInSeconds) => {
    const durationInHours = durationInSeconds / (60 * 60)
    return (durationInHours * COST_PER_HOUR).toFixed(2)
  }


  useEffect(() => {
    const update = () => {
      const newCost = calculateCost(durationInSeconds);
      setCost(newCost);
    }
    
    const interval = setInterval(update, UPDATE_COST_INTERVAL);
    update();

    return () => clearInterval(interval);
  }, [durationInSeconds]);

  return {
    cost 
  };

}