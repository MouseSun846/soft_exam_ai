// constants.ts - 全局常量定义

// 应用配置
export const APP_CONFIG = {
  name: 'AI软考管家',
  version: '1.0.0',
  description: '智能学习辅助小程序'
}

// 颜色配置
export const COLORS = {
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  primaryDark: '#2563eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#6366f1',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
}

// 题目类型
export const QUESTION_TYPES = {
  FILL: 'fill',
  CHOICE: 'choice',
  ESSAY: 'essay'
}

// 题目类型文本
export const QUESTION_TYPE_TEXTS = {
  [QUESTION_TYPES.FILL]: '填空题',
  [QUESTION_TYPES.CHOICE]: '选择题',
  [QUESTION_TYPES.ESSAY]: '问答题'
}

// 文档状态
export const DOCUMENT_STATUS = {
  READY: 'ready',
  PARSING: 'parsing',
  ERROR: 'error'
}

// 文档状态文本
export const DOCUMENT_STATUS_TEXTS = {
  [DOCUMENT_STATUS.READY]: '已就绪',
  [DOCUMENT_STATUS.PARSING]: '解析中',
  [DOCUMENT_STATUS.ERROR]: '解析失败'
}

// 文件类型映射
export const FILE_TYPE_MAP = {
  'pdf': 'PDF文档',
  'doc': 'Word文档',
  'docx': 'Word文档',
  'txt': '文本文件',
  'md': 'Markdown'
}

// 学习等级
export const KNOWLEDGE_LEVELS = {
  GOOD: 'good',
  FAIR: 'fair',
  WEAK: 'weak'
}

// 学习等级文本
export const KNOWLEDGE_LEVEL_TEXTS = {
  [KNOWLEDGE_LEVELS.GOOD]: '掌握良好',
  [KNOWLEDGE_LEVELS.FAIR]: '理解基本正确',
  [KNOWLEDGE_LEVELS.WEAK]: '需要加强'
}

// 默认配置
export const DEFAULT_CONFIG = {
  EXAM_QUESTION_COUNT: 10,
  EXAM_ESTIMATED_TIME: 15,
  REVIEW_GENERATE_TIMEOUT: 2000,
  UPLOAD_TIMEOUT: 5000
}

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  TIMEOUT_ERROR: '请求超时，请重试',
  UPLOAD_FAILED: '文件上传失败',
  GENERATE_FAILED: '内容生成失败',
  LOGIN_FAILED: '登录失败'
}

// 成功消息
export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: '文件上传成功',
  GENERATE_SUCCESS: '内容生成成功',
  SUBMIT_SUCCESS: '提交成功'
}

export default {
  APP_CONFIG,
  COLORS,
  QUESTION_TYPES,
  QUESTION_TYPE_TEXTS,
  DOCUMENT_STATUS,
  DOCUMENT_STATUS_TEXTS,
  FILE_TYPE_MAP,
  KNOWLEDGE_LEVELS,
  KNOWLEDGE_LEVEL_TEXTS,
  DEFAULT_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
}