// pages/add-page/index.js
const until = require('../../until/index.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      info: {
        title: '',
        content: ''
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      console.log(options, 'SSSSSS')
      this.setData({
        info: JSON.parse(options.detail)
      })
      wx.setNavigationBarTitle({
        title: this.data.info.title,
      })
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
    handleSubmit () {
      let query = this.data.form;
      until.request({
        action: 'app.project.addProject',
        data: query
      }).then(function (e) {
        if (e.data.success) {
          
        }
      })
    },
    handlePreview (e) {
      wx.showLoading({
        title: '文件获取中...',
      })
      let file = e.currentTarget.dataset.fileitem;
      if (file.type == 'image' || file.type == 'video') {
        wx.previewMedia({
          sources: [
            {
              type: file.type,
              url: file.previewUrl || file.url
            }
          ]
        })
        wx.hideLoading()
      } else {
        if (file.previewUrl) {
          wx.openDocument({
            filePath: file.previewUrl
          })
          wx.hideLoading()
        } else {
          wx.downloadFile({
            url: file.url,
            success(res) {
              wx.hideLoading()
              wx.openDocument({
                filePath: res.tempFilePath
              })
            }
          })
        }
      }
    }
})