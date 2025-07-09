import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/apis/auth.api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";
import { Icons } from '../../components/ui/icons';
import { useEffect } from "react";
const schema = z.object({
    password: z.string().min(6, "Password is too short"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [resetPassword, { isSuccess: isAddSuccess, isError: isAddError, isLoading }] = useResetPasswordMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        if (!token) return toast.error("Missing token");
        try {
            await resetPassword({ ...data, token }).unwrap();
        } catch (err: any) {
            console.log(err?.message || "Failed to reset password");
        }
    };
    useEffect(() => {
        if (isAddSuccess) {
            toast.success("Password reset successfully");
            navigate("/login");
        }
    }, [isAddSuccess, navigate]);

    useEffect(() => {
        if (isAddError) {
            toast.error("Failed to reset password. Please try again.");
        }
    }, [isAddError]);
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="flex items-center justify-center">
                    <Icons.flower className="h-10 w-20 mb-2 text-green-400" />

                    <CardTitle className="text-center">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input type="password" placeholder="New Password" {...register("password")} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}

                        <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>}

                        <Button type="submit" className="w-full bg-green-400" disabled={isLoading}>
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
