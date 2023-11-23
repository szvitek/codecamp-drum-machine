import { FormEvent } from 'react';

type Props = {
  label: string;
  handler: (e: FormEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
};

const Toggle = ({ label, checked, handler, disabled = false }: Props) => {
  return (
    <div className={`${disabled && 'pointer-events-none'}`}>
      <h2 className="text-center mb-2">{label}</h2>
      <label className="switch">
        <input type="checkbox" onChange={handler} checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
export default Toggle;
