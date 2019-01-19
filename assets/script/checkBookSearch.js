
cc.Class({
    extends: cc.Component,

    properties: {
        tipAudio:{
            default:null,
            type:cc.AudioClip
        }



    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start:function () {

    },
    showBookAlert:function(){
        BookAlert.show();
    },
    showCheckAlertTip:function (){
        cc.audioEngine.playEffect(this.tipAudio,false);
        AlertWarn.show("提醒","吃的❌ 过夜❌");
    },
    showWayChooseAlert:function(){
        BookSearchWayAlert.show();
    }

    // update (dt) {},
});
