# 变更记录 (Changelog)

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 格式标准，并遵守 [语义化版本 2.0.0 (Semantic Versioning)](https://semver.org/lang/zh-CN/) 规范。

---

## [0.2.0] - 2026-09-18

### 🌟 重构概述
完成系统架构的热插拔解耦重构与现代化 IDE 界面交互升级：
1. **多语言与多母语语种解耦 (Pluggable Architecture)**：将语义词元、目标编程语言包与自然语种包完全拆分，支持在运行时无缝热插拔（内置 JavaScript / Python 双语言，简体中文 / 英文双语种）。
2. **界面交互与布局重构**：新增左上角下拉菜单（新建、打开、保存、设置、关于）、顶栏居中高亮运行按钮、右上角独立设置侧边栏抽屉与帮助图标。

---

### ✨ 新增与重构特性 (Refactored & Added)

#### 1. 编程语言与自然语种独立封装及热插拔 (`src/engine/`)
- **语义抽象层 (`types.ts`)**：
  - 定义统一的词元规范 `SemanticTokenId`（`IF`, `FOR`, `FUNCTION`, `PRINT`, `CONST` 等）。
  - 定义目标语言插件接口 `TargetLanguagePlugin` 与本地母语插件接口 `LocalePlugin`。
  - 定义运行时动态合成的数据模型 `ResolvedKeyword`。
- **目标编程语言包 (`src/engine/languages/`)**：
  - [`javascript.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/engine/languages/javascript.ts)：封装 JavaScript 关键字映射、语法骨架、演示案例及浏览器沙箱执行器。
  - [`python.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/engine/languages/python.ts)：新增封装 Python 3 关键字映射（`def`, `print`, `elif`, `for in range`）、专属演示案例与轻量执行输出模拟器。
- **自然语种本地化包 (`src/engine/locales/`)**：
  - [`zhCN.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/engine/locales/zhCN.ts)：封装简体中文同义词库、拼音简拼/全拼检索字典与中文提示卡片。
  - [`enUS.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/engine/locales/enUS.ts)：新增封装英文别名、缩写及说明，支持跨国语境。
- **语言引擎管理器 (`keywordRegistry.ts`)**：
  - 构建 `LanguageEngineManager`，提供 `registerLanguage`、`registerLocale`、`resolveKeywords`。
  - 支持多语言与多语种即时热切换，免刷新重新合成关键字体系。
- **检索引擎与编辑器插件全面解耦**：
  - [`pinyinMatcher.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/engine/pinyinMatcher.ts)、[`emojiPlugin.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/editor/emojiPlugin.ts)、[`imeHandler.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/editor/imeHandler.ts)、[`autocomplete.ts`](file:///home/yyang/Documents/antigravity/epic-babbage/src/editor/autocomplete.ts) 均解耦为动态适配当前激活的词元集合。

#### 2. 界面与交互重构 (`src/components/`, `src/App.tsx`)
- **左上角下拉主菜单 (`AppMenu.tsx`)**：
  - 增设带字体图标的下拉菜单，支持：
    - **新建 (New)**（`FilePlus`）：确认并清空编辑画布。
    - **打开 (Open)**（`FolderOpen`）：调起本地文件选择器读取代码。
    - **保存 (Save)**（`Save`）：自动附加当前编程语言后缀（`.js`, `.py`）并触发文件下载。
    - **设置 (Settings)**（`Settings`）：一键呼出右侧设置侧边栏。
    - **关于 (About)**（`Info`）：呼出项目介绍模态框。
- **顶栏正中央运行按钮 (`Header.tsx`)**：
  - 将原右侧分散的“运行”按钮调整至顶栏居中醒目位置，配备渐变高亮与执行状态指示。
- **右上角独立设置侧边栏 (`SettingsSidebar.tsx`)**：
  - 新增设置齿轮图标，点击滑出抽屉，集中承载：
    - 目标编程语言选择器（JavaScript / Python）。
    - 自然输入语种选择器（简体中文 / English）。
    - Emoji 视觉徽标装饰开关。
    - AI Tab 幽灵代码补全开关与大模型连接配置（Base URL / API Key / Model）。
    - 示例代码重置动作。
- **帮助与速查词典抽屉升级 (`CheatSheet.tsx`)**：
  - 原顶栏文本按钮替换为直观的帮助图标（`HelpCircle`）。
  - 速查列表动态适配当前所选的编程语言与语种词库。
- **关于智快马模态框 (`AboutModal.tsx`)**：
  - 展示产品定位、品牌设计哲学（a1b2c、智快马、epic-babbage）与致敬历史底蕴。

---

## [0.1.0] - 2026-09-18

### 🌟 版本概述
本项目从初始的前端脚手架演进并全面实现了 **智快马 (`a1b2c` / 内部代号: `epic-babbage`)** —— 一款定位于“从图形化积木编程（Block-based）平滑过渡到纯文本工业级代码（Text-based）”的智能交互式 Web 代码编辑器。

---

### ✨ 新增特性 (Added)

#### 1. 核心映射与拼音检索引擎 (`src/engine/`)
- **多维度关键字注册中心 (`keywordRegistry.ts`)**：
  - 定义标准 JavaScript 关键字与辅助符号的核心字典。
  - 支持**多维别名匹配**：包含中文同义词（如 `如果` / `要是` / `假设` $\rightarrow$ `if`，`循环` / `遍历` $\rightarrow$ `for`，`打印` / `输出` $\rightarrow$ `console.log` 等）。
  - 支持**拼音简拼与全拼**（如 `rg` / `ruguo` $\rightarrow$ `if`，`xh` / `xunhuan` $\rightarrow$ `for`，`dy` / `dayin` $\rightarrow$ `console.log`）。
  - 内置丰富语义元数据：Emoji 视觉徽标、中英文描述、语法骨架与一键插入模板。
- **拼音智能匹配器 (`pinyinMatcher.ts`)**：
  - 提供无依赖的高效拼音匹配算法，支持前缀检索与中文字符模糊查询，支撑毫秒级实时补全。
- **混合智能服务驱动 (`aiService.ts`)**：
  - **本地规则预测引擎**：内置零延迟逻辑推导，可根据行内光标、变量声明、中英文注释意图即时返回候选补全代码。
  - **OpenAI 兼容协议集成**：支持用户自定义 API Key 与 Base URL，可无缝对接 DeepSeek、OpenAI、Ollama 等外部大语言模型。

#### 2. CodeMirror 6 编辑器深度交互层 (`src/editor/`)
- **零侵入式 Emoji 视觉徽标插件 (`emojiPlugin.ts`)**：
  - 基于 CodeMirror 6 的 `ViewPlugin` 与 `Decoration.widget` 构建。
  - **核心机制**：保持底层文档（Document）100% 为纯正标准 JavaScript 字符，仅在渲染层（View DOM）将关键字实时替换为生动直观的 Emoji 徽标与副标（如 `❓ 如果`、`🔄 循环`、`📢 打印`），最大程度降低学习者的认知负担。
  - **悬停交互卡片 (Hover Tooltip)**：鼠标悬浮于 Emoji 徽标上方时，浮现对应的标准语法卡片、中文口语别名列表及拼音快捷键提示。
- **IME 输入法原子级拦截器 (`imeHandler.ts`)**：
  - 精准捕获 `compositionstart` 与 `compositionend` 输入法事件。
  - 用户无需切换至半角英文键盘，直接使用中文输入法输入中文词汇（如输入“要是”并在候选词中敲击确认后），编辑器即时将其原子级替换为标准的底座语法（如 `if () {\n  \n}`）。
- **AI 幽灵代码行内补全插件 (`ghostTextPlugin.ts`)**：
  - 打造贴合 GitHub Copilot 等现代化 IDE 的“Vibe Coding”沉浸式体验。
  - 光标移动或编写代码时自动渲染灰色幽灵文本（Ghost Text）。
  - 快捷键支持：按 `Tab` 键一键采纳建议并自动触发重新装饰；按 `Esc` 键取消补全。
- **多维拼音补全提供器 (`autocomplete.ts`)**：
  - 集成 `@codemirror/autocomplete`，支持输入拼音缩写时呼出标准下拉提示列表，显示 Emoji 标识与中文解释。

#### 3. 响应式工作台与双栏执行沙箱 (`src/components/`, `src/App.tsx`)
- **双栏对照视图 (`EditorView.tsx`)**：
  - **左侧**：EmojiScript 富视觉交互编辑器。
  - **右侧**：标准纯净 JavaScript 代码实时同步查看窗口，支持一键复制代码与行号对照。
- **内置安全执行控制台 (`OutputConsole.tsx`)**：
  - 纯前端隔离运行环境，重定向并结构化劫持 `console.log`、`console.warn`、`console.error`。
  - 支持执行状态指示（运行成功、运行时异常拦截与高亮定位）。
- **速查字典抽屉 (`CheatSheet.tsx`)**：
  - 右侧滑动抽屉，完整罗列系统支持的所有关键字、Emoji 标识、拼音缩写及中文同义词。
  - 支持关键字即时搜索与单击“一键插入”到当前编辑区。
- **全局顶栏导航 (`Header.tsx`)**：
  - 模式切换开关：支持在“Emoji 视图”与“原版纯净代码视图”之间一键无缝切换。
  - 快捷运行按钮与 AI 配置弹窗（API Key、Base URL、Model 选择）。
- **主程序入口与状态编排 (`App.tsx`, `App.css`, `index.css`)**：
  - 预设经典趣味算法示例（偶数求和、条件分支分支判断等）。
  - 集成 One Dark 深色主题与现代流线型界面风格。

#### 4. 项目元数据与品牌资产
- **项目说明文档 (`README.md`)**：
  - 确立 `a1b2c`（AI-powered Block-to-Code）、`智快马`、`epic-babbage` 三层品牌矩阵。
  - 系统阐述产品定位、核心特性、架构方案与技术路线图。
- **深研知识库体系 (`.gemini/`)**：
  - 沉淀全球开源竞品排查、产品定位跃迁、命名哲学及四层解耦架构访谈录。

---

### 📦 依赖调整与工程构建 (Dependencies & Build)

#### 新增生产依赖
- `codemirror` (`^6.0.2`) 与 CodeMirror 6 模块族：
  - `@codemirror/view` (`^6.43.12`)
  - `@codemirror/state` (`^6.7.5`)
  - `@codemirror/autocomplete` (`^6.20.3`)
  - `@codemirror/lang-javascript` (`^6.2.5`)
  - `@codemirror/theme-one-dark` (`^6.1.3`)
- `lucide-react` (`^1.47.0`)：现代化图标库。
- `clsx` (`^2.1.1`)：类名合并工具。
- `tailwindcss` (`^4.3.3`) 与 `@tailwindcss/vite` (`^4.3.3`)：原子化 CSS 工具集。

#### 构建与代码检查
- 通过 Oxlint 进行代码语法与代码规范校验 (`npm run lint`)。
- 通过 TypeScript 编译器严格类型检查 (`tsc -b`)，保持 0 错误。
- 经 Vite 打包通过生产构建验证 (`npm run build`)。
