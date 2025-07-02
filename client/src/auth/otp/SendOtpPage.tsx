import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Icons } from '../../components/ui/icons';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "../../components/ui/card";
import { useSendOTPMutation, useVerifyOTPMutation } from "../../redux/apis/auth.api";


const schema = z.object({
    identifier: z.string().min(5, "Enter a valid email or mobile"),
    otp: z.string().optional(),
});

const SendOtpPage = () => {
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);
    const [username, setUsername] = useState("");

    const [sendOTP, { isLoading: isSending }] = useSendOTPMutation();
    const [verifyOTP, { isLoading: isVerifying, isSuccess, isError, isLoading }] = useVerifyOTPMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const handleSendOTP = async (data: any) => {
        try {
            await sendOTP({ adminName: data.identifier }).unwrap();
            setOtpSent(true);
            setUsername(data.identifier);
            toast.success("OTP sent!");
        } catch (err) {
            toast.error("Failed to send OTP");
        }
    };

    const handleVerifyOTP = async (data: any) => {
        try {
            await verifyOTP({
                adminName: username,
                otp: data.otp,
            }).unwrap();
            toast.success("OTP verified!");
            navigate("/admin");
        } catch (err) {
            toast.error("Invalid OTP");
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success("OTP verified!");
            navigate("/admin");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-muted">
            <Card className="w-[400px]">
                <CardHeader className="flex flex-col items-center justify-center gap-2">

                    <Icons.trees className="h-10 w-20 text-green-400" />
                    <CardTitle className="text-center">
                        Login with OTP
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(otpSent ? handleVerifyOTP : handleSendOTP)}>

                        <div className="space-y-4">
                            <div>
                                <Input
                                    placeholder="Enter Your Email ID"
                                    {...register("identifier")}
                                    disabled={otpSent}
                                />
                                {errors.identifier && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.identifier.message?.toString()}
                                    </p>
                                )}
                            </div>

                            {otpSent && (
                                <div>
                                    <Input
                                        placeholder="Enter OTP"
                                        {...register("otp", {
                                            required: "OTP is required",
                                            minLength: {
                                                value: 4,
                                                message: "OTP must be at least 4 digits",
                                            },
                                        })}
                                    />
                                    {errors.otp && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.otp.message?.toString()}
                                        </p>
                                    )}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-green-400"
                                disabled={isSending || isVerifying}
                            >
                                {otpSent
                                    ? isVerifying
                                        ? "Verifying..."
                                        : "Verify OTP"
                                    : isSending
                                        ? "Sending OTP..."
                                        : "Send OTP"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SendOtpPage;
