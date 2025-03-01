import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Banknote, Calendar } from "lucide-react";

export function LotteryStats() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Bangladesh Lottery in Numbers</h2>
        <p className="mt-4 text-muted-foreground">Our impact across the nation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-2xl">
              <Trophy className="mr-2 h-5 w-5 text-chart-1" />
              Winners
            </CardTitle>
            <CardDescription>Total lottery winners</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12,500+</p>
            <p className="text-sm text-muted-foreground mt-1">Since our inception</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-2xl">
              <Banknote className="mr-2 h-5 w-5 text-chart-2" />
              Prize Money
            </CardTitle>
            <CardDescription>Total awarded</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">৳500 Crore+</p>
            <p className="text-sm text-muted-foreground mt-1">Life-changing prizes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-2xl">
              <Users className="mr-2 h-5 w-5 text-chart-3" />
              Participants
            </CardTitle>
            <CardDescription>Active players</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">2.5 Million+</p>
            <p className="text-sm text-muted-foreground mt-1">Monthly participants</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-2xl">
              <Calendar className="mr-2 h-5 w-5 text-chart-4" />
              Draws
            </CardTitle>
            <CardDescription>Regular drawings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">520+</p>
            <p className="text-sm text-muted-foreground mt-1">Successful draws</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}