// profile.ts
Page({
  data: {
    userInfo: {
      name: '张同学',
      level: '中级软考',
      studyDays: 45
    },
    progressPercentage: 75,
    studyStats: {
      totalHours: 120,
      completedExams: 15,
      correctRate: 82,
      continuousDays: 7
    },

    showContactModal: false
  },

  onLoad() {
    // 页面加载时初始化数据
    this.loadUserData();
  },

  loadUserData() {
    // 模拟加载用户数据
    console.log('加载个人中心数据');
  },



  navigateToEditProfile() {
    wx.showToast({
      title: '跳转个人信息编辑',
      icon: 'none'
    });
  },

  navigateToStudyRecords() {
    wx.showToast({
      title: '跳转学习记录',
      icon: 'none'
    });
  },

  navigateToAchievements() {
    wx.showToast({
      title: '跳转成就系统',
      icon: 'none'
    });
  },

  navigateToSettings() {
    wx.showToast({
      title: '跳转系统设置',
      icon: 'none'
    });
  },

  // 显示联系方式二维码弹窗
  showContactQRCode() {
    this.setData({
      showContactModal: true
    });
  },

  // 隐藏联系方式二维码弹窗
  hideContactModal() {
    this.setData({
      showContactModal: false
    });
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
  }
});