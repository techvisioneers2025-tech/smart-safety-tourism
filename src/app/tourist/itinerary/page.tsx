
'use client';

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash2, MapPin, Calendar, Clock, Edit3, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const itinerarySchema = z.object({
  location: z.string().min(1, 'Location is required'),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string().min(1, 'Time is required'),
  activity: z.string().min(1, 'Activity is required'),
});

type ItineraryItem = z.infer<typeof itinerarySchema> & { id: number };

const mockItinerary: ItineraryItem[] = [
    { id: 1, location: 'Eiffel Tower', date: new Date('2024-08-15'), time: '10:00', activity: 'Visit the summit' },
    { id: 2, location: 'Louvre Museum', date: new Date('2024-08-16'), time: '14:00', activity: 'See the Mona Lisa' },
];

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(mockItinerary);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof itinerarySchema>>({
    resolver: zodResolver(itinerarySchema),
    defaultValues: {
        location: '',
        date: undefined,
        time: '',
        activity: '',
    },
  });

  const onSubmit = (data: z.infer<typeof itinerarySchema>) => {
    const newItem = { ...data, id: Date.now() };
    setItinerary([...itinerary, newItem]);
    toast({
      title: 'Itinerary item added!',
      description: `${data.activity} at ${data.location} has been added to your plan.`,
    });
    form.reset();
    setIsFormOpen(false);
  };

  const deleteItem = (id: number) => {
    setItinerary(itinerary.filter(item => item.id !== id));
    toast({
      title: 'Itinerary item removed.',
      variant: 'destructive',
    });
  };
  
  const handleShare = () => {
    toast({
        title: "Itinerary Shared!",
        description: "A copy of your itinerary has been sent to your emergency contacts."
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Itinerary</h1>
        <div className="flex gap-2">
            <Button onClick={() => setIsFormOpen(!isFormOpen)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isFormOpen ? 'Cancel' : 'Add New Item'}
            </Button>
            <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Itinerary
            </Button>
        </div>
      </div>

      {isFormOpen && (
        <Card>
            <CardHeader>
                <CardTitle>Add a New Itinerary Item</CardTitle>
                <CardDescription>Plan your next activity.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Eiffel Tower" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="activity"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Sightseeing" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date(new Date().setDate(new Date().getDate() - 1))
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                    <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Add to Itinerary</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {itinerary.length > 0 ? (
            itinerary.sort((a,b) => a.date.getTime() - b.date.getTime() || a.time.localeCompare(b.time)).map((item) => (
                <Card key={item.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Edit3 className="h-4 w-4 text-primary" /> {item.activity}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.location}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {format(item.date, "PPP")}</span>
                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {item.time}</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                        <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                    </CardContent>
                </Card>
            ))
        ) : (
          <Card className="text-center p-8">
            <p className="text-muted-foreground">Your itinerary is empty. Add a new item to get started!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
