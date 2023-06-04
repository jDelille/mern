import { ChangeEventHandler } from "react";
import './input.scss';

type InputProps = {
 label: string;
 id: string;
 onChange: ChangeEventHandler<HTMLInputElement>
 placeholder: string;
 value: string;
 type: string;
}

const Input: React.FC<InputProps> = ({ id, label, onChange, placeholder, value, type }) => {
 return (
  <div className="input">
   <label htmlFor={id}>{label}</label>
   <input
    type={type}
    id={id}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
   />
  </div>
 );
}

export default Input;