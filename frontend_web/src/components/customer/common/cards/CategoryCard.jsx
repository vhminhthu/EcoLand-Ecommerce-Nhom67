import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CategoryCard(props) {
    const { id, name, img } = props;

    CategoryCard.propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        img: PropTypes.string,
    };

    const navigate = useNavigate();

    return (
        <>
            <div 
                className="cursor-pointer category-card bg-emerald-600 w-fit h-auto !px-2 !py-2 rounded-xl flex flex-col gap-2"
                onClick={() => {
                    const nameCategory = name.replace(/\s+/g, '-');
                    navigate(`/category/${nameCategory}`, {
                        state: { id: id },
                    });
                }}
                >
                <div className="w-32 h-32 rounded-2xl bg-amber-50 overflow-hidden flex justify-center items-center">
                    <img className="w-full h-full object-cover rounded-2xl" src={img} alt={name} />
                </div>
                <p className="text-white font-bold text-xl text-center w-32 line-clamp-2">{name}</p>
            </div>
        </>

        
    )
}


export default CategoryCard