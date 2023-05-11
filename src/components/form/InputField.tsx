type props = {
  id: string;
  label: string;
  type: string;
  value?: string;
  disabled?: boolean;
  error?: any;
  placeholder?: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const InputField: React.FC<props> = ({
  id,
  label,
  type,
  value,
  disabled,
  error,
  placeholder,
  onChange,
}) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={classNames(
          error?.[id] ? "border-red-500 mb-3" : "",
          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        )}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {error?.[id] && (
        <p className="text-red-500 text-xs italic">{error?.[id]}</p>
      )}
    </>
  );
};

export default InputField;
