// import { Link, useNavigate } from "react-router-dom";
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { Label } from '../../components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
// import { Separator } from '../../components/ui/separator';
// import { Icons } from '../../components/ui/icons';
// import { toast } from 'sonner';
// import { useSignInMutation } from '../../redux/apis/auth.api';

// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

// const loginSchema = z.object({
//   email: z.string().email({ message: ' Please Enter Email or Invalid Email Address' }),
//   password: z.string().min(6, { message: 'Password Must Be Required' }),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [signIn, { isLoading }] = useSignInMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       const res = await signIn(data).unwrap();
//       toast.success(res.message);
//       navigate('/dashboard');
//     } catch (error: any) {
//       toast.error(error?.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <div className="flex items-center justify-center mb-4">
//             <Icons.leaf className="h-8 w-8 text-green-600" />
//           </div>
//           <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
//           <CardDescription className="text-center">
//             Sign in to your account to continue
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="Enter your email" {...register('email')} />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 {...register('password')}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password.message}</p>
//               )}
//             </div>

//             <Button type="submit" className="w-full bg-green-600" disabled={isLoading}>
//               {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
//               Sign In
//             </Button>
//           </form>
//         </CardContent>
//         <div className="text-right">
//           <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
//             Forgot password?
//           </Link>
//         </div>
//         <CardFooter>
//           <div className="text-sm text-center w-full">
//             Don&apos;t have an account?{' '}
//             <Link to="/register" className="text-green-700 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;


import { Link, useNavigate } from "react-router-dom";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Icons } from '../../components/ui/icons';
import { toast } from 'sonner';
import {
  useContinueWithGoogleMutation,
  useSignInMutation
} from '../../redux/apis/auth.api';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogin } from '@react-oauth/google';

const loginSchema = z.object({
  email: z.string().email({ message: ' Please Enter Email or Invalid Email Address' }),
  password: z.string().min(6, { message: 'Password Must Be Required' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const [continueWithGoogle] = useContinueWithGoogleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleLogin = async (googleResponse: any) => {
    try {
      const { credential } = googleResponse;
      const response = await continueWithGoogle({ credential }).unwrap();
      toast.success(response.message);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error?.message || "Google login failed");
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await signIn(data).unwrap();
      toast.success(res.message);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Icons.leaf className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" {...register('email')} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-green-600" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
              theme="outline"
              size="large"
              width="100%"
            />
          </div>
        </CardContent>

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <CardFooter>
          <div className="text-sm text-center w-full">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-green-700 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
