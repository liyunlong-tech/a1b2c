import React from 'react';
import {
  X,
  Sparkles,
  Eye,
  Languages,
  Code2,
  RotateCcw,
  Sliders
} from 'lucide-react';
import type { AIConfig } from '../engine/aiService';
import type { TargetLanguagePlugin, LocalePlugin } from '../engine/types';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  // 编程语言
  languages: TargetLanguagePlugin[];
  currentLangId: string;
  onSelectLanguage: (langId: string) => void;
  // 自然语种
  locales: LocalePlugin[];
  currentLocaleId: string;
  onSelectLocale: (localeId: string) => void;
  // 视觉模式
  emojiMode: boolean;
  onToggleEmojiMode: () => void;
  // AI 配置
  aiConfig: AIConfig;
  onUpdateAiConfig: (config: AIConfig) => void;
  // 重置
  onResetCode: () => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  isOpen,
  onClose,
  languages,
  currentLangId,
  onSelectLanguage,
  locales,
  currentLocaleId,
  onSelectLocale,
  onToggleEmojiMode,
  emojiMode,
  aiConfig,
  onUpdateAiConfig,
  onResetCode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* 半透明遮罩 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 抽屉内容容器 */}
      <div className="relative w-full max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* 抽屉顶栏 */}
        <div className="h-14 px-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
            <Sliders size={18} className="text-indigo-400" />
            <span>编辑器偏好与设置</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* 设置项表单 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs text-slate-300">
          {/* 1. 目标编程语言 (热插拔) */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-200 flex items-center gap-2">
              <Code2 size={15} className="text-emerald-400" />
              <span>目标编程语言 (Target Language)</span>
            </label>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              热插拔语法规则、关键字映射与执行沙箱。
            </p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => {
                const active = lang.id === currentLangId;
                return (
                  <button
                    key={lang.id}
                    onClick={() => onSelectLanguage(lang.id)}
                    className={`py-2 px-3 rounded-lg border text-left font-medium transition flex flex-col gap-0.5 ${
                      active
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs">{lang.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{lang.fileExtension}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-slate-800/80" />

          {/* 2. 自然母语语种 (热插拔) */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-200 flex items-center gap-2">
              <Languages size={15} className="text-sky-400" />
              <span>输入语种与本地化 (Locale)</span>
            </label>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              决定输入法 IME 置换词汇、拼音缩写及悬浮提示语言。
            </p>
            <div className="grid grid-cols-2 gap-2">
              {locales.map((loc) => {
                const active = loc.id === currentLocaleId;
                return (
                  <button
                    key={loc.id}
                    onClick={() => onSelectLocale(loc.id)}
                    className={`py-2 px-3 rounded-lg border text-left font-medium transition flex flex-col gap-0.5 ${
                      active
                        ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 shadow-sm'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs">{loc.name}</span>
                    <span className="text-[10px] text-slate-400">{loc.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-slate-800/80" />

          {/* 3. 视觉呈现模式 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-200 flex items-center gap-2">
                <Eye size={15} className="text-amber-400" />
                <span>Emoji 视觉徽标装饰</span>
              </label>
              <button
                onClick={onToggleEmojiMode}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                  emojiMode ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emojiMode ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              开启时将代码关键字渲染为具象 Emoji 徽标与副标；关闭时呈现原始代码文本。
            </p>
          </div>

          <div className="h-px bg-slate-800/80" />

          {/* 4. AI 智能补全配置 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-200 flex items-center gap-2">
                <Sparkles size={15} className="text-purple-400" />
                <span>AI 行内幽灵补全 (Tab)</span>
              </label>
              <button
                onClick={() => onUpdateAiConfig({ ...aiConfig, enabled: !aiConfig.enabled })}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                  aiConfig.enabled ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    aiConfig.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {aiConfig.enabled && (
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-3 mt-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">API Base URL</label>
                  <input
                    type="text"
                    placeholder="https://api.openai.com/v1"
                    value={aiConfig.apiEndpoint || ''}
                    onChange={(e) => onUpdateAiConfig({ ...aiConfig, apiEndpoint: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">API Key</label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={aiConfig.apiKey || ''}
                    onChange={(e) => onUpdateAiConfig({ ...aiConfig, apiKey: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Model Name</label>
                  <input
                    type="text"
                    placeholder="gpt-4o-mini"
                    value={aiConfig.modelName || ''}
                    onChange={(e) => onUpdateAiConfig({ ...aiConfig, modelName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-slate-800/80" />

          {/* 5. 示例代码重置 */}
          <div className="space-y-2">
            <button
              onClick={onResetCode}
              className="w-full py-2 px-3 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw size={14} className="text-amber-400" />
              <span>恢复当前语言的示例代码</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
