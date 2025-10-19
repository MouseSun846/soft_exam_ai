// exam-result.ts
Component({
  data: {
    examResult: {
      score: 85,
      grade: '良好表现',
      totalQuestions: 10,
      correctCount: 8.5,
      fillScore: 9,
      fillTotal: 10,
      essayScore: 8,
      essayTotal: 10,
      questions: [
        {
          id: 1,
          type: 'fill',
          typeText: '填空题',
          question: 'TCP/IP协议栈的四层模型包括：应用层、传输层、网络层和______。',
          userAnswer: '网络接口层',
          correctAnswer: '网络接口层',
          status: 'correct',
          statusText: '正确'
        },
        {
          id: 2,
          type: 'essay',
          typeText: '问答题',
          question: '请简述TCP三次握手的过程及其作用。',
          userAnswer: 'TCP三次握手包括客户端发送SYN包，服务器回应SYN-ACK包，客户端发送ACK包确认连接。',
          correctAnswer: 'TCP三次握手过程：1) 客户端发送SYN包到服务器；2) 服务器回应SYN-ACK包；3) 客户端发送ACK包确认连接。作用：确保连接的可靠建立，防止已失效的连接请求报文段突然又传送到了服务器。',
          aiFeedback: '您的答案基本正确，但缺少对三次握手作用的详细说明。建议补充连接建立可靠性和防止失效连接请求的作用。',
          status: 'partial',
          statusText: '部分正确'
        },
        {
          id: 3,
          type: 'fill',
          typeText: '填空题',
          question: 'HTTP协议默认使用的端口号是______。',
          userAnswer: '8080',
          correctAnswer: '80',
          status: 'wrong',
          statusText: '错误'
        }
      ],
      knowledgeAssessment: [
        {
          topic: 'TCP/IP协议栈结构',
          level: 'good',
          levelText: '掌握良好'
        },
        {
          topic: '网络协议端口号',
          level: 'weak',
          levelText: '需要加强'
        },
        {
          topic: '协议工作原理',
          level: 'fair',
          levelText: '理解基本正确'
        }
      ],
      reviewSuggestions: [
        {
          id: 1,
          text: '重点复习常见网络协议的默认端口号'
        },
        {
          id: 2,
          text: '加强对TCP连接建立和断开过程的理解'
        },
        {
          id: 3,
          text: '建议完成更多相关主题的模拟测试'
        }
      ]
    }
  },

  methods: {
    retest() {
      wx.navigateTo({
        url: '/pages/exam/exam'
      })
    },

    goHome() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})