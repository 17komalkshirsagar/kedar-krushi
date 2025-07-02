import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "../../redux/apis/auth.api";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Icons } from '../../components/ui/icons';
const schema = z.object({
    email: z.string().email("Enter a valid email"),
});

type ForgotPasswordFormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async ({ email }: ForgotPasswordFormData) => {
        try {
            const res = await forgotPassword(email).unwrap();
            toast.success(res);
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        }
    };

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
