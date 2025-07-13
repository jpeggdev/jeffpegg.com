import AgentOpsDemo from '@/components/AgentOpsDemo';

export default function AgentOpsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">AgentOps Integration</h1>
        <p className="text-lg text-muted-foreground">
          This page demonstrates the integration of AgentOps for monitoring and tracking AI agent activities.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What is AgentOps?</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              AgentOps is a monitoring and observability platform designed specifically for AI agents and LLM applications. 
              It provides comprehensive tracking of:
            </p>
            <ul>
              <li><strong>LLM Calls:</strong> Monitor API calls to language models including tokens, costs, and latency</li>
              <li><strong>Tool Usage:</strong> Track when and how tools are used by agents</li>
              <li><strong>Agent Operations:</strong> Monitor agent workflows and decision-making processes</li>
              <li><strong>Error Tracking:</strong> Capture and analyze errors in agent execution</li>
              <li><strong>Performance Metrics:</strong> Measure response times and resource usage</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Integration Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Automatic Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Decorators automatically track function calls, tool usage, and agent operations without manual instrumentation.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Manual Traces</h3>
              <p className="text-sm text-muted-foreground">
                Start and end traces manually for complex workflows that require fine-grained control.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Session Management</h3>
              <p className="text-sm text-muted-foreground">
                Automatically manage sessions across page loads and user interactions.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Error Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Capture and track errors with context about the operation that failed.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
          <AgentOpsDemo />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Environment Configuration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To enable AgentOps tracking, add your API key to your environment variables:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                NEXT_PUBLIC_AGENTOPS_API_KEY=your_api_key_here
              </code>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Get your API key from the <a href="https://www.agentops.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AgentOps dashboard</a>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Using Decorators</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`import { operation, tool, trace } from '@/lib/agentops';

class AIAgent {
  @operation('generate_response')
  async generateResponse(prompt: string) {
    // Your AI logic here
    return response;
  }

  @tool('web_search', 0.05)
  async searchWeb(query: string) {
    // Tool implementation
    return results;
  }

  @trace('complex_workflow', ['workflow'])
  async complexWorkflow(task: string) {
    // Multi-step process
    return result;
  }
}`}</code>
              </pre>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Manual Tracking</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`import { agentOps } from '@/lib/agentops';

// Start a trace
const traceId = agentOps.startTrace('My Workflow', ['custom']);

try {
  // Record events
  agentOps.recordLLM({
    model: 'gpt-4',
    prompt: 'Hello',
    response: 'Hi there!',
    tokens: 50,
    cost: 0.001
  });
  
  // End trace with success
  agentOps.endTrace(traceId, 'Success');
} catch (error) {
  // Record error and end trace
  agentOps.recordError(error);
  agentOps.endTrace(traceId, 'Fail');
}`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}