// pages/connections-info/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      defaultHead: 'http://www.memeschool.top:8080/heyi/zBgPKulvCSAZ6e1a56977be5cf377a463e30856dde1e.png'
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
    homeClick () {
        wx.switchTab({
          url: '/pages/index/index',
        })
    },
    toEdit () {
      wx.navigateTo({
        url: '/pages/connections-info-edit/index',
      })
    }
})