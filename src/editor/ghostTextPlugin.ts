import {
  EditorView,
  WidgetType,
  Decoration,
  keymap
} from '@codemirror/view';
import { StateField, StateEffect, Prec, type Transaction } from '@codemirror/state';
import { predictCodeCompletion, type AIConfig } from '../engine/aiService';

// Effect: 设置或清除幽灵代码
export const setGhostTextEffect = StateEffect.define<string | null>();

class GhostTextWidget extends WidgetType {
  readonly text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  toDOM() {
    const span = document.createElement('span');
    span.className = 'cm-ghost-text';
    span.textContent = this.text;
    return span;
  }
}

export const ghostTextField = StateField.define<string | null>({
  create(): string | null {
    return null;
  },
  update(value: string | null, tr: Transaction): string | null {
    for (const effect of tr.effects) {
      if (effect.is(setGhostTextEffect)) {
        return effect.value;
      }
    }
    // 文档变化或移动光标时如果未显式保留，清除预测
    if (tr.docChanged || tr.selection) {
      return null;
    }
    return value;
  },
  provide: (field: StateField<string | null>) =>
    EditorView.decorations.from(field, (ghostText) => {
      if (!ghostText) return Decoration.none;
      return (view: EditorView) => {
        const sel = view.state.selection.main;
        if (!sel.empty) return Decoration.none;
        const widget = Decoration.widget({
          widget: new GhostTextWidget(ghostText),
          side: 1
        });
        return Decoration.set([widget.range(sel.head)]);
      };
    })
});

/**
 * Tab 快捷键捕获：采纳 AI 幽灵代码预测
 */
export const ghostTextKeymap = Prec.highest(
  keymap.of([
    {
      key: 'Tab',
      run: (view: EditorView) => {
        const ghostText = view.state.field(ghostTextField, false);
        if (ghostText && typeof ghostText === 'string') {
          const head = view.state.selection.main.head;
          view.dispatch({
            changes: { from: head, insert: ghostText },
            selection: { anchor: head + ghostText.length },
            effects: setGhostTextEffect.of(null)
          });
          return true; // 拦截默认 Tab 行动
        }
        return false;
      }
    },
    {
      key: 'Escape',
      run: (view: EditorView) => {
        const ghostText = view.state.field(ghostTextField, false);
        if (ghostText) {
          view.dispatch({
            effects: setGhostTextEffect.of(null)
          });
          return true;
        }
        return false;
      }
    }
  ])
);

/**
 * 监听光标与代码变化，触发防抖 AI 预测
 */
export function createGhostTextListener(getConfig: () => AIConfig) {
  let timer: any = null;

  return EditorView.updateListener.of((update) => {
    if (!update.docChanged && !update.selectionSet) return;

    clearTimeout(timer);
    timer = setTimeout(async () => {
      const config = getConfig();
      if (!config.enabled) return;

      const state = update.view.state;
      const sel = state.selection.main;
      if (!sel.empty) return;

      const head = sel.head;
      const prefix = state.sliceDoc(0, head);
      const suffix = state.sliceDoc(head, Math.min(head + 300, state.doc.length));

      const prediction = await predictCodeCompletion(prefix, suffix, config);
      if (prediction) {
        update.view.dispatch({
          effects: setGhostTextEffect.of(prediction)
        });
      }
    }, 280);
  });
}
