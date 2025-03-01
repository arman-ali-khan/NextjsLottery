"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, CreditCard, Ticket, Clock, Calendar, Edit, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // Mock user data
  const userData = {
    name: "Rahim Ahmed",
    email: userEmail || "rahim.ahmed@example.com",
    phone: "+880 1712-345678",
    address: "123 Green Road, Dhaka 1205, Bangladesh",
    joinDate: "January 15, 2023",
    tickets: [
      { id: "TK-2025-0612-1234", drawDate: "June 12, 2025", numbers: [7, 14, 23, 31, 42, 56], status: "active" },
      { id: "TK-2025-0605-5678", drawDate: "June 5, 2025", numbers: [3, 12, 24, 33, 45, 52], status: "active" },
      { id: "TK-2025-0529-9012", drawDate: "May 29, 2025", numbers: [5, 18, 22, 37, 41, 59], status: "drawn", result: "no win" },
      { id: "TK-2025-0522-3456", drawDate: "May 22, 2025", numbers: [2, 11, 19, 27, 38, 44], status: "drawn", result: "won", prize: "৳5,000" },
    ],
    transactions: [
      { id: "TR-2025-0612", date: "June 12, 2025", type: "Purchase", amount: "৳500", status: "completed" },
      { id: "TR-2025-0605", date: "June 5, 2025", type: "Purchase", amount: "৳500", status: "completed" },
      { id: "TR-2025-0529", date: "May 29, 2025", type: "Purchase", amount: "৳500", status: "completed" },
      { id: "TR-2025-0522", date: "May 22, 2025", type: "Purchase", amount: "৳500", status: "completed" },
      { id: "TR-2025-0523", date: "May 23, 2025", type: "Withdrawal", amount: "৳5,000", status: "completed" },
    ]
  };

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    
    setIsLoggedIn(loggedIn);
    if (email) setUserEmail(email);
    
    if (!loggedIn) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    router.push("/");
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
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card className="border-2">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto border-4 border-primary">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{userData.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Mail className="h-3 w-3" />
                  {userData.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{userData.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>Member since {userData.joinDate}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="tickets" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              {/* Tickets tab */}
              <TabsContent value="tickets" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Lottery Tickets</h2>
                 <Link href={'/buy-tickets'}>
                 <Button>
                    <Ticket className="mr-2 h-4 w-4" />
                    Buy New Tickets
                  </Button>
                  </Link>
                </div>
                
                {userData.tickets.map((ticket) => (
                  <Card key={ticket.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{ticket.id}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              Draw Date: {ticket.drawDate}
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            {ticket.status === "active" && (
                              <Badge className="bg-green-500">Active</Badge>
                            )}
                            {ticket.status === "drawn" && !ticket.result && (
                              <Badge variant="outline">Drawn</Badge>
                            )}
                            {ticket.status === "drawn" && ticket.result === "no win" && (
                              <Badge variant="secondary">No Win</Badge>
                            )}
                            {ticket.status === "drawn" && ticket.result === "won" && (
                              <Badge className="bg-amber-500">Winner - {ticket.prize}</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {ticket.numbers.map((number, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold"
                            >
                              {number}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              {/* Transactions tab */}
              <TabsContent value="transactions" className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Transaction ID</th>
                            <th className="text-left py-3 px-2">Date</th>
                            <th className="text-left py-3 px-2">Type</th>
                            <th className="text-left py-3 px-2">Amount</th>
                            <th className="text-left py-3 px-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b">
                              <td className="py-3 px-2 font-medium">{transaction.id}</td>
                              <td className="py-3 px-2">{transaction.date}</td>
                              <td className="py-3 px-2">
                                {transaction.type === "Purchase" ? (
                                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                                    Purchase
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                    Withdrawal
                                  </Badge>
                                )}
                              </td>
                              <td className="py-3 px-2">{transaction.amount}</td>
                              <td className="py-3 px-2">
                                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                  {transaction.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings tab */}
              <TabsContent value="settings" className="space-y-4 mt-6">
                <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={userData.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={userData.address} />
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center p-4 border rounded-md">
                      <CreditCard className="h-10 w-10 text-primary mr-4" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                      </div>
                      <Badge className="ml-auto">Default</Badge>
                    </div>
                    <Button variant="outline">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}