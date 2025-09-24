import { useState } from "react";
import { Plus, Edit2, Trash2, Calendar, Users, Scissors, Clock, Phone, Mail, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Admin = () => {
  // Mock data - in real app this would come from backend
  const [services, setServices] = useState([
    { id: "1", name: "Classic Manicure", price: 35, duration: 45, description: "Professional nail care and polish" },
    { id: "2", name: "Gel Polish", price: 45, duration: 60, description: "Long-lasting gel polish application" },
    { id: "3", name: "Acrylic Extensions", price: 65, duration: 90, description: "Full set acrylic nail extensions" },
    { id: "4", name: "Spa Pedicure", price: 50, duration: 60, description: "Relaxing foot care treatment" },
    { id: "5", name: "Nail Art Design", price: 25, duration: 30, description: "Custom nail art and designs" },
  ]);

  const [bookings, setBookings] = useState([
    { id: "1", clientName: "Sarah Johnson", service: "Gel Polish", date: "2024-01-15", time: "10:00 AM", status: "confirmed", phone: "555-0123" },
    { id: "2", clientName: "Emma Wilson", service: "Acrylic Extensions", date: "2024-01-15", time: "2:00 PM", status: "pending", phone: "555-0124" },
    { id: "3", clientName: "Lisa Brown", service: "Classic Manicure", date: "2024-01-16", time: "11:00 AM", status: "confirmed", phone: "555-0125" },
    { id: "4", clientName: "Amy Davis", service: "Spa Pedicure", date: "2024-01-16", time: "3:00 PM", status: "completed", phone: "555-0126" },
  ]);

  const [clients, setClients] = useState([
    { id: "1", name: "Sarah Johnson", phone: "555-0123", email: "sarah@example.com", totalVisits: 5, lastVisit: "2024-01-10", preferences: "Gel polish, neutral colors" },
    { id: "2", name: "Emma Wilson", phone: "555-0124", email: "emma@example.com", totalVisits: 3, lastVisit: "2024-01-08", preferences: "Acrylic extensions, bold designs" },
    { id: "3", name: "Lisa Brown", phone: "555-0125", email: "lisa@example.com", totalVisits: 8, lastVisit: "2024-01-12", preferences: "Classic manicure, French tips" },
    { id: "4", name: "Amy Davis", phone: "555-0126", email: "amy@example.com", totalVisits: 2, lastVisit: "2024-01-05", preferences: "Spa treatments, relaxing atmosphere" },
  ]);

  const [newService, setNewService] = useState({ name: "", price: "", duration: "", description: "" });
  const [editingService, setEditingService] = useState<any>(null);

  const handleAddService = () => {
    if (!newService.name || !newService.price || !newService.duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    const service = {
      id: Date.now().toString(),
      name: newService.name,
      price: parseInt(newService.price),
      duration: parseInt(newService.duration),
      description: newService.description
    };

    setServices([...services, service]);
    setNewService({ name: "", price: "", duration: "", description: "" });
    toast.success("Service added successfully");
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    setServices(services.map(s => s.id === editingService.id ? editingService : s));
    setEditingService(null);
    toast.success("Service updated successfully");
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast.success("Service deleted successfully");
  };

  const updateBookingStatus = (id: string, status: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    toast.success(`Booking ${status}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-salon-gold text-white";
      case "pending": return "bg-yellow-500 text-white";
      case "completed": return "bg-green-500 text-white";
      case "cancelled": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-salon-plum mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your salon services, bookings, and clients</p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Scissors className="w-4 h-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Clients
          </TabsTrigger>
        </TabsList>

        {/* Services Management */}
        <TabsContent value="services" className="space-y-6">
          <Card className="shadow-soft border-salon-pink/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-salon-plum">Manage Services</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-salon-gold text-white hover:bg-salon-gold/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Service</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serviceName">Service Name *</Label>
                        <Input
                          id="serviceName"
                          value={newService.name}
                          onChange={(e) => setNewService({...newService, name: e.target.value})}
                          placeholder="Enter service name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="servicePrice">Price ($) *</Label>
                          <Input
                            id="servicePrice"
                            type="number"
                            value={newService.price}
                            onChange={(e) => setNewService({...newService, price: e.target.value})}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="serviceDuration">Duration (min) *</Label>
                          <Input
                            id="serviceDuration"
                            type="number"
                            value={newService.duration}
                            onChange={(e) => setNewService({...newService, duration: e.target.value})}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="serviceDescription">Description</Label>
                        <Textarea
                          id="serviceDescription"
                          value={newService.description}
                          onChange={(e) => setNewService({...newService, description: e.target.value})}
                          placeholder="Service description..."
                        />
                      </div>
                      <Button onClick={handleAddService} className="w-full bg-salon-gold text-white hover:bg-salon-gold/90">
                        Add Service
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="border-salon-pink/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-salon-plum">{service.name}</h4>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingService(service)}
                              >
                                <Edit2 className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Service</DialogTitle>
                              </DialogHeader>
                              {editingService && (
                                <div className="space-y-4">
                                  <div>
                                    <Label>Service Name</Label>
                                    <Input
                                      value={editingService.name}
                                      onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Price ($)</Label>
                                      <Input
                                        type="number"
                                        value={editingService.price}
                                        onChange={(e) => setEditingService({...editingService, price: parseInt(e.target.value)})}
                                      />
                                    </div>
                                    <div>
                                      <Label>Duration (min)</Label>
                                      <Input
                                        type="number"
                                        value={editingService.duration}
                                        onChange={(e) => setEditingService({...editingService, duration: parseInt(e.target.value)})}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Description</Label>
                                    <Textarea
                                      value={editingService.description}
                                      onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                                    />
                                  </div>
                                  <Button onClick={handleUpdateService} className="w-full bg-salon-gold text-white hover:bg-salon-gold/90">
                                    Update Service
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3" />
                          ${service.price}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {service.duration} min
                        </div>
                        {service.description && (
                          <p className="text-xs mt-2">{service.description}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Management */}
        <TabsContent value="bookings" className="space-y-6">
          <Card className="shadow-soft border-salon-pink/20">
            <CardHeader>
              <CardTitle className="text-salon-plum">Manage Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="border-salon-pink/30">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-salon-plum">{booking.clientName}</h4>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Scissors className="w-3 h-3" />
                              {booking.service}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {booking.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {booking.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {booking.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {booking.status === "pending" && (
                            <Button 
                              size="sm" 
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              className="bg-salon-gold text-white hover:bg-salon-gold/90"
                            >
                              Confirm
                            </Button>
                          )}
                          {booking.status === "confirmed" && (
                            <Button 
                              size="sm" 
                              onClick={() => updateBookingStatus(booking.id, "completed")}
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              Complete
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients Management */}
        <TabsContent value="clients" className="space-y-6">
          <Card className="shadow-soft border-salon-pink/20">
            <CardHeader>
              <CardTitle className="text-salon-plum">Manage Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.map((client) => (
                  <Card key={client.id} className="border-salon-pink/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-salon-plum">{client.name}</h4>
                        <Badge variant="outline">{client.totalVisits} visits</Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          Last visit: {client.lastVisit}
                        </div>
                        {client.preferences && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-salon-plum mb-1">Preferences:</p>
                            <p className="text-xs">{client.preferences}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;