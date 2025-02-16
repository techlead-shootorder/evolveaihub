interface Domain {
    id: string;
    domain: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    chatbotId: string;
  }
  
  interface ChatbotSettings {
    id: string;
    name: string;
    allowedDomains: Domain[];
    isActive: boolean;
    appearance: {
      primaryColor: string;
      position: 'left' | 'right';
      welcomeMessage: string;
      botName: string;
    };
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }
  
  // utils/generateScript.ts
  export const generateChatbotScript = (chatbotId: string, domain: string) => {
    const script = `
      <script>
        window.EvolveAIConfig = {
          botId: "${chatbotId}",
          domain: "${domain}"
        };
      </script>
      <script
        async
        src="https://yourdomain.com/chatbot.js"
        data-chatbot-id="${chatbotId}"
      ></script>
    `;
  
    return script;
  };
  
  // utils/domainVerification.ts
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
  