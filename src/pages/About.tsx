import { Award, Heart, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Beauty",
      description: "We believe beauty is more than skin deep—it's a reflection of confidence and self-care."
    },
    {
      icon: Award,
      title: "Expert Craftsmanship",
      description: "Our certified nail technicians deliver flawless results using high-quality products and latest techniques."
    },
    {
      icon: Users,
      title: "Personalized Care",
      description: "Every client receives individualized attention in our serene and stylish environment."
    },
    {
      icon: Clock,
      title: "Modern Innovation",
      description: "From seamless booking to secure mobile payments, beauty reimagined for the modern world."
    }
  ];

  const team = [
    {
      name: "Franklyn Wachira",
      role: "Founder & Master Nail Artist",
      description: "With over 8 years in the beauty industry, Franklyn brings expertise and artistic vision to every service."
    },
    {
      name: "Sarah Johnson",
      role: "Senior Nail Technician",
      description: "Specializing in intricate nail art and gel extensions with an eye for detail and creativity."
    },
    {
      name: "Maria Santos",
      role: "Spa Pedicure Specialist",
      description: "Expert in relaxation techniques and foot care, ensuring every pedicure is a luxurious experience."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-salon-plum mb-4">About Beauty Bazaar</h1>
        <p className="text-xl text-salon-plum/80 italic mb-6">
          "Where beauty meets experts"
        </p>
        <div className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          <p>
            Welcome to Beauty Bazaar, your ultimate destination for luxurious nail care and salon excellence. 
            We are more than just a nail salon—we are a sanctuary where artistry meets professionalism, 
            and every visit feels like a pampering retreat.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="bg-salon-cream rounded-2xl p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-salon-plum mb-6 text-center">Our Story</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
          <p>
            At Beauty Bazaar, we specialize in a comprehensive range of nail services including classic manicures, 
            gel polish, acrylic extensions, artistic nail art, and luxurious spa pedicures. Our team of certified 
            nail technicians is passionate about delivering exceptional results that exceed your expectations.
          </p>
          <p>
            Whether you're preparing for a special occasion or simply treating yourself to some well-deserved 
            self-care, our commitment to hygiene, comfort, and personalized attention ensures that every client 
            leaves feeling confident and beautiful.
          </p>
          <p>
            Beyond traditional nail services, Beauty Bazaar embraces innovation. Our modern salon management 
            system empowers clients with seamless appointment booking, secure mobile payments via M-Pesa and 
            other methods, and the ability to track their beauty journey with us.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section>
        <h2 className="text-2xl font-bold text-salon-plum mb-8 text-center">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="shadow-soft border-salon-pink/20 hover:shadow-elegant transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-salon-plum mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="bg-salon-rose rounded-2xl p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-salon-plum mb-8 text-center">Meet Our Expert Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="shadow-soft border-salon-pink/20 bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-salon-plum mb-1">{member.name}</h3>
                <p className="text-salon-gold font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Location & Hours */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-soft border-salon-pink/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-salon-plum mb-4">Visit Our Salon</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>Location:</strong><br />NGARA FIGTREE, BHAVESH CENTER<br />Room G6</p>
                <p><strong>Phone:</strong><br />0706 353 012</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-salon-pink/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-salon-plum mb-4">Opening Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium text-salon-gold">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center bg-gradient-hero rounded-2xl p-12 shadow-elegant">
        <h2 className="text-3xl font-bold text-salon-plum mb-4">
          Ready to Experience Beauty Bazaar?
        </h2>
        <p className="text-lg text-salon-plum/80 mb-8 max-w-2xl mx-auto">
          Join the Beauty Bazaar family and experience the perfect blend of elegance, 
          expertise, and empowerment. Your nails deserve nothing less.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/booking" 
            className="bg-salon-plum text-white px-8 py-3 rounded-lg font-semibold shadow-glow hover:bg-salon-plum/90 transition-smooth"
          >
            Book Your Appointment
          </a>
          <a 
            href="/contact" 
            className="border-2 border-salon-plum text-salon-plum px-8 py-3 rounded-lg font-semibold hover:bg-salon-plum hover:text-white transition-smooth"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;