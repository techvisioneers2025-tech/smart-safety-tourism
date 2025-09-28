
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, Info, ShieldAlert } from "lucide-react";

const alerts = [
  { id: 1, type: 'danger', title: 'High Crime Alert', message: 'A significant increase in pickpocketing has been reported in your current area. Please be vigilant.', time: '2h ago' },
  { id: 2, type: 'warning', title: 'Weather Warning', message: 'A severe thunderstorm is expected in your area around 8 PM. Seek shelter and avoid open spaces.', time: '4h ago' },
  { id: 3, type: 'info', title: 'Itinerary Update', message: 'Your planned visit to the Eiffel Tower has been rescheduled to 4 PM due to a local event.', time: '1d ago' },
   { id: 4, type: 'danger', title: 'Security Threat', message: 'A protest is scheduled near your location. Avoid the area around Champs-Élysées.', time: '2d ago' },
];

const alertIcons = {
    danger: <ShieldAlert className="h-6 w-6 text-destructive" />,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />
};

const alertColors = {
    danger: 'border-destructive/50 bg-destructive/5',
    warning: 'border-yellow-500/50 bg-yellow-500/5',
    info: 'border-blue-500/50 bg-blue-500/5'
};


export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell />
            Alerts & Notifications
        </h1>
      </div>
      
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <Card key={alert.id} className={alertColors[alert.type as keyof typeof alertColors]}>
              <CardContent className="p-4 flex items-start gap-4">
                <div>{alertIcons[alert.type as keyof typeof alertIcons]}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-muted-foreground mt-1">{alert.message}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center p-8">
            <p className="text-muted-foreground">You have no new alerts.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
