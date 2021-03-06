Page({
    data:{
        FilePath: []
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    bindFormSubmit (ev) {
        console.log(ev)
        wx.navigateTo({
            url: `/pages/views/InsidePages/RecommendDoctor/index`
        })
    },
    // 获取照片
    chooseImage (ev) {
        const {idcard,name} = ev.currentTarget.dataset
        const number = 9 - this.data.FilePath.length
        wx.chooseImage({
            count: number,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (respone) => {
                let {FilePath} = this.data
                respone.tempFilePaths.forEach((item, index, array) => {
                    if (FilePath.length < 9) {
                        FilePath.push(item)
                    }
                })
                wx.nextTick(() => {
                    this.setData({FilePath})
                })
            },
            fail: (error) => {}
        })
    },
})