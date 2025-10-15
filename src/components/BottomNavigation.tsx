import { Home, Heart, Scissors, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      icon: ArrowLeft,
      label: 'Back',
      onClick: () => window.location.href = 'https://petsu.in'
    },
    {
      icon: Home,
      label: 'Home',
      onClick: () => navigate('/'),
      isActive: true
    },
    {
      icon: Heart,
      label: 'Vet Consult',
      onClick: () => window.open('https://petsu.in/vet-consultation', '_blank')
    },
    {
      icon: Scissors,
      label: 'Grooming',
      onClick: () => window.open('https://petsu.in/groomers', '_blank')
    },
    {
      icon: ShoppingBag,
      label: 'Pet Essential',
      onClick: () => window.open('https://petsu.in/pet-essentials', '_blank')
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 ${
                item.isActive ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <IconComponent 
                className={`w-6 h-6 mb-1 ${
                  item.isActive ? 'text-primary fill-primary/20' : 'text-gray-600'
                }`} 
              />
              <span className="text-xs font-medium text-center leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;