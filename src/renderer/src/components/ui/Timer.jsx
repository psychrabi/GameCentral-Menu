import { useEffect, useState } from 'react'
import { useBoundStore } from '../stores/BoundStore'
import { formatTime } from '../../utils/formatTime'
const Timer = () => {
  const member = useBoundStore((state) => state.member);
  const startTime = useBoundStore((state) => state.start_time);
  const logout = useBoundStore((state) => state.logout);
  const setNotification = useBoundStore((state) => state.setNotification);

  const [duration, setDuration] = useState('00:00:00');
  const [cost, setCost] = useState('0.00');

  const COST_PER_HOUR = 60;
  const UPDATE_INTERVAL = 5000;
  const NOTIFICATION_THRESHOLD = 30;

  const startTimeFormatted = new Date(parseInt(startTime)).toLocaleTimeString();

  const calculateDuration = () => {
    const secondsElapsed = (Date.now() - startTime) / 1000;
    return new Date(secondsElapsed * 1000).toISOString().substr(11, 8);
  };

  const calculateSessionCost = (secondsElapsed) => {
    const hoursElapsed = secondsElapsed / 3600;
    return (hoursElapsed * COST_PER_HOUR).toFixed(2);
  };

  const updateTimer = () => {
    const secondsElapsed = (Date.now() - startTime) / 1000;
    setDuration(calculateDuration(secondsElapsed));
    setCost(calculateSessionCost(secondsElapsed));
  };

  const checkCostAndNotify = () => {
    if (cost > member.balance + member.bonus_balance) {
      setNotification(
        'Your session cost is higher than your balance. The difference will be added to your credit.'
      );
    }
    if (cost > member.balance + member.bonus_balance + NOTIFICATION_THRESHOLD) {
      setNotification(
        'Your credit is over $30. You will be logged out shortly and will not be able to log in until your credit is cleared.'
      );
      logout();
    }
  }

  useEffect(() => {
    const durationInterval = setInterval(updateTimer, UPDATE_INTERVAL);
    const costNotificationInterval = setInterval(checkCostAndNotify, UPDATE_INTERVAL);

    if ((Date.now() - startTime) > 3000) {
      const secondsElapsed = (Date.now() - startTime) / 1000;
      setDuration(calculateDuration(secondsElapsed));
      setCost(calculateSessionCost(secondsElapsed));
      // console.log('running once')
    }

    return () => {
      clearInterval(durationInterval);
      clearInterval(costNotificationInterval);
    };
  }, []);

  return (
    <ul className="nav col-8 col-md-8 col-lg-auto me-lg-auto mb-2 mb-md-0 justify-content-md-end">
      <li className="me-3">
        <span className="fw-bold">Start Time:</span> {startTimeFormatted}
      </li>
      <li className="me-3">
        <span className="fw-bold">Duration:</span> {duration}
      </li>
      <li>
        <span className="fw-bold">Session Cost:</span> $ {cost}
      </li>
    </ul>
  );
};

export default Timer
