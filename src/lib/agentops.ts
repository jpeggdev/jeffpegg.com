type AgentOpsConfig = {
  apiKey: string;
  tags?: string[];
  traceName?: string;
  autoStartSession?: boolean;
  endpoint?: string;
};

type TraceState = 'Success' | 'Fail' | 'Indeterminate';

type EventType = 'llm' | 'tool' | 'action' | 'error' | 'custom';

type AgentOpsEvent = {
  id: string;
  type: EventType;
  timestamp: number;
  data: any;
  tags?: string[];
  sessionId?: string;
  traceId?: string;
};

type Session = {
  id: string;
  startTime: number;
  endTime?: number;
  tags: string[];
  traceName?: string;
  events: AgentOpsEvent[];
  state?: TraceState;
};

type Trace = {
  id: string;
  name: string;
  startTime: number;
  endTime?: number;
  tags: string[];
  events: AgentOpsEvent[];
  state?: TraceState;
  sessionId: string;
};

class AgentOpsClient {
  private config: AgentOpsConfig;
  private activeSession: Session | null = null;
  private activeTraces: Map<string, Trace> = new Map();
  private isInitialized = false;

  constructor(config: AgentOpsConfig) {
    this.config = config;
  }

  init() {
    if (this.isInitialized) return;
    
    this.isInitialized = true;
    
    if (this.config.autoStartSession !== false) {
      this.startSession();
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private async sendEvent(event: AgentOpsEvent) {
    if (!this.config.apiKey) {
      console.warn('AgentOps: API key not configured');
      return;
    }

    const endpoint = this.config.endpoint || 'https://api.agentops.ai/v2/events';
    
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('AgentOps: Failed to send event', error);
    }
  }

  startSession(tags?: string[], traceName?: string): string {
    const sessionId = this.generateId();
    
    this.activeSession = {
      id: sessionId,
      startTime: Date.now(),
      tags: tags || this.config.tags || [],
      traceName: traceName || this.config.traceName,
      events: [],
    };

    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'custom',
      timestamp: Date.now(),
      data: {
        event_type: 'session_start',
        session_id: sessionId,
        tags: this.activeSession.tags,
        trace_name: this.activeSession.traceName,
      },
      sessionId,
    };

    this.activeSession.events.push(event);
    this.sendEvent(event);

    return sessionId;
  }

  endSession(endState: TraceState = 'Success') {
    if (!this.activeSession) return;

    this.activeSession.endTime = Date.now();
    this.activeSession.state = endState;

    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'custom',
      timestamp: Date.now(),
      data: {
        event_type: 'session_end',
        session_id: this.activeSession.id,
        end_state: endState,
        duration: this.activeSession.endTime - this.activeSession.startTime,
      },
      sessionId: this.activeSession.id,
    };

    this.activeSession.events.push(event);
    this.sendEvent(event);
    this.activeSession = null;
  }

  startTrace(name: string, tags?: string[]): string {
    if (!this.activeSession) {
      this.startSession();
    }

    const traceId = this.generateId();
    const trace: Trace = {
      id: traceId,
      name,
      startTime: Date.now(),
      tags: tags || [],
      events: [],
      sessionId: this.activeSession!.id,
    };

    this.activeTraces.set(traceId, trace);

    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'custom',
      timestamp: Date.now(),
      data: {
        event_type: 'trace_start',
        trace_id: traceId,
        trace_name: name,
        tags,
      },
      sessionId: this.activeSession!.id,
      traceId,
    };

    trace.events.push(event);
    this.sendEvent(event);

    return traceId;
  }

  endTrace(traceId: string, endState: TraceState = 'Success') {
    const trace = this.activeTraces.get(traceId);
    if (!trace) return;

    trace.endTime = Date.now();
    trace.state = endState;

    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'custom',
      timestamp: Date.now(),
      data: {
        event_type: 'trace_end',
        trace_id: traceId,
        end_state: endState,
        duration: trace.endTime - trace.startTime,
      },
      sessionId: trace.sessionId,
      traceId,
    };

    trace.events.push(event);
    this.sendEvent(event);
    this.activeTraces.delete(traceId);
  }

  recordLLMEvent(data: {
    model: string;
    prompt: string;
    response: string;
    tokens?: number;
    cost?: number;
    latency?: number;
  }) {
    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'llm',
      timestamp: Date.now(),
      data: {
        event_type: 'llm_call',
        ...data,
      },
      sessionId: this.activeSession?.id,
    };

    this.activeSession?.events.push(event);
    this.sendEvent(event);
  }

  recordToolEvent(data: {
    name: string;
    input: any;
    output: any;
    cost?: number;
    latency?: number;
  }) {
    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'tool',
      timestamp: Date.now(),
      data: {
        event_type: 'tool_call',
        ...data,
      },
      sessionId: this.activeSession?.id,
    };

    this.activeSession?.events.push(event);
    this.sendEvent(event);
  }

  recordActionEvent(data: {
    action: string;
    params: any;
    result: any;
  }) {
    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'action',
      timestamp: Date.now(),
      data: {
        event_type: 'action',
        ...data,
      },
      sessionId: this.activeSession?.id,
    };

    this.activeSession?.events.push(event);
    this.sendEvent(event);
  }

  recordError(error: Error, context?: any) {
    const event: AgentOpsEvent = {
      id: this.generateId(),
      type: 'error',
      timestamp: Date.now(),
      data: {
        event_type: 'error',
        error: error.message,
        stack: error.stack,
        context,
      },
      sessionId: this.activeSession?.id,
    };

    this.activeSession?.events.push(event);
    this.sendEvent(event);
  }

  getActiveSession(): Session | null {
    return this.activeSession;
  }

  getActiveTraces(): Trace[] {
    return Array.from(this.activeTraces.values());
  }
}

