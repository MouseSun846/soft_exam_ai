// api.ts - 后端接口定义

// 基础配置
const BASE_URL = 'https://api.soft-exam-ai.com/v1'

// 请求拦截器
const request = (url: string, options: any = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      ...options,
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(new Error(`请求失败: ${res.statusCode}`))
        }
      },
      fail: reject
    })
  })
}

// 用户管理接口
export const userAPI = {
  // 微信登录
  login: (code: string) => request('/user/login', {
    method: 'POST',
    data: { code }
  }),

  // 获取用户信息
  getUserInfo: () => request('/user/info'),

  // 更新用户信息
  updateUserInfo: (userInfo: any) => request('/user/info', {
    method: 'PUT',
    data: userInfo
  }),

  // 获取学习统计
  getStudyStats: () => request('/user/stats')
}

// 知识库管理接口
export const knowledgeAPI = {
  // 获取文档列表
  getDocuments: (params?: { keyword?: string; page?: number; size?: number }) => 
    request('/knowledge/documents', { data: params }),

  // 上传文档
  uploadDocument: (filePath: string, formData: any) => request('/knowledge/upload', {
    method: 'POST',
    filePath,
    formData,
    header: { 'content-type': 'multipart/form-data' }
  }),

  // 删除文档
  deleteDocument: (docId: string) => request(`/knowledge/documents/${docId}`, {
    method: 'DELETE'
  }),

  // 获取文档详情
  getDocumentDetail: (docId: string) => request(`/knowledge/documents/${docId}`),

  // 搜索文档内容
  searchDocuments: (keyword: string) => request('/knowledge/search', {
    data: { keyword }
  })
}

// 智能复习接口
export const reviewAPI = {
  // 生成复习要点
  generateReviewPoints: (theme: string, options?: { depth?: number; format?: string }) => 
    request('/review/generate', {
      method: 'POST',
      data: { theme, ...options }
    }),

  // 获取复习计划
  getReviewPlan: () => request('/review/plan'),

  // 更新复习进度
  updateReviewProgress: (topicId: string, status: string) => 
    request('/review/progress', {
      method: 'POST',
      data: { topicId, status }
    }),

  // 获取复习历史
  getReviewHistory: (params?: { page?: number; size?: number }) => 
    request('/review/history', { data: params })
}

// 模拟测试接口
export const examAPI = {
  // 获取测试题目
  getExamQuestions: (params: { theme?: string; difficulty?: string; count?: number }) => 
    request('/exam/questions', { data: params }),

  // 提交测试答案
  submitExam: (answers: any[], examInfo: any) => request('/exam/submit', {
    method: 'POST',
    data: { answers, examInfo }
  }),

  // 获取测试结果
  getExamResult: (examId: string) => request(`/exam/results/${examId}`),

  // 获取测试历史
  getExamHistory: (params?: { page?: number; size?: number }) => 
    request('/exam/history', { data: params }),

  // 获取错题集
  getWrongQuestions: () => request('/exam/wrong-questions')
}

// 统计分析接口
export const analyticsAPI = {
  // 获取学习报告
  getLearningReport: (period: string) => request(`/analytics/report/${period}`),

  // 获取知识点掌握情况
  getKnowledgeMastery: () => request('/analytics/mastery'),

  // 获取学习趋势
  getLearningTrend: (params: { startDate: string; endDate: string }) => 
    request('/analytics/trend', { data: params }),

  // 获取个性化建议
  getPersonalizedSuggestions: () => request('/analytics/suggestions')
}

// 系统接口
export const systemAPI = {
  // 获取系统配置
  getConfig: () => request('/system/config'),

  // 检查更新
  checkUpdate: () => request('/system/update'),

  // 反馈提交
  submitFeedback: (feedback: any) => request('/system/feedback', {
    method: 'POST',
    data: feedback
  })
}

// 错误处理
export const handleAPIError = (error: any) => {
  console.error('API Error:', error)
  
  if (error.errMsg && error.errMsg.includes('timeout')) {
    wx.showToast({ title: '网络请求超时', icon: 'none' })
  } else if (error.errMsg && error.errMsg.includes('fail')) {
    wx.showToast({ title: '网络连接失败', icon: 'none' })
  } else {
    wx.showToast({ title: '请求失败，请重试', icon: 'none' })
  }
  
  throw error
}

export default {
  userAPI,
  knowledgeAPI,
  reviewAPI,
  examAPI,
  analyticsAPI,
  systemAPI,
  handleAPIError
}