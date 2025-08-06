import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for common website actions
export const websiteActions = {
  // Phone call functionality
  callPhone: (phoneNumber: string, label?: string) => {
    const cleanNumber = phoneNumber.replace(/\s+/g, '');
    window.open(`tel:${cleanNumber}`, '_self');
  },

  // Email functionality
  sendEmail: (email: string, subject?: string, body?: string) => {
    const mailtoUrl = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}${body ? `${subject ? '&' : '?'}body=${encodeURIComponent(body)}` : ''}`;
    window.open(mailtoUrl, '_self');
  },

  // WhatsApp functionality
  openWhatsApp: (phoneNumber: string, message?: string) => {
    const cleanNumber = phoneNumber.replace(/\s+/g, '');
    const defaultMessage = message || 'Hello, I would like to know more about your automation services.';
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  },

  // Google Maps directions
  getDirections: (address: string, coordinates?: { lat: number; lng: number }) => {
    if (coordinates) {
      window.open(`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
    }
  },

  // Smooth scroll to section
  scrollToSection: (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  // Download file
  downloadFile: (url: string, filename?: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Open external link
  openExternalLink: (url: string, newTab: boolean = true) => {
    if (newTab) {
      window.open(url, '_blank');
    } else {
      window.open(url, '_self');
    }
  },

  // Copy to clipboard
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (fallbackErr) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  },

  // Show notification
  showNotification: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
};

// Contact information
export const contactInfo = {
  mainPhone: '+91 83105 16955',
  supportPhone: '+91 83105 16955',
  salesPhone: '+91 83105 16955',
  email: 'mitesh@maninfini.com',
  supportEmail: 'support@maninfini.com',
  address: '#20, Ground Floor, 12th Cross, Cubbonpet, Banappa Park Road, Bengaluru - 560002',
  coordinates: { lat: 12.9686, lng: 77.5822 }
};

// WhatsApp contacts
export const whatsappContacts = [
  { 
    name: 'Mitesh Narendra Jain', 
    number: '+91 83105 16955', 
    phone: '918310516955', 
    role: 'CEO' 
  },
  { 
    name: 'Prince Jain', 
    number: '+91 80056 34678', 
    phone: '918005634678', 
    role: 'AIO and CTO',
    linkedin: 'https://www.linkedin.com/in/prince-jain-267519194/'
  },
  { 
    name: 'Neerav Deepak Jain', 
    number: '+91 6360 753 004', 
    phone: '919845074004', 
    role: 'COO' 
  }
];
