import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiFarmTractor } from "react-icons/gi";
import { useSignOutMutation } from "../../redux/apis/auth.api";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

const LogoutPage = () => {
    const navigate = useNavigate();
    const [signOut, { isSuccess, isError, isLoading }] = useSignOutMutation();
    const [startLogout, setStartLogout] = useState(false);

    const handleLogout = () => {
        signOut();
        setStartLogout(true);
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
        }
    }, [isError]);
    useEffect(() => {
        if (isLoading) {
            toast.info("Logging out... please wait");
        }
    }, [isLoading]);


    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl bg-white rounded-xl border-green-200">
                <CardHeader className="text-center">
                    <motion.div
                        animate={{ rotate: [0, 20, -20, 0], y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex justify-center"
                    >
                        <GiFarmTractor className="text-green-700" size={64} />
                    </motion.div>

                    <CardTitle className="text-green-800 text-xl mt-2">
                        Kedar Krushi Seva Kendra
                    </CardTitle>
                    <CardDescription className="text-green-600">
                        Click below to log out of your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="mt-4 space-y-4 text-center">
                    {!startLogout ? (
                        <Button
                            onClick={handleLogout}
                            className="bg-green-600 hover:bg-green-700 text-white w-full"
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-700"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5 }}
                                />
                            </div>
                            <p className="text-green-600 text-sm">Logging you out... please wait</p>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default LogoutPage;
