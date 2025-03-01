"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Ticket, CalendarDays, RefreshCw, CreditCard, Wallet, Clock, Loader2 } from "lucide-react";

export default function BuyTicketsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Available lottery draws
  const draws = [
    {
      id: "weekly",
      name: "Weekly Draw",
      date: "June 19, 2025",
      time: "7:00 PM",
      price: 500,
      jackpot: "৳2,50,00,000",
    },
    {
      id: "monthly",
      name: "Monthly Special",
      date: "June 30, 2025",
      time: "8:00 PM",
      price: 1000,
      jackpot: "৳5,00,00,000",
    },
    {
      id: "bumper",
      name: "Eid-ul-Adha Bumper",
      date: "July 15, 2025",
      time: "9:00 PM",
      price: 2000,
      jackpot: "৳10,00,00,000",
    },
  ];

  const [selectedDraw, setSelectedDraw] = useState(draws[0]);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  const handleNumberSelection = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else {
      if (selectedNumbers.length < 6) {
        setSelectedNumbers([...selectedNumbers, number]);
      } else {
        toast({
          title: "Maximum numbers selected",
          description: "You can only select 6 numbers per ticket",
          variant: "destructive",
        });
      }
    }
  };

  const generateRandomNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const randomNum = Math.floor(Math.random() * 59) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b));
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setTicketQuantity(value);
    }
  };

  const handleDrawSelection = (drawId: string) => {
    const draw = draws.find(d => d.id === drawId);
    if (draw) {
      setSelectedDraw(draw);
    }
  };

  const handlePurchase = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to purchase tickets",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (selectedNumbers.length < 6) {
      toast({
        title: "Incomplete selection",
        description: "Please select 6 numbers or use Quick Pick",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate API call for ticket purchase
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Purchase successful!",
        description: `You have purchased ${ticketQuantity} ticket(s) for the ${selectedDraw.name}`,
      });
      router.push("/profile");
    }, 2000);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Buy Lottery Tickets</h1>
          <p className="text-muted-foreground mt-2">Select your lucky numbers and try your chance to win big!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Lottery selection */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Select Lottery Draw</CardTitle>
                <CardDescription>Choose which lottery draw you want to enter</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly" onValueChange={handleDrawSelection}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="bumper">Bumper</TabsTrigger>
                  </TabsList>
                  
                  {draws.map((draw) => (
                    <TabsContent key={draw.id} value={draw.id} className="space-y-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                        <div>
                          <h3 className="text-xl font-bold">{draw.name}</h3>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            {draw.date} at {draw.time}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Badge className="text-lg px-3 py-1">Jackpot: {draw.jackpot}</Badge>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-2">Select 6 numbers (1-59)</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {[...Array(59)].map((_, i) => {
                            const number = i + 1;
                            const isSelected = selectedNumbers.includes(number);
                            return (
                              <button
                                key={number}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                                  isSelected 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                                onClick={() => handleNumberSelection(number)}
                              >
                                {number}
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" onClick={generateRandomNumbers}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Quick Pick
                          </Button>
                          <Button variant="outline" onClick={clearSelection}>
                            Clear
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="quantity">Number of Tickets</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => ticketQuantity > 1 && setTicketQuantity(ticketQuantity - 1)}
                            >
                              -
                            </Button>
                            <Input 
                              id="quantity" 
                              type="number" 
                              min="1" 
                              max="10" 
                              value={ticketQuantity} 
                              onChange={handleQuantityChange}
                              className="w-20 text-center"
                            />
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => ticketQuantity < 10 && setTicketQuantity(ticketQuantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Payment Method</Label>
                          <RadioGroup 
                            value={paymentMethod} 
                            onValueChange={setPaymentMethod}
                            className="flex flex-col space-y-2 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Credit/Debit Card
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="bkash" id="bkash" />
                              <Label htmlFor="bkash" className="flex items-center">
                                <Wallet className="h-4 w-4 mr-2" />
                                bKash
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="nagad" id="nagad" />
                              <Label htmlFor="nagad" className="flex items-center">
                                <Wallet className="h-4 w-4 mr-2" />
                                Nagad
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Order summary */}
          <div>
            <Card className="border-2 sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your lottery ticket purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Draw:</span>
                    <span className="font-medium">{selectedDraw.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Draw Date:</span>
                    <span>{selectedDraw.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket Price:</span>
                    <span>৳{selectedDraw.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span>{ticketQuantity}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium mb-2">Selected Numbers:</div>
                  {selectedNumbers.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedNumbers.map((number) => (
                        <div 
                          key={number}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold"
                        >
                          {number}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No numbers selected yet
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>৳{(selectedDraw.price * ticketQuantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee:</span>
                    <span>৳{(selectedDraw.price * ticketQuantity * 0.02).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>৳{(selectedDraw.price * ticketQuantity * 1.02).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  Ticket sales close 1 hour before the draw
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePurchase}
                  disabled={selectedNumbers.length < 6 || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Ticket className="mr-2 h-4 w-4" />
                      Buy Tickets Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}