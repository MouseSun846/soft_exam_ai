// bottom-tabbar.js
Component({
  properties: {
    currentTab: {
      type: Number,
      value: 0
    }
  },

  data: {
    tabList: [
      { index: 0, pagePath: '/pages/index/index', text: '首页' },
      { index: 1, pagePath: '/pages/knowledge-base/knowledge-base', text: '知识库' },
      { index: 2, pagePath: '/pages/smart-review/smart-review', text: '智能复习' },
      { index: 3, pagePath: '/pages/profile/profile', text: '个人中心' }
    ]
  },

  methods: {
    switchTab(e) {
      const index = parseInt(e.currentTarget.dataset.index);
      const tab = this.data.tabList[index];
      
      if (index !== this.data.currentTab) {
        wx.switchTab({
          url: tab.pagePath,
          fail: (err) => {
            console.error('切换页面失败:', err);
            // 如果switchTab失败，尝试使用navigateTo
            wx.navigateTo({
              url: tab.pagePath
            });
          }
        });
      }
    }
  }
});