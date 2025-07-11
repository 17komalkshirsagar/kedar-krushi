import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "../../redux/apis/auth.api";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Icons } from '../../components/ui/icons';
import { useEffect } from "react";
const schema = z.object({
    email: z.string().email("Enter a valid email"),
});

type ForgotPasswordFormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
    const [forgotPassword, { isSuccess: isAddSuccess, isError: isAddError, isLoading }] = useForgotPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async ({ email }: ForgotPasswordFormData) => {
        try {
            await forgotPassword(email).unwrap();
        } catch (error: any) {
            console.log(error?.message || "Something went wrong");
        }
    };


    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Login successfully');

        }
    }, [isAddSuccess,]);


    useEffect(() => {
        if (isAddError) {
            toast.error('failed. Please try again.');
        }
    }, [isAddError]);


    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="items-center justify-center flex">
                    <Icons.pine className="h-10 w-20 mb-2 text-green-400" />
                    <CardTitle className="text-center mt-2">Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input placeholder="Enter your email" {...register("email")} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message as string}</p>}
                        <Button type="submit" className="w-full bg-green-400" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
