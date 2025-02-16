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
  