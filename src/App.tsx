import { FormEvent, useState } from 'react';
import { LiaFreeCodeCamp } from 'react-icons/lia';
import DrumPad from './components/DrumPad';
import useDarkMode from './hooks/useDarkMode';
import Toggle from './components/Toggle';

type Keys = 'q' | 'w' | 'e' | 'a' | 's' | 'd' | 'z' | 'x' | 'c';
const keys: Keys[] = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

type SoundInfo = {
  src: string;
  name: string;
};

type Bank = Record<Keys, SoundInfo>;
type Banks = Record<'chill' | 'hard', Bank>;

const banks: Banks = {
  chill: {
    q: { src: 'Heater-1.mp3', name: 'Heater 1' },
    w: { src: 'Heater-2.mp3', name: 'Heater 2' },
    e: { src: 'Heater-3.mp3', name: 'Heater 3' },
    a: { src: 'Heater-4_1.mp3', name: 'Heater 4' },
    s: { src: 'Heater-6.mp3', name: 'Clap' },
    d: { src: 'Dsc_Oh.mp3', name: 'Open HH' },
    z: { src: 'Kick_n_Hat.mp3', name: "Kick n' Hat" },
    x: { src: 'RP4_KICK_1.mp3', name: 'Kick' },
    c: { src: 'Cev_H2.mp3', name: 'Closed HH' },
  },
  hard: {
    q: { src: 'KickK1.mp3', name: 'Kick' },
    w: { src: 'KickRaw2.mp3', name: 'Raw Kick' },
    e: { src: 'KickUptempo3V2.mp3', name: 'Uptempo Kick' },
    a: { src: 'Clapshot1.mp3', name: 'Clap 1' },
    s: { src: 'Clapshot2.mp3', name: 'Clap 2' },
    d: { src: 'HiHatShot1.mp3', name: 'Hi Hat 1' },
    z: { src: 'HiHatShot2.mp3', name: 'Hi Hat 2' },
    x: { src: 'Leadshot2_G.mp3', name: 'Lead' },
    c: { src: 'Screechshot2_E.mp3', name: 'Screech' },
  },
};

function App() {
  const [power, setPower] = useState(true);
  const [selectedBank, setSelectedBank] = useState<keyof typeof banks>('chill');
  const [selectedSound, setSelectedSound] = useState('Heater Kit');
  const [volume, setVolume] = useState(0.8);
  const [colorTheme, setTheme] = useDarkMode();
  const [, setDarkMode] = useState(colorTheme === 'light' ? true : false);

  const toggleBanks = () => {
    selectedBank === 'chill'
      ? setSelectedBank('hard')
      : setSelectedBank('chill');

    setTheme(colorTheme);
    setDarkMode(selectedBank === 'chill' ? false : true);
    setSelectedSound(selectedBank !== 'chill' ? 'Heater Kit' : 'Hardcore');
  };

  return (
    <div
      id="drum-machine"
      className="flex gap-5 border-4 border-red-700 p-5 rounded-lg relative"
    >
      <div className="pad-bank grid grid-cols-3 gap-2">
        {keys.map((k) => (
          <DrumPad
            id={k.toUpperCase()}
            key={k}
            src={`${selectedBank}/${banks[selectedBank][k].src}`}
            setSelectedSound={() =>
              setSelectedSound(banks[selectedBank][k].name)
            }
            volume={volume}
            power={power}
          />
        ))}
      </div>

      <a
        className="flex logo absolute top-2 right-5 uppercase font-bold"
        href="https://www.freecodecamp.org/"
        target="_blank"
      >
        FCC &nbsp; <LiaFreeCodeCamp size={28} />
      </a>

      <div className="controls flex flex-col items-center justify-around w-[200px]">
        <Toggle
          label="Power"
          handler={(e: FormEvent<HTMLInputElement>) =>
            setPower(e.currentTarget.checked)
          }
          checked={power}
        />
        <div
          id="display"
          className={`border-2 px-4 py-2 rounded-md ${
            selectedBank === 'hard' ? 'animate-pulse' : ''
          }`}
        >
          {selectedSound}
        </div>
        <div>
          <h2>Volume</h2>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              if (!power) return;
              setVolume(parseFloat(e.target.value));
              setSelectedSound(
                `Volume: ${Math.floor(parseFloat(e.target.value) * 100)}`
              );
            }}
          />
        </div>
        <Toggle label={selectedBank} handler={toggleBanks} disabled={!power} />
      </div>
    </div>
  );
}

export default App;
