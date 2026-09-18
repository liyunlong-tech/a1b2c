import type { LocalePlugin } from '../types';

export const enUSLocale: LocalePlugin = {
  id: 'en-US',
  name: 'English (US)',
  tokens: {
    IF: {
      displayName: 'if',
      emoji: '❓',
      description: 'Conditional branch: executes when condition evaluates to true',
      category: 'control',
      synonyms: ['if', 'when', 'provided', 'suppose'],
      phoneticAbbr: ['if', 'wh', 'pr'],
      phoneticFull: ['if', 'when', 'provided']
    },
    ELSE_IF: {
      displayName: 'elif',
      emoji: '🔀',
      description: 'Alternative branch: checks when previous conditions fail',
      category: 'control',
      synonyms: ['else if', 'elif', 'otherwise if'],
      phoneticAbbr: ['elif', 'ei', 'ow'],
      phoneticFull: ['elseif', 'elif', 'otherwise']
    },
    ELSE: {
      displayName: 'else',
      emoji: '🛑',
      description: 'Fallback branch: executes when all preceding checks fail',
      category: 'control',
      synonyms: ['else', 'otherwise', 'fallback'],
      phoneticAbbr: ['el', 'ow', 'fb'],
      phoneticFull: ['else', 'otherwise', 'fallback']
    },
    FOR: {
      displayName: 'loop',
      emoji: '🔄',
      description: 'Iterative loop over counts or collections',
      category: 'loop',
      synonyms: ['for', 'loop', 'iterate', 'foreach'],
      phoneticAbbr: ['lp', 'it', 'fe'],
      phoneticFull: ['loop', 'iterate', 'foreach']
    },
    WHILE: {
      displayName: 'while',
      emoji: '⏳',
      description: 'Repeats as long as condition stays true',
      category: 'loop',
      synonyms: ['while', 'until', 'aslongas'],
      phoneticAbbr: ['wh', 'ut', 'al'],
      phoneticFull: ['while', 'until', 'aslongas']
    },
    FUNCTION: {
      displayName: 'func',
      emoji: '⚙️',
      description: 'Reusable block of code statements',
      category: 'function',
      synonyms: ['function', 'def', 'action', 'routine'],
      phoneticAbbr: ['fn', 'def', 'rt'],
      phoneticFull: ['function', 'method', 'routine']
    },
    RETURN: {
      displayName: 'return',
      emoji: '📤',
      description: 'Exits function and produces an output value',
      category: 'function',
      synonyms: ['return', 'yield', 'give'],
      phoneticAbbr: ['ret', 'yd'],
      phoneticFull: ['return', 'yield', 'output']
    },
    PRINT: {
      displayName: 'print',
      emoji: '📢',
      description: 'Outputs text or inspected variable to output console',
      category: 'io',
      synonyms: ['print', 'log', 'echo', 'display'],
      phoneticAbbr: ['pr', 'log', 'echo'],
      phoneticFull: ['print', 'log', 'display']
    },
    CONST: {
      displayName: 'const',
      emoji: '🔒',
      description: 'Immutable constant reference',
      category: 'variable',
      synonyms: ['const', 'fixed', 'static'],
      phoneticAbbr: ['cst', 'fix'],
      phoneticFull: ['constant', 'fixed']
    },
    LET: {
      displayName: 'var',
      emoji: '📦',
      description: 'Mutable variable binding',
      category: 'variable',
      synonyms: ['var', 'let', 'set', 'val'],
      phoneticAbbr: ['var', 'let'],
      phoneticFull: ['variable', 'mutate']
    },
    BREAK: {
      displayName: 'break',
      emoji: '💥',
      description: 'Immediately terminates the nearest loop',
      category: 'control',
      synonyms: ['break', 'exit', 'stop'],
      phoneticAbbr: ['brk', 'ext'],
      phoneticFull: ['break', 'exit']
    },
    CONTINUE: {
      displayName: 'continue',
      emoji: '⏭️',
      description: 'Skips current iteration and moves to next',
      category: 'control',
      synonyms: ['continue', 'skip', 'next'],
      phoneticAbbr: ['cnt', 'skp'],
      phoneticFull: ['continue', 'skip']
    },
    TRUE: {
      displayName: 'true',
      emoji: '✅',
      description: 'Boolean truthy value',
      category: 'literal',
      synonyms: ['true', 'yes', 'valid'],
      phoneticAbbr: ['t', 'yes'],
      phoneticFull: ['true', 'affirmative']
    },
    FALSE: {
      displayName: 'false',
      emoji: '❌',
      description: 'Boolean falsy value',
      category: 'literal',
      synonyms: ['false', 'no', 'invalid'],
      phoneticAbbr: ['f', 'no'],
      phoneticFull: ['false', 'negative']
    }
  }
};
