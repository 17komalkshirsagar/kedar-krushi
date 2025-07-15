

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiFarmTractor } from "react-icons/gi";
import { useSignOutMutation } from "../../redux/apis/auth.api";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

const LogoutPage = () => {
    const navigate = useNavigate();
    const [signOut, { isSuccess, isError, isLoading }] = useSignOutMutation();
    const [startLogout, setStartLogout] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleLogout = async () => {
        try {
            setStartLogout(true);
            let timer = 0;
            console.log("timer:::", timer);

            const interval = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + 5;
                    if (next >= 100) {
                        clearInterval(interval);
                    }
                    return next;
                });
            }, 100);
            await signOut().unwrap();
        } catch (error) {
            setStartLogout(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("You have been logged out successfully!");
            navigate("/login");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            toast.error("Logout failed. Please try again.");
            setStartLogout(false);
            setProgress(0);
        }
    }, [isError]);

    useEffect(() => {
        if (isLoading) {
            toast.info("Logging out... please wait");
        }
    }, [isLoading]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-100 via-green-100 to-emerald-200 flex flex-col items-center justify-center p-4">
            {/* Animated Tractor */}
            <motion.div
                animate={{ x: [0, 15, -15, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-6"
            >
                <GiFarmTractor className="text-green-800" size={100} />
            </motion.div>

            {/* Title */}
            <motion.h1
                className="text-3xl font-extrabold text-green-900 mb-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Kedar Krushi Seva Kendra
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-green-700 text-lg text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Your farming journey ends for now. Click below to logout.
            </motion.p>

            {!startLogout ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Button
                        onClick={handleLogout}
                        className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-lg rounded-xl shadow-md"
                    >
                        Logout
                    </Button>
                </motion.div>
            ) : (
                <div className="w-full max-w-sm flex flex-col items-center gap-4">
                    <Progress value={progress} className="h-3 bg-green-200 w-full rounded-full" />
                    <p className="text-green-700 text-sm font-medium text-center">
                        Logging you out... please wait
                    </p>
                </div>
            )}
        </div>
    );
};

export default LogoutPage;
