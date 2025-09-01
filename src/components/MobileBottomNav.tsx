import { Home, Layers, Boxes, Phone, MessageCircle } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (href: string, section?: string) => {
    if (section && location.pathname === '/') {
      // Scroll when already on home
      setTimeout(() => websiteActions.scrollToSection(section), 50);
    } else if (href === '/' && section) {
      navigate(href);
      setTimeout(() => websiteActions.scrollToSection(section), 250);
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-2 left-0 right-0 z-50 px-3 select-none">
      <div className="mx-auto max-w-xl rounded-2xl bg-background/90 backdrop-blur-md border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]">
        <ul className="grid grid-cols-5">
          <li>
            <button className="w-full py-3 flex flex-col items-center gap-1 text-xs" onClick={() => go('/', 'home')}>
              <Home className="w-5 h-5" />
              Home
            </button>
          </li>
          <li>
            <button className="w-full py-3 flex flex-col items-center gap-1 text-xs" onClick={() => go('/', 'services')}>
              <Layers className="w-5 h-5" />
              Services
            </button>
          </li>
          <li>
            <button className="w-full py-3 flex flex-col items-center gap-1 text-xs" onClick={() => go('/', 'products')}>
              <Boxes className="w-5 h-5" />
              Products
            </button>
          </li>
          <li>
            <button className="w-full py-3 flex flex-col items-center gap-1 text-xs" onClick={() => websiteActions.callPhone(contactInfo.salesPhone)}>
              <Phone className="w-5 h-5" />
              Call
            </button>
          </li>
          <li>
            <button className="w-full py-3 flex flex-col items-center gap-1 text-xs" onClick={() => websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hello! I have a quick question.')}>
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileBottomNav;

