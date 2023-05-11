type props = {
  type: string;
  message: string | undefined;
};

const Alert: React.FC<props> = ({ type, message }) => {
  let color;
  switch (type) {
    case "info":
      color = "blue";
      break;
    case "error":
      color = "red";
      break;
    case "warning":
      color = "yellow";
      break;
    case "sucess":
      color = "green";
      break;
  }

  return (
    <div
      className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 mb-3`}
      role="alert"
    >
      <p className="font-bold capitalize">{type}</p>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
