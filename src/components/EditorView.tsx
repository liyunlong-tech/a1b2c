import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView as CMEditorView, lineNumbers, highlightActiveLineGutter, highlightActiveLine } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';
import { oneDark } from '@codemirror/theme-one-dark';
import { createEmojiPlugin, emojiModeCompartment } from '../editor/emojiPlugin';
import { createPinyinAutocompleteSource } from '../editor/autocomplete';
import { createImeDomHandlers } from '../editor/imeHandler';
import {
  ghostTextField,
  ghostTextKeymap,
  createGhostTextListener
} from '../editor/ghostTextPlugin';
import type { AIConfig } from '../engine/aiService';
import type { ResolvedKeyword } from '../engine/keywordRegistry';

interface EditorViewProps {
  initialDoc: string;
  onChange: (doc: string) => void;
  emojiMode: boolean;
  aiConfig: AIConfig;
  keywords: ResolvedKeyword[];
  onViewCreated?: (view: CMEditorView) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  initialDoc,
  onChange,
  emojiMode,
  aiConfig,
  keywords,
  onViewCreated
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<CMEditorView | null>(null);
  const aiConfigRef = useRef(aiConfig);
  const keywordsRef = useRef(keywords);

  useEffect(() => {
    aiConfigRef.current = aiConfig;
  }, [aiConfig]);

  useEffect(() => {
    keywordsRef.current = keywords;
  }, [keywords]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 动态补全扩展
    const autocompleteExtension = autocompletion({
      override: [createPinyinAutocompleteSource(() => keywordsRef.current)],
      defaultKeymap: true
    });

    const state = EditorState.create({
      doc: initialDoc,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        javascript(),
        oneDark,
        autocompleteExtension,
        createImeDomHandlers(() => keywordsRef.current),
        ghostTextField,
        ghostTextKeymap,
        createGhostTextListener(() => aiConfigRef.current),
        emojiModeCompartment.of(createEmojiPlugin(emojiMode, () => keywordsRef.current)),
        CMEditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        })
      ]
    });

    const view = new CMEditorView({
      state,
      parent: containerRef.current
    });

    editorViewRef.current = view;
    if (onViewCreated) {
      onViewCreated(view);
    }

    return () => {
      view.destroy();
      editorViewRef.current = null;
    };
  }, []);

  // 监听 Emoji 视图或关键词集合热更新
  useEffect(() => {
    const view = editorViewRef.current;
    if (view) {
      view.dispatch({
        effects: emojiModeCompartment.reconfigure(
          createEmojiPlugin(emojiMode, () => keywordsRef.current)
        )
      });
    }
  }, [emojiMode, keywords]);

  return (
    <div className="h-full w-full relative flex flex-col bg-[#282c34] overflow-hidden">
      <div ref={containerRef} className="h-full w-full overflow-hidden" />
    </div>
  );
};
