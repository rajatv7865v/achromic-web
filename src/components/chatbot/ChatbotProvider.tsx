'use client';

import React, { createContext, useContext, useState } from 'react';
import Chatbot from './index';

interface ChatbotContextType {
  isOpen: boolean;
  toggleChatbot: () => void;
  openChatbot: () => void;
  closeChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: React.ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };

  const openChatbot = () => {
    setIsOpen(true);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <ChatbotContext.Provider value={{
      isOpen,
      toggleChatbot,
      openChatbot,
      closeChatbot
    }}>
      {children}
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
    </ChatbotContext.Provider>
  );
};
