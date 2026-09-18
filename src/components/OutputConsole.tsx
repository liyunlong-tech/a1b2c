import React from 'react';
import { Terminal, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface ConsoleLogItem {
  type: 'log' | 'info' | 'warn' | 'error' | 'success';
  content: string;
  time: string;
}

interface OutputConsoleProps {
  logs: ConsoleLogItem[];
  onClear: () => void;
  isRunning: boolean;
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({ logs, onClear, isRunning }) => {
  return (
    <div className="h-full flex flex-col bg-slate-950 border-t border-slate-800 text-xs font-mono select-none">
      {/* 头部控制栏 */}
      <div className="h-9 px-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal size={14} className="text-emerald-400" />
          <span className="font-medium text-xs">执行控制台 (Console Output)</span>
          {isRunning && (
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-400 animate-pulse">
              执行中...
            </span>
          )}
        </div>
        <button
          onClick={onClear}
          title="清空控制台日志"
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition"
        >
          <Trash2 size={13} />
          <span>清空</span>
        </button>
      </div>

      {/* 日志内容区域 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 font-mono">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-600 text-xs italic">
            暂无输出，点击右上角【运行】执行代码
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 leading-relaxed ${
                log.type === 'error'
                  ? 'text-rose-400 bg-rose-950/20 px-2 py-1 rounded border border-rose-900/30'
                  : log.type === 'success'
                  ? 'text-emerald-400'
                  : log.type === 'warn'
                  ? 'text-amber-400'
                  : 'text-slate-300'
              }`}
            >
              <span className="text-[10px] text-slate-600 shrink-0 select-none pt-0.5">
                [{log.time}]
              </span>
              {log.type === 'error' && <AlertCircle size={14} className="shrink-0 mt-0.5" />}
              {log.type === 'success' && <CheckCircle2 size={14} className="shrink-0 mt-0.5" />}
              <span className="whitespace-pre-wrap break-all flex-1">{log.content}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
