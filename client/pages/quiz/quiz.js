// pages/quiz/quiz.js
var testData = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tryAgain: false,
    disableBtn: false,
    isLoadingFinished: false,
    isTestdone: false,
    maxQ: -1,
    round: -1,
    questions: [],
    currentQuestion: { },
    q: {},
    finalResult: [],
    status: "waiting",
    hint: {
      cta: "click here to discuss"
    }
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    console.log("testData", testData)
     this.getData();
    // this.setData({
    //   questions: testData.testData,
    //   isLoadingFinished:true,
    //   currentQuestion:testData.testData[0],
    //   maxQ:testData.testData.length
    // })
    // this.nextQuestion()
  },

  onReady: function () {
    console.log("onReady")
  },


  imgload: function () {
    console.log("imgload")
  },

  onShow: function () {
    console.log("onShow")
    console.log(this.data.isTestDone)
    if (this.data.isTestDone) {
      this.setData({
        tryAgain: true,
      })
    }
  },

  nextQuestion() {
    let round = this.data.round + 1;
    console.log("currentRound", round)
    if (round == this.data.maxQ) {
      wx.redirectTo({
        url: '../score/score'
      })
      console.log("final result")
      console.log(this.data.finalResult)
      try {
        wx.setStorageSync("Result", this.data.finalResult)
        wx.setStorageSync("QuestionsDB", this.data.questions)
      }
      catch (e) {
        console.log("Exception in setStorage")
      }

      this.setData({
        isTestDone: true,
        finalResult: []
      })

    } else {
      let q = this.data.questions[round]
      console.log('q', q)
      this.setData({
        round: this.data.round + 1,
        currentQuestion: q,
        q: q    // shortcut
      })
    }
  },

  answerKw: function (e) {
    console.log("flat", e.currentTarget.dataset.index)
    let round = this.data.round
    let currentA = e.currentTarget.dataset.index;
    console.log("answer:", currentA)
    console.log("cA",this.data.questions[round].answer)
    if (currentA == this.data.questions[round].answer) {
      //this.data.finalResult.push(1)
      this.showCorrect()
      console.log("final", this.data.finalResult)
    } else {
     // this.data.finalResult.push(0)
      this.showWrong()
    }
    //this.nextQuestion()
  },

  answerHw: function (e) {
    console.log("flat", e.currentTarget.dataset.index)
    let round = this.data.round
    let currentA = e.currentTarget.dataset.index;
    console.log("answer:", round)
    console.log("cA", this.data.questions[round].answer)
    if (currentA === this.data.questions[round].answer) {
      //this.data.finalResult.push(1)
      this.showCorrect()
    } else {
      //this.data.finalResult.push(0)
      this.showWrong()
    }
    //this.nextQuestion()
  },

  answerR: function (e) {
    console.log("flat", e.currentTarget.dataset.index)
    let round = this.data.round
    let currentA = e.currentTarget.dataset.index;
    console.log("answer:", round)
    console.log("cA", this.data.questions[round].answer)
    if (currentA === this.data.questions[round].answer) {
      //this.data.finalResult.push(1)
      this.showCorrect();
    } else {
      //this.data.finalResult.push(0)
      this.showWrong();
    }
    //this.nextQuestion()
  },

  answerO: function (e) {
    console.log("flat", e.currentTarget.dataset.index)
    let round = this.data.round
    let currentA = e.currentTarget.dataset.index;
    console.log("answer:", round)
    console.log("cA", this.data.questions[round].answer)
    if (currentA === this.data.questions[round].answer) {
      
      this.showCorrect();
    } else {
      
      this.showWrong()
    }
  },

  showCorrect: function(){
    var that = this
    wx.showModal({
      title: 'Correct!',
      content: 'You are a genius!',
      confirmText:'Next',
      cancelText:'Cancel',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.finalResult.push(1);
          that.nextQuestion()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showWrong: function () {
    var that = this;
    wx.showModal({
      title: 'Sorry, Wrong answer!',
      content: 'Click cancel and try it again.',
      confirmText: 'Skip',
      cancelText: 'Cancel',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.finalResult.push(0)
          that.nextQuestion()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  cleanOnRetry: function () {
    this.setData({
      round: 0,
      currentQuestion: this.data.questions[0],
      isTestDone: false,
      disableBtn: false
    })
  },
  
  goToResult: function (flag) {
    wx.redirectTo({
      url: '../score/score'
    })
  },

  getData: function () {
    var that = this
    let url = "https://xinjushi.xyz/api/trash"
    console.log("req to", url)
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {
        console.log('res',res)
        
        console.log(res.data)
        that.setData({ questions: res.data.questions, maxQ: res.data.questions.length,
        currentQuestion:res.data.questions[0]
        })
      },
      complete: function (res) {
        console.log("complete")
        console.log(res)
        that.setData({
          isLoadingFinished: true,
        })
        that.nextQuestion();
      },

      fail: function (res) {
        console.log("fail")
        console.log(res)
      }
    })

  },
})