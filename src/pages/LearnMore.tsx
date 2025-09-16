import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Calendar, Palette, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import logoImage from '@/assets/logo.png';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  color: string;
  description?: string;
  medical_history?: string;
  image_url?: string;
  is_adopted: boolean;
}

const LearnMore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPet();
    }
  }, [id]);

  const fetchPet = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPet(data);
    } catch (error) {
      console.error('Error fetching pet:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pet Not Found</h2>
          <p className="text-muted-foreground mb-6">The pet you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} className="bg-gradient-primary hover:bg-primary-dark">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src={logoImage} alt="Petsu Adopt Logo" className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Petsu Adopt</h1>
                <p className="text-xs text-muted-foreground">Find your perfect companion</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pet Image */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-card">
                {pet.image_url ? (
                  <img
                    src={pet.image_url}
                    alt={`${pet.name} - ${pet.breed}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Heart className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {pet.is_adopted && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">Adopted</Badge>
                </div>
              )}
            </div>

            {/* Pet Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{pet.name}</h1>
                <p className="text-xl text-muted-foreground">{pet.breed}</p>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Age</p>
                        <p className="font-semibold">{pet.age} {pet.age === 1 ? 'month' : 'months'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-semibold">{pet.gender}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Palette className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-semibold">{pet.color}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Species</p>
                        <p className="font-semibold">{pet.species}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              {pet.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>About {pet.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{pet.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Medical History */}
              {pet.medical_history && (
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{pet.medical_history}</p>
                  </CardContent>
                </Card>
              )}

              {/* Adoption Button */}
              {!pet.is_adopted && (
                <div className="pt-4">
                  <Button className="w-full bg-gradient-primary hover:bg-primary-dark text-lg py-6">
                    <Heart className="w-5 h-5 mr-2" />
                    Adopt {pet.name}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    Contact us to start the adoption process
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;