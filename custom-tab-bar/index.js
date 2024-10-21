Component({
    data: {
      // 添加弹窗
      visible: false,
      selected: 0,
      color: "#545454",
      selectedColor: "#B8151A",
      backgroundColor: "#fff",
      list:[
        {
          pagePath: "/pages/index/index",
          text: "首页",
          iconPath: "/assets/home.png",
          selectedIconPath: "/assets/home1.png"
        },
        {
            text: "",
            iconPath: "/assets/添加.png",
            selectedIconPath: "/assets/添加.png",
            bulge: true,
            type: 'add'
        },
        {
            pagePath: "/pages/connections/index",
            text: "人脉",
            iconPath: "/assets/rm.png",
            selectedIconPath: "/assets/rm1.png"
          }
      ],
    },
    methods: {
      toAdd (e) {
        this.setData({
          visible: false
        })
        let type = e.currentTarget.dataset.type
        wx.navigateTo({
          url: '/pages/add-page/index?type=' + type,
        })
      },
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        const type = data.type;
        if (type == 'add') {
            this.setData({
                visible: true
            })
        }
        if (url === '') {
         
        } else {
          wx.switchTab({ url });
        }
      },
      onVisibleChange(e) {
        this.setData({
          visible: e.detail.visible,
        });
      }
    }
  })