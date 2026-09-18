import { KEYWORDS, type ResolvedKeyword } from './keywordRegistry';

export interface MatchResult {
  keyword: ResolvedKeyword;
  matchedBy: 'word' | 'abbr' | 'full' | 'canonical';
  matchedTerm: string;
  score: number;
}

/**
 * 根据用户输入的词（无论是母语词汇、缩写、全拼或标准语法），智能匹配出可能的关键字
 */
export function matchKeywords(query: string, customKeywords?: ResolvedKeyword[]): MatchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const pool = customKeywords || KEYWORDS;
  const results: MatchResult[] = [];

  for (const kw of pool) {
    let bestScore = 0;
    let matchedBy: MatchResult['matchedBy'] = 'canonical';
    let matchedTerm = '';

    // 1. 直接匹配标准名 (如 if, for, print)
    if (kw.canonical.toLowerCase().startsWith(trimmed)) {
      const score = 100 - (kw.canonical.length - trimmed.length);
      if (score > bestScore) {
        bestScore = score;
        matchedBy = 'canonical';
        matchedTerm = kw.canonical;
      }
    }

    // 2. 匹配发音/拼音缩写 (如 rg, ys, xh, dy)
    for (const abbr of kw.synonyms.abbr) {
      if (abbr.toLowerCase() === trimmed) {
        const score = 95;
        if (score > bestScore) {
          bestScore = score;
          matchedBy = 'abbr';
          matchedTerm = abbr;
        }
      } else if (abbr.toLowerCase().startsWith(trimmed)) {
        const score = 80;
        if (score > bestScore) {
          bestScore = score;
          matchedBy = 'abbr';
          matchedTerm = abbr;
        }
      }
    }

    // 3. 匹配母语词组/中文词 (如 "如果", "要是", "循环", "打印")
    for (const w of kw.synonyms.words) {
      if (w.toLowerCase() === trimmed) {
        const score = 98;
        if (score > bestScore) {
          bestScore = score;
          matchedBy = 'word';
          matchedTerm = w;
        }
      } else if (w.toLowerCase().startsWith(trimmed)) {
        const score = 85;
        if (score > bestScore) {
          bestScore = score;
          matchedBy = 'word';
          matchedTerm = w;
        }
      }
    }

    // 4. 匹配全拼/全音标 (如 ruguo, yaoshi, xunhuan)
    for (const full of kw.synonyms.full) {
      if (full.toLowerCase() === trimmed) {
        const score = 90;
        if (score > bestScore) {
          bestScore = score;
          matchedBy = 'full';
          matchedTerm = full;
        }
      } else if (full.toLowerCase().startsWith(trimmed)) {
        const score = 75;
        if (score > bestScore) {
          bestScore = score;
          matchedBy = 'full';
          matchedTerm = full;
        }
      }
    }

    if (bestScore > 0) {
      results.push({
        keyword: kw,
        matchedBy,
        matchedTerm,
        score: bestScore
      });
    }
  }

  // 按相关度分数降序排序
  return results.sort((a, b) => b.score - a.score);
}

/**
 * 尝试将一个完全匹配的母语词直接转译为标准代码 (如 "如果" -> "if")
 */
export function exactChineseToCanonical(word: string, customKeywords?: ResolvedKeyword[]): ResolvedKeyword | null {
  const trimmed = word.trim().toLowerCase();
  const pool = customKeywords || KEYWORDS;
  for (const kw of pool) {
    if (kw.synonyms.words.some((w) => w.toLowerCase() === trimmed)) {
      return kw;
    }
  }
  return null;
}
