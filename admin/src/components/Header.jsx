import { FaBox } from "react-icons/fa";
import PropTypes from "prop-types"; 

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-md fixed !top-0 !left-64 !w-[calc(100%-16rem)] !z-50">
      <div className=" !px-6 !py-3 flex justify-between items-center">
        <div className="flex items-center !space-x-2">
          <FaBox className="text-green-700" size={20} />
          <span className="text-green-700 font-semibold">{title}</span>
        </div>
        <img
          src="https://i.pinimg.com/736x/24/88/23/2488232a5f9fee4df846a02d08dbbab8.jpg"
          alt="User Avatar"
          className="!w-10 !h-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
};


Header.propTypes = {
  title: PropTypes.string.isRequired, 
};


Header.defaultProps = {
  title: "Dashboard",
};

export default Header;
