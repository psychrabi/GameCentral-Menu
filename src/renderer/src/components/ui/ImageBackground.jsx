import { useEffect, useMemo, useState } from 'react';
import backgrounds from '../../data/Backgrounds';

const ImageBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(Math.floor(Math.random() * backgrounds.length));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url('../src/public/backgrounds/bg-${currentImageIndex}.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%'
  }), [currentImageIndex]);

  return (
    <div className="position-absolute top-0 left-0 h-100 w-100" style={backgroundStyle}></div>
  );
};

export default ImageBackground
