import React, { useEffect, useState } from 'react';
import { FeedbackPanelProps } from '../../types/game';
import { getFeedbackMessage } from '../../utils/gameConstants';

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  showFeedback,
  clickedPosition,
  arrowPath,
  clickTime,
  feedbackProgress,
  onNextRound,
  calculateDistance,
  calculateScore,
  getProgressBarColor,
  geoJsonData
}) => {
  const [displayedDistance, setDisplayedDistance] = useState(0);
  const [displayedTime, setDisplayedTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [finalDistance, setFinalDistance] = useState(0);

  useEffect(() => {
    if (showFeedback && clickedPosition && geoJsonData) {
      const actualDistance = arrowPath ? calculateDistance(clickedPosition, arrowPath[1]) : 0;
      setFinalDistance(actualDistance);
      setIsAnimating(true);
      setDisplayedDistance(0);
      setDisplayedTime(0);

      const duration = 2000; // 2 seconds animation
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;
      const distanceStep = actualDistance / steps;
      const timeStep = clickTime / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setDisplayedDistance(prev => Math.min(prev + distanceStep, actualDistance));
        setDisplayedTime(prev => Math.min(prev + timeStep, clickTime));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [showFeedback, clickedPosition, geoJsonData]);

  if (!showFeedback || !clickedPosition || !geoJsonData) return null;

  const scores = calculateScore(displayedDistance, 45);

  return (
    <div style={{
      position: 'absolute',
      top: '80px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      zIndex: 2000,
      minWidth: '300px',
      maxWidth: '350px',
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out'
    }}>
      <h2 style={{ color: '#32CD32', marginBottom: '15px', fontSize: '1.3em' }}>
        {getFeedbackMessage(finalDistance)}
      </h2>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '30px',
        marginBottom: '20px',
        padding: '10px',
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '10px'
      }}>
        <div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#333',
            fontFamily: 'monospace',
            letterSpacing: '2px',
            textShadow: isAnimating ? '0 0 5px #32CD32' : 'none',
            transition: 'text-shadow 0.1s ease-in-out'
          }}>
            {Math.round(displayedDistance).toString().padStart(5, '0')}
          </div>
          <div style={{ color: '#666', fontSize: '1em', marginTop: '5px' }}>metros</div>
        </div>
        <div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#333',
            fontFamily: 'monospace',
            letterSpacing: '2px',
            textShadow: isAnimating ? '0 0 5px #FFA500' : 'none',
            transition: 'text-shadow 0.1s ease-in-out'
          }}>
            {displayedTime.toFixed(2)}
          </div>
          <div style={{ color: '#666', fontSize: '1em', marginTop: '5px' }}>segundos</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          fontSize: '16px', 
          color: '#4CAF50', 
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Por distância:</span>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
            +{scores.distancePoints}
          </span>
        </div>
        <div style={{ 
          fontSize: '16px', 
          color: '#FFA500',
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Por tempo:</span>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
            +{scores.timePoints}
          </span>
        </div>
        <div style={{ 
          fontSize: '18px', 
          color: '#333',
          fontWeight: 'bold',
          borderTop: '1px solid #ddd',
          paddingTop: '8px',
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Total:</span>
          <span style={{ color: '#FF6B6B', fontSize: '24px' }}>
            +{scores.total}
          </span>
        </div>
      </div>
      
      <div style={{
        width: '100%',
        height: '4px',
        background: '#ddd',
        borderRadius: '2px',
        marginBottom: '15px'
      }}>
        <div style={{
          width: `${feedbackProgress}%`,
          height: '100%',
          background: getProgressBarColor(feedbackProgress / 100 * 45),
          borderRadius: '2px',
          transition: 'width 0.1s linear, background-color 0.3s ease'
        }} />
      </div>

      <button
        onClick={() => onNextRound(geoJsonData)}
        style={{
          padding: '8px 20px',
          fontSize: '1em',
          background: '#32CD32',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontWeight: 'bold'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#28a745'}
        onMouseOut={(e) => e.currentTarget.style.background = '#32CD32'}
      >
        Próximo
      </button>
    </div>
  );
}; 