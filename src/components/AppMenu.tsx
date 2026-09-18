import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  FilePlus,
  FolderOpen,
  Save,
  Settings,
  Info
} from 'lucide-react';

interface AppMenuProps {
  onNewFile: () => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
}

export const AppMenu: React.FC<AppMenuProps> = ({
  onNewFile,
  onOpenFile,
  onSaveFile,
  onOpenSettings,
  onOpenAbout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部自动关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (callback: () => void) => {
    callback();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* 菜单触发图标 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition flex items-center justify-center ${
          isOpen
            ? 'bg-slate-800 text-indigo-400 border border-indigo-500/40'
            : 'hover:bg-slate-800/80 text-slate-300 hover:text-white border border-transparent'
        }`}
        title="主菜单"
        aria-label="打开主菜单"
      >
        <Menu size={18} />
      </button>

      {/* 下拉菜单面板 */}
      {isOpen && (
        <div className="absolute top-11 left-0 z-50 w-52 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-1.5 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 border-b border-slate-800/80 uppercase tracking-wider">
            项目与操作
          </div>

          <div className="py-1">
            {/* 新建 */}
            <button
              onClick={() => handleAction(onNewFile)}
              className="w-full px-3 py-2 text-xs flex items-center justify-between text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 transition group"
            >
              <div className="flex items-center gap-2.5">
                <FilePlus size={15} className="text-slate-400 group-hover:text-indigo-400 transition" />
                <span>新建 (New)</span>
              </div>
              <span className="text-[10px] text-slate-400">清空画布</span>
            </button>

            {/* 打开 */}
            <button
              onClick={() => handleAction(onOpenFile)}
              className="w-full px-3 py-2 text-xs flex items-center justify-between text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 transition group"
            >
              <div className="flex items-center gap-2.5">
                <FolderOpen size={15} className="text-slate-400 group-hover:text-indigo-400 transition" />
                <span>打开 (Open)</span>
              </div>
              <span className="text-[10px] text-slate-400">导入文件</span>
            </button>

            {/* 保存 */}
            <button
              onClick={() => handleAction(onSaveFile)}
              className="w-full px-3 py-2 text-xs flex items-center justify-between text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 transition group"
            >
              <div className="flex items-center gap-2.5">
                <Save size={15} className="text-slate-400 group-hover:text-indigo-400 transition" />
                <span>保存 (Save)</span>
              </div>
              <span className="text-[10px] text-slate-400">下载源码</span>
            </button>
          </div>

          <div className="h-px bg-slate-800/80 my-1" />

          <div className="py-1">
            {/* 设置 */}
            <button
              onClick={() => handleAction(onOpenSettings)}
              className="w-full px-3 py-2 text-xs flex items-center gap-2.5 text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 transition group"
            >
              <Settings size={15} className="text-slate-400 group-hover:text-indigo-400 transition" />
              <span>设置 (Settings)</span>
            </button>

            {/* 关于 */}
            <button
              onClick={() => handleAction(onOpenAbout)}
              className="w-full px-3 py-2 text-xs flex items-center gap-2.5 text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 transition group"
            >
              <Info size={15} className="text-slate-400 group-hover:text-indigo-400 transition" />
              <span>关于 (About)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
