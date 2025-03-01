import Link from "next/link";
import { Ticket, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer id="contact" className="bg-muted/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Ticket className="h-6 w-6 text-primary" />
              <span className="font-bold">Bangladesh Lottery</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              The official national lottery of Bangladesh. Changing lives since 2010.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
              </li>
              <li>
                <Link href="#results" className="text-muted-foreground hover:text-primary">Results</Link>
              </li>
              <li>
                <Link href="#how-to-play" className="text-muted-foreground hover:text-primary">How to Play</Link>
              </li>
              <li>
                <Link href="#winners" className="text-muted-foreground hover:text-primary">Winners</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">FAQs</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Responsible Gaming</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Claim Process</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Security</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Bangladesh Lottery Commission, 123 Lottery Tower, Dhaka 1000, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">+880 2 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">info@bangladeshlottery.gov.bd</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bangladesh National Lottery. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Must be 18 or older to play. Please play responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}