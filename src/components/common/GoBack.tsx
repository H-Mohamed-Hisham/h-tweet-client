import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

type props = {
  link: string;
  title: string;
};

const GoBack: React.FC<props> = ({ link, title }) => {
  return (
    <Link
      to={link}
      className="flex items-center gap-3 mb-3 hover:text-sky-800 hover:stroke-sky-800"
    >
      <ArrowLeftIcon className="h-5 w-5 text-gray-500" /> {title}
    </Link>
  );
};

export default GoBack;
