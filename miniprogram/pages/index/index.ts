// index.ts
const app = getApp<IAppOption>()
import { mockStudyStats, mockRecentActivities, mockTodayTasks } from '../../utils/mockData'
import { calculateProgress, formatTime } from '../../utils/helpers'

Component({
  data: {
    studyStats: mockStudyStats,
    recentActivities: mockRecentActivities,
    todayTasks: mockTodayTasks,
    progressPercentage: 0,
    loading: false
  },

  lifetimes: {
    attached() {
      this.initPage()
    }
  },

  methods: {
    initPage() {
      this.setData({
        progressPercentage: calculateProgress(
          this.data.studyStats.completedTopics,
          this.data.studyStats.totalTopics
        )
      })
    },

    // 跳转到知识库页面
    navigateToKnowledgeBase() {
      wx.navigateTo({
        url: '/pages/knowledge-base/knowledge-base'
      })
    },

    // 跳转到智能复习页面
    navigateToSmartReview() {
      wx.navigateTo({
        url: '/pages/smart-review/smart-review'
      })
    },

    // 跳转到模拟测试页面
    navigateToExam() {
      wx.navigateTo({
        url: '/pages/exam/exam'
      })
    },

    // 查看测试结果
    navigateToExamResult() {
      wx.navigateTo({
        url: '/pages/exam-result/exam-result'
      })
    },

    // 完成任务
    completeTask(e: any) {
      const taskId = e.currentTarget.dataset.id
      const tasks = this.data.todayTasks.map((task: any) => {
        if (task.id === taskId) {
          return { ...task, completed: true }
        }
        return task
      })

      this.setData({ todayTasks: tasks })
      
      wx.showToast({
        title: '任务已完成',
        icon: 'success'
      })
    },

    // 查看活动详情
    viewActivityDetail(e: any) {
      const activityId = e.currentTarget.dataset.id
      const activity = this.data.recentActivities.find((a: any) => a.id === activityId)
      
      if (activity) {
        wx.showModal({
          title: activity.title,
          content: activity.description,
          showCancel: false
        })
      }
    },

    // 刷新数据
    refreshData() {
      this.setData({ loading: true })
      
      // 模拟数据刷新
      setTimeout(() => {
        this.setData({ 
          loading: false,
          studyStats: {
            ...this.data.studyStats,
            studyDays: this.data.studyStats.studyDays + 1
          }
        })
        
        wx.showToast({
          title: '数据已更新',
          icon: 'success'
        })
      }, 1000)
    },

    // 格式化时间显示
    formatActivityTime(timestamp: number): string {
      const now = Date.now()
      const diff = now - timestamp
      
      if (diff < 60 * 60 * 1000) {
        return Math.floor(diff / (60 * 1000)) + '分钟前'
      } else if (diff < 24 * 60 * 60 * 1000) {
        return Math.floor(diff / (60 * 60 * 1000)) + '小时前'
      } else {
        return Math.floor(diff / (24 * 60 * 60 * 1000)) + '天前'
      }
    }
  }
})