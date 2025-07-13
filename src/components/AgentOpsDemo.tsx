'use client';

import { useState } from 'react';
import { agentOps, operation, tool, trace } from '@/lib/agentops';
import { useAgentOps } from './AgentOpsProvider';

class AIAssistant {
  @operation('generate_response')
  async generateResponse(prompt: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    agentOps.recordLLM({
      model: 'gpt-3.5-turbo',
      prompt,
      response: `AI Response to: ${prompt}`,
      tokens: 100,
      cost: 0.001,
      latency: 1000,
    });
    
    return `AI Response to: ${prompt}`;
  }

  @tool('web_search', 0.05)
  async searchWeb(query: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `Search results for: ${query}`;
  }

  @trace('complex_workflow', ['workflow', 'ai'])
  async complexWorkflow(task: string): Promise<string> {
    const searchResult = await this.searchWeb(task);
    const response = await this.generateResponse(`Based on search: ${searchResult}, please respond to: ${task}`);
    return response;
  }
}

export default function AgentOpsDemo() {
  const { isInitialized } = useAgentOps();
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [assistant] = useState(() => new AIAssistant());

  const handleSimpleOperation = async () => {
    setLoading(true);
    setOutput('');
    
    try {
      const result = await assistant.generateResponse('Hello, how are you?');
      setOutput(result);
    } catch (error) {
      agentOps.recordError(error as Error, { operation: 'simple_operation' });
      setOutput('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleToolUsage = async () => {
    setLoading(true);
    setOutput('');
    
    try {
      const result = await assistant.searchWeb('Next.js best practices');
      setOutput(result);
    } catch (error) {
      agentOps.recordError(error as Error, { operation: 'tool_usage' });
      setOutput('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleComplexWorkflow = async () => {
    setLoading(true);
    setOutput('');
    
    try {
      const result = await assistant.complexWorkflow('How to optimize React performance?');
      setOutput(result);
    } catch (error) {
      agentOps.recordError(error as Error, { operation: 'complex_workflow' });
      setOutput('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleManualTrace = async () => {
    setLoading(true);
    setOutput('');
    
    const traceId = agentOps.startTrace('Manual Trace Example', ['manual', 'demo']);
    
    try {
      agentOps.recordAction({
        action: 'user_interaction',
        params: { button: 'manual_trace' },
        result: { started: true },
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      agentOps.recordAction({
        action: 'process_complete',
        params: { duration: 1000 },
        result: { success: true },
      });
      
      setOutput('Manual trace completed successfully');
      agentOps.endTrace(traceId, 'Success');
    } catch (error) {
      agentOps.recordError(error as Error, { trace: 'manual_trace' });
      agentOps.endTrace(traceId, 'Fail');
      setOutput('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getSessionInfo = () => {
    const session = agentOps.getActiveSession();
    const traces = agentOps.getActiveTraces();
    
    return {
      sessionId: session?.id,
      sessionStartTime: session?.startTime,
      activeTraces: traces.length,
      totalEvents: session?.events.length || 0,
    };
  };

  if (!isInitialized) {
    return (
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
          AgentOps Not Configured
        </h3>
        <p className="mt-2 text-yellow-700 dark:text-yellow-300">
          To use AgentOps, set the <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">NEXT_PUBLIC_AGENTOPS_API_KEY</code> environment variable.
        </p>
      </div>
    );
  }

  const sessionInfo = getSessionInfo();

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">AgentOps Demo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleSimpleOperation}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Simple Operation
          </button>
          
          <button
            onClick={handleToolUsage}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Tool Usage
          </button>
          
          <button
            onClick={handleComplexWorkflow}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Complex Workflow
          </button>
          
          <button
            onClick={handleManualTrace}
            disabled={loading}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            Manual Trace
          </button>
        </div>
        
        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Processing...</p>
          </div>
        )}
        
        {output && (
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Output:</h4>
            <p className="text-sm">{output}</p>
          </div>
        )}
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold mb-4">Session Info</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Session ID:</span>
            <p className="text-muted-foreground break-all">{sessionInfo.sessionId || 'None'}</p>
          </div>
          <div>
            <span className="font-medium">Start Time:</span>
            <p className="text-muted-foreground">
              {sessionInfo.sessionStartTime ? new Date(sessionInfo.sessionStartTime).toLocaleString() : 'N/A'}
            </p>
          </div>
          <div>
            <span className="font-medium">Active Traces:</span>
            <p className="text-muted-foreground">{sessionInfo.activeTraces}</p>
          </div>
          <div>
            <span className="font-medium">Total Events:</span>
            <p className="text-muted-foreground">{sessionInfo.totalEvents}</p>
          </div>
        </div>
      </div>
    </div>
  );
}