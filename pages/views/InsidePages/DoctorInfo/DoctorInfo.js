const service = require('../../../api/request/index.js')
Page({
    data: {
        doctorinfo: {},
        comments: []
    },
    onLoad (ev) {
        const {doctorid} = ev
        if (doctorid) {
            this.getDoctorsinfo({doctorid})
            this.getcommentslist({pageNo: 1, pageSize: 30, resourceType: 'DOCTOR'})
        }
    },
    onReady () {},
    onShow () {},
    onUnload () {},
    loadmore () {},
    getDoctorsinfo (params) {
        service.getDoctorsinfo(params)
            .then(respone => {
                this.setData({
                    doctorinfo:respone.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    doctorcollect () {
        const {doctorinfo} = this.data
        if (doctorinfo.isCollect) return false
        service.doctorcollect({doctorId: doctorinfo.doctorId, isCollect: true})
            .then(respone => {
                const {code} = respone.data
                if (Number(code) === 200 && code) {
                    wx.showToast({
                        title: '关注成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
            .catch(error => {})
    },
    getcommentslist (params) {
        service.getcommentslist(params)
            .then(respone => {
                console.log(respone.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 分享
    onShareAppMessage () {
        return {
            title: '分享的标题',
            path: '/pages/views/home/home', // 分享路径
            imageUrl: '', // 分享图片
            success: (respone) => {
                console.log(respone)
            },
            error: (error) => {
                console.log(error)
            }
        }
    }
})