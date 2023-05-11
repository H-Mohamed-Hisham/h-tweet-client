type props = {
  title: string;
  isCenter: boolean;
};

const Banner: React.FC<props> = ({ title, isCenter }) => {
  return (
    <header className="bg-white shadow mb-4">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1
          className={
            isCenter
              ? "text-2xl font-bold tracking-tight text-gray-900 text-center"
              : "text-2xl font-bold tracking-tight text-gray-900"
          }
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Banner;
