// Security utilities for input validation, sanitization, and security measures
// Dynamic import for DOMPurify to handle SSR
let DOMPurify: any = null;

if (typeof window !== 'undefined') {
  import('dompurify').then((module) => {
    DOMPurify = module.default;
  });
}

// Input validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  name: /^[a-zA-Z\s]{2,50}$/,
  message: /^[\s\S]{10,1000}$/,
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  alphanumeric: /^[a-zA-Z0-9\s]+$/,
  numeric: /^[0-9]+$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Input sanitization and validation
export class SecurityValidator {
  // Sanitize HTML content to prevent XSS
  static sanitizeHtml(input: string): string {
    if (typeof window !== 'undefined' && DOMPurify) {
      return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
        ALLOWED_ATTR: ['href', 'target'],
        ALLOW_DATA_ATTR: false
      });
    }
    // Fallback for server-side or when DOMPurify is not loaded
    return input.replace(/<[^>]*>/g, '');
  }

  // Validate email format
  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }
    if (!VALIDATION_PATTERNS.email.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    if (email.length > 254) {
      return { isValid: false, error: 'Email too long' };
    }
    return { isValid: true };
  }

  // Validate phone number
  static validatePhone(phone: string): { isValid: boolean; error?: string } {
    if (!phone) {
      return { isValid: true }; // Phone is optional
    }
    if (!VALIDATION_PATTERNS.phone.test(phone)) {
      return { isValid: false, error: 'Invalid phone number format' };
    }
    return { isValid: true };
  }

  // Validate name (first/last name)
  static validateName(name: string, fieldName: string = 'Name'): { isValid: boolean; error?: string } {
    if (!name || name.trim().length === 0) {
      return { isValid: false, error: `${fieldName} is required` };
    }
    if (!VALIDATION_PATTERNS.name.test(name.trim())) {
      return { isValid: false, error: `${fieldName} must be 2-50 characters, letters and spaces only` };
    }
    return { isValid: true };
  }

  // Validate message content
  static validateMessage(message: string): { isValid: boolean; error?: string } {
    if (!message || message.trim().length === 0) {
      return { isValid: false, error: 'Message is required' };
    }
    if (message.length < 10) {
      return { isValid: false, error: 'Message must be at least 10 characters' };
    }
    if (message.length > 1000) {
      return { isValid: false, error: 'Message too long (max 1000 characters)' };
    }
    return { isValid: true };
  }

  // Validate service selection
  static validateService(service: string): { isValid: boolean; error?: string } {
    const validServices = [
      'Web & Custom Development',
      'E-commerce & Inventory',
      'WhatsApp & Communications',
      'Offshore Talent',
      'Virtual Office Services',
      'Graphic Design & Packaging',
      'Quantiti',
      'Other'
    ];
    
    if (!service || service.trim().length === 0) {
      return { isValid: false, error: 'Please select a service' };
    }
    if (!validServices.includes(service)) {
      return { isValid: false, error: 'Invalid service selected' };
    }
    return { isValid: true };
  }

  // Rate limiting utility
  static rateLimiter = {
    attempts: new Map<string, { count: number; timestamp: number }>(),
    
    checkLimit(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
      const now = Date.now();
      const attempt = this.attempts.get(key);
      
      if (!attempt || (now - attempt.timestamp) > windowMs) {
        this.attempts.set(key, { count: 1, timestamp: now });
        return true;
      }
      
      if (attempt.count >= maxAttempts) {
        return false;
      }
      
      attempt.count++;
      return true;
    },
    
    reset(key: string): void {
      this.attempts.delete(key);
    }
  };

  // CSRF token generation and validation
  static csrf = {
    generateToken(): string {
      return Math.random().toString(36).substring(2, 15) + 
             Math.random().toString(36).substring(2, 15);
    },
    
    validateToken(token: string, storedToken: string): boolean {
      return token === storedToken && token.length > 0;
    }
  };

  // Content Security Policy builder
  static buildCSP(nonce?: string): string {
    const baseCSP = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "media-src 'self' https:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://generativelanguage.googleapis.com",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ];
    
    if (nonce) {
      baseCSP[1] += ` 'nonce-${nonce}'`;
    }
    
    return baseCSP.join('; ');
  }

  // Secure headers configuration
  static getSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Cache-Control': 'public, max-age=31536000',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
  }

  // Log security events
  static logSecurityEvent(event: string, details?: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    };
    
    console.warn('Security Event:', logEntry);
    
    // In production, send to security monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement security event logging to monitoring service
    }
  }
}

// Form validation wrapper
export const validateContactForm = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  consent: boolean;
}) => {
  const errors: Record<string, string> = {};

  // Validate first name
  const firstNameValidation = SecurityValidator.validateName(formData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error!;
  }

  // Validate last name
  const lastNameValidation = SecurityValidator.validateName(formData.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error!;
  }

  // Validate email
  const emailValidation = SecurityValidator.validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  // Validate phone (optional)
  if (formData.phone) {
    const phoneValidation = SecurityValidator.validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error!;
    }
  }

  // Validate service
  const serviceValidation = SecurityValidator.validateService(formData.service);
  if (!serviceValidation.isValid) {
    errors.service = serviceValidation.error!;
  }

  // Validate message
  const messageValidation = SecurityValidator.validateMessage(formData.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error!;
  }

  // Validate consent
  if (!formData.consent) {
    errors.consent = 'You must accept the terms and conditions';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default SecurityValidator; 