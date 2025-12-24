"use client"
import React from 'react'
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { loginService } from '@/service/login/login.service';
import { toast } from 'sonner';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const login = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const verifyLogin = await loginService(email.trim(), password.trim());

            if (verifyLogin.status === 200) {
                localStorage.setItem("auth_token", verifyLogin?.data?.auth_token);
                localStorage.setItem("role", verifyLogin?.data?.role)
                router.push('/blogs');
            }
        } catch (error) {
            console.log("err123", error)
            toast.error(error?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="relative bg-black min-h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-animated z-0" />

            <div className="absolute inset-0 z-0">
                <div className="float-circle top-20 left-20 w-72 h-72 bg-cyan-500/20" />
                <div className="float-circle float-circle-delay bottom-20 right-20 w-96 h-96 bg-cyan-500/20" />
            </div>

            <div className="flex items-center justify-center min-h-screen relative z-10 px-4 py-8">
                <Card className="w-full max-w-[420px] py-6 sm:py-8 float-animation">
                    <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center">
                            <img src='/logo.png' alt='logo' className='w-40 h-20' />
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={login} className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="username">Email</Label>
                                <Input
                                    id="username"
                                    name="Username"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="mr-2 rounded" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <a href="#" className="text-primary hover:text-blue-700 font-medium">
                                    Forgot password?
                                </a>
                            </div> */}

                            <div className="flex justify-center">
                                <Button type="submit" disabled={loading} className="mt-6">
                                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </div>
                        </form>

                        {/* <div className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="#" className="text-primary hover:text-blue-700 font-medium">
                                Sign up
                            </a>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login