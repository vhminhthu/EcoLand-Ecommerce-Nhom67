import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CategoryCard(props) {
    const { _id, tenDM, anhDM } = props;

    CategoryCard.propTypes = {
        _id: PropTypes.string,
        tenDM: PropTypes.string,
        anhDM: PropTypes.string,
    };

    const navigate = useNavigate();

    return (
        <>
            <div 
                className="cursor-pointer category-card bg-emerald-600 w-fit h-auto !px-2 !py-2 rounded-xl flex flex-col gap-2"
                onClick={() => {
                    const nameCategory = name.replace(/\s+/g, '-');
                    navigate(`/category/${nameCategory}`, {
                        state: { id: _id },
                    });
                }}
                key={_id}
                >
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex justify-center items-center">
                    <img className="w-22 h-22 object-cover rounded-2xl" src={anhDM} alt={tenDM} />
                </div>
                <p className="text-white font-bold text-xl text-center w-32 line-clamp-2">{tenDM}</p>
            </div>
        </>

        
    )
}


export default CategoryCard