"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export function LatestResults() {
  const [activeTab, setActiveTab] = useState("weekly");
  
  return (
    <section id="results" className="bg-muted/50 py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Latest Lottery Results</h2>
          <p className="mt-4 text-muted-foreground">Check if you're our newest winner</p>
        </div>
        
        <Tabs defaultValue="weekly" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="weekly">Weekly Draw</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Special</TabsTrigger>
              <TabsTrigger value="bumper">Eid Bumper</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="weekly" className="space-y-4">
            <ResultCard 
              title="Weekly Lottery Draw"
              date="June 10, 2025"
              numbers={[7, 14, 23, 31, 42, 56]}
              jackpot="৳2,50,00,000"
              winners={3}
            />
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <ResultCard 
              title="Monthly Special Draw"
              date="May 30, 2025"
              numbers={[3, 17, 22, 36, 41, 49]}
              jackpot="৳5,00,00,000"
              winners={1}
            />
          </TabsContent>
          
          <TabsContent value="bumper" className="space-y-4">
            <ResultCard 
              title="Eid-ul-Fitr Bumper Draw"
              date="April 15, 2025"
              numbers={[5, 13, 27, 34, 45, 58]}
              jackpot="৳10,00,00,000"
              winners={2}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface ResultCardProps {
  title: string;
  date: string;
  numbers: number[];
  jackpot: string;
  winners: number;
}

function ResultCard({ title, date, numbers, jackpot, winners }: ResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <CalendarDays className="mr-1 h-4 w-4" />
              {date}
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-sm">
            {winners} Winner{winners !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-3">
            {numbers.map((number, index) => (
              <div 
                key={index}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg"
              >
                {number}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">Jackpot Amount</p>
            <p className="text-2xl font-bold">{jackpot}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}