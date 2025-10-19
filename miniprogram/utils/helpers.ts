// helpers.ts - 工具函数

import { COLORS, QUESTION_TYPE_TEXTS, KNOWLEDGE_LEVEL_TEXTS } from './constants'

// 格式化时间
export const formatTime = (timestamp: number, format: string = 'YYYY-MM-DD HH:mm'): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 计算学习进度百分比
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// 获取题目类型文本
export const getQuestionTypeText = (type: string): string => {
  return QUESTION_TYPE_TEXTS[type] || '未知类型'
}

// 获取知识掌握等级文本
export const getKnowledgeLevelText = (level: string): string => {
  return KNOWLEDGE_LEVEL_TEXTS[level] || '未知等级'
}

// 生成随机ID
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 防抖函数
export const debounce = (func: Function, delay: number) => {
  let timeoutId: any
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// 节流函数
export const throttle = (func: Function, delay: number) => {
  let lastCall = 0
  return (...args: any[]) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

// 深拷贝对象
export const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (obj instanceof Object) {
    const clonedObj: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

// 验证邮箱格式
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 验证手机号格式
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 获取颜色类名
export const getColorClass = (type: string): string => {
  const colorMap: any = {
    primary: COLORS.primary,
    success: COLORS.success,
    warning: COLORS.warning,
    error: COLORS.error
  }
  return colorMap[type] || COLORS.primary
}

// 计算剩余时间
export const calculateRemainingTime = (endTime: number): string => {
  const now = Date.now()
  const remaining = endTime - now
  
  if (remaining <= 0) return '已结束'
  
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days}天${hours}小时`
  if (hours > 0) return `${hours}小时${minutes}分钟`
  return `${minutes}分钟`
}

// 数组去重
export const uniqueArray = <T>(arr: T[], key?: string): T[] => {
  if (key) {
    const seen = new Set()
    return arr.filter(item => {
      const value = (item as any)[key]
      if (seen.has(value)) {
        return false
      }
      seen.add(value)
      return true
    })
  }
  return Array.from(new Set(arr))
}

// 对象数组排序
export const sortArray = <T>(arr: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] => {
  return arr.sort((a: any, b: any) => {
    const aValue = a[key]
    const bValue = b[key]
    
    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
}

export default {
  formatTime,
  formatFileSize,
  calculateProgress,
  getQuestionTypeText,
  getKnowledgeLevelText,
  generateId,
  debounce,
  throttle,
  deepClone,
  validateEmail,
  validatePhone,
  getColorClass,
  calculateRemainingTime,
  uniqueArray,
  sortArray
}