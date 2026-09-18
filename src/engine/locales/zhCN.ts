import type { LocalePlugin } from '../types';

export const zhCNLocale: LocalePlugin = {
  id: 'zh-CN',
  name: '简体中文 (拼音)',
  tokens: {
    IF: {
      displayName: '如果',
      emoji: '❓',
      description: '条件分支判断：当条件为真时执行代码块',
      category: 'control',
      synonyms: ['如果', '要是', '假设', '倘若', '假若', '若是', '只要'],
      phoneticAbbr: ['rg', 'ys', 'js', 'tr', 'jr', 'rs', 'zy'],
      phoneticFull: ['ruguo', 'yaoshi', 'jiashe', 'tangruo', 'jiaruo', 'ruoshi', 'zhiyao']
    },
    ELSE_IF: {
      displayName: '又如果',
      emoji: '🔀',
      description: '多重分支：前一个条件不满足时尝试本分支',
      category: 'control',
      synonyms: ['又如果', '否则如果', '再或者', '不然要是', '再假设'],
      phoneticAbbr: ['yrg', 'fzrg', 'zhz', 'brys', 'zjs'],
      phoneticFull: ['youruguo', 'fouzeruguo', 'zaihuozhe', 'buranyaoshi', 'zaijiashe']
    },
    ELSE: {
      displayName: '否则',
      emoji: '🛑',
      description: '兜底分支：前面的条件均不满足时执行',
      category: 'control',
      synonyms: ['否则', '不然', '反之', '要不然', '其他情况'],
      phoneticAbbr: ['fz', 'br', 'fz', 'ybr', 'qt'],
      phoneticFull: ['fouze', 'buran', 'fanzhi', 'yaoburan', 'qita']
    },
    FOR: {
      displayName: '循环',
      emoji: '🔄',
      description: '遍历计数或遍历集合元素',
      category: 'loop',
      synonyms: ['循环', '遍历', '重复', '针对每个', '挨个做'],
      phoneticAbbr: ['xh', 'bl', 'cf', 'mg', 'agz'],
      phoneticFull: ['xunhuan', 'bianli', 'chongfu', 'meige', 'aigezuo']
    },
    WHILE: {
      displayName: '只要一直',
      emoji: '⏳',
      description: '条件循环：只要条件成立就不断执行',
      category: 'loop',
      synonyms: ['当', '只要一直', '趁着', '在期间'],
      phoneticAbbr: ['d', 'zyyz', 'cz', 'zqj'],
      phoneticFull: ['dang', 'zhiyaoyizhi', 'chenzhe', 'zaiqijian']
    },
    FUNCTION: {
      displayName: '函数',
      emoji: '⚙️',
      description: '定义可重复调用的功能代码块',
      category: 'function',
      synonyms: ['函数', '方法', '搞个功能', '操作', '动作'],
      phoneticAbbr: ['hs', 'ff', 'gggn', 'cz', 'dz'],
      phoneticFull: ['hanshu', 'fangfa', 'gaogegongneng', 'caozuo', 'dongzuo']
    },
    RETURN: {
      displayName: '返回',
      emoji: '📤',
      description: '终止函数并交出返回值',
      category: 'function',
      synonyms: ['返回', '交出', '吐出', '给出结果', '输出'],
      phoneticAbbr: ['fh', 'jc', 'tc', 'gcjg', 'sc'],
      phoneticFull: ['fanhui', 'jiaochu', 'tuchu', 'geichujieguo', 'shuchu']
    },
    PRINT: {
      displayName: '打印',
      emoji: '📢',
      description: '在控制台输出信息或调试变量',
      category: 'io',
      synonyms: ['打印', '输出', '说一声', '报告', '喊话'],
      phoneticAbbr: ['dy', 'sc', 'sys', 'bg', 'hh'],
      phoneticFull: ['dayin', 'shuchu', 'shuoyisheng', 'baogao', 'hanhua']
    },
    CONST: {
      displayName: '常量',
      emoji: '🔒',
      description: '不可重新赋值的常数/固定引用',
      category: 'variable',
      synonyms: ['常量', '固定', '锁死', '不变'],
      phoneticAbbr: ['cl', 'gd', 'ss', 'bb'],
      phoneticFull: ['changliang', 'guding', 'suosi', 'bubian']
    },
    LET: {
      displayName: '变量',
      emoji: '📦',
      description: '可变更数值的变量声明',
      category: 'variable',
      synonyms: ['变量', '准备', '设立', '记为', '设'],
      phoneticAbbr: ['bl', 'zb', 'sl', 'jw', 's'],
      phoneticFull: ['bianliang', 'zhunbei', 'sheli', 'jiwei', 'she']
    },
    BREAK: {
      displayName: '跳出',
      emoji: '💥',
      description: '立即中断并跳出当前循环体',
      category: 'control',
      synonyms: ['跳出', '打断', '撤退', '结束循环', '跑路'],
      phoneticAbbr: ['tc', 'dd', 'ct', 'jsxh', 'pl'],
      phoneticFull: ['tiaochu', 'daduan', 'chetui', 'jieshuxunhuan', 'paolu']
    },
    CONTINUE: {
      displayName: '跳过本次',
      emoji: '⏭️',
      description: '跳过当前循环剩余代码，进入下一次迭代',
      category: 'control',
      synonyms: ['继续', '跳过本次', '下一个', '忽略本次'],
      phoneticAbbr: ['jx', 'tgbc', 'xyg', 'hlbc'],
      phoneticFull: ['jixu', 'tiaoguobenci', 'xiayige', 'hulvebenci']
    },
    TRUE: {
      displayName: '真',
      emoji: '✅',
      description: '布尔真值 (true)',
      category: 'literal',
      synonyms: ['真', '是对的', '正确', '准了'],
      phoneticAbbr: ['z', 'sdd', 'zq', 'zl'],
      phoneticFull: ['zhen', 'shiduide', 'zhengque', 'zhunle']
    },
    FALSE: {
      displayName: '假',
      emoji: '❌',
      description: '布尔假值 (false)',
      category: 'literal',
      synonyms: ['假', '不对', '错误', '算了'],
      phoneticAbbr: ['j', 'bd', 'cw', 'sl'],
      phoneticFull: ['jia', 'budui', 'cuowu', 'suanle']
    }
  }
};
