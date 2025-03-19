import { useState, useEffect, useRef } from 'react';
import { LatLng } from 'leaflet';
import { GameState } from '../types/game';
import { ROUND_TIME, TIME_BONUS_THRESHOLDS, TIME_BONUS_AMOUNTS, calculateTimeBonus } from '../utils/gameConstants';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentNeighborhood: '',
    score: 0,
    timeLeft: ROUND_TIME,
    totalTimeLeft: ROUND_TIME,
    roundInitialTime: ROUND_TIME,
    roundNumber: 1,
    gameOver: false,
    gameStarted: false,
    isCountingDown: false,
    clickedPosition: null,
    lastClickTime: 0,
    feedbackMessage: '',
    revealedNeighborhoods: new Set(),
    wrongNeighborhood: '',
    arrowPath: null,
    isMuted: false,
    volume: 0.5,
    showFeedback: false,
    clickTime: 0,
    feedbackOpacity: 0,
    feedbackProgress: 0,
    timeBonus: 0
  });

  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver && gameState.timeLeft > 0 && gameState.isCountingDown) {
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 0) {
            return { ...prev, gameOver: true, timeLeft: 0 };
          }
          return { 
            ...prev, 
            timeLeft: prev.timeLeft - 0.1,
            totalTimeLeft: prev.totalTimeLeft - 0.1
          };
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.isCountingDown]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      score: 0,
      gameOver: false,
      timeLeft: ROUND_TIME,
      totalTimeLeft: ROUND_TIME,
      roundInitialTime: ROUND_TIME,
      roundNumber: 1,
      isCountingDown: false,
      revealedNeighborhoods: new Set()
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        isCountingDown: true
      }));
    }, 100);
  };

  const startNextRound = (geoJsonData: any) => {
    const features = geoJsonData.features;
    const randomIndex = Math.floor(Math.random() * features.length);
    const neighborhood = features[randomIndex].properties?.NOME;

    setGameState(prev => {
      const nextRoundNumber = prev.roundNumber + 1;
      const timeUsedInPreviousRound = ROUND_TIME - prev.timeLeft;
      const newTotalTimeLeft = Math.max(0, prev.totalTimeLeft - timeUsedInPreviousRound);
      
      const timeBonus = calculateTimeBonus(prev.score);
      const newTimeLeft = newTotalTimeLeft + timeBonus;
      
      return {
        ...prev,
        clickedPosition: null,
        arrowPath: null,
        showFeedback: false,
        feedbackProgress: 0,
        timeLeft: newTimeLeft,
        roundInitialTime: newTimeLeft,
        roundNumber: nextRoundNumber,
        isCountingDown: false,
        currentNeighborhood: neighborhood,
        revealedNeighborhoods: new Set(),
        timeBonus: timeBonus
      };
    });

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        isCountingDown: true
      }));
    }, 100);
  };

  const clearFeedbackTimer = () => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  };

  return {
    gameState,
    updateGameState,
    startGame,
    startNextRound,
    clearFeedbackTimer,
    feedbackTimerRef
  };
}; 