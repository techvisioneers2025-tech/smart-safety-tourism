
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UploadCloud, Phone, KeyRound, Camera, Video, VideoOff, Check, X } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';


const steps = [
  { id: '01', name: 'Personal Information' },
  { id: '02', name: 'Create Account' },
  { id: '03', name: 'Document Upload' },
  { id: '04', name: 'Emergency Contact' },
];

const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  nationality: z.string().min(1, 'Nationality is required'),
});

const accountSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const documentSchema = z.object({
  document: z.any().refine(files => files?.length >= 1, 'File is required.'),
});

const emergencyContactSchema = z.object({
  emergencyNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
});

const formSchema = personalInfoSchema.merge(accountSchema).merge(documentSchema).merge(emergencyContactSchema);

type FormData = z.infer<typeof formSchema>;

export default function TouristRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const form = useForm<FormData>({
    resolver: zodResolver(
      currentStep === 0
        ? personalInfoSchema
        : currentStep === 1
        ? accountSchema
        : currentStep === 2
        ? documentSchema
        : emergencyContactSchema
    ),
    mode: "onChange",
    defaultValues: {
      fullName: '',
      nationality: '',
      email: '',
      password: '',
      confirmPassword: '',
      document: undefined,
      emergencyNumber: '',
    },
  });
  
  const uploadedFile = form.watch('document');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCapturedImage(null);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      toast({
        variant: 'destructive',
        title: 'Camera access denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleConfirmCapture = () => {
    if (capturedImage) {
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'capture.png', { type: 'image/png' });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          form.setValue('document', dataTransfer.files, { shouldValidate: true });
          setIsCameraOpen(false);
          setCapturedImage(null);
        });
    }
  };
  
   const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const onCameraOpenChange = (open: boolean) => {
    setIsCameraOpen(open);
    if (open) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
    }
  }


  const onSubmit = async (data: Partial<FormData>) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    } else {
      const auth = getAuth(app);
      const { email, password } = form.getValues();
      try {
        await createUserWithEmailAndPassword(auth, email!, password!);
        console.log('Form Submitted', form.getValues());
        toast({
          title: "Registration Successful!",
          description: "Your account has been created. Redirecting...",
        });
        router.push('/tourist/dashboard');
      } catch (error: any) {
        console.error("Firebase Auth Error", error);
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.message,
        });
      }
    }
  };
  
  const onBack = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const getDocumentPreview = () => {
    if (uploadedFile && uploadedFile.length > 0) {
        const file = uploadedFile[0];
        if (file.type.startsWith('image/')) {
            return <Image src={URL.createObjectURL(file)} alt="Preview" width={100} height={100} className="mt-2 rounded-md object-contain" />;
        }
        return <p className="text-sm text-primary mt-2">{file.name}</p>;
    }
    return null;
};


  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-secondary/20 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-primary">{`Step ${currentStep + 1}: ${steps[currentStep].name}`}</h2>
            <span className="text-sm text-muted-foreground">{currentStep + 1} of {steps.length}</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary font-headline">
                Tourist Registration
              </span>
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="inline-block mr-1 h-4 w-4" />
                Back to Home
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your nationality" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                 {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                             <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                <Input type="password" placeholder="Create a password" {...field} className="pl-10"/>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                             <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                <Input type="password" placeholder="Confirm your password" {...field} className="pl-10"/>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                {currentStep === 2 && (
                  <FormField
                    control={form.control}
                    name="document"
                    render={({ field: {onChange, value, ...rest} }) => (
                      <FormItem>
                        <FormLabel>Aadhaar/Passport</FormLabel>
                        <FormControl>
                           <div className="space-y-4">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                            {uploadedFile && uploadedFile.length > 0 ? (
                                                <div className="text-center">
                                                    {getDocumentPreview()}
                                                    <p className="text-xs text-muted-foreground mt-2">Click or drag to replace</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-muted-foreground">PDF, PNG, JPG or GIF</p>
                                                </>
                                            )}
                                        </div>
                                        <Input id="dropzone-file" type="file" className="hidden" onChange={(e) => onChange(e.target.files)} {...rest} accept="image/png, image/jpeg, image/gif, application/pdf" />
                                    </label>
                                </div>

                                <Dialog open={isCameraOpen} onOpenChange={onCameraOpenChange}>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="outline" className="w-full">
                                            <Camera className="mr-2 h-4 w-4" />
                                            Capture with Camera
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[625px]">
                                        <DialogHeader>
                                            <DialogTitle>Camera Capture</DialogTitle>
                                        </DialogHeader>
                                        <div className="my-4 relative">
                                          {capturedImage ? (
                                            <Image src={capturedImage} alt="Captured" width={600} height={450} className="rounded-md" />
                                          ) : (
                                            <video ref={videoRef} autoPlay playsInline className="w-full rounded-md aspect-video bg-black" />
                                          )}
                                           <canvas ref={canvasRef} className="hidden" />
                                        </div>
                                        <DialogFooter>
                                            {capturedImage ? (
                                                <div className='flex justify-between w-full'>
                                                    <Button onClick={handleRetake} variant="outline">
                                                        <X className="mr-2 h-4 w-4" /> Retake
                                                    </Button>
                                                    <Button onClick={handleConfirmCapture}>
                                                        <Check className="mr-2 h-4 w-4" /> Confirm
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button onClick={handleCapture}>
                                                    <Camera className="mr-2 h-4 w-4" /> Capture Photo
                                                </Button>
                                            )}
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                 {currentStep === 3 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="emergencyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                <Input placeholder="Enter emergency contact number" {...field} className="pl-10"/>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={onBack} disabled={currentStep === 0}>
                    Back
                  </Button>
                  <Button type="submit" variant="default" disabled={!form.formState.isValid}>
                    {currentStep === steps.length - 1 ? 'Finish & Login' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    