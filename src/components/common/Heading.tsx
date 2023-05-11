type props = {
  title?: string;
  subtitle?: string;
  center?: boolean;
};

const Heading: React.FC<props> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center mb-5" : "text-start mb-5"}>
      {title && <div className="text-xl font-bold">{title}</div>}
      {subtitle && (
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      )}
    </div>
  );
};

export default Heading;
