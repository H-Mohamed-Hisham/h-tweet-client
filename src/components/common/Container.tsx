type props = {
  children: React.ReactNode;
};

const Container: React.FC<props> = ({ children }) => {
  return (
    // <div
    //   className="
    //     max-w-[2520px]
    //     mx-auto
    //     xl:px-20
    //     md:px-10
    //     sm:px-2
    //     px-4
    //   "
    // >
    //   {children}
    // </div>

    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-64 
        lg:px-10
        md:px-16
        sm:px-2
        px-4
      "
    >
      {children}
    </div>
  );
};

export default Container;
