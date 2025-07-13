'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { agentOps } from '@/lib/agentops';

type AgentOpsContextType = {
  isInitialized: boolean;
};

const AgentOpsContext = createContext<AgentOpsContextType>({
  isInitialized: false,
});

export const useAgentOps = () => {
  const context = useContext(AgentOpsContext);
  if (!context) {
    throw new Error('useAgentOps must be used within an AgentOpsProvider');
  }
  return context;
};

type AgentOpsProviderProps = {
  children: ReactNode;
  apiKey?: string;
  tags?: string[];
  traceName?: string;
  autoStartSession?: boolean;
};

export function AgentOpsProvider({ 
  children, 
  apiKey,
  tags = ['nextjs', 'website'],
  traceName = 'Website Session',
  autoStartSession = true
}: AgentOpsProviderProps) {
  const isInitialized = Boolean(apiKey);

  useEffect(() => {
    if (apiKey) {
      try {
        agentOps.init(apiKey, {
          tags,
          traceName,
          autoStartSession,
        });
      } catch (error) {
        console.error('Failed to initialize AgentOps:', error);
      }
    }
  }, [apiKey, tags, traceName, autoStartSession]);

  return (
    <AgentOpsContext.Provider value={{ isInitialized }}>
      {children}
    </AgentOpsContext.Provider>
  );
}