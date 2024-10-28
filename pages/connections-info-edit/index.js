// pages/connections-info-edit/index.js
const config = require('../../appConfig');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      form: {
          avatarUrl: ''
      }
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
    async chooseavatar (event) {
      console.log(event, 'GGGGGGGGGGGGGGGGGG')
      const { avatarUrl } = event.detail;
      this.setData({
        'form.avatarUrl': avatarUrl
      })
    let upRes = await this.handleUpload({
        path: avatarUrl
    })
    if (upRes.success) {
        this.setData({
            'form.avatarUrl': upRes.url
          })
    }
    },
    handleUpload (file) {
        this.setData({
          uploadVisible: false,
        });
        return new Promise((resolve) => {
          wx.uploadFile({
            url: config.uploadUrl, // 仅为示例，非真实的接口地址
            filePath: file.path || file.tempFilePath,
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              let resData = JSON.parse(res.data)
              console.log(typeof res.data)
              console.log(resData)
              resolve({
                success: true,
                url: resData.url
              })
            },
            fail: function(e) {
              resolve({
                success: false
              })
            }
          })
        })
      },
      bindTitleInput (e) {
        const setKey = 'form.' + e.target.dataset.key
        let setObj = {}
        setObj[setKey] = e.detail.value
        this.setData(setObj)
      },
})