// Utility function to validate meta description length
export const validateMetaDescription = (description: string): string => {
  const maxLength = 160;
  const minLength = 150;
  
  if (description.length > maxLength) {
    // Truncate to maxLength and add ellipsis if needed
    return description.length > maxLength + 3 
      ? description.substring(0, maxLength - 3) + '...'
      : description.substring(0, maxLength);
  }
  
  if (description.length < minLength) {
    // Description is too short, but we'll keep it as is
  }
  
  return description;
};

// Test function to validate all meta descriptions
export const testMetaDescriptions = () => {
  const testDescriptions = [
    "Transform your business with cutting-edge automation and custom software development. Trusted automation partner since 2008.",
    "Stay updated with the latest insights on business automation, digital transformation, AI solutions, and custom software development.",
    "The page you're looking for doesn't exist. Explore our business automation services and digital transformation solutions.",
    "Discover how artificial intelligence is revolutionizing business automation and transforming industries across the globe.",
    "Learn how manufacturing companies can leverage digital transformation to improve efficiency and competitiveness.",
    "Explore the key differences between Robotic Process Automation (RPA) and Artificial Intelligence (AI) and when to use each.",
    "Discover best practices for developing custom software that grows with your business needs."
  ];

  // Testing meta descriptions silently
  testDescriptions.forEach((desc, index) => {
    const validated = validateMetaDescription(desc);
    // Validation completed silently
  });
}; 