// Global extension
declare global {
    interface WindowOrWorkerGlobalScope {
      readonly ai: AI;
    }
  }
  
  // Main interfaces
  export interface AI {
    readonly languageModel: AILanguageModelFactory;
  }
  
  export interface AICreateMonitor extends EventTarget {
    ondownloadprogress: ((event: Event) => void) | null;
  }
  
  export type AICreateMonitorCallback = (monitor: AICreateMonitor) => void;
  
  export type AICapabilityAvailability = 'readily' | 'after-download' | 'no';
  
  // LanguageModel interfaces and types
  export interface AILanguageModelFactory {
    create(options?: AILanguageModelCreateOptions): Promise<AILanguageModel>;
    capabilities(): Promise<AILanguageModelCapabilities>;
  }
  
  export interface AILanguageModel extends EventTarget {
    prompt(input: string, options?: AILanguageModelPromptOptions): Promise<string>;
    promptStreaming(input: string, options?: AILanguageModelPromptOptions): ReadableStream;
    countPromptTokens(input: string, options?: AILanguageModelPromptOptions): Promise<number>;
    readonly maxTokens: number;
    readonly tokensSoFar: number;
    readonly tokensLeft: number;
    readonly topK: number;
    readonly temperature: number;
    clone(): Promise<AILanguageModel>;
    destroy(): void;
  }
  
  export interface AILanguageModelCapabilities {
    readonly available: AICapabilityAvailability;
    readonly defaultTopK: number | null;
    readonly maxTopK: number | null;
    readonly defaultTemperature: number | null;
  }
  
  export interface AILanguageModelCreateOptions {
    signal?: AbortSignal;
    monitor?: AICreateMonitorCallback;
    systemPrompt?: string;
    initialPrompts?: AILanguageModelPrompt[];
    topK?: number;
    temperature?: number;
  }
  
  export interface AILanguageModelPrompt {
    role: AILanguageModelPromptRole;
    content: string;
  }
  
  export interface AILanguageModelPromptOptions {
    signal?: AbortSignal;
  }
  
  export type AILanguageModelPromptRole = 'system' | 'user' | 'assistant';