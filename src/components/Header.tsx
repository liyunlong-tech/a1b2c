import React, { useState } from 'react';
import {
  Play,
  Copy,
  Check,
  HelpCircle,
  Settings,
  Loader2
} from 'lucide-react';
import { AppMenu } from './AppMenu';

interface HeaderProps {
  onRun: () => void;
  isRunning?: boolean;
  onCopyRaw: () => void;
  onToggleSettings: () => void;
  onToggleHelp: () => void;
  onNewFile: () => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
  onOpenAbout: () => void;
  currentLanguageName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onRun,
  isRunning = false,
  onCopyRaw,
  onToggleSettings,
  onToggleHelp,
  onNewFile,
  onOpenFile,
  onSaveFile,
  onOpenAbout,
  currentLanguageName
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyRaw();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 flex items-center justify-between select-none relative z-30">
      {/* 左侧：菜单图标与品牌标识 */}
      <div className="flex items-center gap-3">
        {/* 左上角下拉主菜单 */}
        <AppMenu
          onNewFile={onNewFile}
          onOpenFile={onOpenFile}
          onSaveFile={onSaveFile}
          onOpenSettings={onToggleSettings}
          onOpenAbout={onOpenAbout}
        />

        <div className="h-5 w-px bg-slate-800 hidden sm:block" />

        {/* 品牌名称与当前语言标签 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold text-xs">
            <span className="text-base">🐎</span>
            <span className="tracking-wide">智快马</span>
            <span className="text-[10px] text-slate-400 font-mono font-normal">a1b2c</span>
          </div>
          <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700/80 text-emerald-400 font-medium font-mono">
            {currentLanguageName}
          </span>
        </div>
      </div>

      {/* 中间：突出居中的运行按钮 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        <button
          onClick={onRun}
          disabled={isRunning}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold shadow-lg transition-all active:scale-95 ${
            isRunning
              ? 'bg-emerald-700/80 text-emerald-100 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950/60 hover:shadow-emerald-900/80 hover:ring-2 hover:ring-emerald-400/40'
          }`}
          title="运行代码 (可在右侧控制台查看输出)"
        >
          {isRunning ? (
            <Loader2 size={15} className="animate-spin text-emerald-200" />
          ) : (
            <Play size={15} fill="currentColor" />
          )}
          <span>{isRunning ? '执行中...' : '运行 (Run)'}</span>
        </button>
      </div>

      {/* 右侧：操作区（复制代码、帮助/速查字典图标、设置图标） */}
      <div className="flex items-center gap-2">
        {/* 一键复制代码 */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/90 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          title="一键复制纯净标准代码"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span className="hidden sm:inline">{copied ? '已复制' : '复制标准代码'}</span>
        </button>

        {/* 帮助图标（原速查字典） */}
        <button
          onClick={onToggleHelp}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent hover:border-slate-700/80 transition"
          title="帮助与速查字典"
          aria-label="打开速查字典"
        >
          <HelpCircle size={18} />
        </button>

        {/* 右上角设置图标（切换设置侧边栏） */}
        <button
          onClick={onToggleSettings}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-transparent hover:border-slate-700/80 transition"
          title="打开编辑器设置"
          aria-label="打开设置"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
