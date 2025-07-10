// // components/Sidebar.tsx
// import { Link, useLocation } from "react-router-dom";
// import {
//     Home,
//     Building2,
//     Users,
//     Package,
//     Truck,
//     UserCircle,
//     Bell,
//     CreditCard,
//     ClipboardList,
// } from "lucide-react";

// const links = [
//     { label: "Dashboard", to: "/admin", icon: <Home size={16} /> },
//     { label: "Company Table", to: "/admin/company/table", icon: <Building2 size={16} /> },
//     { label: "Customer Table", to: "/admin/customer/table", icon: <Users size={16} /> },
//     { label: "Product Table", to: "/admin/product/table", icon: <Package size={16} /> },
//     { label: "Delivery Table", to: "/admin/delivery/table", icon: <Truck size={16} /> },
//     { label: "Employee Table", to: "/admin/employee/table", icon: <UserCircle size={16} /> },
//     { label: "Supplier Table", to: "/admin/supplier/table", icon: <Users size={16} /> },
//     { label: "Notifications", to: "/admin/notification-page", icon: <Bell size={16} /> },
//     { label: "Bill Payment", to: "/admin/bill", icon: <CreditCard size={16} /> },
//     { label: "Installments", to: "/admin/installment", icon: <ClipboardList size={16} /> },
// ];

// export default function Sidebar() {
//     const location = useLocation();

//     return (
//         <aside className="w-64 bg-blue-100 p-4 min-h-screen">
//             <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
//             <nav className="space-y-2">
//                 {links.map((item) => (
//                     <Link
//                         key={item.to}
//                         to={item.to}
//                         className={`flex items-center space-x-2 p-2 rounded-md transition ${location.pathname === item.to
//                             ? "bg-blue-600 text-white"
//                             : "hover:bg-blue-300 text-black"
//                             }`}
//                     >
//                         {item.icon}
//                         <span>{item.label}</span>
//                     </Link>
//                 ))}
//             </nav>
//         </aside>
//     );
// }

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Building2,
    Users,
    Package,
    Truck,
    UserCircle,
    Bell,
    CreditCard,
    ClipboardList,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { GiFarmTractor } from "react-icons/gi";

const links = [
    { label: "Dashboard", to: "/admin", icon: <Home size={22} /> },
    { label: "Company Table", to: "/admin/company/table", icon: <Building2 size={22} /> },
    { label: "Customer Table", to: "/admin/customer/table", icon: <Users size={22} /> },
    { label: "Product Table", to: "/admin/product/table", icon: <Package size={22} /> },
    { label: "Delivery Table", to: "/admin/delivery/table", icon: <Truck size={22} /> },
    { label: "Employee Table", to: "/admin/employee/table", icon: <UserCircle size={22} /> },
    { label: "Supplier Table", to: "/admin/supplier/table", icon: <Users size={22} /> },
    { label: "Notifications", to: "/admin/notification-page", icon: <Bell size={22} /> },
    { label: "Bill Payment", to: "/admin/bill", icon: <CreditCard size={22} /> },
    { label: "Installments", to: "/admin/installment", icon: <ClipboardList size={22} /> },
];

const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    // Greeting & Time
    const hour = new Date().getHours();
    const getGreeting = () => {
        if (hour < 12) return "🌞 Good Morning";
        if (hour < 18) return "🌤️ Good Afternoon";
        return "🌙 Good Evening";
    };

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <aside className={`h-screen p-4 transition-all duration-300 ${collapsed ? "w-20" : "w-64"} bg-green-50 border-r`}>

            <div className="flex justify-end mb-1">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-green-700 hover:text-green-900 transition"
                >
                    {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                </button>
            </div>


            {!collapsed && (
                <div className="flex items-center space-x-3 mb-6">
                    <GiFarmTractor className="text-green-700 animate-bounce-slow" size={32} />
                    <h6 className="text-[14px] font-semibold text-green-800 tracking-wide">
                        Kedar Krushi Seva Kendra
                    </h6>
                </div>
            )}

            <nav className="space-y-1">
                {links.map((item) => {
                    const isActive = location.pathname === item.to;
                    const baseClass = `flex items-center space-x-2 p-2 rounded-md text-sm font-medium transition-all ${isActive
                        ? "bg-green-600 text-white"
                        : "hover:bg-green-200 text-green-900"
                        }`;

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={collapsed ? "group relative" : baseClass}
                        >
                            <div
                                className={`flex items-center justify-center ${collapsed ? "w-10 h-10 mx-auto rounded hover:bg-green-100" : ""
                                    }`}
                            >
                                {item.icon}
                            </div>
                            {!collapsed && <span>{item.label}</span>}

                            {collapsed && (
                                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-green-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>


            {!collapsed && (
                <div className="mt-10 text-center text-green-900 font-medium text-sm">
                    <p>{getGreeting()}, Kshirsagar 👩‍🌾</p>
                    <p className="text-xs text-green-700">{time}</p>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
