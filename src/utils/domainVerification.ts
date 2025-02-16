export const verifyDomain = async (domain: string, chatbotId: string) => {
    try {
      // 1. Verify domain ownership
      const response = await fetch(domain);
      const html = await response.text();
      
      // 2. Check for verification meta tag or script
      const hasVerificationTag = html.includes(`data-chatbot-id="${chatbotId}"`);
      
      return hasVerificationTag;
    } catch (error) {
      console.error('Domain verification failed:', error);
      return false;
    }
  };
  