import { Home, Grid3X3, Heart, Scissors, ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
      onClick: () => navigate("/")
    },
    {
      icon: Grid3X3,
      label: "Categories",
      path: "/categories",
      onClick: () => navigate("/")
    },
    {
      icon: Heart,
      label: "Vet Consult",
      path: "/vet-consult",
      onClick: () => window.open("https://petsu.in/vet-consultation", "_blank")
    },
    {
      icon: Scissors,
      label: "Grooming",
      path: "/grooming",
      onClick: () => window.open("https://petsu.in/groomers", "_blank")
    },
    {
      icon: ShoppingCart,
      label: "Cart",
      path: "/cart",
      onClick: () => window.open("https://petsu.in/pet-essentials", "_blank"),
      badge: "19"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.label}
              variant="ghost"
              onClick={item.onClick}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 relative ${
                isActive ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;