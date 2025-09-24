import { Calendar, DollarSign, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import salonHero from "@/assets/salon-hero.jpg";

const Home = () => {
  const stats = [
    {
      title: "Today's Bookings",
      value: "12",
      icon: Calendar,
      description: "3 more than yesterday",
    },
    {
      title: "Total Revenue",
      value: "$2,450",
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Active Customers",
      value: "89",
      icon: Users,
      description: "Total registered",
    },
    {
      title: "Growth Rate",
      value: "+24%",
      icon: TrendingUp,
      description: "vs last month",
    },
  ];

  const services = [
    {
      name: "Classic Manicure",
      price: "$35",
      duration: "45 min",
      image: "https://images.pexels.com/photos/12008356/pexels-photo-12008356.jpeg",
    },
    {
      name: "Gel Polish",
      price: "$45",
      duration: "60 min",
      image: "https://images.pexels.com/photos/10040927/pexels-photo-10040927.jpeg",
    },
    {
      name: "Acrylic Extensions",
      price: "$65",
      duration: "90 min",
      image: "https://images.pexels.com/photos/9137001/pexels-photo-9137001.jpeg",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-elegant">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${salonHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-salon-plum/80 to-transparent"></div>
          <div className="relative h-full flex items-center justify-start p-8">
            <div className="text-white max-w-md">
              <h1 className="text-4xl font-bold mb-4">Welcome to Beauty Bazaar</h1>
              <p className="text-lg mb-6 opacity-90">
                Your premier destination for luxury nail care and beauty services
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-glow">
                <Link to="/booking">Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section>
        <h2 className="text-2xl font-bold text-salon-plum mb-6">Salon Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-soft border-salon-pink/20 hover:shadow-elegant transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-salon-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-salon-plum">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Our Services Gallery */}
      <section className="bg-salon-cream rounded-2xl p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-salon-plum mb-6 text-center">
          Our Signature Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-elegant transition-smooth hover:scale-105"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-salon-plum mb-2">{service.name}</h3>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{service.duration}</span>
                  <span className="text-salon-gold font-semibold">{service.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-salon-gold text-salon-gold hover:bg-salon-gold hover:text-white">
            <Link to="/booking">View All Services</Link>
          </Button>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="shadow-soft">
            <Link to="/booking">
              <Calendar className="w-5 h-5 mr-2" />
              New Booking
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-soft border-salon-pink text-salon-plum">
            <Link to="/customers">
              <Users className="w-5 h-5 mr-2" />
              Manage Customers
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;