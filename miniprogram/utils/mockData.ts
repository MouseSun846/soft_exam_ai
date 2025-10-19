// mockData.ts - 模拟数据

import { generateId, formatTime } from './helpers'

// 模拟用户信息
export const mockUserInfo = {
  id: 'user_001',
  name: '软考学习者',
  avatar: '/images/avatar.png',
  level: '中级',
  studyDays: 15,
  totalStudyTime: 3600, // 秒
  completedTopics: 8,
  totalTopics: 12
}

// 模拟学习统计
export const mockStudyStats = {
  studyDays: 15,
  totalStudyTime: 3600,
  completedTopics: 8,
  totalTopics: 12,
  averageScore: 85,
  recentProgress: [
    { date: '2024-01-15', score: 82 },
    { date: '2024-01-16', score: 85 },
    { date: '2024-01-17', score: 88 },
    { date: '2024-01-18', score: 90 },
    { date: '2024-01-19', score: 87 }
  ]
}

// 模拟最近学习活动
export const mockRecentActivities = [
  {
    id: generateId(),
    type: 'exam',
    title: '完成网络协议模拟测试',
    description: '得分85分，表现良好',
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2小时前
    icon: '📝'
  },
  {
    id: generateId(),
    type: 'review',
    title: '复习TCP/IP协议栈',
    description: '完成智能复习计划',
    timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5小时前
    icon: '🧠'
  },
  {
    id: generateId(),
    type: 'upload',
    title: '上传网络协议学习笔记',
    description: '文档解析完成',
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1天前
    icon: '📄'
  }
]

// 模拟今日任务
export const mockTodayTasks = [
  {
    id: generateId(),
    type: 'review',
    title: '复习HTTP协议',
    description: '预计需要15分钟',
    priority: 'high',
    completed: false,
    estimatedTime: 15
  },
  {
    id: generateId(),
    type: 'exam',
    title: '完成网络安全测试',
    description: '10道题目',
    priority: 'medium',
    completed: true,
    estimatedTime: 20
  },
  {
    id: generateId(),
    type: 'study',
    title: '学习数据库原理',
    description: '新知识点学习',
    priority: 'low',
    completed: false,
    estimatedTime: 30
  }
]

// 模拟知识文档
export const mockKnowledgeDocuments = [
  {
    id: generateId(),
    name: '网络协议基础笔记.pdf',
    type: 'pdf',
    size: 2456789,
    status: 'ready',
    uploadTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
    tags: ['网络协议', '基础']
  },
  {
    id: generateId(),
    name: '数据库系统概念.md',
    type: 'md',
    size: 123456,
    status: 'ready',
    uploadTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
    tags: ['数据库', '概念']
  },
  {
    id: generateId(),
    name: '软件工程实践.docx',
    type: 'docx',
    size: 3456789,
    status: 'parsing',
    uploadTime: Date.now() - 1 * 24 * 60 * 60 * 1000,
    tags: ['软件工程', '实践']
  }
]

// 模拟复习计划
export const mockReviewPlans = [
  {
    id: generateId(),
    topic: 'TCP三次握手',
    priority: 'high',
    nextReviewTime: Date.now() + 24 * 60 * 60 * 1000, // 1天后
    reviewCount: 2,
    mastery: 0.8
  },
  {
    id: generateId(),
    topic: 'HTTP状态码',
    priority: 'medium',
    nextReviewTime: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3天后
    reviewCount: 1,
    mastery: 0.6
  },
  {
    id: generateId(),
    topic: '数据库索引',
    priority: 'low',
    nextReviewTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7天后
    reviewCount: 0,
    mastery: 0.3
  }
]

// 模拟考试题目
export const mockExamQuestions = [
  {
    id: generateId(),
    type: 'fill',
    question: 'TCP/IP协议栈的四层模型包括：应用层、传输层、网络层和______。',
    correctAnswer: '网络接口层',
    difficulty: 'easy',
    points: 10
  },
  {
    id: generateId(),
    type: 'essay',
    question: '请简述TCP三次握手的过程及其作用。',
    correctAnswer: 'TCP三次握手过程：1) 客户端发送SYN包到服务器；2) 服务器回应SYN-ACK包；3) 客户端发送ACK包确认连接。作用：确保连接的可靠建立，防止已失效的连接请求报文段突然又传送到了服务器。',
    difficulty: 'medium',
    points: 20
  },
  {
    id: generateId(),
    type: 'fill',
    question: 'HTTP协议默认使用的端口号是______。',
    correctAnswer: '80',
    difficulty: 'easy',
    points: 10
  }
]

// 模拟考试结果
export const mockExamResult = {
  id: generateId(),
  score: 85,
  totalScore: 100,
  correctCount: 8.5,
  totalQuestions: 10,
  timeUsed: 720, // 秒
  submitTime: Date.now(),
  questions: [
    {
      id: generateId(),
      type: 'fill',
      question: 'TCP/IP协议栈的四层模型包括：应用层、传输层、网络层和______。',
      userAnswer: '网络接口层',
      correctAnswer: '网络接口层',
      isCorrect: true,
      points: 10
    },
    {
      id: generateId(),
      type: 'essay',
      question: '请简述TCP三次握手的过程及其作用。',
      userAnswer: 'TCP三次握手包括客户端发送SYN包，服务器回应SYN-ACK包，客户端发送ACK包确认连接。',
      correctAnswer: 'TCP三次握手过程：1) 客户端发送SYN包到服务器；2) 服务器回应SYN-ACK包；3) 客户端发送ACK包确认连接。作用：确保连接的可靠建立，防止已失效的连接请求报文段突然又传送到了服务器。',
      isCorrect: false,
      aiFeedback: '您的答案基本正确，但缺少对三次握手作用的详细说明。建议补充连接建立可靠性和防止失效连接请求的作用。',
      points: 15
    }
  ]
}

// 模拟AI生成的复习要点
export const mockReviewPoints = {
  theme: 'TCP/IP协议栈',
  points: [
    {
      title: '协议栈结构',
      content: 'TCP/IP协议栈采用四层结构：应用层、传输层、网络层和网络接口层。',
      importance: 'high'
    },
    {
      title: '各层功能',
      content: '应用层提供应用程序服务，传输层负责端到端通信，网络层处理数据包路由，网络接口层管理物理网络连接。',
      importance: 'high'
    },
    {
      title: '协议关系',
      content: 'TCP和UDP是传输层协议，IP是网络层协议，各层协议协同工作完成数据传输。',
      importance: 'medium'
    }
  ],
  summary: 'TCP/IP协议栈是现代互联网的基础，理解其分层结构和各层功能对于网络编程和故障排查至关重要。'
}

export default {
  mockUserInfo,
  mockStudyStats,
  mockRecentActivities,
  mockTodayTasks,
  mockKnowledgeDocuments,
  mockReviewPlans,
  mockExamQuestions,
  mockExamResult,
  mockReviewPoints
}