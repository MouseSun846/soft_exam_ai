// app.ts
interface IAppOption {
  globalData: {
    userInfo: any
    studyStats: any
    examHistory: any[]
  }
  initApp(): void
  checkUpdate(): void
  loadUserData(): void
  loadStudyStats(): void
  loadExamHistory(): void
  navigateToPage(url: string, params?: any): void
  showLoading(title?: string): void
  hideLoading(): void
  showToast(title: string, icon?: 'success' | 'error' | 'loading' | 'none'): void
  recordStudyActivity(activity: any): void
  updateStudyStats(newStats: any): void
  addExamHistory(examResult: any): void
}

App<IAppOption>({
  globalData: {
    userInfo: null,
    studyStats: {
      studyDays: 0,
      totalStudyTime: 0,
      completedTopics: 0,
      totalTopics: 0
    },
    examHistory: []
  },

  onLaunch() {
    this.initApp()
  },

  onShow() {
    // 检查更新
    this.checkUpdate()
  },

  initApp() {
    // 初始化用户数据
    this.loadUserData()
    
    // 初始化学习统计
    this.loadStudyStats()
    
    // 初始化考试历史
    this.loadExamHistory()
  },

  loadUserData() {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
    } catch (error) {
      console.error('加载用户数据失败:', error)
    }
  },

  loadStudyStats() {
    try {
      const stats = wx.getStorageSync('studyStats')
      if (stats) {
        this.globalData.studyStats = stats
      }
    } catch (error) {
      console.error('加载学习统计失败:', error)
    }
  },

  loadExamHistory() {
    try {
      const history = wx.getStorageSync('examHistory')
      if (history) {
        this.globalData.examHistory = history
      }
    } catch (error) {
      console.error('加载考试历史失败:', error)
    }
  },

  checkUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      
      updateManager.onCheckForUpdate((res) => {
        console.log('检查更新结果:', res.hasUpdate)
      })

      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(() => {
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        })
      })
    }
  },

  // 全局方法：跳转到页面
  navigateToPage(url: string, params?: any) {
    if (params) {
      const query = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
      url += `?${query}`
    }
    wx.navigateTo({ url })
  },

  // 全局方法：显示加载状态
  showLoading(title: string = '加载中...') {
    wx.showLoading({ title })
  },

  // 全局方法：隐藏加载状态
  hideLoading() {
    wx.hideLoading()
  },

  // 全局方法：显示提示
  showToast(title: string, icon: 'success' | 'error' | 'loading' | 'none' = 'none') {
    wx.showToast({ title, icon })
  },

  // 全局方法：记录学习活动
  recordStudyActivity(activity: any) {
    const activities = wx.getStorageSync('recentActivities') || []
    activities.unshift({
      ...activity,
      timestamp: Date.now(),
      id: Date.now().toString()
    })
    
    // 只保留最近10条记录
    const recentActivities = activities.slice(0, 10)
    wx.setStorageSync('recentActivities', recentActivities)
  },

  // 全局方法：更新学习统计
  updateStudyStats(newStats: any) {
    this.globalData.studyStats = {
      ...this.globalData.studyStats,
      ...newStats
    }
    wx.setStorageSync('studyStats', this.globalData.studyStats)
  },

  // 全局方法：添加考试记录
  addExamHistory(examResult: any) {
    this.globalData.examHistory.unshift({
      ...examResult,
      id: Date.now().toString(),
      date: new Date().toISOString()
    })
    wx.setStorageSync('examHistory', this.globalData.examHistory)
  }
})