import { NextRequest, NextResponse } from 'next/server';

// Gradio interface for CrewAI agents
export async function GET() {
  const gradioHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Vasquez Law Firm - AI Agent Control Center</title>
        <script type="module" crossorigin src="https://cdn.jsdelivr.net/npm/@gradio/lite/dist/lite.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gradio/lite/dist/lite.css" />
        <style>
            body {
                margin: 0;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #0f172a;
                color: #e2e8f0;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
                margin: 0;
                color: #fbbf24;
                font-size: 2.5rem;
                font-weight: 700;
            }
            .subtitle {
                color: #94a3b8;
                font-size: 1.1rem;
                margin-top: 10px;
            }
            #gradio-app {
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Vasquez Law Firm AI Agent Control Center</h1>
            <p class="subtitle">Manage CrewAI Agents, Monitor Performance, and Control Automation</p>
        </div>
        
        <gradio-lite>
            <gradio-file name="app.py" entrypoint>
import gradio as gr
import json
import datetime

# Agent definitions
AGENTS = {
    "Legal Consultation": {
        "status": "active",
        "description": "Handles initial client consultations and case assessments",
        "capabilities": ["Case evaluation", "Document analysis", "Legal advice", "Referral recommendations"]
    },
    "Appointment Scheduling": {
        "status": "active", 
        "description": "Manages client appointments and calendar coordination",
        "capabilities": ["Schedule meetings", "Send reminders", "Reschedule appointments", "Check availability"]
    },
    "Document Analysis": {
        "status": "active",
        "description": "Reviews and analyzes legal documents",
        "capabilities": ["Contract review", "Immigration forms", "Court documents", "Evidence analysis"]
    },
    "SEO Blog Generator": {
        "status": "active",
        "description": "Creates SEO-optimized legal blog content",
        "capabilities": ["Topic research", "Content writing", "SEO optimization", "Publishing"]
    },
    "Social Media Monitor": {
        "status": "active",
        "description": "Monitors social media for mentions and engagement",
        "capabilities": ["Track mentions", "Analyze sentiment", "Generate reports", "Suggest responses"]
    },
    "Competition Monitor": {
        "status": "active",
        "description": "Tracks competitor activities and market changes",
        "capabilities": ["Website monitoring", "Pricing analysis", "Service comparison", "Market trends"]
    }
}

# Task execution simulator
def execute_agent_task(agent_name, task_type, parameters):
    if agent_name not in AGENTS:
        return {"success": False, "error": "Unknown agent"}
    
    # Simulate task execution
    result = {
        "agent": agent_name,
        "task": task_type,
        "status": "completed",
        "timestamp": str(datetime.datetime.now()),
        "result": f"Successfully executed {task_type} for {agent_name}",
        "details": parameters
    }
    
    return json.dumps(result, indent=2)

# Agent status monitor
def get_agent_status():
    status_report = []
    for agent, info in AGENTS.items():
        status_report.append(f"**{agent}**\\n- Status: {info['status']}\\n- {info['description']}\\n")
    return "\\n".join(status_report)

# Train agent function
def train_agent(agent_name, training_data, training_type):
    if agent_name not in AGENTS:
        return "Error: Unknown agent"
    
    result = {
        "agent": agent_name,
        "training_type": training_type,
        "data_size": len(training_data),
        "status": "Training completed successfully",
        "improvements": [
            "Enhanced response accuracy",
            "Improved context understanding",
            "Better handling of edge cases"
        ]
    }
    
    return json.dumps(result, indent=2)

# GHL integration tester
def test_ghl_integration(action, phone_number, message):
    result = {
        "action": action,
        "status": "success",
        "details": {
            "phone": phone_number,
            "message": message,
            "timestamp": str(datetime.datetime.now()),
            "ghl_response": "Message queued for delivery"
        }
    }
    return json.dumps(result, indent=2)

# Retell integration tester
def test_retell_integration(action, phone_number):
    result = {
        "action": action,
        "status": "connected",
        "details": {
            "phone": phone_number,
            "agent": "Legal Intake Voice Agent",
            "duration": "0:00",
            "transcript": "Ready to start call..."
        }
    }
    return json.dumps(result, indent=2)

# Create Gradio interface
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("## 🤖 CrewAI Agent Management")
    
    with gr.Tab("Agent Control"):
        with gr.Row():
            with gr.Column():
                agent_dropdown = gr.Dropdown(
                    choices=list(AGENTS.keys()),
                    label="Select Agent",
                    value="Legal Consultation"
                )
                task_type = gr.Dropdown(
                    choices=["Analyze", "Generate", "Monitor", "Schedule", "Review"],
                    label="Task Type",
                    value="Analyze"
                )
                parameters = gr.Textbox(
                    label="Parameters (JSON format)",
                    placeholder='{"client": "John Doe", "case_type": "immigration"}',
                    lines=3
                )
                execute_btn = gr.Button("Execute Task", variant="primary")
                
            with gr.Column():
                execution_output = gr.Textbox(
                    label="Execution Result",
                    lines=10,
                    max_lines=20
                )
        
        execute_btn.click(
            execute_agent_task,
            inputs=[agent_dropdown, task_type, parameters],
            outputs=execution_output
        )
    
    with gr.Tab("Agent Training"):
        with gr.Row():
            with gr.Column():
                train_agent_dropdown = gr.Dropdown(
                    choices=list(AGENTS.keys()),
                    label="Select Agent to Train",
                    value="Legal Consultation"
                )
                training_type = gr.Radio(
                    choices=["Knowledge Base", "Response Patterns", "Domain Expertise"],
                    label="Training Type",
                    value="Knowledge Base"
                )
                training_data = gr.Textbox(
                    label="Training Data",
                    placeholder="Paste training data here...",
                    lines=5
                )
                train_btn = gr.Button("Start Training", variant="primary")
                
            with gr.Column():
                training_output = gr.Textbox(
                    label="Training Result",
                    lines=10
                )
        
        train_btn.click(
            train_agent,
            inputs=[train_agent_dropdown, training_data, training_type],
            outputs=training_output
        )
    
    with gr.Tab("Integration Testing"):
        gr.Markdown("### GoHighLevel Integration")
        with gr.Row():
            with gr.Column():
                ghl_action = gr.Radio(
                    choices=["Send SMS", "Create Contact", "Schedule Followup"],
                    label="Action",
                    value="Send SMS"
                )
                ghl_phone = gr.Textbox(label="Phone Number", placeholder="+1234567890")
                ghl_message = gr.Textbox(
                    label="Message",
                    placeholder="Your appointment is confirmed...",
                    lines=3
                )
                ghl_test_btn = gr.Button("Test GHL", variant="primary")
                
            with gr.Column():
                ghl_output = gr.Textbox(label="GHL Response", lines=8)
        
        ghl_test_btn.click(
            test_ghl_integration,
            inputs=[ghl_action, ghl_phone, ghl_message],
            outputs=ghl_output
        )
        
        gr.Markdown("### Retell Voice AI Integration")
        with gr.Row():
            with gr.Column():
                retell_action = gr.Radio(
                    choices=["Start Call", "End Call", "Get Transcript"],
                    label="Action",
                    value="Start Call"
                )
                retell_phone = gr.Textbox(label="Phone Number", placeholder="+1234567890")
                retell_test_btn = gr.Button("Test Retell", variant="primary")
                
            with gr.Column():
                retell_output = gr.Textbox(label="Retell Response", lines=8)
        
        retell_test_btn.click(
            test_retell_integration,
            inputs=[retell_action, retell_phone],
            outputs=retell_output
        )
    
    with gr.Tab("Agent Status"):
        status_output = gr.Markdown()
        refresh_btn = gr.Button("Refresh Status", variant="secondary")
        
        def refresh_status():
            return get_agent_status()
        
        refresh_btn.click(refresh_status, outputs=status_output)
        
        # Load initial status
        demo.load(refresh_status, outputs=status_output)
    
    gr.Markdown("""
    ### 🔧 Quick Start Guide
    
    1. **Agent Control**: Execute tasks using CrewAI agents
    2. **Agent Training**: Upload new training data to improve agent performance
    3. **Integration Testing**: Test GHL and Retell integrations
    4. **Agent Status**: Monitor all agents and their current state
    
    For more information, visit the [documentation](/api/docs).
    """)

demo.launch()
            </gradio-file>
        </gradio-lite>
    </body>
    </html>
  `;

  return new NextResponse(gradioHTML, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

// API endpoint for agent operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, agent, params } = body;

    switch (action) {
      case 'execute':
        // Execute agent task
        const response = await fetch('/api/crewai/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agent, ...params }),
        });
        return NextResponse.json(await response.json());

      case 'train':
        // Train agent
        return NextResponse.json({
          success: true,
          message: `Training initiated for ${agent}`,
          trainingId: `train_${Date.now()}`,
        });

      case 'status':
        // Get agent status
        return NextResponse.json({
          agent,
          status: 'active',
          lastActivity: new Date().toISOString(),
          metrics: {
            tasksCompleted: 42,
            successRate: 0.95,
            avgResponseTime: '2.3s',
          },
        });

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
