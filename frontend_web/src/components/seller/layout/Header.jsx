import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineBell } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import PropTypes from 'prop-types';

function Header({ title }) {
    return (
        <div className="bg-white text-xl font-bold rounded-xl shadow-xl !px-5 !py-4 w-auto h-fit flex justify-between items-center">
            <h1 className="text-emerald-700">{title}</h1>
            <div className="flex justify-between items-center text-black gap-4">
                <div className="flex items-center bg-slate-100 rounded-lg !px-4 !py-1 w-64 h-12">
                    <BiSearch />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm" 
                        className="w-full !px-2 text-sm h-10 bg-transparent focus:outline-none"
                    />
                </div>
                
                <div className="flex gap-4">
                    <div className="bg-slate-100 rounded-lg flex items-center justify-center w-12 h-12">
                        <MdOutlineEmail className="text-xl"/>
                    </div>
                    
                    <div className="bg-slate-100 rounded-lg flex items-center justify-center w-12 h-12">
                        <HiOutlineBell className="text-xl"/>
                    </div>
                    
                    <div className="bg-slate-100 rounded-lg flex items-center justify-center w-12 h-12">
                        <img src="https://via.placeholder.com/40" alt="profile" className="rounded-full w-10 h-10"/>
                    </div>
                    
                    <p className="flex items-center h-12 font-medium text-base">Tên người dùng</p>
                </div>
            </div>

        </div>
    )
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
};
export default Header