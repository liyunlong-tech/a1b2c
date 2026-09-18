import React, { useState } from 'react';
import { type ResolvedKeyword } from '../engine/keywordRegistry';
import { X, Search, Terminal } from 'lucide-react';

interface CheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertCode: (code: string) => void;
  keywords: ResolvedKeyword[];
  languageName?: string;
  localeName?: string;
}

export const CheatSheet: React.FC<CheatSheetProps> = ({
  isOpen,
  onClose,
  onInsertCode,
  keywords,
  languageName = 'JavaScript',
  localeName = '简体中文'
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = keywords.filter((kw) => {
    const q = search.toLowerCase();
    return (
      kw.canonical.toLowerCase().includes(q) ||
      kw.displayName.toLowerCase().includes(q) ||
      kw.synonyms.words.some((w) => w.toLowerCase().includes(q)) ||
      kw.synonyms.abbr.some((a) => a.toLowerCase().includes(q)) ||
      kw.synonyms.full.some((f) => f.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-slate-900/95 border-l border-slate-800 shadow-2xl backdrop-blur z-50 flex flex-col">
      {/* 标题栏 */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">语法与多别名速查词典</h3>
            <p className="text-[10px] text-slate-400">{languageName} · {localeName}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* 搜索框 */}
      <div className="p-3 border-b border-slate-800/80">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="搜索语法、拼音缩写或母语同义词..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* 提示文案 */}
      <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20 text-[11px] text-indigo-300 leading-normal">
        💡 提示：在编辑器中输入左侧的<b>缩写</b>或直接输入<b>母语词汇</b>，输入法确认后自动转为标准代码并渲染为 Emoji！
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filtered.map((kw: ResolvedKeyword) => (
          <div
            key={kw.id}
            className="p-2.5 rounded-lg border border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-700 transition space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg bg-slate-900 px-2 py-0.5 rounded border border-slate-700/60">
                  {kw.emoji}
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                    <span>{kw.displayName}</span>
                    <code className="text-[11px] px-1 py-0.2 bg-slate-950 text-emerald-400 rounded font-mono">
                      {kw.canonical}
                    </code>
                  </div>
                  <p className="text-[10px] text-slate-400">{kw.description}</p>
                </div>
              </div>
              <button
                onClick={() => onInsertCode(kw.sampleSnippet || kw.snippet)}
                className="text-[11px] px-2 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition"
              >
                插入
              </button>
            </div>

            {/* 匹配别名列表 */}
            <div className="grid grid-cols-2 gap-1 text-[10px] bg-slate-900/60 p-2 rounded border border-slate-800/80">
              <div>
                <span className="text-slate-500">母语支持: </span>
                <span className="text-slate-300">{kw.synonyms.words.slice(0, 4).join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-500">缩写支持: </span>
                <span className="text-amber-400 font-mono">
                  {kw.synonyms.abbr.slice(0, 4).join(', ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
