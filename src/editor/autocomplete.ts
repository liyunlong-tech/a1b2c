import type { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';
import { matchKeywords } from '../engine/pinyinMatcher';
import type { ResolvedKeyword } from '../engine/keywordRegistry';

/**
 * 工厂函数：创建适配当前语言与语种的动态自动补全源
 */
export function createPinyinAutocompleteSource(getKeywords?: () => ResolvedKeyword[]) {
  return function pinyinAutocompleteSource(context: CompletionContext): CompletionResult | null {
    // 获取光标前的连续单词 (包括字母、中文字符)
    const word = context.matchBefore(/[\w\u4e00-\u9fa5]+/);
    if (!word || (word.from === word.to && !context.explicit)) {
      return null;
    }

    const query = word.text;
    const pool = getKeywords ? getKeywords() : undefined;
    const matchResults = matchKeywords(query, pool);

    if (matchResults.length === 0) {
      return null;
    }

    const options: Completion[] = matchResults.map((res) => {
      const kw = res.keyword;
      let detailLabel = '';
      if (res.matchedBy === 'abbr') {
        detailLabel = `(缩写: ${res.matchedTerm} → ${kw.displayName})`;
      } else if (res.matchedBy === 'word') {
        detailLabel = `(母语: ${res.matchedTerm})`;
      } else if (res.matchedBy === 'full') {
        detailLabel = `(全音: ${res.matchedTerm})`;
      } else {
        detailLabel = `(${kw.displayName})`;
      }

      return {
        label: `${kw.emoji} ${kw.canonical}`,
        displayLabel: `${kw.emoji} ${kw.canonical} ${detailLabel}`,
        apply: (view, _completion, from, to) => {
          // 直接应用对应标准关键字
          view.dispatch({
            changes: { from, to, insert: kw.canonical },
            selection: { anchor: from + kw.canonical.length }
          });
        },
        detail: kw.description,
        type: 'keyword',
        boost: res.score
      };
    });

    return {
      from: word.from,
      options,
      validFor: /[\w\u4e00-\u9fa5]+/
    };
  };
}

// 默认补全源
export const pinyinAutocompleteSource = createPinyinAutocompleteSource();
