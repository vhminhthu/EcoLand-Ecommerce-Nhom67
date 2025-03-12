import { useAuthContext } from "../../../../context/AuthContext2";
import PropTypes from "prop-types";

const Tin = ({ tin }) => {
    const { authUser } = useAuthContext();

    if (!tin) return null; 

    const tuToi = tin.nguoiGuiId === authUser._id;

    return (
        <div className={`flex ${tuToi ? "justify-end" : "justify-start"} mb-2`}>
            <div
                className={`px-4 py-2 rounded-lg shadow max-w-xs ${
                    tuToi ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
                {tin.noiDungTN}
            </div>
        </div>
    );
};

Tin.propTypes = {
    tin: PropTypes.shape({
        nguoiGuiId: PropTypes.string.isRequired,
        noiDungTN: PropTypes.string.isRequired,
    }),
};

export default Tin;
