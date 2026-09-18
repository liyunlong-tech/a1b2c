# 🐎 智快马 (a1b2c)

> **AI-powered Block-to-Code: 从积木跨向文本代码的智能飞跃**  
> *内部开发代号：`epic-babbage`*

---

## 📖 名字背后的巧思 (The Story Behind the Name)

- **仓库名称 `a1b2c`**：
  - **`a1`**：**AI-powered**（以 AI 赋能为核心；“1” 谐音 “I”，兼具 First / 新一代之意）。
  - **`b2c`**：**Block to Code**（从图形化积木向纯文本代码跃迁），同时借势商业概念 B2C 的极简对称结构，仅 5 个字符，过目不忘。
- **中文名称 `智快马`**：
  - **智能块编码**的谐音（智 = AI 智能，快 = 积木 Block 谐音 + 输入极速，马 = 代码 Code 谐音）。
  - 蕴含“快马加鞭”、“一马当先”的动感意象，让青少年与初学者在告别积木、初探代码时策马飞驰。
- **内部代号 `epic-babbage`**：
  - 致敬计算机科学先驱 **查尔斯·巴贝奇（Charles Babbage）**，赋予项目硬核极客的历史底蕴。

---

## 🎯 产品定位 (Product Positioning)

**智快马 (a1b2c)** 是一款专为**初学者从“图形化积木编程”（Scratch / Blockly 等）平滑过渡到“工业级文本代码编程”（JavaScript / TypeScript 等）**而设计的过渡型交互编辑器。

### 为什么需要智快马？
在传统的编程学习路径中，学习者在从积木迈向真实代码时常常遭遇三大门槛：
1. **视觉断崖**：从色彩丰富、图形直观的积木，瞬间掉入黑底白字、密密麻麻的英文符号海洋。
2. **输入障碍**：非英语母语者需频繁在中文输入法与半角英文键盘之间来回切换，打字心智负担沉重。
3. **语法恐惧**：抽象的语法规则（如 `for`、`console.log`）难以快速建立直观对应。

**智快马**通过保留积木式的视觉锚点，融入母语拼音直输和 AI 辅助，成为帮助初学者安全跨越鸿沟的“脚手架与护栏”。

---

## ✨ 核心特性 (Key Features)

### 1. 🔤 母语拼音直出，无需频繁切键盘
- **拼音简拼/全拼联想**：输入 `rg` 或 `ys` 即可快速补全 `if`，输入 `xh` 联想 `for`。
- **IME 自动捕获与口语转义**：无需切换至英文键盘，直接输入中文口语“要是”、“循环”、“打印”，在输入法确认后自动转义为规范的标准 JavaScript 语法。
- **国际化前瞻**：中文拼音是多语言本地化的先行先试，底层架构预留了多语种扩展能力。

### 2. 🎨 Emoji 视觉徽章（积木感留存，标准代码在芯）
- **表层生动**：在编辑器中通过 CodeMirror 视觉层装饰，为关键字自动配上生动的 Emoji（❓ 条件分支、🔄 循环结构、📢 控制台输出、⚙️ 函数等），唤醒图形积木的记忆。
- **底层纯正**：**视觉层虽然绚丽，但落盘与执行的始终是 100% 现代标准 JavaScript**，保证用户写出的就是能在生产环境运行的真实代码。

### 3. 🤖 AI 幽灵文本（Ghost Text Tab 补全）
- 模拟专业级 IDE（如 GitHub Copilot）体验，当光标换行或编写注释后，灰色的预测文本自然浮现，按 `Tab` 键一键采纳，帮助初学者建立代码语感。

### 4. 🚀 内置安全沙箱与实时控制台
- 纯前端隔离执行环境，内置日志拦截与格式化输出，代码运行结果即敲即现，无需复杂的本地 Node.js 或编译器配置。

---

## 🗺️ 未来路线图 (Roadmap)

- [ ] **多语种本地化扩充**：支持日语罗马字/假名、韩语谚文、西班牙语等更多母语关键字转义。
- [ ] **积木-代码双向联动视图 (Split View)**：左侧积木拖拽，右侧智快马实时生成带 Emoji 徽标的文本代码。
- [ ] **生态插件化**：将拼音转义与 Emoji 装饰能力打包为独立 NPM 包（`@a1b2c/core`）与 VS Code 插件（`vscode-a1b2c`）。
- [ ] **教育闯关模式**：针对语法概念设计由浅入深的趣味交互关卡。

---

## 🛠️ 本地开发环境与技术栈 (Development Setup)

本项目基于现代 Web 前端技术栈构建：
- **核心框架**：React 19 + TypeScript + Vite
- **代码编辑器**：CodeMirror 6 (`@codemirror/view`, `@codemirror/state`, `@codemirror/autocomplete`)
- **样式方案**：Tailwind CSS v4 + Lucide React 图标库

### 启动项目
```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务
npm run dev

# 3. 构建生产包
npm run build
```

---

## 附录：原模板说明 (Template Reference)

<details>
<summary>点击展开原 Vite + Oxlint 模板配置说明</summary>

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

#### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

#### Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

</details>

