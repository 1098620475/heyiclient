const config = require('../../../appConfig.js')
Component({
  data: {
    originFiles: [
     
    ],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
    testUrl: ''
  },
  methods: {
    async handleSuccess(e) {
      const that = this;
      const { files } = e.detail;
      let uploadArr = files.map((item) => {
        return this.handleUpload(item)
      })
      Promise.all(uploadArr).then((files) => {
        let setFiles = this.data.originFiles.concat(files)
        this.setData({
          originFiles: setFiles,
        });
      })
      
    },
    handleUpload (file) {
      return new Promise((resolve) => {
        wx.uploadFile({
          url: config.uploadUrl, // 仅为示例，非真实的接口地址
          filePath: file.url,
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
            console.log(e, 'OOOOOOOOOOOOOOO')
            resolve({
              success: false
            })
          }
        })
      })
    },
    handleRemove(e) {
      const { index } = e.detail;
      const { originFiles } = this.data;
      originFiles.splice(index, 1);
      this.setData({
        originFiles,
      });
    },
    handleClick(e) {
      console.log(e.detail.file);
    },
  },
});
