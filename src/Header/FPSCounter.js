import { useState, useEffect, useCallback } from 'react';

const FPS_THRESHOLDS = { MIN: 1, MID: 30, MAX: 120 };

const useFPSCounter = (initialFPS = 1) => {
  const [counter, setCounter] = useState(0);
  const [FPS] = useState(initialFPS);

  const calculateRenderPerCounter = useCallback((fps) => {
    if (fps < FPS_THRESHOLDS.MIN) {
      return Math.round(10 / fps);
    } else if (fps >= FPS_THRESHOLDS.MIN && fps <= FPS_THRESHOLDS.MID) {
      return Math.round(10 - (8 / (FPS_THRESHOLDS.MID - FPS_THRESHOLDS.MIN)) * (fps - FPS_THRESHOLDS.MIN));
    } else if (fps > FPS_THRESHOLDS.MID && fps <= FPS_THRESHOLDS.MAX) {
      return Math.round(2 - (1 / (FPS_THRESHOLDS.MAX - FPS_THRESHOLDS.MID)) * (fps - FPS_THRESHOLDS.MID));
    } else {
      return 1;
    }
  }, []);

  const calculateLedDimmingRate = useCallback((fps) => {
    if (fps < FPS_THRESHOLDS.MIN) {
      return 1;
    } else if (fps >= FPS_THRESHOLDS.MIN && fps <= FPS_THRESHOLDS.MID) {
      return 1 - (0.99 / (FPS_THRESHOLDS.MID - FPS_THRESHOLDS.MIN)) * (fps - FPS_THRESHOLDS.MIN);
    } else if (fps > FPS_THRESHOLDS.MID && fps <= FPS_THRESHOLDS.MAX) {
      return 0.01 - (0.005 / (FPS_THRESHOLDS.MAX - FPS_THRESHOLDS.MID)) * (fps - FPS_THRESHOLDS.MID);
    } else {
      return 0.005;
    }
  }, []);

  const calculateRenderRate = useCallback((fps) => {
    return 1000 / Math.round(calculateRenderPerCounter(fps) * fps);
  }, [calculateRenderPerCounter]);

  useEffect(() => {
    const renderInterval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, calculateRenderRate(FPS));

    return () => clearInterval(renderInterval);
  }, [FPS, calculateRenderRate]);

  return {
    counter,
    FPS,
    calculateRenderPerCounter,
    calculateLedDimmingRate,
  };
};

export default useFPSCounter;