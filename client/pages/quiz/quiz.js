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
   // this.getData();
    this.setData({
      questions: testData.testData,
      isLoadingFinished:true,
      currentQuestion:testData.testData[0],
      maxQ:testData.testData.length
    })
    this.nextQuestion()
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
      this.data.finalResult.push(1)
      console.log("final", this.data.finalResult)
    } else {
      this.data.finalResult.push(0)
    }
    this.nextQuestion()
  },

  answerHw: function (e) {
    console.log("flat", e.currentTarget.dataset.index)
    let round = this.data.round
    let currentA = e.currentTarget.dataset.index;
    console.log("answer:", round)
    console.log("cA", this.data.questions[round].answer)
    if (currentA === this.data.questions[round].answer) {
      this.data.finalResult.push(1)
    } else {
      this.data.finalResult.push(0)
    }
    this.nextQuestion()
  },

  answerR: function (e) {
    console.log("flat", e.currentTarget.dataset.index)
    let round = this.data.round
    let currentA = e.currentTarget.dataset.index;
    console.log("answer:", round)
    console.log("cA", this.data.questions[round].answer)
    if (currentA === this.data.questions[round].answer) {
      this.data.finalResult.push(1)
    } else {
      this.data.finalResult.push(0)
    }
    this.nextQuestion()
  },

  answerO: function (e) {
    console.log("flat", e.currentTarget.dataset.index)
    let round = this.data.round
    let currentA = e.currentTarget.dataset.index;
    console.log("answer:", round)
    console.log("cA", this.data.questions[round].answer)
    if (currentA === this.data.questions[round].answer) {
      this.data.finalResult.push(1)
    } else {
      this.data.finalResult.push(0)
    }
    this.nextQuestion()
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
    let url = "https://tutorweb.rikai-bots.com/api/cms/many/truefalse"
    console.log("req to", url)
    let tags = { $in: ['hsk1', 'hsk2'] }
    wx.request({
      url: url,
      method: 'POST',
      data: {
        finder: {
          tags: tags,
          engine: 'truefalse'
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {
        res.data = res.data.map(item => {
          let question = item
          let assetPath = `https://tutorweb.rikai-bots.com/assets/${item.testname}`
          item.imageUrl = `${assetPath}/${item.cname}.jpg`
          item.audioUrl = `${assetPath}/${item.cname}.mp3`
          question.audio = item.audioUrl
          question.audioAuthor = item.cname
          question.audioName = item.testname
          question.mode = 'aspectFill'
          question.trueFalse = item.TF
          question.tf = (item.TF === 'T' ? true : false)
          question.audioPoster = "../resources/player.png"
          question.image = item.imageUrl
          // question.engine = item.engine
          // question.subtitles = []
          // question.subtitles.push(item.subtitles[0])
          // question.subtitles.push(item.subtitles[1])
          // question.hint = item.hint
          console.log('q', question)
          return question
        })
        console.log(res.data)
        that.setData({ questions: res.data, maxQ: res.data.length })

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