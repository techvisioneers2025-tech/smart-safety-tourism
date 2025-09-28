
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle, MapPin, Bell, CloudSun, User, Calendar, MessageSquare, CheckCircle, ShieldCheck, Phone } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import ChatWidget from '@/components/ui/chat-widget';
import { Toaster } from '@/components/ui/toaster'; 
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';


// Mock data
const safetyScore = 88;
const alerts = [
  { id: 1, message: 'High pickpocketing activity reported in your area.', level: 'warning' },
  { id: 2, message: 'Severe thunderstorm warning issued for this evening.', level: 'danger' },
];

const itinerary = {
  destination: 'Bangalore, India',
  dates: '2024-08-15 to 2024-08-22',
  activities: [
    'Shivanasamudra Falls',
    'Hogenakkal Falls',
  ]
};

const weatherInfo = {
  temp: '22°C',
  condition: 'Partly Cloudy',
  crimeIndex: 'Low'
};

const userInfo = {
    name: 'codevisioneer',
    id: 'T-12345678',
    phone: '7993172762',
    nationality: 'Indian',
    avatar: 'https://github.com/shadcn.png'
}

export default function DashboardPage() {
  const [isLocationSharing, setIsLocationSharing] = useState(true);
  const [isEmergency, setIsEmergency] = useState(false);
  const { toast } = useToast();

  const handlePanicConfirm = () => {
    setIsEmergency(true);
    toast({
      title: "Emergency Alert Sent!",
      description: "Your emergency contacts and our support team have been notified.",
      variant: "destructive",
    })
  }

  const handleImSafe = () => {
    setIsEmergency(false);
    toast({
      title: "All Clear!",
      description: "Your emergency contacts have been notified that you are safe.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Toaster />
      <ChatWidget />

      <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-4 items-center">
        {isEmergency && (
          <div className="flex flex-col gap-2 items-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/tourist/emergency-chat">
                <MessageSquare className="mr-2"/>
                Chat with Support
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleImSafe}
            >
              <CheckCircle className="mr-2" />
              I'm Safe
            </Button>
          </div>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-24 h-24 flex flex-col items-center justify-center text-xl font-bold shadow-2xl animate-pulse"
            >
              <AlertTriangle className="h-8 w-8 mb-1" />
              SOS
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to send a distress signal?</AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately notify your emergency contacts and our support team with your current location. Only use this in a genuine emergency.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlePanicConfirm} className="bg-destructive hover:bg-destructive/90">Confirm Alert</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="overflow-hidden bg-secondary">
                <div className="p-4 bg-secondary">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="https://i.postimg.cc/sxTdr1YN/final-image-1.png"
                                alt="CitizEntry Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto"
                            />
                            <div>
                                <h2 className="font-bold text-lg text-primary">CitizEntry</h2>
                                <p className="text-xs text-muted-foreground">{itinerary.destination}</p>
                            </div>
                        </div>
                         <div className="relative h-8 flex items-center justify-center">
                            <div className="absolute right-0 h-full w-28 bg-yellow-400" style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 15% 50%)'}}></div>
                            <p className="z-10 text-black text-sm font-semibold pl-4">Tourist ID Card</p>
                        </div>
                    </div>
                    <Separator />
                     {/* Body Section */}
                    <div className="grid grid-cols-3 gap-4 pt-4 items-center">
                        <div className="col-span-1">
                             <Avatar className="h-28 w-28 border-4 border-card">
                                <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                                <AvatarFallback>
                                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="col-span-1 space-y-1">
                            <div>
                                <p className="text-xs font-semibold text-primary">Name</p>
                                <p className="font-bold text-sm">{userInfo.name}</p>
                            </div>
                             <div>
                                <p className="text-xs font-semibold text-primary">Tourist ID</p>
                                <p className="font-medium text-sm">{userInfo.id}</p>
                            </div>
                             <div>
                                <p className="text-xs font-semibold text-primary">Emergency Contact</p>
                                <p className="font-medium text-sm">{userInfo.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-primary">Nationality</p>
                                <p className="font-medium text-sm">{userInfo.nationality}</p>
                            </div>
                        </div>
                         <div className="col-span-1 flex justify-center items-center">
                            <Image
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${userInfo.id}`}
                                alt="QR Code"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>Trip Itinerary Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>{itinerary.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{itinerary.dates}</span>
                </div>
                <ul className="list-disc list-inside text-muted-foreground">
                    {itinerary.activities.map(activity => <li key={activity}>{activity}</li>)}
                </ul>
                </CardContent>
            </Card>
        </div>


        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Live Location</CardTitle>
                    <div className="flex items-center space-x-2">
                        <Switch
                        id="location-sharing"
                        checked={isLocationSharing}
                        onCheckedChange={setIsLocationSharing}
                        />
                        <Label htmlFor="location-sharing" className={isLocationSharing ? 'text-primary' : 'text-muted-foreground'}>
                        {isLocationSharing ? 'Sharing On' : 'Sharing Off'}
                        </Label>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5"/>
                        <span>Currently in: {itinerary.destination}</span>
                    </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-2 pt-6">
                        <CardTitle>Safety Score</CardTitle>
                        <div className="relative h-32 w-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                            className="text-secondary"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            />
                            <path
                            className="text-primary"
                            strokeDasharray={`${safetyScore}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-primary">
                            {safetyScore}
                        </div>
                        </div>
                        <p className="text-muted-foreground text-center text-xs">Based on your location and itinerary.</p>
                    </CardContent>
                </Card>
           </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5"/> Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                    {alerts.map(alert => (
                        <li key={alert.id} className={`flex items-start gap-4 p-4 rounded-md ${alert.level === 'danger' ? 'bg-destructive/10 text-destructive' : 'bg-yellow-500/10 text-yellow-600'}`}>
                        <AlertTriangle className="h-5 w-5 mt-1" />
                        <span>{alert.message}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CloudSun className="h-5 w-5" /> Weather & Safety Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-around text-center">
                    <div>
                        <p className="text-3xl font-bold">{weatherInfo.temp}</p>
                        <p className="text-muted-foreground">{weatherInfo.condition}</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-green-600">{weatherInfo.crimeIndex}</p>
                        <p className="text-muted-foreground">Crime Index</p>
                    </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
