import type { TargetLanguagePlugin } from '../types';

export const pythonPlugin: TargetLanguagePlugin = {
  id: 'python',
  name: 'Python 3',
  fileExtension: '.py',
  initialCode: `# 🐍 欢迎体验 EmojiScript (智快马 a1b2c) - Python 模式！
# 试一试：
# 1. 输入拼音缩写 "dy" 会提示打印 (print)
# 2. 直接输入中文 "函数" 自动转为 def，输入 "如果" 自动转为 if
# 3. 顶栏居中「运行」按钮支持即时运行预览！

def calculate_grade(name, score):
    print(f"正在评估学员: {name} 得分: {score}")

    if score >= 90:
        print("评级: 殿堂级大神！🏆")
        return "A+"
    elif score >= 60:
        print("评级: 合格通过！🎉")
        return "Pass"
    else:
        print("评级: 还要再接再厉哦！💪")
        return "Fail"

# 模拟成绩单遍历
students = [
    {"name": "小明", "score": 95},
    {"name": "小红", "score": 82},
    {"name": "小刚", "score": 55}
]

for s in students:
    calculate_grade(s["name"], s["score"])
`,
  tokens: {
    IF: {
      canonical: 'if',
      snippet: 'if ${condition}:\n    ${body}',
      sampleSnippet: 'if score >= 60:\n    print("及格啦！🎉")'
    },
    ELSE_IF: {
      canonical: 'elif',
      snippet: 'elif ${condition}:\n    ${body}',
      sampleSnippet: 'elif score >= 80:\n    print("优秀！🌟")'
    },
    ELSE: {
      canonical: 'else',
      snippet: 'else:\n    ${body}',
      sampleSnippet: 'else:\n    print("继续加油！💪")'
    },
    FOR: {
      canonical: 'for',
      snippet: 'for i in range(${count}):\n    ${body}',
      sampleSnippet: 'for i in range(1, 6):\n    print("第", i, "次报数")'
    },
    WHILE: {
      canonical: 'while',
      snippet: 'while ${condition}:\n    ${body}',
      sampleSnippet: 'while hp > 0:\n    print("战斗中...")'
    },
    FUNCTION: {
      canonical: 'def',
      snippet: 'def ${name}(${params}):\n    ${body}',
      sampleSnippet: 'def say_hello(name):\n    print("你好, " + name)'
    },
    RETURN: {
      canonical: 'return',
      snippet: 'return ${value}',
      sampleSnippet: 'return a + b'
    },
    PRINT: {
      canonical: 'print',
      snippet: 'print(${msg})',
      sampleSnippet: 'print("🎉 游戏通关！")'
    },
    CONST: {
      canonical: 'CONST',
      snippet: '${NAME} = ${value}',
      sampleSnippet: 'PI = 3.14159'
    },
    LET: {
      canonical: 'var',
      snippet: '${name} = ${value}',
      sampleSnippet: 'count = 0'
    },
    BREAK: {
      canonical: 'break',
      snippet: 'break',
      sampleSnippet: 'break'
    },
    CONTINUE: {
      canonical: 'continue',
      snippet: 'continue',
      sampleSnippet: 'continue'
    },
    TRUE: {
      canonical: 'True',
      snippet: 'True',
      sampleSnippet: 'True'
    },
    FALSE: {
      canonical: 'False',
      snippet: 'False',
      sampleSnippet: 'False'
    }
  },
  execute: (code, customConsole) => {
    // 轻量级 Python 执行模拟器：解析 print 语句及基础表达式
    const lines = code.split('\n');
    let printed = false;
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      const printMatch = line.match(/^print\((.*)\)$/);
      if (printMatch) {
        printed = true;
        let content = printMatch[1];
        // 尝试去除外部引号或 f-string 标记
        if (content.startsWith('f"') && content.endsWith('"')) {
          content = content.slice(2, -1);
        } else if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
          content = content.slice(1, -1);
        }
        customConsole.log(content);
      }
    }
    if (!printed) {
      customConsole.log('🐍 [Python 解释器] 脚本执行完毕，未产生标准输出。');
    }
  }
};
