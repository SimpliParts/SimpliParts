import React from 'react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/Button';
import { ViewState } from '../App';
import { MessageSquare, Sparkles, Send, Clock3, Database, FileText } from 'lucide-react';

interface AskAIProps {
  setCurrentView: (view: ViewState) => void;
  currentView: ViewState;
}

/**
 * Placeholder "Ask AI" page for chat with data/LLM.
 * Hook the textarea + send into your LLM endpoint (Vercel AI SDK / Supabase Edge).
 */
export const AskAI: React.FC<AskAIProps> = ({ setCurrentView, currentView }) => {
  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="Ask AI"
        headingSub="Chat with your RO data"
      />

      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-1">Ask AI</p>
            <h1 className="text-xl font-bold text-slate-900">Chat with your repair orders</h1>
            <p className="text-sm text-slate-600">Query Tekmetric/PartsTech data via LLM.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles size={16} />
            New chat
          </Button>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-6">
          {/* Tips */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-wrap gap-3 text-sm text-slate-700">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
              <Clock3 size={14} className="text-slate-500" />
              <span>“What were my savings last month vs this month?”</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
              <Database size={14} className="text-slate-500" />
              <span>“List ROs with missing line codes.”</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
              <FileText size={14} className="text-slate-500" />
              <span>“Show top savings by vendor for brake jobs.”</span>
            </div>
          </div>

          {/* Chat shell */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <MessageSquare size={16} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Ask AI</div>
                <div className="text-xs text-slate-500">Connected to shop data (placeholder)</div>
              </div>
            </div>

            <div className="min-h-[240px] rounded-lg border border-dashed border-slate-200 bg-slate-50/60 flex items-center justify-center text-slate-400 text-sm">
              Conversation stream goes here.
            </div>

            <div className="flex flex-col gap-3">
              <textarea
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Ask about savings, vendors, parts, or specific ROs..."
              />
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">LLM: Gemini/OpenAI via Vercel AI SDK (wire to Edge Function).</div>
                <Button className="gap-2">
                  <Send size={16} />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

