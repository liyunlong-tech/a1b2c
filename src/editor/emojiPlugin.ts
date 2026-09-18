import {
  ViewPlugin,
  EditorView,
  ViewUpdate,
  Decoration,
  WidgetType
} from '@codemirror/view';
import type { DecorationSet } from '@codemirror/view';
import { RangeSetBuilder, Compartment } from '@codemirror/state';
import { KEYWORDS, type ResolvedKeyword } from '../engine/keywordRegistry';

export const emojiModeCompartment = new Compartment();

/**
 * 自定义 Emoji 关键词 Widget
 */
class EmojiKeywordWidget extends WidgetType {
  keyword: ResolvedKeyword;

  constructor(keyword: ResolvedKeyword) {
    super();
    this.keyword = keyword;
  }

  eq(other: EmojiKeywordWidget) {
    return other.keyword.id === this.keyword.id && other.keyword.canonical === this.keyword.canonical;
  }

  toDOM() {
    const span = document.createElement('span');
    span.className = 'emoji-keyword-widget';
    
    // 悬停气泡详细信息
    const abbrList = this.keyword.synonyms.abbr.join(', ');
    const wordList = this.keyword.synonyms.words.join('、');
    span.title = `【${this.keyword.displayName}】标准代码: ${this.keyword.canonical}\n功能: ${this.keyword.description}\n可输入母语: ${wordList}\n快捷/发音简写: ${abbrList}`;

    const emojiEl = document.createElement('span');
    emojiEl.className = 'emoji-symbol';
    emojiEl.textContent = this.keyword.emoji;

    const textEl = document.createElement('span');
    textEl.className = 'emoji-subtext';
    textEl.textContent = this.keyword.displayName;

    span.appendChild(emojiEl);
    span.appendChild(textEl);
    return span;
  }

  ignoreEvent() {
    return false;
  }
}

/**
 * 依据文档内容构建 Emoji 装饰 RangeSet
 */
function buildEmojiDecorations(view: EditorView, enabled: boolean, keywords: ResolvedKeyword[] = KEYWORDS): DecorationSet {
  if (!enabled) return Decoration.none;

  const builder = new RangeSetBuilder<Decoration>();
  const doc = view.state.doc;

  // 将所有关键字按长度从长到短排序，防止 "else if" 被截断成 "else"
  const sortedKeywords = [...keywords].sort((a, b) => b.canonical.length - a.canonical.length);

  for (const { from, to } of view.visibleRanges) {
    let pos = from;
    while (pos < to) {
      const line = doc.lineAt(pos);
      const lineText = line.text;

      // 遍历所有关键词，使用正则全词匹配
      for (const kw of sortedKeywords) {
        // 避开标识符内的子串，例如 "diff" 中的 "if"
        // 对于 "console.log" 等特殊词转义
        const escaped = kw.canonical.replace('.', '\\.');
        const regex = new RegExp(`(?<![a-zA-Z0-9_$])${escaped}(?![a-zA-Z0-9_$])`, 'g');

        let match: RegExpExecArray | null;
        while ((match = regex.exec(lineText)) !== null) {
          const matchStart = line.from + match.index;
          const matchEnd = matchStart + kw.canonical.length;

          if (matchStart >= from && matchEnd <= to) {
            builder.add(
              matchStart,
              matchEnd,
              Decoration.replace({
                widget: new EmojiKeywordWidget(kw),
                inclusive: false
              })
            );
          }
        }
      }

      pos = line.to + 1;
    }
  }

  return builder.finish();
}

/**
 * CodeMirror 6 Emoji 插件
 */
export function createEmojiPlugin(initialEnabled: boolean = true, getKeywords?: () => ResolvedKeyword[]) {
  const isEnabled = initialEnabled;

  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        const kws = getKeywords ? getKeywords() : KEYWORDS;
        this.decorations = buildEmojiDecorations(view, isEnabled, kws);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          const kws = getKeywords ? getKeywords() : KEYWORDS;
          this.decorations = buildEmojiDecorations(update.view, isEnabled, kws);
        }
      }
    },
    {
      decorations: v => v.decorations
    }
  );
}
