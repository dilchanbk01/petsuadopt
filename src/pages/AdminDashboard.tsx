import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { PlusCircle, Users, Heart, ArrowLeft, LogOut } from 'lucide-react';
import logoImage from '@/assets/logo.png';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({ total: 0, adopted: 0, available: 0 });
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    color: '',
    description: '',
    medical_history: '',
    adoption_fee: '',
    image_url: ''
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data: allPets } = await supabase.from('pets').select('is_adopted');
      if (allPets) {
        const total = allPets.length;
        const adopted = allPets.filter(pet => pet.is_adopted).length;
        const available = total - adopted;
        setStats({ total, adopted, available });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin-auth');
  };

  if (!user) {
    return <Navigate to="/admin-auth" replace />;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const petData = {
        ...formData,
        age: parseInt(formData.age),
        adoption_fee: formData.adoption_fee ? parseFloat(formData.adoption_fee) : null,
        created_by: user.id
      };

      const { error } = await supabase
        .from('pets')
        .insert([petData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Pet has been added successfully.",
      });

      // Reset form
      setFormData({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        size: '',
        color: '',
        description: '',
        medical_history: '',
        adoption_fee: '',
        image_url: ''
      });

      // Refresh stats
      fetchStats();
    } catch (error) {
      console.error('Error adding pet:', error);
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

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
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pet Management</h1>
          <p className="text-muted-foreground">Add and manage pets available for adoption</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pets</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">In the system</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.available}</div>
              <p className="text-xs text-muted-foreground">Ready for adoption</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Adopted</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.adopted}</div>
              <p className="text-xs text-muted-foreground">Happy families</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Pet Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Pet Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter pet name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="species">Species *</Label>
                  <Select value={formData.species} onValueChange={(value) => handleInputChange('species', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Rabbit">Rabbit</SelectItem>
                      <SelectItem value="Bird">Bird</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="breed">Breed *</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => handleInputChange('breed', e.target.value)}
                    placeholder="Enter breed"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age (in months) *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age in months"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Small">Small</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Enter color"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adoption_fee">Adoption Fee ($)</Label>
                  <Input
                    id="adoption_fee"
                    type="number"
                    step="0.01"
                    value={formData.adoption_fee}
                    onChange={(e) => handleInputChange('adoption_fee', e.target.value)}
                    placeholder="Enter adoption fee"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the pet's personality and characteristics"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medical_history">Medical History</Label>
                <Textarea
                  id="medical_history"
                  value={formData.medical_history}
                  onChange={(e) => handleInputChange('medical_history', e.target.value)}
                  placeholder="Enter any medical history or special needs"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary hover:bg-primary-dark">
                {submitting ? 'Adding Pet...' : 'Add Pet'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;