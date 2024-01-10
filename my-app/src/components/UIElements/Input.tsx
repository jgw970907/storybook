import InputType from "../../types/UIElementType/InputType";
const Input = ({
  label,
  type,
  placeholder,
  onChange,
  name,
  value,
}: InputType) => {
  return (
    <div>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
