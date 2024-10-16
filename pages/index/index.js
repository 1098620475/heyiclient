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
          selected: 0 // 当前页面所在数据的索引值
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
    offsetTop: 0,
    projectList: []
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
        action: 'app.project.projectList',
        data: query
      }).then(function (e) {
        if (e.data.success) {
          console.log(e, 'oooo')
          that.setData({
            projectList: e.data.data
          })
        }
      })
    },
    toDetail (e) {
      console.log(e, 'OOOOOOOOOOOOOOOO')
      let detail = e.currentTarget.dataset.info;
      console.log(detail)
      wx.navigateTo({
        url: '/pages/project-info/index?detail=' + JSON.stringify(detail)
      })
    }
  }
})