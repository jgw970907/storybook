import ButtonType from "../../types/UIElementType/ButtonType";
const Button = ({ label, onClick, disabled }: ButtonType) => {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </>
  );
};

export default Button;
