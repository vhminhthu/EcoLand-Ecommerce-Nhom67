import { BiSearch } from "react-icons/bi";
import PropTypes from "prop-types";

function Search({ search, setSearch }) {
    return (
        <div className="relative flex-grow">
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-8 border rounded-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearch className="absolute left-2 top-3 text-gray-400" />
        </div>
    );
}

Search.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
};

export default Search;
