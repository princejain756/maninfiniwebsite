import { Helmet } from 'react-helmet-async';

const SecurityHeaders: React.FC = () => {
  return (
    <Helmet>
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      
      {/* Content Security Policy */}
      <meta httpEquiv="Content-Security-Policy" content="
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        media-src 'self' https:;
        connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://generativelanguage.googleapis.com;
        frame-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
      " />
      
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
      " />
      
      {/* Additional Security Headers */}
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
    </Helmet>
  );
};

export default SecurityHeaders; 