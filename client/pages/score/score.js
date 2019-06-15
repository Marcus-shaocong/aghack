// pages/score/score.js


Page({
  /**
   * 页面的初始数据
   */
  data: {
    iterationList: [],
    results: [0, 1, 0, 0, 1],
    answerInfo: ["wrong", "right"],
    imageUrl: ["../../resources/wrong.png", "../../resources/right.png"],

    nodes: [[{
      name: 'span',
      attrs: {
        style: 'color: red;'
      },
      children: [{
        type: 'text',
        text: 'wrong'
      }]
    }],
    [{
      name: 'span',
      attrs: {
        style: 'color: green;'
      },
      children: [{
        type: 'text',
        text: 'right'
      }]
    }]]
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: 'Group Words',
      // path: '/pages/score/score',
      path: '/pages/index/index',
      success: function (res) {
        console.log("share success", res.shareTickets);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("score.options", options)
    wx.showShareMenu({
      withShareTicket: true
    })

    try {
      var value = wx.getStorageSync('Result')
      console.log("value", value)
      if (value) {
        var len = value.length
        var itList = []
        console.log("array len", len)
        console.log(value)
        for (var i = 0; i < len; ++i) {
          itList.push(i)
        }
        // Do something with return value
        console.log("value", value)
        this.setData({
          results: value,
          iterationList: itList
        })
      }
      let questions = wx.getStorageSync('QuestionsDB')
      console.log('questions', questions)
    } catch (e) {
      // Do something when catch error
      console.log("get storge data syn failed")
      console.log(e)
    }
  },

  tap: function (event) {
    console.log("tag")
    console.log(event.target.dataset.item)
    let currentIndex = event.target.dataset.item
    wx.setStorageSync('currentHintIndex', currentIndex)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReadysocror")
    try {
      let questions = wx.getStorageSync('QuestionsDB')
      console.log('questions123', questions)
    } catch (e) {
      // Do something when catch error
      console.log("get storge data syn failed")
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  playAgain: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})