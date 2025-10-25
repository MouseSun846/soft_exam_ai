// knowledge-base-detail.ts
Page({
  data: {
    knowledgeBaseId: '',
    knowledgeBase: {
      id: 1,
      name: '软件工程知识库',
      description: '包含软件工程相关的所有文档和资料',
      documentCount: 12,
      updatedAt: '2024-10-20',
      thumbnail: ''
    } as any,
    documentSearchKeyword: '',
    filteredDocuments: [] as any[],
    allDocuments: [] as any[]
  },

  onLoad(options: any) {
    if (options.id) {
      this.setData({
        knowledgeBaseId: options.id
      });
      this.loadKnowledgeBaseDetail(options.id);
    }
  },

  loadKnowledgeBaseDetail(id: string) {
    // 模拟加载知识库详情
    const documents = [
      {
        id: 1,
        name: '软件工程基础.pdf',
        type: 'PDF文档',
        size: '2.4MB',
        progress: 100,
        status: 'ready',
        statusText: '已就绪',
        icon: '📄'
      },
      {
        id: 2,
        name: '需求分析方法.docx',
        type: 'Word文档',
        size: '1.8MB',
        progress: 100,
        status: 'ready',
        statusText: '已就绪',
        icon: '📄'
      },
      {
        id: 3,
        name: '系统设计原则.md',
        type: 'Markdown',
        size: '0.8MB',
        progress: 75,
        status: 'parsing',
        statusText: '解析中',
        icon: '📄'
      },
      {
        id: 4,
        name: '测试策略.txt',
        type: '文本文件',
        size: '0.3MB',
        progress: 30,
        status: 'parsing',
        statusText: '解析中',
        icon: '📄'
      },
      {
        id: 5,
        name: '项目管理流程.pdf',
        type: 'PDF文档',
        size: '3.2MB',
        progress: 0,
        status: 'pending',
        statusText: '待处理',
        icon: '📄'
      }
    ];
    
    this.setData({
      allDocuments: documents,
      filteredDocuments: documents
    });
    
    // 这里应该调用API获取真实的知识库详情
    console.log('加载知识库详情，ID:', id);
  },

  onDocumentSearch(e: any) {
    const keyword = e.detail.value;
    this.setData({ documentSearchKeyword: keyword });
    this.filterDocuments(keyword);
  },

  filterDocuments(keyword: string) {
    if (!keyword.trim()) {
      this.setData({ filteredDocuments: this.data.allDocuments });
      return;
    }

    const filtered = this.data.allDocuments.filter(doc => 
      doc.name.toLowerCase().includes(keyword.toLowerCase()) ||
      doc.type.toLowerCase().includes(keyword.toLowerCase())
    );
    
    this.setData({ filteredDocuments: filtered });
  },

  addDocument() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const tempFile = res.tempFiles[0];
        this.uploadFile(tempFile);
      }
    });
  },

  uploadFile(file: any) {
    wx.showLoading({ title: '上传中...' });
    
    // 模拟上传过程
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '上传成功',
        icon: 'success'
      });
      
      // 添加到文档列表
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: this.getFileType(file.name),
        size: this.formatFileSize(file.size),
        progress: 0,
        status: 'pending',
        statusText: '待处理',
        icon: '📄'
      };
      
      this.setData({
        allDocuments: [newDoc, ...this.data.allDocuments],
        filteredDocuments: [newDoc, ...this.data.filteredDocuments],
        'knowledgeBase.documentCount': this.data.knowledgeBase.documentCount + 1
      });
    }, 2000);
  },

  getFileType(filename: string): string {
    const parts = filename.split('.');
    const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : '';
    const types: any = {
      'pdf': 'PDF文档',
      'doc': 'Word文档',
      'docx': 'Word文档',
      'txt': '文本文件',
      'md': 'Markdown'
    };
    return types[ext] || '文档';
  },

  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + 'B';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + 'KB';
    } else {
      return (size / (1024 * 1024)).toFixed(1) + 'MB';
    }
  },

  viewDocument(e: any) {
    const docId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看文档详情',
      icon: 'none'
    });
    // 这里可以跳转到文档详情页面
    console.log('查看文档，ID:', docId);
  },

  deleteDocument(e: any) {
    const docId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个文档吗？',
      success: (res) => {
        if (res.confirm) {
          // 执行删除操作
          const updatedDocuments = this.data.allDocuments.filter((doc: any) => doc.id !== docId);
          const filteredDocuments = this.data.filteredDocuments.filter((doc: any) => doc.id !== docId);
          
          this.setData({
            allDocuments: updatedDocuments,
            filteredDocuments: filteredDocuments,
            'knowledgeBase.documentCount': this.data.knowledgeBase.documentCount - 1
          });
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  deleteKnowledgeBase() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除整个知识库吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          // 执行删除操作
          wx.navigateBack();
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
});