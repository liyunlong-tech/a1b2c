export interface AIConfig {
  enabled: boolean;
  apiKey?: string;
  apiEndpoint?: string; // 兼容 OpenAI 格式或自定义 URL
  modelName?: string;
}

/**
 * 规则模式：当未配置 LLM API 或需要毫秒级本地响应时触发的智能补全
 */
function localRulePredictor(codeBeforeCursor: string): string | null {
  const trimmed = codeBeforeCursor.trimEnd();

  // 1. 在 if / while 条件括号后换行
  if (/if\s*\([^)]+\)\s*\{$/.test(trimmed)) {
    return '\n  console.log("条件满足！");\n}';
  }
  if (/else\s*\{$/.test(trimmed)) {
    return '\n  console.log("其它情况处理");\n}';
  }

  // 2. 针对 for 循环
  if (/for\s*\([^)]+\)\s*\{$/.test(trimmed)) {
    return '\n  console.log("当前计数:", i);\n}';
  }

  // 3. 针对 function 声明
  if (/function\s+\w+\s*\([^)]*\)\s*\{$/.test(trimmed)) {
    return '\n  let result = 0;\n  return result;\n}';
  }

  // 4. 在 let / const 后面
  if (/(?:let|const)\s+(\w+)\s*=\s*$/.test(trimmed)) {
    return '0;';
  }

  // 5. 注释驱动补全 (Vibe Coding 灵魂体验)
  const lastLine = trimmed.split('\n').pop() || '';
  if (lastLine.includes('// 打印') || lastLine.includes('// 输出')) {
    return '\nconsole.log("✨ 欢迎体验 EmojiScript 编辑器！");';
  }
  if (lastLine.includes('// 求和') || lastLine.includes('// 计算总和')) {
    return '\nlet sum = 0;\nfor (let i = 1; i <= 100; i++) {\n  sum += i;\n}\nconsole.log("总和结果:", sum);';
  }
  if (lastLine.includes('// 判断偶数') || lastLine.includes('// 判断奇偶')) {
    return '\nif (num % 2 === 0) {\n  console.log(num + " 是偶数");\n} else {\n  console.log(num + " 是奇数");\n}';
  }
  if (lastLine.includes('// 斐波那契') || lastLine.includes('// fibonacci')) {
    return '\nfunction fib(n) {\n  if (n <= 1) {\n    return n;\n  }\n  return fib(n - 1) + fib(n - 2);\n}';
  }

  return null;
}

/**
 * 请求 AI 补全预测 (Tab 键幽灵文本)
 */
export async function predictCodeCompletion(
  prefixCode: string,
  suffixCode: string,
  config: AIConfig
): Promise<string | null> {
  if (!config.enabled) return null;

  // 优先尝试本地轻量规则预测 (极致响应)
  const localPrediction = localRulePredictor(prefixCode);
  if (localPrediction) {
    return localPrediction;
  }

  // 如果配置了 OpenAI / 自定义 LLM API Key，发起调用
  if (config.apiKey && config.apiEndpoint) {
    try {
      const prompt = `You are a fast code completion AI for JavaScript in a code editor.
Context before cursor:
"""
${prefixCode.slice(-600)}
"""
Context after cursor:
"""
${suffixCode.slice(0, 200)}
"""

Instruction: Complete the code starting immediately from the cursor.
Output ONLY the continuation code. Do not wrap in markdown code blocks. Keep it concise (1 to 4 lines maximum).`;

      const endpoint = config.apiEndpoint.replace(/\/+$/, '') + '/chat/completions';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.modelName || 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 80
        })
      });

      if (!response.ok) return null;
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '';
      return text.replace(/```[a-z]*\n?/gi, '').trimEnd() || null;
    } catch (e) {
      console.warn('AI 补全请求失败:', e);
      return null;
    }
  }

  return null;
}
