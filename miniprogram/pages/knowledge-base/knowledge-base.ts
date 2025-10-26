// knowledge-base.ts
Component({
  data: {
    searchKeyword: '',
    filteredKnowledgeBases: [] as any[],
    allKnowledgeBases: [] as any[],
    // 统计数据
    totalDocuments: 0,
    parsedDocuments: 0,
    // 新增知识库弹窗相关数据
    showAddKnowledgeModal: false,
    newKnowledgeName: '',
    newKnowledgeDescription: ''
  },

  lifetimes: {
    attached() {
      this.loadKnowledgeBases()
    }
  },

  methods: {
    goToSearch() {
      wx.navigateTo({
        url: '/pages/search/search'
      });
    },

    loadKnowledgeBases() {
      // 模拟加载知识库数据
      const knowledgeBases = [
        {
          id: 1,
          name: '软件工程知识库',
          description: '包含软件工程相关的所有文档和资料',
          documentCount: 12,
          updatedAt: '2024-10-20',
          thumbnail: ''
        },
        {
          id: 2,
          name: '网络技术知识库',
          description: '网络协议、架构和安全相关文档',
          documentCount: 8,
          updatedAt: '2024-10-18',
          thumbnail: ''
        },
        {
          id: 3,
          name: '数据库系统知识库',
          description: '数据库设计、优化和管理资料',
          documentCount: 15,
          updatedAt: '2024-10-15',
          thumbnail: ''
        },
        {
          id: 4,
          name: '操作系统知识库',
          description: '操作系统原理和实践指南',
          documentCount: 10,
          updatedAt: '2024-10-12',
          thumbnail: ''
        }
      ];
      
      // 计算统计数据
      let totalDocs = 0;
      let parsedDocs = 0;
      
      knowledgeBases.forEach(kb => {
        totalDocs += kb.documentCount;
      });
      
      this.setData({
        allKnowledgeBases: knowledgeBases,
        filteredKnowledgeBases: knowledgeBases,
        totalDocuments: totalDocs,
        parsedDocuments: parsedDocs
      });
    },

    onSearchInput(e: any) {
      const keyword = e.detail.value;
      this.setData({ searchKeyword: keyword });
      this.filterKnowledgeBases(keyword);
    },

    filterKnowledgeBases(keyword: string) {
      if (!keyword.trim()) {
        this.setData({ filteredKnowledgeBases: this.data.allKnowledgeBases });
        return;
      }

      const filtered = this.data.allKnowledgeBases.filter(kb => 
        kb.name.toLowerCase().includes(keyword.toLowerCase()) ||
        kb.description.toLowerCase().includes(keyword.toLowerCase())
      );
      
      this.setData({ filteredKnowledgeBases: filtered });
    },

    viewKnowledgeBase(e: any) {
      const kbId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/knowledge-base-detail/knowledge-base-detail?id=${kbId}`
      });
    },

    deleteKnowledgeBase(e: any) {
      const kbId = e.currentTarget.dataset.id;
      
      wx.showModal({
        title: '确认删除',
        content: '确定要删除这个知识库吗？此操作不可恢复。',
        success: (res) => {
          if (res.confirm) {
            // 执行删除操作
            const updatedKnowledgeBases = this.data.allKnowledgeBases.filter((kb: any) => kb.id !== kbId);
            const filteredKnowledgeBases = this.data.filteredKnowledgeBases.filter((kb: any) => kb.id !== kbId);
            
            // 重新计算统计数据
            let totalDocs = 0;
            updatedKnowledgeBases.forEach(kb => {
              totalDocs += kb.documentCount;
            });
            
            this.setData({
              allKnowledgeBases: updatedKnowledgeBases,
              filteredKnowledgeBases: filteredKnowledgeBases,
              totalDocuments: totalDocs
            });
            
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            });
          }
        }
      });
    },

    // 阻止事件冒泡
    stopEventPropagation(e: any) {
      e.stopPropagation();
    },

    formatTime(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    // 显示新增知识库弹窗
    showAddKnowledgeModal() {
      this.setData({
        showAddKnowledgeModal: true,
        newKnowledgeName: '',
        newKnowledgeDescription: ''
      });
    },

    // 关闭新增知识库弹窗
    closeAddKnowledgeModal() {
      this.setData({
        showAddKnowledgeModal: false,
        newKnowledgeName: '',
        newKnowledgeDescription: ''
      });
    },

    // 输入知识库名称
    onNameInput(e: any) {
      this.setData({
        newKnowledgeName: e.detail.value
      });
    },

    // 输入知识库描述
    onDescriptionInput(e: any) {
      this.setData({
        newKnowledgeDescription: e.detail.value
      });
    },

    // 新增知识库
    addKnowledgeBase() {
      const { newKnowledgeName, newKnowledgeDescription } = this.data;
      
      // 验证输入
      if (!newKnowledgeName.trim()) {
        wx.showToast({
          title: '请输入知识库名称',
          icon: 'none'
        });
        return;
      }
      
      // 创建新知识库
      const newKnowledgeBase = {
        id: Date.now(), // 使用时间戳作为唯一ID
        name: newKnowledgeName,
        description: newKnowledgeDescription || '暂无描述',
        documentCount: 0,
        updatedAt: this.formatTime(new Date()),
        thumbnail: ''
      };
      
      // 更新数据
      const updatedKnowledgeBases = [newKnowledgeBase, ...this.data.allKnowledgeBases];
      
      // 重新计算统计数据
      let totalDocs = 0;
      updatedKnowledgeBases.forEach(kb => {
        totalDocs += kb.documentCount;
      });
      
      this.setData({
        allKnowledgeBases: updatedKnowledgeBases,
        filteredKnowledgeBases: updatedKnowledgeBases,
        totalDocuments: totalDocs,
        showAddKnowledgeModal: false,
        newKnowledgeName: '',
        newKnowledgeDescription: ''
      });
      
      wx.showToast({
        title: '新增成功',
        icon: 'success'
      });
    }
  }
});