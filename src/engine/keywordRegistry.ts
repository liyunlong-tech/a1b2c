import type {
  SemanticTokenId,
  TargetLanguagePlugin,
  LocalePlugin,
  ResolvedKeyword
} from './types';
import { javascriptPlugin } from './languages/javascript';
import { pythonPlugin } from './languages/python';
import { zhCNLocale } from './locales/zhCN';
import { enUSLocale } from './locales/enUS';

export * from './types';

// 向后兼容类型别名
export type KeywordMapping = ResolvedKeyword;

class LanguageEngineManager {
  private languages = new Map<string, TargetLanguagePlugin>();
  private locales = new Map<string, LocalePlugin>();

  constructor() {
    // 默认注册初始内置编程语言与自然语种
    this.registerLanguage(javascriptPlugin);
    this.registerLanguage(pythonPlugin);

    this.registerLocale(zhCNLocale);
    this.registerLocale(enUSLocale);
  }

  registerLanguage(plugin: TargetLanguagePlugin) {
    this.languages.set(plugin.id, plugin);
  }

  registerLocale(plugin: LocalePlugin) {
    this.locales.set(plugin.id, plugin);
  }

  getLanguage(id: string): TargetLanguagePlugin {
    return this.languages.get(id) || this.languages.get('javascript')!;
  }

  getLocale(id: string): LocalePlugin {
    return this.locales.get(id) || this.locales.get('zh-CN')!;
  }

  getAllLanguages(): TargetLanguagePlugin[] {
    return Array.from(this.languages.values());
  }

  getAllLocales(): LocalePlugin[] {
    return Array.from(this.locales.values());
  }

  /**
   * 根据选定的目标编程语言和自然语种，动态合成当前激活的关键字映射列表
   */
  resolveKeywords(langId: string = 'javascript', localeId: string = 'zh-CN'): ResolvedKeyword[] {
    const lang = this.getLanguage(langId);
    const locale = this.getLocale(localeId);

    const tokenIds: SemanticTokenId[] = [
      'IF',
      'ELSE_IF',
      'ELSE',
      'FOR',
      'WHILE',
      'FUNCTION',
      'RETURN',
      'PRINT',
      'CONST',
      'LET',
      'BREAK',
      'CONTINUE',
      'TRUE',
      'FALSE'
    ];

    return tokenIds.map((tid) => {
      const langToken = lang.tokens[tid];
      const locToken = locale.tokens[tid];

      return {
        id: tid,
        canonical: langToken.canonical,
        emoji: locToken.emoji,
        displayName: locToken.displayName,
        description: locToken.description,
        category: locToken.category,
        synonyms: {
          words: locToken.synonyms,
          abbr: locToken.phoneticAbbr,
          full: locToken.phoneticFull
        },
        snippet: langToken.snippet,
        sampleSnippet: langToken.sampleSnippet
      };
    });
  }
}

export const languageManager = new LanguageEngineManager();

// 默认兼容导出的当前关键字集合 (JavaScript + zh-CN)
export const KEYWORDS: ResolvedKeyword[] = languageManager.resolveKeywords('javascript', 'zh-CN');

export const KEYWORD_BY_CANONICAL = new Map<string, ResolvedKeyword>();
KEYWORDS.forEach((kw) => {
  KEYWORD_BY_CANONICAL.set(kw.canonical, kw);
});
