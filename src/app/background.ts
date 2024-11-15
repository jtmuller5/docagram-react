import { AI, AILanguageModel } from '../features/shared/AITypes';

declare global {
  interface Window {
    ai: AI;
  }
}

// Use the global ai instance
const ai = window.ai;

let modelSession: AILanguageModel | null = null;

// Type definitions for messages
interface AnalyzeTextMessage {
  type: 'analyzeText';
  text: string;
}

interface AnalysisCompleteMessage {
  type: 'analysisComplete';
  analysis: string;
  diagram: string;
}

interface ErrorMessage {
  type: 'error';
  error: string;
}

type Message = AnalyzeTextMessage | AnalysisCompleteMessage | ErrorMessage;

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onMessage.addListener((
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  if (message.type === 'analyzeText') {
    handleAnalysis(message).catch(error => {
      chrome.runtime.sendMessage({
        type: 'error',
        error: error.message || 'Failed to generate analysis'
      } as ErrorMessage);
    });
  }
  return true;
});

async function handleAnalysis(message: AnalyzeTextMessage): Promise<void> {
  if (!modelSession) {
    modelSession = await ai.languageModel.create({
      systemPrompt: `You are a document analysis expert who creates both written analysis and diagrams.
      For each document analyze:
      1. Key concepts and entities
      2. How they relate to each other
      3. Important relationships and dependencies

      Then provide TWO parts:
      PART 1: A written analysis (2-3 paragraphs) explaining the key relationships and concepts found.
      
      PART 2: A nomnoml diagram syntax showing these relationships visually using:
      -> for one-way relationships
      <-> for two-way relationships
      -:> for inheritance
      --:> for implementation
      
      Start part 2 with [DIAGRAM] on its own line.
      Keep diagrams focused with no more than 7-8 entities.
      Use clear, readable labels.`
    });
  }

  const prompt = `Analyze this text and provide both written analysis and a diagram as specified: ${message.text}`;
  const result = await modelSession.prompt(prompt);

  // Split result into analysis and diagram parts
  const parts = result.split('[DIAGRAM]');
  const analysis = parts[0].trim();
  const diagram = parts[1] ? parts[1].trim() : '';

  // Send both parts back to side panel
  chrome.runtime.sendMessage({
    type: 'analysisComplete',
    analysis: analysis,
    diagram: diagram
  } as AnalysisCompleteMessage);
}

chrome.runtime.onSuspend.addListener(() => {
  if (modelSession) {
    modelSession.destroy();
    modelSession = null;
  }
});