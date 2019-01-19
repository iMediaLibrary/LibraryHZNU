cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {},

    //从出口进入
    showWarning:function() {
        AlertWarn.show("警告","出口无法进入！");

    },

    //刷脸进入
    showFaceEnter:function() {
        AlertWarn.show("恭喜","人脸认证成功！");

       
        
    },

    //刷卡进入
    showDoorEnter:function() {
        AlertWarn.show("嘀嘀","刷卡成功！");
    }

   

    // update (dt) {},
});
