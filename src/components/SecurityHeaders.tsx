import { Helmet } from 'react-helmet-async';
import { SecurityValidator } from '@/lib/security';

const SecurityHeaders: React.FC = () => {
  const csp = SecurityValidator.buildCSP();
  const securityHeaders = SecurityValidator.getSecurityHeaders();

  return (
    <Helmet>
      {/* Enhanced Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content={securityHeaders['X-Content-Type-Options']} />
      <meta httpEquiv="X-Frame-Options" content={securityHeaders['X-Frame-Options']} />
      <meta httpEquiv="X-XSS-Protection" content={securityHeaders['X-XSS-Protection']} />
      <meta httpEquiv="Referrer-Policy" content={securityHeaders['Referrer-Policy']} />
      <meta httpEquiv="Permissions-Policy" content={securityHeaders['Permissions-Policy']} />
      
      {/* Dynamic Content Security Policy */}
      <meta httpEquiv="Content-Security-Policy" content={csp} />
      
      {/* Feature Policy */}
      <meta httpEquiv="Feature-Policy" content="
        camera 'none';
        microphone 'none';
        geolocation 'none';
        payment 'none';
        usb 'none';
        magnetometer 'none';
        gyroscope 'none';
        accelerometer 'none';
        autoplay 'none';
        fullscreen 'none';
        picture-in-picture 'none';
      " />
      
      {/* Additional Security Headers */}
      <meta httpEquiv="Strict-Transport-Security" content={securityHeaders['Strict-Transport-Security']} />
      <meta httpEquiv="Cache-Control" content={securityHeaders['Cache-Control']} />
      <meta httpEquiv="Pragma" content={securityHeaders['Pragma']} />
      <meta httpEquiv="Expires" content={securityHeaders['Expires']} />
      
      {/* Additional Security Meta Tags */}
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
      <meta name="security" content="high" />
    </Helmet>
  );
};

export default SecurityHeaders; 