import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  id: string;
  src: string;
  setSelectedSound: () => void;
  volume: number;
  power?: boolean;
};

const DrumPad = ({ id, src, volume, power, setSelectedSound }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCLick = useCallback(() => {
    if (!power) return;
    setIsPlaying(true);
    audioRef.current!.currentTime = 0;
    audioRef.current!.volume = volume;
    audioRef.current!.play();
    setSelectedSound();

    setTimeout(() => setIsPlaying(false), 200);
  }, [power, setSelectedSound, volume]);

  // normally I would put this useeffect in the App.tsx
  // but due to a bug in the free codecamp test suit some tests fail however
  // the app works as expected
  // I know the event listeners are uglty in react code but didn't find a better/quicker solution yet
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key.toLowerCase() === id.toLowerCase()) {
        handleCLick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // return cleanup funtion to remove the handler after use
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id, handleCLick]);

  return (
    <div
      className={`bg-slate-700 select-none drum-pad w-24 h-24 flex items-center justify-center border rounded-md shadow-lg uppercase transition-colors duration-200 ${
        isPlaying ? 'active' : ''
      }`}
      id={id.toUpperCase()}
      key={id}
      onClick={handleCLick}
    >
      <audio
        className="clip"
        id={id.toUpperCase()}
        src={src}
        ref={audioRef}
      ></audio>
      {id.toUpperCase()}
    </div>
  );
};
export default DrumPad;
