import { useState } from "react";
import { Search, Plus, Edit, Phone, Mail, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalVisits: number;
  lastVisit: string;
  preferredServices: string[];
  notes?: string;
  status: "active" | "inactive" | "vip";
}

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    preferredServices: "",
    notes: "",
  });

  // Mock data - in a real app, this would come from your backend
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "0701234567",
      email: "sarah.j@email.com",
      totalVisits: 12,
      lastVisit: "2024-12-20",
      preferredServices: ["Gel Polish", "Nail Art"],
      notes: "Prefers bright colors, allergic to certain polish brands",
      status: "vip"
    },
    {
      id: "2", 
      name: "Maria Garcia",
      phone: "0702345678",
      email: "maria.garcia@email.com",
      totalVisits: 8,
      lastVisit: "2024-12-18",
      preferredServices: ["Classic Manicure", "Pedicure"],
      status: "active"
    },
    {
      id: "3",
      name: "Jennifer Liu",
      phone: "0703456789",
      totalVisits: 15,
      lastVisit: "2024-12-15",
      preferredServices: ["Acrylic Extensions", "Nail Art"],
      notes: "Regular customer, books monthly",
      status: "vip"
    },
    {
      id: "4",
      name: "Emma Wilson",
      phone: "0704567890",
      email: "emma.w@email.com",
      totalVisits: 3,
      lastVisit: "2024-12-10",
      preferredServices: ["French Manicure"],
      status: "active"
    },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCustomer.name || !newCustomer.phone) {
      toast.error("Name and phone number are required");
      return;
    }

    const customer: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email || undefined,
      totalVisits: 0,
      lastVisit: "",
      preferredServices: newCustomer.preferredServices ? newCustomer.preferredServices.split(",").map(s => s.trim()) : [],
      notes: newCustomer.notes || undefined,
      status: "active"
    };

    setCustomers([...customers, customer]);
    setNewCustomer({ name: "", phone: "", email: "", preferredServices: "", notes: "" });
    setIsAddDialogOpen(false);
    toast.success("Customer added successfully!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return <Badge className="bg-salon-gold text-white"><Star className="w-3 h-3 mr-1" />VIP</Badge>;
      case "active":
        return <Badge variant="outline" className="border-green-500 text-green-700">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="border-gray-400 text-gray-600">Inactive</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-salon-plum">Customer Management</h1>
          <p className="text-muted-foreground">Manage your customer database and preferences</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-salon-gold text-white hover:bg-salon-gold/90 shadow-soft">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-salon-plum">Add New Customer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                  className="border-salon-pink/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <Input
                  id="customerPhone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="0706 353 012"
                  className="border-salon-pink/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  placeholder="customer@example.com"
                  className="border-salon-pink/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerServices">Preferred Services</Label>
                <Input
                  id="customerServices"
                  value={newCustomer.preferredServices}
                  onChange={(e) => setNewCustomer({...newCustomer, preferredServices: e.target.value})}
                  placeholder="Gel Polish, Nail Art (comma-separated)"
                  className="border-salon-pink/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerNotes">Notes</Label>
                <Textarea
                  id="customerNotes"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                  placeholder="Any special preferences or notes..."
                  className="border-salon-pink/30"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-salon-gold text-white">
                  Add Customer
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-salon-pink/30"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-salon-pink/30 focus:border-salon-gold"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft border-salon-pink/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold text-salon-plum">{customers.length}</p>
              </div>
              <div className="w-12 h-12 bg-salon-cream rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-salon-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-salon-pink/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">VIP Customers</p>
                <p className="text-2xl font-bold text-salon-plum">
                  {customers.filter(c => c.status === "vip").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-salon-cream rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-salon-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-salon-pink/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active This Month</p>
                <p className="text-2xl font-bold text-salon-plum">
                  {customers.filter(c => c.lastVisit && new Date(c.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-salon-cream rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-salon-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="shadow-soft border-salon-pink/20 hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-salon-plum text-lg">{customer.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Mail className="w-4 h-4" />
                      {customer.email}
                    </div>
                  )}
                </div>
                {getStatusBadge(customer.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Visits:</span>
                <span className="font-medium text-salon-plum">{customer.totalVisits}</span>
              </div>
              
              {customer.lastVisit && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Visit:</span>
                  <span className="font-medium text-salon-plum">
                    {new Date(customer.lastVisit).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              {customer.preferredServices.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Preferred Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {customer.preferredServices.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-salon-gold/50 text-salon-plum">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {customer.notes && (
                <div className="bg-salon-cream p-3 rounded-lg">
                  <p className="text-xs text-salon-plum">{customer.notes}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 border-salon-pink/30 text-salon-plum hover:bg-salon-cream">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" className="flex-1 bg-salon-gold text-white hover:bg-salon-gold/90">
                  <Calendar className="w-3 h-3 mr-1" />
                  Book
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground text-lg">No customers found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or add a new customer
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Customers;