type props = {
  id: string;
  type: string;
  value?: string;
  disabled?: boolean;
  error?: any;
  placeholder?: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: any;
  buttonTitle: string;
};

const InputGroupField: React.FC<props> = ({
  id,
  type,
  value,
  disabled,
  error,
  placeholder,
  onChange,
  onClick,
  buttonTitle,
}) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={classNames(
            error?.[id] ? "border-red-500" : "",
            "shadow appearance-none border block w-full rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-full rounded-md border-0 px-4"
          >
            {buttonTitle}
          </button>
        </div>
      </div>
      {error?.[id] && (
        <p className="text-red-500 text-xs italic mt-2">{error?.[id]}</p>
      )}
    </>
  );
};

export default InputGroupField;
