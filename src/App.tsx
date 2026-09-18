import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { EditorView } from './components/EditorView';
import { OutputConsole, type ConsoleLogItem } from './components/OutputConsole';
import { CheatSheet } from './components/CheatSheet';
import { SettingsSidebar } from './components/SettingsSidebar';
import { AboutModal } from './components/AboutModal';
import { languageManager } from './engine/keywordRegistry';
import type { AIConfig } from './engine/aiService';
import { EditorView as CMEditorView } from '@codemirror/view';
import { Code2, Terminal as TerminalIcon } from 'lucide-react';

export const App: React.FC = () => {
  // 编程语言与语种热插拔状态
  const [currentLangId, setCurrentLangId] = useState<string>('javascript');
  const [currentLocaleId, setCurrentLocaleId] = useState<string>('zh-CN');

  const currentLanguage = useMemo(
    () => languageManager.getLanguage(currentLangId),
    [currentLangId]
  );
  const currentLocale = useMemo(
    () => languageManager.getLocale(currentLocaleId),
    [currentLocaleId]
  );
  const activeKeywords = useMemo(
    () => languageManager.resolveKeywords(currentLangId, currentLocaleId),
    [currentLangId, currentLocaleId]
  );

  const [code, setCode] = useState(currentLanguage.initialCode);
  const [emojiMode, setEmojiMode] = useState(true);

  // 抽屉与模态框状态
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const [logs, setLogs] = useState<ConsoleLogItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    enabled: true,
    modelName: 'gpt-4o-mini'
  });

  const editorInstanceRef = useRef<CMEditorView | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditorCreated = useCallback((view: CMEditorView) => {
    editorInstanceRef.current = view;
  }, []);

  // 执行代码沙箱
  const handleRun = async () => {
    setIsRunning(true);
    const newLogs: ConsoleLogItem[] = [];
    const now = () => new Date().toLocaleTimeString();

    newLogs.push({
      type: 'info',
      content: `🚀 开始执行 [${currentLanguage.name}] 代码...`,
      time: now()
    });

    const customConsole = {
      log: (...args: any[]) => {
        const text = args
          .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
          .join(' ');
        newLogs.push({ type: 'log', content: text, time: now() });
      },
      warn: (...args: any[]) => {
        newLogs.push({ type: 'warn', content: args.map(String).join(' '), time: now() });
      },
      error: (...args: any[]) => {
        newLogs.push({ type: 'error', content: args.map(String).join(' '), time: now() });
      }
    };

    try {
      if (currentLanguage.execute) {
        await currentLanguage.execute(code, customConsole);
      } else {
        customConsole.warn(`⚠️ 语言 [${currentLanguage.name}] 暂未配置专属浏览器执行环境。`);
      }
      newLogs.push({
        type: 'success',
        content: '✨ 执行成功完毕 (Exit Code: 0)',
        time: now()
      });
    } catch (err: any) {
      newLogs.push({
        type: 'error',
        content: `执行出错: ${err?.message || String(err)}`,
        time: now()
      });
    } finally {
      setLogs((prev) => [...prev, ...newLogs]);
      setIsRunning(false);
    }
  };

  // 复制底层纯净代码
  const handleCopyRaw = () => {
    navigator.clipboard.writeText(code);
  };

  // 切换编程语言（热插拔）
  const handleSelectLanguage = (langId: string) => {
    if (langId === currentLangId) return;
    const nextLang = languageManager.getLanguage(langId);
    const shouldSwitchCode = confirm(
      `已切换为 ${nextLang.name}。是否同时载入该语言的专属示例代码？\n（点击“取消”将保留当前代码文本）`
    );
    setCurrentLangId(langId);
    if (shouldSwitchCode) {
      setCode(nextLang.initialCode);
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispatch({
          changes: {
            from: 0,
            to: editorInstanceRef.current.state.doc.length,
            insert: nextLang.initialCode
          }
        });
      }
    }
  };

  // 切换母语语种（热插拔）
  const handleSelectLocale = (localeId: string) => {
    setCurrentLocaleId(localeId);
  };

  // 重置为当前语言预设代码
  const handleReset = () => {
    if (confirm(`确认要重置为 [${currentLanguage.name}] 初始示例代码吗？`)) {
      setCode(currentLanguage.initialCode);
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispatch({
          changes: {
            from: 0,
            to: editorInstanceRef.current.state.doc.length,
            insert: currentLanguage.initialCode
          }
        });
      }
    }
  };

  // 菜单动作：新建文件
  const handleNewFile = () => {
    if (confirm('新建文件将清空当前编辑区，是否继续？')) {
      const emptyDoc = `// 新建代码文件 (${currentLanguage.name})\n\n`;
      setCode(emptyDoc);
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispatch({
          changes: {
            from: 0,
            to: editorInstanceRef.current.state.doc.length,
            insert: emptyDoc
          }
        });
      }
    }
  };

  // 菜单动作：打开文件
  const handleOpenFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setCode(content);
        if (editorInstanceRef.current) {
          editorInstanceRef.current.dispatch({
            changes: {
              from: 0,
              to: editorInstanceRef.current.state.doc.length,
              insert: content
            }
          });
        }
      }
    };
    reader.readAsText(file);
  };

  // 菜单动作：保存文件
  const handleSaveFile = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `main${currentLanguage.fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 从速查表中插入代码
  const handleInsertCode = (insertText: string) => {
    if (editorInstanceRef.current) {
      const view = editorInstanceRef.current;
      const pos = view.state.selection.main.head;
      view.dispatch({
        changes: { from: pos, insert: '\n' + insertText + '\n' },
        selection: { anchor: pos + insertText.length + 2 }
      });
      view.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* 隐藏的文件读取 input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".js,.ts,.py,.txt"
      />

      {/* 顶部导航 */}
      <Header
        onRun={handleRun}
        isRunning={isRunning}
        onCopyRaw={handleCopyRaw}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        onToggleHelp={() => setIsCheatSheetOpen(!isCheatSheetOpen)}
        onNewFile={handleNewFile}
        onOpenFile={handleOpenFile}
        onSaveFile={handleSaveFile}
        onOpenAbout={() => setIsAboutOpen(true)}
        currentLanguageName={currentLanguage.name}
      />

      {/* 主工作区 */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 左侧：EmojiScript 编辑器 */}
        <div className="flex-1 flex flex-col border-r border-slate-800 min-w-0">
          <div className="h-8 bg-slate-900/90 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-indigo-400" />
              <span className="font-semibold text-slate-200">EmojiScript 编辑区</span>
              {emojiMode && (
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300">
                  Emoji 视觉已激活
                </span>
              )}
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-400">
                语种: {currentLocale.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-slate-800 rounded border border-slate-700">Tab</kbd>
                采纳补全
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-slate-800 rounded border border-slate-700">Esc</kbd>
                取消
              </span>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <EditorView
              initialDoc={code}
              onChange={setCode}
              emojiMode={emojiMode}
              aiConfig={aiConfig}
              keywords={activeKeywords}
              onViewCreated={handleEditorCreated}
            />
          </div>
        </div>

        {/* 右侧：上下分栏（原生代码只读对照 + 输出控制台） */}
        <div className="w-full md:w-[460px] lg:w-[500px] flex flex-col shrink-0 bg-slate-900/50">
          {/* 上部：原生标准代码对照 */}
          <div className="flex-1 flex flex-col min-h-0 border-b border-slate-800">
            <div className="h-8 bg-slate-900/90 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-emerald-400" />
                <span className="font-semibold text-slate-200">
                  底层标准 {currentLanguage.name} 对照
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">100% 工业级代码</span>
            </div>
            <div className="flex-1 overflow-auto p-3 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed select-text">
              <pre className="whitespace-pre-wrap">{code}</pre>
            </div>
          </div>

          {/* 下部：运行结果控制台 */}
          <div className="h-60 flex flex-col">
            <OutputConsole logs={logs} onClear={() => setLogs([])} isRunning={isRunning} />
          </div>
        </div>
      </div>

      {/* 右侧抽屉：设置侧边栏 */}
      <SettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        languages={languageManager.getAllLanguages()}
        currentLangId={currentLangId}
        onSelectLanguage={handleSelectLanguage}
        locales={languageManager.getAllLocales()}
        currentLocaleId={currentLocaleId}
        onSelectLocale={handleSelectLocale}
        emojiMode={emojiMode}
        onToggleEmojiMode={() => setEmojiMode(!emojiMode)}
        aiConfig={aiConfig}
        onUpdateAiConfig={setAiConfig}
        onResetCode={handleReset}
      />

      {/* 右侧抽屉：帮助与速查词典 */}
      <CheatSheet
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onInsertCode={handleInsertCode}
        keywords={activeKeywords}
        languageName={currentLanguage.name}
        localeName={currentLocale.name}
      />

      {/* 关于模态框 */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default App;
