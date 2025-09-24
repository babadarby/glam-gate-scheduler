import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const services = [
    { id: "manicure", name: "Classic Manicure", price: 35, duration: "45 min" },
    { id: "gel", name: "Gel Polish", price: 45, duration: "60 min" },
    { id: "acrylic", name: "Acrylic Extensions", price: 65, duration: "90 min" },
    { id: "pedicure", name: "Spa Pedicure", price: 50, duration: "60 min" },
    { id: "nail-art", name: "Nail Art Design", price: 25, duration: "30 min" },
    { id: "french", name: "French Manicure", price: 40, duration: "50 min" },
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const selectedServiceDetails = services.find(s => s.id === selectedService);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedService || !selectedTime || !customerInfo.name || !customerInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically send the data to your backend
    const bookingData = {
      date: selectedDate,
      service: selectedService,
      time: selectedTime,
      customer: customerInfo,
      price: selectedServiceDetails?.price
    };

    console.log("Booking data:", bookingData);
    toast.success("Booking confirmed! We'll contact you soon to confirm details.");
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedService("");
    setSelectedTime("");
    setCustomerInfo({ name: "", phone: "", email: "", notes: "" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-salon-plum mb-2">Book Your Appointment</h1>
        <p className="text-muted-foreground">Choose your perfect nail service and preferred time</p>
      </div>

      <form onSubmit={handleBooking} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Selection */}
          <Card className="shadow-soft border-salon-pink/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-salon-plum">
                <User className="w-5 h-5" />
                Select Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-smooth hover:shadow-soft",
                      selectedService === service.id
                        ? "border-salon-gold bg-salon-cream shadow-soft"
                        : "border-salon-pink/30 hover:border-salon-pink/50"
                    )}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-salon-plum">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                      <span className="font-semibold text-salon-gold">${service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Date & Time Selection */}
          <Card className="shadow-soft border-salon-pink/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-salon-plum">
                <Calendar className="w-5 h-5" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Picker */}
              <div className="space-y-2">
                <Label>Appointment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-salon-pink/30",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <Label>Available Times</Label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "text-xs",
                        selectedTime === time
                          ? "bg-salon-gold text-white"
                          : "border-salon-pink/30 text-salon-plum hover:bg-salon-cream"
                      )}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Information */}
        <Card className="shadow-soft border-salon-pink/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-salon-plum">
              <User className="w-5 h-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="border-salon-pink/30 focus:border-salon-gold"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="0706 353 012"
                  className="border-salon-pink/30 focus:border-salon-gold"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                placeholder="your.email@example.com"
                className="border-salon-pink/30 focus:border-salon-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Special Requests</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                placeholder="Any special requests or preferences..."
                className="border-salon-pink/30 focus:border-salon-gold"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedServiceDetails && selectedDate && selectedTime && (
          <Card className="bg-salon-cream border-salon-gold shadow-elegant">
            <CardHeader>
              <CardTitle className="text-salon-plum">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="font-medium">{selectedServiceDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{format(selectedDate, "PPP")}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{selectedServiceDetails.duration}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-salon-plum pt-2 border-t border-salon-gold/30">
                <span>Total:</span>
                <span>${selectedServiceDetails.price}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-salon-gold text-white hover:bg-salon-gold/90 shadow-glow px-8"
          >
            Confirm Booking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Booking;