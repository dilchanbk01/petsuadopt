import { Heart, Users, Award, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-pet-orange">
              PetsU Adoption
            </Link>
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About PetsU Adoption
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're dedicated to connecting loving pets with caring families. Our mission is to reduce 
            pet homelessness and create lasting bonds between animals and their new families.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-pet-orange mx-auto mb-4" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To rescue, rehabilitate, and rehome pets in need while promoting responsible pet ownership.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-pet-orange mx-auto mb-4" />
              <CardTitle>Community Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Over 5,000 successful adoptions and countless lives changed through our community programs.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 text-pet-orange mx-auto mb-4" />
              <CardTitle>Quality Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All pets receive comprehensive health checks, vaccinations, and behavioral assessments.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Home className="h-12 w-12 text-pet-orange mx-auto mb-4" />
              <CardTitle>Forever Homes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We carefully match pets with families to ensure lifelong, loving relationships.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="bg-muted rounded-lg p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Founded in 2018, PetsU Adoption started as a small volunteer group with a big dream: 
                to create a world where every pet has a loving home. What began in a single foster home 
                has grown into a comprehensive adoption center serving the entire region.
              </p>
              
              <p className="mb-6">
                Our team of dedicated volunteers, veterinarians, and animal behaviorists work tirelessly 
                to ensure that every animal in our care receives the love, attention, and medical treatment 
                they deserve. We believe that every pet, regardless of age, breed, or background, deserves 
                a second chance at happiness.
              </p>

              <p>
                Today, we're proud to operate state-of-the-art facilities with specialized areas for cats, 
                dogs, and small animals. Our adoption process is designed to create perfect matches, ensuring 
                that both pets and families are set up for success from day one.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-pet-orange mb-2">5,000+</div>
            <div className="text-muted-foreground">Successful Adoptions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pet-orange mb-2">200+</div>
            <div className="text-muted-foreground">Volunteer Heroes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pet-orange mb-2">24/7</div>
            <div className="text-muted-foreground">Emergency Care</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pet-orange mb-2">98%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-primary rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your New Best Friend?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Browse our available pets and start your adoption journey today.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/">View Available Pets</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;