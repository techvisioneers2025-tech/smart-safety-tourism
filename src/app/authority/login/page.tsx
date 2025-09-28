
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Eye, EyeOff, Building, KeyRound, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AuthorityLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to verify credentials would go here
    setStep('mfa');
  };
  
  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to verify MFA code would go here
    // On success, redirect to dashboard
    console.log("Login Successful");
    router.push('/authority/dashboard');
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary/20 p-4">
       <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-12 max-w-6xl w-full">
        <div className="hidden lg:flex flex-col items-center text-center">
             <Image
                src="https://i.postimg.cc/sxTdr1YN/final-image-1.png"
                alt="CitizEntry Logo"
                width={128}
                height={128}
                className="h-32 w-auto animate-pulse"
             />
            <h1 className="text-4xl font-bold mt-4 text-primary">Smart Travel Safety</h1>
            <p className="text-muted-foreground mt-2">Secure access for authorized personnel.</p>
        </div>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Authority Login</CardTitle>
            <CardDescription>
                {step === 'credentials' ? 'Enter your credentials to proceed.' : 'Enter the code sent to your device.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'credentials' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username/ID</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                    <Input id="username" placeholder="Enter your official ID" required className="pl-10"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                     <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className="pl-10"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground"/> : <Eye className="h-5 w-5 text-muted-foreground"/>}
                    </button>
                  </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select required>
                        <SelectTrigger id="department" className="w-full">
                            <div className="flex items-center">
                                <Building className="h-5 w-5 text-muted-foreground mr-2"/>
                                <SelectValue placeholder="Select your department" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="police">Police</SelectItem>
                            <SelectItem value="tourism">Tourism Department</SelectItem>
                            <SelectItem value="health">Health Services</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="captcha" required />
                    <Label htmlFor="captcha" className="text-sm">I'm not a robot</Label>
                 </div>
                <Button type="submit" className="w-full">Login</Button>
                <div className="text-center text-sm">
                  <Link href="#" className="text-primary hover:underline">Forgot Password?</Link>
                </div>
              </form>
            )}

            {step === 'mfa' && (
               <form onSubmit={handleMfaSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mfa-code">Authentication Code</Label>
                  <Input id="mfa-code" placeholder="Enter 6-digit code" required />
                </div>
                <Button type="submit" className="w-full">Verify</Button>
                 <div className="text-center text-sm">
                    <p className="text-muted-foreground">Session will time out in 15 minutes.</p>
                 </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
