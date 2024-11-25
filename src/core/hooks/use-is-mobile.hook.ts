import { useLayoutEffect, useState } from 'react';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    updateSize();

    window.addEventListener('resize', updateSize);
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
