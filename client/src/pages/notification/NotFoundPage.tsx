import { Link } from "react-router-dom";
import { GiFarmTractor } from "react-icons/gi";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-lime-200 text-green-900 px-4">
            <GiFarmTractor size={80} className="text-green-700 animate-bounce mb-4" />
            <h1 className="text-5xl font-extrabold mb-2">404 - Page Not Found </h1>
            <p className="text-xl text-green-800 mb-6">
                Oops! You’ve wandered off the farming path 🌾

            </p>

            <Link
                to="/"
                className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg text-lg transition"
            >
                🌾 Go Back to Farm (Home)
            </Link>
        </div>
    );
};

export default NotFoundPage;
