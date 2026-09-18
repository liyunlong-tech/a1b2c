import type { TargetLanguagePlugin } from '../types';

export const javascriptPlugin: TargetLanguagePlugin = {
  id: 'javascript',
  name: 'JavaScript (ES6+)',
  fileExtension: '.js',
  initialCode: `// 🌟 欢迎体验 EmojiScript (智快马 a1b2c) - JavaScript 模式！
// 试一试：
// 1. 输入拼音缩写 "rg" 或 "ys" 会提示如果 (if)
// 2. 直接敲击中文 "要是"、"循环"、"打印"，输入法确认后自动转为标准代码并显示 Emoji
// 3. 点击顶部中间的「运行」按钮即可在控制台查看执行输出！

function calculateGrade(name, score) {
  console.log("正在评估学员:", name, "得分:", score);

  if (score >= 90) {
    console.log("评级: 殿堂级大神！🏆");
    return "A+";
  } else if (score >= 60) {
    console.log("评级: 合格通过！🎉");
    return "Pass";
  } else {
    console.log("评级: 还要再接再厉哦！💪");
    return "Fail";
  }
}

// 模拟成绩单遍历
const students = [
  { name: "小明", score: 95 },
  { name: "小红", score: 82 },
  { name: "小刚", score: 55 }
];

for (let i = 0; i < students.length; i++) {
  const s = students[i];
  calculateGrade(s.name, s.score);
}
`,
  tokens: {
    IF: {
      canonical: 'if',
      snippet: 'if (${condition}) {\n  ${body}\n}',
      sampleSnippet: 'if (score >= 60) {\n  console.log("及格啦！🎉");\n}'
    },
    ELSE_IF: {
      canonical: 'else if',
      snippet: 'else if (${condition}) {\n  ${body}\n}',
      sampleSnippet: 'else if (score >= 80) {\n  console.log("优秀！🌟");\n}'
    },
    ELSE: {
      canonical: 'else',
      snippet: 'else {\n  ${body}\n}',
      sampleSnippet: 'else {\n  console.log("继续加油！💪");\n}'
    },
    FOR: {
      canonical: 'for',
      snippet: 'for (let i = 0; i < ${count}; i++) {\n  ${body}\n}',
      sampleSnippet: 'for (let i = 1; i <= 5; i++) {\n  console.log("第", i, "次报数");\n}'
    },
    WHILE: {
      canonical: 'while',
      snippet: 'while (${condition}) {\n  ${body}\n}',
      sampleSnippet: 'while (hp > 0) {\n  console.log("战斗中...");\n}'
    },
    FUNCTION: {
      canonical: 'function',
      snippet: 'function ${name}(${params}) {\n  ${body}\n}',
      sampleSnippet: 'function sayHello(name) {\n  console.log("你好, " + name);\n}'
    },
    RETURN: {
      canonical: 'return',
      snippet: 'return ${value};',
      sampleSnippet: 'return a + b;'
    },
    PRINT: {
      canonical: 'console.log',
      snippet: 'console.log(${msg});',
      sampleSnippet: 'console.log("🎉 游戏通关！");'
    },
    CONST: {
      canonical: 'const',
      snippet: 'const ${name} = ${value};',
      sampleSnippet: 'const PI = 3.14159;'
    },
    LET: {
      canonical: 'let',
      snippet: 'let ${name} = ${value};',
      sampleSnippet: 'let count = 0;'
    },
    BREAK: {
      canonical: 'break',
      snippet: 'break;',
      sampleSnippet: 'break;'
    },
    CONTINUE: {
      canonical: 'continue',
      snippet: 'continue;',
      sampleSnippet: 'continue;'
    },
    TRUE: {
      canonical: 'true',
      snippet: 'true',
      sampleSnippet: 'true'
    },
    FALSE: {
      canonical: 'false',
      snippet: 'false',
      sampleSnippet: 'false'
    }
  },
  execute: (code, customConsole) => {
    const runFn = new Function('console', code);
    runFn(customConsole);
  }
};
