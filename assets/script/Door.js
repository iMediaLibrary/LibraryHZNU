cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        cc.director.preloadScene("CheckAndBookSearch",function() {
            console.log("preLoadNext.");
        });
    },

    //从出口进入
    showWarning:function() {
        DoorAlert.show("警告", "出口无法进入！",  null, 0.3, 0);

    },

    //刷脸进入
    showFaceEnter:function() {
        DoorAlert.show("恭喜","人脸认证成功！",  null, 0.3, 1);

       
        
    },

    //刷卡进入
    showDoorEnter:function() {
        
        DoorAlert.show("嘀嘀","刷卡成功！",  null, 0.3, 1);
    }

   

    // update (dt) {},
});
