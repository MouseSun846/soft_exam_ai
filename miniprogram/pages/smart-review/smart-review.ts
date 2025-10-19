// smart-review.ts
Component({
  data: {
    reviewTheme: '',
    isGenerating: false,
    reviewContent: '',
    exampleContent: `
      <h3>TCP/IP协议栈复习要点</h3>
      
      <h4>一、TCP/IP四层模型</h4>
      <ul>
        <li><strong>应用层</strong>：HTTP、FTP、SMTP等协议</li>
        <li><strong>传输层</strong>：TCP（可靠传输）、UDP（无连接传输）</li>
        <li><strong>网络层</strong>：IP协议、路由选择、IP地址分配</li>
        <li><strong>网络接口层</strong>：物理传输、数据链路控制</li>
      </ul>

      <h4>二、TCP三次握手</h4>
      <ol>
        <li>客户端发送SYN包到服务器</li>
        <li>服务器回应SYN-ACK包</li>
        <li>客户端发送ACK包确认连接</li>
      </ol>

      <h4>三、IP地址分类</h4>
      <table>
        <tr><th>类别</th><th>地址范围</th><th>网络位数</th></tr>
        <tr><td>A类</td><td>1.0.0.0 - 126.255.255.255</td><td>8位</td></tr>
        <tr><td>B类</td><td>128.0.0.0 - 191.255.255.255</td><td>16位</td></tr>
      </table>

      <h4>四、重要概念</h4>
      <p><strong>子网掩码</strong>：用于划分网络和主机部分</p>
      <p><strong>默认网关</strong>：本地网络的出口路由器</p>
      <p><strong>DNS</strong>：域名解析系统，将域名转换为IP地址</p>
    `
  },

  methods: {
    onThemeInput(e: any) {
      this.setData({ reviewTheme: e.detail.value })
    },

    generateReviewPoints() {
      if (!this.data.reviewTheme.trim()) {
        wx.showToast({
          title: '请输入复习主题',
          icon: 'none'
        })
        return
      }

      this.setData({ isGenerating: true })

      // 模拟AI生成过程
      setTimeout(() => {
        this.setData({
          isGenerating: false,
          reviewContent: this.data.exampleContent.replace('TCP/IP协议栈', this.data.reviewTheme)
        })
      }, 2000)
    },

    copyContent() {
      const content = this.extractTextFromHTML(this.data.reviewContent)
      wx.setClipboardData({
        data: content,
        success: () => {
          wx.showToast({
            title: '内容已复制',
            icon: 'success'
          })
        }
      })
    },

    extractTextFromHTML(html: string): string {
      return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    },

    startTest() {
      wx.navigateTo({
        url: `/pages/exam/exam?theme=${encodeURIComponent(this.data.reviewTheme)}`
      })
    }
  }
})