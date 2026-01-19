
import { useEffect, useState, useCallback } from 'react';
import { View } from '../types';

export const useVoiceNavigation = (setView: (view: View) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice navigation is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);
      console.log('Voice Command:', command);

      if (command.includes('home') || command.includes('main')) {
        setView(View.HOME);
      } else if (command.includes('bible')) {
        setView(View.BIBLE);
      } else if (command.includes('music') || command.includes('worship')) {
        setView(View.MUSIC);
      } else if (command.includes('giving') || command.includes('tithe') || command.includes('give')) {
        setView(View.GIVING);
      } else if (command.includes('groups') || command.includes('sectors')) {
        setView(View.GROUPS);
      } else if (command.includes('kids church') || command.includes('children')) {
        setView(View.GROUP_KIDS);
      } else if (command.includes('live stream') || command.includes('online')) {
        setView(View.LIVE_STREAM);
      } else if (command.includes('mc') || command.includes('missional')) {
        setView(View.GROUP_MCS);
      }
    };

    recognition.start();
  }, [setView]);

  return { isListening, transcript, startListening };
};
