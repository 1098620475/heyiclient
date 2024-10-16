// pages/Testpage/HomePage/index.js
const app = getApp()
const until = require('../../until/index.js')
Component({
  properties: {
    type: {
      type: String,
      observer: function (newObj, oldObj) {
        console.log('type============', newObj)  
      }
    },
    showDefault: {
      type: Boolean
    }
  },
  pageLifetimes: {
    show: function() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2 // 当前页面所在数据的索引值
        })
      }
      // 页面被展示
      let showDefault = this.data.showDefault
      if (showDefault) {
        this.setData({showDefault: true})
      }
      this.getArticleInfo()
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    showDefault: false,
    imgUrl: '',
    showImage: false,
    offsetTop: 0
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // let showDefault = this.data.showDefault
      // if (showDefault) {
      //   this.setData({showDefault: true})
      // }
      // this.getArticleInfo()
    },
    moved: function () { },
    detached: function () { }
  },
  methods: {
    commonNavAttr (event) {
      this.setData({offsetTop: event.detail.height})
    },
    imageLoad(ev) {
      this.setData({ showImage: true })
    },
    getArticleInfo() {
      let that = this
      let query = {}
      if (this.data.type) {
        query.type = this.data.type
      }
      until.request({
        action: 'app.article.getArticleInfo',
        data: query
      }).then(function (e) {
        if (e.data.success) {
          let getdata = e.data.data[0]
          let imgUrl =getdata.imgUrl || ''
          let articleUrl = getdata.articleUrl
          if (imgUrl){
            that.setData({ 'imgUrl': imgUrl, 'articleUrl': articleUrl})
          }
          if (articleUrl && !that.data.type) {
            that.triggerEvent("showJob", true)
          }
        }
      })
    },
    toArticle () {
      if (this.data.articleUrl) {
        wx.navigateTo({
          url: '/pages/common/getWebView/index?url=' + this.data.articleUrl
        })
      }
    }
  }
})