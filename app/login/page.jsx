'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const styles = {
        background: "url('images/seafood-bg2.png')",
        filter: 'brightness(0.8) blur(0px) invert(1)'
    }

    const login = async (e) => {
        e.preventDefault();

        setLoading(true)
        await new Promise((resolve, reject) => { setTimeout(() => resolve(), 1500) });

        router.replace('dashboard');
        setLoading(false);

    }

    return (
        <div className='relative'>
            <div style={styles} className="h-full w-full z-0 absolute"></div>
            <div className="flex items-center justify-center h-dvh relative">
                <Card className='w-full max-w-[400px] py-14'>
                    <CardHeader>
                        <CardTitle className='flex flex-col justify-between items-center'>
                            <img src="/images/DGF_LOGO_NEW_VARIATION.png" alt="DGM Logo" className="lab-icon mb-2 size-16" />
                            <h4 className="font-bold text-xl text-primary">DAM GOOD FISH</h4>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={login}>
                            <div className="mb-3">
                                <Label className='pb-1'>Username</Label>
                                <Input name="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <Label className='pb-1'>Password</Label>
                                <Input name="Password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='••••••••' type='password' />
                            </div>

                            <div className="">
                                <Button type="submit" disabled={loading}>
                                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                                    Login
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default page