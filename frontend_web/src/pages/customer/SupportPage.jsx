import MainLayout from '../../layouts/customer/MainLayout';
import { FaSearch } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";

const SupportPage = () => {
    return (
        <MainLayout>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            
                <div className="relative w-full h-64 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/1a/6d/3e/1a6d3eee2b2355d49290721d2dc21caf.jpg')" }}>
                    <div className="absolute inset-0 bg-black/5"></div>
                    <h1 className="relative text-white text-3xl font-bold">How Can We Help You</h1>
                </div>
                
             
                <div className="mt-8 flex gap-6">
                    {supportOptions.map((option, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-40">
                            <div className="text-gray-600 text-3xl">{option.icon}</div>
                            <span className="mt-2 font-semibold text-gray-700">{option.label}</span>
                        </div>
                    ))}
                </div>
                
         
                <div className="mt-12 w-3/4">
                    <h2 className="text-xl font-semibold text-gray-700">Popular Articles</h2>
                    <div className="mt-4 flex gap-4 flex-wrap">
                        {articles.map((article, index) => (
                            <button key={index} className="bg-white shadow-md px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-200">
                                {article}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

const supportOptions = [
    { icon: <FaSearch />, label: 'Guides' },
    { icon: <MdQuestionAnswer />, label: 'FAQ' },
    { icon: <MdPeopleAlt />, label: 'Community' }
];

const articles = [
    'How to become a seller?',
    'Why I can’t take money?',
    'Receive newest news from web'
];

export default SupportPage;