// Global instance
let agentOpsClient: AgentOpsClient | null = null;

export const agentOps = {
  init: (apiKey: string, options?: Partial<AgentOpsConfig>) => {
    if (agentOpsClient) return;
    
    agentOpsClient = new AgentOpsClient({
      apiKey,
      ...options,
    });
    
    agentOpsClient.init();
  },

  startSession: (tags?: string[], traceName?: string) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    return agentOpsClient.startSession(tags, traceName);
  },

  endSession: (endState?: TraceState) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    agentOpsClient.endSession(endState);
  },

  startTrace: (name: string, tags?: string[]) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    return agentOpsClient.startTrace(name, tags);
  },

  endTrace: (traceId: string, endState?: TraceState) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    agentOpsClient.endTrace(traceId, endState);
  },

  recordLLM: (data: Parameters<AgentOpsClient['recordLLMEvent']>[0]) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    agentOpsClient.recordLLMEvent(data);
  },

  recordTool: (data: Parameters<AgentOpsClient['recordToolEvent']>[0]) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    agentOpsClient.recordToolEvent(data);
  },

  recordAction: (data: Parameters<AgentOpsClient['recordActionEvent']>[0]) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    agentOpsClient.recordActionEvent(data);
  },

  recordError: (error: Error, context?: any) => {
    if (!agentOpsClient) throw new Error('AgentOps not initialized');
    agentOpsClient.recordError(error, context);
  },

  getActiveSession: () => {
    if (!agentOpsClient) return null;
    return agentOpsClient.getActiveSession();
  },

  getActiveTraces: () => {
    if (!agentOpsClient) return [];
    return agentOpsClient.getActiveTraces();
  },
};

// Decorator functions for instrumentation
export function operation(name?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const operationName = name || `${target.constructor.name}.${propertyKey}`;
      const traceId = agentOps.startTrace(operationName, ['operation']);
      
      try {
        const result = await originalMethod.apply(this, args);
        agentOps.endTrace(traceId, 'Success');
        return result;
      } catch (error) {
        agentOps.recordError(error as Error, { operation: operationName, args });
        agentOps.endTrace(traceId, 'Fail');
        throw error;
      }
    };
    
    return descriptor;
  };
}

export function agent(name: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      agentName = name;
      
      constructor(...args: any[]) {
        super(...args);
        agentOps.recordAction({
          action: 'agent_created',
          params: { name, args },
          result: { agentId: this.agentName },
        });
      }
    };
  };
}

export function tool(name: string, cost?: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      
      try {
        const result = await originalMethod.apply(this, args);
        const endTime = Date.now();
        
        agentOps.recordTool({
          name,
          input: args,
          output: result,
          cost,
          latency: endTime - startTime,
        });
        
        return result;
      } catch (error) {
        agentOps.recordError(error as Error, { tool: name, args });
        throw error;
      }
    };
    
    return descriptor;
  };
}

export function trace(name: string, tags?: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const traceId = agentOps.startTrace(name, tags);
      
      try {
        const result = await originalMethod.apply(this, args);
        agentOps.endTrace(traceId, 'Success');
        return result;
      } catch (error) {
        agentOps.recordError(error as Error, { trace: name, args });
        agentOps.endTrace(traceId, 'Fail');
        throw error;
      }
    };
    
    return descriptor;
  };
}

export default agentOps;