import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpDown } from 'lucide-react';

// Type definitions
interface Stats {
  maxTokens: number;
  tokensLeft: number;
  tokensSoFar: number;
}

interface Entity {
  name: string;
  isActive: boolean;
}

// Component props interface
interface SidePanelProps {
  onAnalyze: () => Promise<void>;
  isLoading: boolean;
  errorMessage: string;
  streamingOutput: string;
  entities: Entity[];
  onEntityClick?: (entityName: string) => void;
  stats: Stats;
  diagramSvg?: string;
}

const SidePanel: React.FC<SidePanelProps> = ({
  onAnalyze,
  isLoading,
  errorMessage,
  streamingOutput,
  entities,
  onEntityClick,
  stats,
  diagramSvg
}) => {
  const [temperature, setTemperature] = useState(0.3);
  const [topK, setTopK] = useState(40);
  const [showNotes, setShowNotes] = useState(true);
  const [enableSummarize, setEnableSummarize] = useState(true);

  return (
    <div className="p-4 font-sans text-gray-800">
      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Analyze Page Content
      </button>

      {/* Controls */}
      <div className="my-4">
        <div className="mb-3">
          <label className="block mb-1 text-gray-600">
            Temperature: {temperature}
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-3">
          <label className="block mb-1 text-gray-600">
            Top K: {topK}
          </label>
          <input
            type="range"
            min={1}
            max={40}
            value={topK}
            onChange={(e) => setTopK(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer select-none mb-2">
          <input
            type="checkbox"
            checked={showNotes}
            onChange={(e) => setShowNotes(e.target.checked)}
            className="w-4 h-4"
          />
          Show relationship descriptions
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={enableSummarize}
            onChange={(e) => setEnableSummarize(e.target.checked)}
            className="w-4 h-4"
          />
          Summarize long content
        </label>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 p-3 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-gray-600 text-sm">Max Tokens:</div>
            <div>{stats.maxTokens}</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">Tokens Left:</div>
            <div>{stats.tokensLeft}</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">Tokens So Far:</div>
            <div>{stats.tokensSoFar}</div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-blue-600 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Analyzing content...
        </div>
      )}

      {/* Streaming Output */}
      {streamingOutput && (
        <pre className="bg-gray-50 p-3 rounded-md my-4 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
          {streamingOutput}
        </pre>
      )}

      {/* Entities */}
      {entities.length > 0 && (
        <div className="my-4">
          <h3 className="text-lg font-semibold mb-2">Entities</h3>
          <div className="flex flex-wrap gap-2">
            {entities.map((entity) => (
              <button
                key={entity.name}
                onClick={() => onEntityClick?.(entity.name)}
                className={`px-3 py-1 rounded-full text-sm ${
                  entity.isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {entity.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Diagram */}
      {diagramSvg && (
        <div 
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: diagramSvg }}
        />
      )}
    </div>
  );
};

export default SidePanel;