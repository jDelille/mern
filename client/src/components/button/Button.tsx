import './Button.scss';

type ButtonProps = {
 label: string;
 onClick?: () => void;
}


const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
 return (
  <button onClick={onClick} className='button'>{label}</button>
 );
}

export default Button;