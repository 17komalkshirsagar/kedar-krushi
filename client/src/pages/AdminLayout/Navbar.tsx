
import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import { GiFarmTractor } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";

const Navbar = () => {
    // Greeting
    const hour = new Date().getHours();
    const getGreeting = () => {
        if (hour < 12) return "🌞 Good Morning";
        if (hour < 18) return "🌤️ Good Afternoon";
        return "🌙 Good Evening";
    };

    // Live Time
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="backdrop-blur-md bg-green-50/60 shadow-xl px-6 py-2 border-b border-green-300">
            <div className="flex justify-between items-center">

                <div className="flex items-center space-x-3 animate-pulse">
                    <GiFarmTractor className="text-green-800 animate-bounce-slow" size={40} />
                    <h1 className="text-2xl font-bold text-green-900 tracking-widest">
                        Kedar Krushi Seva Kendra
                    </h1>
                </div>


                <div className="hidden md:flex flex-col items-center text-green-900 font-medium text-lg">
                    <span>{getGreeting()}, Komal! 👩‍🌾</span>
                    <span className="text-sm">{time}</span>
                </div>


                <div className="flex items-center space-x-5 text-green-900">
                    <button className="hover:text-green-700 hover:scale-110 transition duration-200" title="Cart">
                        <MdShoppingCart size={22} />
                    </button>
                    <button className="hover:text-green-700 hover:scale-110 transition duration-200" title="Notifications">
                        <Bell size={22} />
                    </button>
                    <button className="hover:text-green-700 hover:scale-110 transition duration-200" title="Profile">
                        <User size={22} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
