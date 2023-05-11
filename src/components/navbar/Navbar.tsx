// Component
import Container from "components/common/Container";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <Menu />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
