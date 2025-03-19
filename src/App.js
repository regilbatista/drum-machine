import { useState, useEffect } from 'react';
import './App.css';

const drumPads = [
  { key: 'Q', sound: 'Heater 1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', sound: 'Heater 2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', sound: 'Heater 3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', sound: 'Heater 4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', sound: 'Clap', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
  { key: 'D', sound: 'Open-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
  { key: 'Z', sound: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', sound: 'Kick', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
  { key: 'C', sound: 'Closed-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' }
];

export default function App() {
  const [displayText, setDisplayText] = useState('');

  const playSound = (key, sound) => {
    const audioElement = document.getElementById(key);
    if (audioElement) {
      audioElement.currentTime = 0;  // Reinicia el sonido para que se escuche completo
      audioElement.play();
      setDisplayText(sound);
    }
  };

  const handleKeyDown = (event) => {
    const pad = drumPads.find(pad => pad.key === event.key.toUpperCase());
    if (pad) playSound(pad.key, pad.sound);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="App">
      <div id="drum-machine">
        <div id="display">{displayText || "Presiona un pad"}</div>
        <div className="pads-container">
          {drumPads.map(pad => (
            <div
              key={pad.key}
              className="drum-pad"
              id={pad.sound}
              onClick={() => playSound(pad.key, pad.sound)}
            >
              {pad.key}
              {/* Aquí es donde colocas el <audio> para cada "drum pad" */}
              <audio 
                className="clip" 
                id={pad.key} 
                src={pad.src} 
                onError={() => console.log(`Error al cargar el archivo ${pad.src}`)}
              >
                <source src={pad.src} type="audio/mpeg" />
                <source src={pad.src} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div> 
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} - by Regil Batista Todos los derechos reservados
      </footer>
    </div>
  );
}
