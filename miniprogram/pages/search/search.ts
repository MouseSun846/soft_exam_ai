// search.ts
Page({
  data: {
    searchKeyword: '',
    searchHistory: [] as string[],
    searchResults: [] as any[],
    leftColumnItems: [] as any[],
    rightColumnItems: [] as any[],
    isLoading: false,
    allKnowledgeBases: [] as any[]
  },

  onLoad() {
    // 从本地存储加载搜索历史
    this.loadSearchHistory();
    // 加载所有知识库数据
    this.loadAllKnowledgeBases();
  },

  // 加载所有知识库数据
  loadAllKnowledgeBases() {
    // 模拟加载知识库数据（实际项目中应该从服务器获取）
    const knowledgeBases = [
      {
        id: 1,
        name: '软件工程知识库',
        description: '包含软件工程相关的所有文档和资料，涵盖需求分析、系统设计、编码实现、测试验证等完整生命周期',
        documentCount: 12,
        updatedAt: '2024-10-20',
        thumbnail: ''
      },
      {
        id: 2,
        name: '网络技术知识库',
        description: '网络协议、架构和安全相关文档，包括TCP/IP协议栈、网络安全防护、网络设备配置等专业知识',
        documentCount: 8,
        updatedAt: '2024-10-18',
        thumbnail: ''
      },
      {
        id: 3,
        name: '数据库系统知识库',
        description: '数据库设计、优化和管理资料，涵盖关系型数据库、NoSQL数据库、数据仓库等各类数据库技术',
        documentCount: 15,
        updatedAt: '2024-10-15',
        thumbnail: ''
      },
      {
        id: 4,
        name: '操作系统知识库',
        description: '操作系统原理和实践指南，包括进程管理、内存管理、文件系统、设备驱动等核心概念',
        documentCount: 10,
        updatedAt: '2024-10-12',
        thumbnail: ''
      },
      {
        id: 5,
        name: '算法与数据结构',
        description: '经典算法和数据结构详解，包括排序算法、查找算法、图论算法以及各种数据结构的实现',
        documentCount: 18,
        updatedAt: '2024-10-08',
        thumbnail: ''
      },
      {
        id: 6,
        name: '前端开发技术',
        description: 'Web前端开发技术栈，涵盖HTML、CSS、JavaScript、Vue、React等现代前端框架和工具',
        documentCount: 22,
        updatedAt: '2024-10-05',
        thumbnail: ''
      }
    ];

    this.setData({
      allKnowledgeBases: knowledgeBases
    });
  },

  // 加载搜索历史
  loadSearchHistory() {
    try {
      const history = wx.getStorageSync('searchHistory') || [];
      this.setData({
        searchHistory: history
      });
    } catch (e) {
      console.error('加载搜索历史失败', e);
    }
  },

  // 保存搜索历史
  saveSearchHistory(keyword: string) {
    if (!keyword.trim()) return;

    let history = this.data.searchHistory;
    // 移除已存在的相同关键词
    history = history.filter(item => item !== keyword);
    // 将新关键词添加到开头
    history.unshift(keyword);
    // 限制历史记录数量为10条
    if (history.length > 10) {
      history = history.slice(0, 10);
    }

    this.setData({
      searchHistory: history
    });

    // 保存到本地存储
    try {
      wx.setStorageSync('searchHistory', history);
    } catch (e) {
      console.error('保存搜索历史失败', e);
    }
  },

  // 清除搜索历史
  clearHistory() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有搜索历史记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            searchHistory: []
          });
          try {
            wx.removeStorageSync('searchHistory');
          } catch (e) {
            console.error('清除搜索历史失败', e);
          }
        }
      }
    });
  },

  // 搜索输入事件
  onSearchInput(e: any) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
  },

  // 搜索确认事件
  onSearchConfirm(e: any) {
    const keyword = e.detail.value || this.data.searchKeyword;
    if (keyword.trim()) {
      this.performSearch(keyword);
    }
  },

  // 执行搜索
  performSearch(keyword: string) {
    if (!keyword.trim()) return;

    this.setData({
      isLoading: true
    });

    // 保存搜索历史
    this.saveSearchHistory(keyword);

    // 模拟搜索延迟
    setTimeout(() => {
      // 过滤搜索结果
      const results = this.data.allKnowledgeBases.filter(kb => 
        kb.name.toLowerCase().includes(keyword.toLowerCase()) ||
        kb.description.toLowerCase().includes(keyword.toLowerCase())
      );

      this.setData({
        searchResults: results,
        isLoading: false
      });

      // 重新排列瀑布流
      this.arrangeWaterfall(results);
    }, 500);
  },

  // 瀑布流排列算法
  arrangeWaterfall(items: any[]) {
    const leftColumn: any[] = [];
    const rightColumn: any[] = [];
    
    // 简单的瀑布流排列：奇数项放左边，偶数项放右边
    items.forEach((item, index) => {
      if (index % 2 === 0) {
        leftColumn.push(item);
      } else {
        rightColumn.push(item);
      }
    });

    this.setData({
      leftColumnItems: leftColumn,
      rightColumnItems: rightColumn
    });
  },

  // 点击历史标签
  onHistoryTagTap(e: any) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      searchKeyword: keyword
    });
    this.performSearch(keyword);
  },

  // 返回上一页
  onBack() {
    wx.navigateBack();
  },

  // 查看知识库详情
  viewKnowledgeDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/knowledge-base-detail/knowledge-base-detail?id=${id}`
    });
  },

  // 搜索图标点击事件
  onSearchIconTap() {
    if (this.data.searchKeyword.trim()) {
      this.performSearch(this.data.searchKeyword);
    }
  },

  // 清除输入框内容
  onClearInput() {
    this.setData({
      searchKeyword: '',
      searchResults: [],
      leftColumnItems: [],
      rightColumnItems: []
    });
  },

  // 删除单个历史记录项
  removeHistoryItem(e: any) {
    // 阻止事件冒泡
    e.stopPropagation();
    
    const keyword = e.currentTarget.dataset.keyword;
    const updatedHistory = this.data.searchHistory.filter(item => item !== keyword);
    
    this.setData({
      searchHistory: updatedHistory
    });
    
    // 保存到本地存储
    try {
      wx.setStorageSync('searchHistory', updatedHistory);
    } catch (e) {
      console.error('保存搜索历史失败', e);
    }
  }
});