import { Heart, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            
            <p className="text-muted-foreground max-w-md">Connecting loving pets with caring families. Every adoption saves a life and creates lasting bonds of love and companionship. We do not sell we just help you to find pet for adoption</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://petsu.in/vet-consultation" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Vet Consultation</a></li>
              <li><a href="https://petsu.in/groomers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Grooming</a></li>
              <li><a href="https://petsu.in/pet-essentials" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Pet Essentials</a></li>
              <li><a href="https://petsu.in/blogs" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+15551234567" className="flex items-center space-x-2 hover:text-primary transition-colors group">
                
                <span className="text-muted-foreground group-hover:text-primary">+1 (555) 123-4567</span>
              </a>
              <a href="mailto:hello@pawshome.com" className="flex items-center space-x-2 hover:text-primary transition-colors group">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground group-hover:text-primary">hello@pawshome.com</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">123 Pet Street, City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        
      </div>
    </footer>;
};
export default Footer;