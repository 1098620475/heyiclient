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
    testUrl: '',
    uploadVisible: false
  },
  methods: {
    onVisibleChange(e) {
      this.setData({
        uploadVisible: e.detail.visible,
      });
    },
    addFile () {
      const that = this;
      that.setData({
        uploadVisible: true
      }) 
    },
    handlePhoneUpload() {
      const that = this;
      wx.chooseMedia({
        count: 1,
        async success(res) {
          let setList = that.data.originFiles;
          let setIndex = setList.length;
          setList[setIndex] = {
            type: 'loading'
          }
          that.setData({
            originFiles: setList
          })
          let upRes = await that.handleUpload(res.tempFiles[0])
          if (upRes.success) {
            setList[setIndex].type = res.tempFiles[0].fileType;
            setList[setIndex].url = upRes.url;
            setList[setIndex].previewUrl = res.tempFiles[0].tempFilePath;
          }
          that.setData({
            originFiles: setList
          })
          that.triggerChange()
        }
      })
    },
    handleWeixinUpload() {
      const that = this;
      wx.chooseMessageFile({
        count: 1,
        type: 'all',
        async success(res) {
          let setList = that.data.originFiles;
          let setIndex = setList.length;
          setList[setIndex] = {
            type: 'loading'
          }
          that.setData({
            originFiles: setList
          })
          console.log(res.tempFiles[0], 'LLL')
          let upRes = await that.handleUpload(res.tempFiles[0])
          if (upRes.success) {
            setList[setIndex].type = res.tempFiles[0].type;
            setList[setIndex].url = upRes.url;
            setList[setIndex].name = res.tempFiles[0].name || res.tempFiles[0].fileType;
            setList[setIndex].previewUrl = res.tempFiles[0].path;
          }
          that.setData({
            originFiles: setList
          })
          that.triggerChange()
        }
      })
    },
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
        that.triggerChange()
      })
      
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
    handleClose(e){
      const index = e.currentTarget.dataset.index;
      let list = this.data.originFiles;
      list.splice(index, 1)
      this.setData({
        originFiles: list
      })
      this.triggerChange()
    },
    handlePreview (e) {
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
      } else {
        if (file.previewUrl) {
          wx.openDocument({
            filePath: file.previewUrl
          })
        } else {
          wx.downloadFile({
            url: file.url,
            success(res) {
              wx.openDocument({
                filePath: res.tempFilePath
              })
            }
          })
        }
      }
    },
    triggerChange() {
      let list = this.data.originFiles.map((item) => {
        return {
          name: item.name,
          type: item.type,
          url: item.url
        }
      })
      console.log(list, 'yyyyyyyyyyyyyy')
      this.triggerEvent('change', list)
    }
  },
});
