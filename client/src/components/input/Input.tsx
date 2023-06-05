import { ChangeEventHandler } from "react";
import './input.scss';

type InputProps = {
 label: string;
 id: string;
 onChange: ChangeEventHandler<HTMLInputElement>
 placeholder: string;
 value: string;
 type: string;
 required?: boolean;
}

const Input: React.FC<InputProps> = ({ id, label, onChange, placeholder, value, type, required }) => {
 return (
  <div className="input">
   <label htmlFor={id}>{label}</label>
   <input
    type={type}
    id={id}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    required={required}
   />
  </div>
 );
}

export default Input;