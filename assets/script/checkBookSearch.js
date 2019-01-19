
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    showBookAlert(){
        BookAlert.show();
    },
    showCheckAlertTip:function (){
        AlertWarn.show("提醒","吃的❌ 过夜❌");
    },
    showWayChooseAlert(){
        BookSearchWayAlert.show();
    }

    // update (dt) {},
});
