import { Phone, MapPin, Instagram, Facebook, MessageCircle, Clock, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      primary: "0706 353 012",
      secondary: "Available during business hours",
      href: "tel:+254706353012",
      color: "text-salon-gold"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "NGARA FIGTREE",
      secondary: "BHAVESH CENTER, Room G6",
      href: "#",
      color: "text-salon-pink"
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: "Mon-Fri: 9AM-7PM",
      secondary: "Sat: 9AM-6PM, Sun: Closed",
      href: "#",
      color: "text-salon-plum"
    }
  ];

  const socialMedia = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@beauty_bazaar",
      url: "https://www.instagram.com/_the_beauty_bazaar_",
      color: "text-pink-500 hover:text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100"
    },
    {
      icon: Facebook,
      name: "Facebook",
      handle: "/Beauty-Bazaar",
      url: "https://www.facebook.com/wachyra.franklyn",
      color: "text-blue-600 hover:text-blue-700",
      bgColor: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: MessageCircle,
      name: "TikTok",
      handle: "@_Beauty_bazaar_",
      url: "https://www.tiktok.com/@_Beauty_bazaar_",
      color: "text-black hover:text-gray-800",
      bgColor: "bg-gray-50 hover:bg-gray-100"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Contact form data:", formData);
    toast.success("Thank you for your message! We'll get back to you soon.");
    
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-salon-plum mb-2">Contact Us</h1>
        <p className="text-muted-foreground">We'd love to hear from you. Get in touch with us!</p>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <Card key={index} className="shadow-soft border-salon-pink/20 hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-salon-cream flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${contact.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-salon-plum mb-2">{contact.title}</h3>
                <p className="font-medium text-salon-plum mb-1">{contact.primary}</p>
                <p className="text-sm text-muted-foreground">{contact.secondary}</p>
                {contact.href !== "#" && (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-salon-gold hover:text-salon-gold/80 hover:bg-salon-cream"
                  >
                    <a href={contact.href}>Contact Now</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="shadow-soft border-salon-pink/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-salon-plum">
              <Mail className="w-5 h-5" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    className="border-salon-pink/30 focus:border-salon-gold"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="0706 353 012"
                    className="border-salon-pink/30 focus:border-salon-gold"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                  className="border-salon-pink/30 focus:border-salon-gold"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we help you?"
                  className="border-salon-pink/30 focus:border-salon-gold min-h-[120px]"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-salon-gold text-white hover:bg-salon-gold/90 shadow-soft"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Media & Additional Info */}
        <div className="space-y-6">
          {/* Social Media */}
          <Card className="shadow-soft border-salon-pink/20">
            <CardHeader>
              <CardTitle className="text-salon-plum">Follow Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialMedia.map((social, index) => {
                const Icon = social.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-salon-cream hover:shadow-soft transition-smooth">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${social.bgColor} flex items-center justify-center transition-colors`}>
                        <Icon className={`w-5 h-5 ${social.color} transition-colors`} />
                      </div>
                      <div>
                        <p className="font-medium text-salon-plum">{social.name}</p>
                        <p className="text-sm text-muted-foreground">{social.handle}</p>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-salon-gold hover:text-salon-gold/80"
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        Follow
                      </a>
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Map/Directions */}
          <Card className="shadow-soft border-salon-pink/20">
            <CardHeader>
              <CardTitle className="text-salon-plum">Find Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-salon-cream p-4 rounded-lg">
                <h4 className="font-semibold text-salon-plum mb-2">Beauty Bazaar Nail Salon</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Located in the heart of Ngara, easily accessible by public transport and with parking available nearby.
                </p>
                <address className="text-sm text-salon-plum not-italic">
                  <strong>NGARA FIGTREE</strong><br />
                  BHAVESH CENTER<br />
                  Room G6<br />
                  Nairobi, Kenya
                </address>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-salon-plum">Transportation</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Easy matatu access from CBD</li>
                  <li>• Walking distance from Ngara stage</li>
                  <li>• Parking available at Bhavesh Center</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Contact */}
      <Card className="bg-salon-rose shadow-soft border-salon-pink/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-salon-plum mb-2">Need Immediate Assistance?</h3>
          <p className="text-muted-foreground mb-4">
            For urgent booking changes or questions, call us directly during business hours.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-salon-plum text-white hover:bg-salon-plum/90 shadow-glow"
          >
            <a href="tel:+254706353012">
              <Phone className="w-4 h-4 mr-2" />
              Call Now: 0706 353 012
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;