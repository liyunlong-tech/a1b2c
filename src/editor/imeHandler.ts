import { EditorView } from '@codemirror/view';
import { exactChineseToCanonical } from '../engine/pinyinMatcher';
import type { ResolvedKeyword } from '../engine/keywordRegistry';

/**
 * 监听输入法合成事件 (compositionend)
 * 当用户敲定母语词（例如输入“要是”、“如果”、“循环”、“打印”或英文别名）后，直接将其自动置换为标准代码
 */
export function createImeDomHandlers(getKeywords?: () => ResolvedKeyword[]) {
  return EditorView.domEventHandlers({
    compositionend(event: CompositionEvent, view: EditorView) {
      const insertedText = event.data;
      if (!insertedText) return;

      const pool = getKeywords ? getKeywords() : undefined;
      const matchedKw = exactChineseToCanonical(insertedText, pool);
      if (matchedKw) {
        // 等待微任务，确保 DOM 输入同步到 state 后再执行置换
        setTimeout(() => {
          const state = view.state;
          const cursorPos = state.selection.main.head;
          const textBefore = state.sliceDoc(Math.max(0, cursorPos - insertedText.length), cursorPos);

          if (textBefore === insertedText) {
            view.dispatch({
              changes: {
                from: cursorPos - insertedText.length,
                to: cursorPos,
                insert: matchedKw.canonical
              },
              selection: { anchor: cursorPos - insertedText.length + matchedKw.canonical.length }
            });
          }
        }, 10);
      }
    }
  });
}
