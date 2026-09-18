import React from 'react';
import { X, Sparkles, Heart, GitBranch } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* 弹窗实体 */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-slate-200">
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🐎</span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>智快马 (a1b2c)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  v0.2.0
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">AI-powered Block-to-Code 智能过渡型代码编辑器</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* 内容 */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            <strong>智快马</strong> 专为帮助编程初学者跨越从<strong>“图形化积木”</strong>到<strong>“工业级纯文本代码”</strong>的鸿沟而生。
          </p>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-indigo-300 text-xs">
              <Sparkles size={14} />
              <span>品牌背后的设计哲学</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
              <li>
                <strong className="text-slate-200">a1b2c</strong>：AI-powered Block to Code（积木跨越代码），对称双关，极简深刻。
              </li>
              <li>
                <strong className="text-slate-200">智快马</strong>：智能块编码谐音，奔腾跃进，打破初学者对英语键盘与纯英文语法的恐惧。
              </li>
              <li>
                <strong className="text-slate-200">epic-babbage</strong>：致敬计算机先驱查尔斯·巴贝奇（Charles Babbage），承载硬核极客精神。
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              Made with <Heart size={12} className="text-rose-500 fill-rose-500" /> for Coders & Learners
            </span>
            <span className="flex items-center gap-1 font-mono text-slate-400">
              <GitBranch size={12} />
              master branch
            </span>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
