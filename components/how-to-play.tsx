import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, ShoppingCart, Search, Trophy } from "lucide-react";

export function HowToPlay() {
  return (
    <section id="how-to-play" className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">How to Play</h2>
        <p className="mt-4 text-muted-foreground">Simple steps to participate in Bangladesh Lottery</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StepCard 
          icon={<ShoppingCart className="h-10 w-10" />}
          title="Buy a Ticket"
          description="Purchase tickets online or from authorized retailers across Bangladesh."
          step={1}
        />
        
        <StepCard 
          icon={<Ticket className="h-10 w-10" />}
          title="Choose Your Numbers"
          description="Select 6 numbers from 1-59 or opt for a Quick Pick for random selection."
          step={2}
        />
        
        <StepCard 
          icon={<Search className="h-10 w-10" />}
          title="Check Results"
          description="Watch the live draw on TV or check results online and in newspapers."
          step={3}
        />
        
        <StepCard 
          icon={<Trophy className="h-10 w-10" />}
          title="Claim Your Prize"
          description="If you win, claim your prize within 60 days at any official center."
          step={4}
        />
      </div>
    </section>
  );
}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}

function StepCard({ icon, title, description, step }: StepCardProps) {
  return (
    <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors">
      <div className="absolute top-0 right-0 bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-bold rounded-bl-lg">
        {step}
      </div>
      <CardHeader>
        <div className="text-primary">{icon}</div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}