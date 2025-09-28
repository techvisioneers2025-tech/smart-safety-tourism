
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, ChevronsUpDown, LogOut, MapPin, Search, Shield, Users, TrendingUp, BarChart2, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState, useEffect } from "react";


const safetyScoreData = [
    { time: "12 AM", score: 92 },
    { time: "3 AM", score: 91 },
    { time: "6 AM", score: 93 },
    { time: "9 AM", score: 95 },
    { time: "12 PM", score: 94 },
    { time: "3 PM", score: 91 },
    { time: "6 PM", score: 88 },
    { time: "9 PM", score: 89 },
];

const anomalyData = [
    { name: "Route Deviation", count: 12 },
    { name: "Location Drop", count: 8 },
    { name: "Prolonged Inactivity", count: 5 },
    { name: "SOS Alert", count: 2 },
];

const activeAlerts = [
    { id: 'T-4532', type: 'Panic Button', location: 'Eiffel Tower', time: '2 min ago', status: 'critical' },
    { id: 'T-8921', type: 'Anomaly Detection', location: 'Louvre Museum', time: '15 min ago', status: 'warning' },
    { id: 'T-1234', type: 'Geo-fence Entry', location: 'Restricted Zone A', time: '32 min ago', status: 'warning' },
];

const sosUsers = [
    { id: 'T-4532', name: 'Alice Johnson', location: 'Eiffel Tower', time: '2 min ago' },
];

export default function AuthorityDashboard() {
    const [isSosAlertOpen, setIsSosAlertOpen] = useState(false);

    useEffect(() => {
        // Automatically open the SOS dialog if there are active SOS alerts
        if (sosUsers.length > 0) {
            setIsSosAlertOpen(true);
        }
    }, []);


    return (
        <div className="flex flex-col min-h-dvh bg-secondary/30">
            <AlertDialog open={isSosAlertOpen} onOpenChange={setIsSosAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                        <ShieldAlert className="h-8 w-8" />
                        CRITICAL SOS ALERT
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        The following users have activated their SOS panic button and require immediate assistance.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4">
                        {sosUsers.map(user => (
                            <div key={user.id} className="p-4 rounded-lg bg-destructive/10 border border-destructive/50">
                                <p className="font-bold text-lg">{user.name} (ID: {user.id})</p>
                                <p><strong>Location:</strong> {user.location}</p>
                                <p><strong>Time:</strong> {user.time}</p>
                            </div>
                        ))}
                    </div>
                    <AlertDialogAction onClick={() => setIsSosAlertOpen(false)} className="bg-destructive hover:bg-destructive/90">
                        Acknowledge & View Dashboard
                    </AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>

            <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-20">
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                        <Image
                        src="https://i.postimg.cc/sxTdr1YN/final-image-1.png"
                        alt="CitizEntry Logo"
                        width={32}
                        height={32}
                        className="h-8 w-auto"
                        />
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold text-primary">Authority Dashboard</h1>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:block text-right">
                        <p className="font-semibold">Officer John Doe</p>
                        <p className="text-sm text-muted-foreground">Police Department</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                     <Button variant="outline" size="icon" asChild>
                        <Link href="/authority/login">
                            <LogOut className="h-5 w-5"/>
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Top Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Users className="text-primary"/>Total Tourists</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">1,432</p>
                                <p className="text-sm text-muted-foreground">+2% from last hour</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Bell className="text-destructive"/>Active Alerts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">3</p>
                                <p className="text-sm text-muted-foreground">1 Critical, 2 Warnings</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><MapPin className="text-green-500"/>Resources Deployed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">12</p>
                                <p className="text-sm text-muted-foreground">Units on patrol</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Interactive Map */}
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Real-Time Tourist Map</CardTitle>
                            <CardDescription>Heatmap of tourist density and active incidents.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[500px] relative">
                             <Image
                                src="https://developers.google.com/static/maps/images/landing/react-codelab-thumbnail.png"
                                layout="fill"
                                objectFit="cover"
                                alt="Real-time map of tourist locations"
                                className="rounded-md"
                                data-ai-hint="map data points"
                             />
                              <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-md text-xs space-y-2">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div>Safe</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div>Elevated Risk</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div>High Risk</div>
                            </div>
                        </CardContent>
                    </Card>

                     {/* Analytics */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><TrendingUp/>Safety Score Trends (24h)</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={safetyScoreData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" fontSize={12} />
                                        <YAxis domain={[80, 100]} fontSize={12} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><BarChart2/>Anomaly Trends</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64">
                               <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={anomalyData}>
                                         <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" fontSize={10} interval={0} angle={-30} textAnchor="end" height={50}/>
                                        <YAxis fontSize={12}/>
                                        <Tooltip />
                                        <Bar dataKey="count" fill="hsl(var(--accent))" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                
                {/* Right Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tourist Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                <Input placeholder="Search Tourist ID or Name..." className="pl-10"/>
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="missing">Missing</SelectItem>
                                    <SelectItem value="safe">Safe</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Active Alerts & Incidents</CardTitle>
                            <CardDescription>Chronological feed of recent alerts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeAlerts.map(alert => (
                                        <TableRow key={alert.id} className={alert.status === 'critical' ? 'bg-destructive/10' : ''}>
                                            <TableCell>
                                                <p className="font-medium">{alert.id}</p>
                                                <p className="text-xs text-muted-foreground">{alert.time}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{alert.type}</p>
                                                <p className="text-xs text-muted-foreground">{alert.location}</p>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm">Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );

}
