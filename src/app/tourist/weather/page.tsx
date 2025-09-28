
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Sunrise, Sunset, Wind, Droplets, Map, Siren } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const weatherData = {
    current: {
        temp: 24,
        condition: "Partly Cloudy",
        icon: <CloudSun className="h-16 w-16 text-yellow-400" />,
        feelsLike: 26,
        humidity: 60,
        windSpeed: 15,
        sunrise: "6:05 AM",
        sunset: "8:45 PM",
    },
    hourly: [
        { time: "3 PM", temp: 24 },
        { time: "4 PM", temp: 23 },
        { time: "5 PM", temp: 23 },
        { time: "6 PM", temp: 22 },
        { time: "7 PM", temp: 21 },
        { time: "8 PM", temp: 20 },
    ],
    safety: {
        crimeIndex: "Low",
        safetyScore: 92,
        advice: "Generally safe, but always be aware of your surroundings, especially at night."
    }
};

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "hsl(var(--primary))",
  },
}

export default function WeatherPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold">Weather & Safety</h1>
        <Card>
            <CardHeader>
                <CardTitle>Current Conditions - Paris, France</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex items-center gap-4">
                    {weatherData.current.icon}
                    <div>
                        <p className="text-5xl font-bold">{weatherData.current.temp}°C</p>
                        <p className="text-muted-foreground">{weatherData.current.condition}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2"><Droplets className="h-5 w-5 text-muted-foreground" /> <span>Humidity: {weatherData.current.humidity}%</span></div>
                    <div className="flex items-center gap-2"><Wind className="h-5 w-5 text-muted-foreground" /> <span>Wind: {weatherData.current.windSpeed} km/h</span></div>
                    <div className="flex items-center gap-2"><Sunrise className="h-5 w-5 text-muted-foreground" /> <span>Sunrise: {weatherData.current.sunrise}</span></div>
                    <div className="flex items-center gap-2"><Sunset className="h-5 w-5 text-muted-foreground" /> <span>Sunset: {weatherData.current.sunset}</span></div>
                </div>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Hourly Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="w-full h-48">
                    <BarChart accessibilityLayer data={weatherData.hourly}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="time"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="temp" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Siren className="h-5 w-5 text-destructive" /> Local Safety Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-3xl font-bold text-green-600">{weatherData.safety.crimeIndex}</p>
                        <p className="text-muted-foreground">Crime Index</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-primary">{weatherData.safety.safetyScore}/100</p>
                        <p className="text-muted-foreground">Area Safety Score</p>
                    </div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-md">
                    <p className="font-medium">Safety Advice</p>
                    <p className="text-sm text-muted-foreground">{weatherData.safety.advice}</p>
                </div>
                 <div className="text-center">
                    <Button variant="outline">
                        <Map className="mr-2"/>
                        View Crime Hotspots Map
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
