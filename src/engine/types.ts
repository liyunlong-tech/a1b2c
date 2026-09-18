export type SemanticTokenId =
  | 'IF'
  | 'ELSE_IF'
  | 'ELSE'
  | 'FOR'
  | 'WHILE'
  | 'FUNCTION'
  | 'RETURN'
  | 'PRINT'
  | 'CONST'
  | 'LET'
  | 'BREAK'
  | 'CONTINUE'
  | 'TRUE'
  | 'FALSE';

export type TokenCategory = 'control' | 'loop' | 'function' | 'variable' | 'literal' | 'io';

export interface LanguageTokenDefinition {
  canonical: string;       // 该编程语言中的标准语法关键字，如 JS: "if", "console.log"；Python: "if", "print"
  snippet: string;         // Tab 补全或快速插入时的代码模板
  sampleSnippet?: string;  // 示例代码片段
}

export interface CustomConsole {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export interface TargetLanguagePlugin {
  id: string;               // 唯一标识，如 "javascript", "python"
  name: string;             // 语言显示名称，如 "JavaScript (ES6+)", "Python 3"
  fileExtension: string;    // 文件后缀名，如 ".js", ".py"
  initialCode: string;      // 该语言专属的初始示例代码
  tokens: Record<SemanticTokenId, LanguageTokenDefinition>;
  execute?: (code: string, customConsole: CustomConsole) => Promise<void> | void;
}

export interface LocaleTokenDefinition {
  displayName: string;      // 母语名称，如 "如果", "If"
  emoji: string;            // 渲染的 Emoji，如 "❓"
  description: string;      // 母语功能解释
  category: TokenCategory;
  synonyms: string[];       // 母语同义词组，如 ["如果", "要是", "假设"]
  phoneticAbbr: string[];   // 发音/输入法缩写，如 ["rg", "ys"]
  phoneticFull: string[];   // 发音全拼，如 ["ruguo", "yaoshi"]
}

export interface LocalePlugin {
  id: string;               // 如 "zh-CN", "en-US"
  name: string;             // 如 "简体中文 (拼音)", "English (US)"
  tokens: Record<SemanticTokenId, LocaleTokenDefinition>;
}

/**
 * 运行时动态合成后的关键字模型
 */
export interface ResolvedKeyword {
  id: SemanticTokenId;
  canonical: string;
  emoji: string;
  displayName: string;
  description: string;
  category: TokenCategory;
  synonyms: {
    words: string[];
    abbr: string[];
    full: string[];
  };
  snippet: string;
  sampleSnippet?: string;
}
