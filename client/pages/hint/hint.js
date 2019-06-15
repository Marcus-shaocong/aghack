// pages/admin/admin.js
Page({

  data: {
    questions: [],
    currentIndex: -1
  },

  onLoad: function (options) {
    let currentIndex = options.Q
    console.log("currentIndex", currentIndex)
    if (!currentIndex) {
      console.warn('undefined currentIndex going to home')
      // this is a hack!
      wx.redirectTo({
        url: '../index/index'
      })
    }
    try {
      this.setData({
        currentIndex: currentIndex
      })

    } catch (e) {
      // Do something when catch error
      console.log("Error: get storge data syn failed")
      console.log(e)
    }
  },

  onReady: function () {
    try {
      let questions = wx.getStorageSync('QuestionsDB')
      let oneQ = questions[this.data.currentIndex]
      console.log('oneQ', oneQ)
      this.setData({
        questions: questions,
        oneQ: oneQ
      })
    } catch (e) {
      // Do something when catch error
      console.log("Error: get storge data syn failed")
      console.log(e)
    }
  },

  imgload: function () {
  },

  onShow: function () {

  },


})