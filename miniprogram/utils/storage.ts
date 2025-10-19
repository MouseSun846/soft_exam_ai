// storage.ts - 本地存储工具函数

// 存储键名常量
export const STORAGE_KEYS = {
  USER_INFO: 'userInfo',
  STUDY_STATS: 'studyStats',
  EXAM_HISTORY: 'examHistory',
  RECENT_ACTIVITIES: 'recentActivities',
  KNOWLEDGE_DOCUMENTS: 'knowledgeDocuments',
  REVIEW_PLANS: 'reviewPlans',
  APP_SETTINGS: 'appSettings'
}

// 存储工具类
class StorageManager {
  // 设置存储数据
  set(key: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        wx.setStorageSync(key, data)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  // 获取存储数据
  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const data = wx.getStorageSync(key)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 删除存储数据
  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        wx.removeStorageSync(key)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  // 清空所有存储
  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        wx.clearStorageSync()
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  // 获取存储信息
  getInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const info = wx.getStorageInfoSync()
        resolve(info)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 用户相关存储操作
  async setUserInfo(userInfo: any): Promise<void> {
    await this.set(STORAGE_KEYS.USER_INFO, userInfo)
  }

  async getUserInfo(): Promise<any> {
    return await this.get(STORAGE_KEYS.USER_INFO)
  }

  // 学习统计相关
  async setStudyStats(stats: any): Promise<void> {
    await this.set(STORAGE_KEYS.STUDY_STATS, stats)
  }

  async getStudyStats(): Promise<any> {
    return await this.get(STORAGE_KEYS.STUDY_STATS)
  }

  // 考试历史相关
  async setExamHistory(history: any[]): Promise<void> {
    await this.set(STORAGE_KEYS.EXAM_HISTORY, history)
  }

  async getExamHistory(): Promise<any[]> {
    const history = await this.get(STORAGE_KEYS.EXAM_HISTORY)
    return history || []
  }

  // 最近活动相关
  async setRecentActivities(activities: any[]): Promise<void> {
    await this.set(STORAGE_KEYS.RECENT_ACTIVITIES, activities)
  }

  async getRecentActivities(): Promise<any[]> {
    const activities = await this.get(STORAGE_KEYS.RECENT_ACTIVITIES)
    return activities || []
  }

  // 知识文档相关
  async setKnowledgeDocuments(documents: any[]): Promise<void> {
    await this.set(STORAGE_KEYS.KNOWLEDGE_DOCUMENTS, documents)
  }

  async getKnowledgeDocuments(): Promise<any[]> {
    const documents = await this.get(STORAGE_KEYS.KNOWLEDGE_DOCUMENTS)
    return documents || []
  }

  // 复习计划相关
  async setReviewPlans(plans: any[]): Promise<void> {
    await this.set(STORAGE_KEYS.REVIEW_PLANS, plans)
  }

  async getReviewPlans(): Promise<any[]> {
    const plans = await this.get(STORAGE_KEYS.REVIEW_PLANS)
    return plans || []
  }

  // 应用设置相关
  async setAppSettings(settings: any): Promise<void> {
    await this.set(STORAGE_KEYS.APP_SETTINGS, settings)
  }

  async getAppSettings(): Promise<any> {
    const settings = await this.get(STORAGE_KEYS.APP_SETTINGS)
    return settings || {}
  }
}

// 创建存储管理器实例
const storageManager = new StorageManager()

export default storageManager
export { STORAGE_KEYS }