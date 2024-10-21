// pages/add-page/index.js
const until = require('../../until/index.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      markdown: ``,
      form: {
        title: '',
        content: '',
        fileList: []
      },
      loading: false,
      uploadVisible: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    bindTitleInput (e) {
      this.setData({
        'form.title': e.detail.value
      })
    },
    bindContentInput (e) {
      this.setData({
        'form.content': e.detail.value
      })
    },
    bindFileInput(list) {
      console.log(list, 'GGGGGGGGGGGGG')
      this.setData({
        'form.fileList': list.detail || []
      })
    },
    handleSubmit () {
      let query = this.data.form;
      let errorInfo = ''
      let that = this;
      if (!query.title) {
        errorInfo = '请输入项目标题'
      }
      if (!query.content) {
        errorInfo = '请输入项目内容'
      }
      if (errorInfo) {
        wx.showToast({
          title: errorInfo,
          icon: 'none'
        })
        return
      }
      this.setData({
        loading: true
      })
      wx.showLoading({
        title: '提交中'
      })
      until.request({
        action: 'app.project.addProject',
        data: query
      }).then(function (e) {
        that.setData({
          loading: false
        })
        wx.hideLoading()
        if (e.data.success) {
          wx.switchTab({
            url: '/pages/index/index',
          })
          wx.showToast({
            title: '发布成功',
          })
        }
      })
    }
})