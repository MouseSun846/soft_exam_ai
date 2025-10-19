// exam.ts
Component({
  data: {
    examData: {
      title: 'TCP/IP协议栈测试',
      totalQuestions: 10,
      estimatedTime: 15
    },
    currentQuestion: 1,
    userAnswers: [],
    showSubmitModal: false,
    currentQuestionData: {
      type: 'fill',
      typeText: '填空题',
      question: 'TCP/IP协议栈的四层模型包括：应用层、传输层、网络层和______。',
      options: []
    },
    questions: [
      {
        id: 1,
        type: 'fill',
        typeText: '填空题',
        question: 'TCP/IP协议栈的四层模型包括：应用层、传输层、网络层和______。'
      },
      {
        id: 2,
        type: 'essay',
        typeText: '问答题',
        question: '请简述TCP三次握手的过程及其作用。'
      },
      {
        id: 3,
        type: 'choice',
        typeText: '选择题',
        question: 'HTTP协议默认使用的端口号是？',
        options: [
          { id: 'A', label: 'A', text: '80' },
          { id: 'B', label: 'B', text: '8080' },
          { id: 'C', label: 'C', text: '443' },
          { id: 'D', label: 'D', text: '21' }
        ]
      }
      // 更多题目...
    ]
  },

  lifetimes: {
    attached() {
      this.loadQuestionData()
      this.initializeAnswers()
    }
  },

  methods: {
    loadQuestionData() {
      const question = this.data.questions[this.data.currentQuestion - 1]
      this.setData({ currentQuestionData: question })
    },

    initializeAnswers() {
      const answers = new Array(this.data.examData.totalQuestions).fill('')
      this.setData({ userAnswers: answers })
    },

    onAnswerInput(e: any) {
      const answer = e.detail.value
      const answers = [...this.data.userAnswers]
      answers[this.data.currentQuestion - 1] = answer
      this.setData({ userAnswers: answers })
    },

    selectOption(e: any) {
      const optionId = e.currentTarget.dataset.option
      const answers = [...this.data.userAnswers]
      answers[this.data.currentQuestion - 1] = optionId
      this.setData({ userAnswers: answers })
    },

    prevQuestion() {
      if (this.data.currentQuestion > 1) {
        this.setData({ currentQuestion: this.data.currentQuestion - 1 })
        this.loadQuestionData()
      }
    },

    nextQuestion() {
      if (this.data.currentQuestion < this.data.examData.totalQuestions) {
        this.setData({ currentQuestion: this.data.currentQuestion + 1 })
        this.loadQuestionData()
      }
    },

    showSubmitModal() {
      this.setData({ showSubmitModal: true })
    },

    hideSubmitModal() {
      this.setData({ showSubmitModal: false })
    },

    submitExam() {
      wx.showLoading({ title: '提交中...' })
      
      // 模拟提交过程
      setTimeout(() => {
        wx.hideLoading()
        this.hideSubmitModal()
        
        // 跳转到结果页面
        wx.redirectTo({
          url: '/pages/exam-result/exam-result'
        })
      }, 1500)
    },

    get answeredCount() {
      return this.data.userAnswers.filter(answer => answer !== '').length
    },

    get unansweredCount() {
      return this.data.examData.totalQuestions - this.answeredCount
    }
  }
})