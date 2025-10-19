// knowledge-base.ts
Component({
  data: {
    searchKeyword: '',
    showUploadModal: false,
    filteredDocuments: [
      {
        id: 1,
        name: '软件工程基础.pdf',
        type: 'PDF文档',
        time: '2024-10-15 14:30',
        status: 'ready',
        statusText: '已就绪',
        icon: '📄'
      },
      {
        id: 2,
        name: '网络技术.docx',
        type: 'Word文档',
        time: '2024-10-19 10:15',
        status: 'parsing',
        statusText: '解析中',
        icon: '📄'
      },
      {
        id: 3,
        name: '数据库系统.md',
        type: 'Markdown',
        time: '2024-10-18 16:45',
        status: 'error',
        statusText: '解析失败',
        icon: '📄'
      },
      {
        id: 4,
        name: '操作系统原理.txt',
        type: '文本文件',
        time: '2024-10-12 09:20',
        status: 'ready',
        statusText: '已就绪',
        icon: '📄'
      }
    ],
    allDocuments: []
  },

  lifetimes: {
    attached() {
      this.loadDocuments()
    }
  },

  methods: {
    loadDocuments() {
      // 模拟加载文档数据
      const documents = this.data.filteredDocuments
      this.setData({
        allDocuments: documents,
        filteredDocuments: documents
      })
    },

    onSearchInput(e: any) {
      const keyword = e.detail.value
      this.setData({ searchKeyword: keyword })
      this.filterDocuments(keyword)
    },

    filterDocuments(keyword: string) {
      if (!keyword.trim()) {
        this.setData({ filteredDocuments: this.data.allDocuments })
        return
      }

      const filtered = this.data.allDocuments.filter(doc => 
        doc.name.toLowerCase().includes(keyword.toLowerCase()) ||
        doc.type.toLowerCase().includes(keyword.toLowerCase())
      )
      
      this.setData({ filteredDocuments: filtered })
    },

    uploadDocument() {
      this.setData({ showUploadModal: true })
    },

    closeUploadModal() {
      this.setData({ showUploadModal: false })
    },

    chooseFromWechat() {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      })
      this.closeUploadModal()
    },

    chooseFromLocal() {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success: (res) => {
          const tempFile = res.tempFiles[0]
          this.uploadFile(tempFile)
        }
      })
      this.closeUploadModal()
    },

    uploadFile(file: any) {
      wx.showLoading({ title: '上传中...' })
      
      // 模拟上传过程
      setTimeout(() => {
        wx.hideLoading()
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        })
        
        // 添加到文档列表
        const newDoc = {
          id: Date.now(),
          name: file.name,
          type: this.getFileType(file.name),
          time: this.formatTime(new Date()),
          status: 'parsing',
          statusText: '解析中',
          icon: '📄'
        }
        
        this.setData({
          allDocuments: [newDoc, ...this.data.allDocuments],
          filteredDocuments: [newDoc, ...this.data.filteredDocuments]
        })
      }, 2000)
    },

    getFileType(filename: string): string {
      const parts = filename.split('.')
      const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : ''
      const types: any = {
        'pdf': 'PDF文档',
        'doc': 'Word文档',
        'docx': 'Word文档',
        'txt': '文本文件',
        'md': 'Markdown'
      }
      return types[ext] || '文档'
    },

    formatTime(date: Date): string {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hour}:${minute}`
    },

    viewDocument(e: any) {
      const docId = e.currentTarget.dataset.id
      const document = this.data.allDocuments.find(doc => doc.id === docId)
      
      if (document) {
        if (document.status === 'ready') {
          wx.navigateTo({
            url: `/pages/document-detail/document-detail?id=${docId}`
          })
        } else {
          wx.showToast({
            title: document.statusText,
            icon: 'none'
          })
        }
      }
    }
  }
})