var DoorAlert = {
    _alert: null,           // prefab
    _detailLabel:null,   // 内容
    _title:null,         //标题
    _enterButton:null,   // 确定按钮
    _enterCallBack:null,   // 回调事件
    _animSpeed:0.3,    // 动画速度
    _flag: 0,
    //_senceName: null,
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
 * flag：           是否正确通过 default = 0.
*/
DoorAlert.show = function (title,detailString,  enterCallBack, animSpeed,flag) {

    

    // 引用
    var self = this;

    // 判断
    if (DoorAlert._alert != undefined) return;

    // 
    DoorAlert._animSpeed = animSpeed ? animSpeed : DoorAlert._animSpeed;
    DoorAlert._flag = flag;
  
    // 加载 prefab 创建
    cc.loader.loadRes("DoorAlert", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        DoorAlert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(DoorAlert._animSpeed, 255), cc.scaleTo(DoorAlert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(DoorAlert._animSpeed, 0), cc.scaleTo(DoorAlert._animSpeed, 2.0)), cbFadeOut);

        // 获取子节点
        DoorAlert._title = cc.find("Title", alert).getComponent(cc.Label);
        DoorAlert._detailLabel = cc.find("content", alert).getComponent(cc.Label);
        DoorAlert._enterButton = cc.find("known/Know", alert);

        // 添加点击事件
        if(flag == 1) {
            DoorAlert._enterButton.on('click', self.onButtonClicked, self);
        }else {
            DoorAlert._enterButton.on('click', self.onButtonNextClicked, self);
        }
  

        // 父视图
        DoorAlert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(title,detailString, enterCallBack, animSpeed, flag);
        
    });

    // 参数

    self.configAlert = function (title,detailString, enterCallBack, animSpeed, flag) {

        // 回调
        DoorAlert._enterCallBack = enterCallBack;

        // 内容
        DoorAlert._detailLabel.string = detailString;
        DoorAlert._title.string = title;
        //flag changes
        DoorAlert._flag = flag;

    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(DoorAlert._alert, true);
        DoorAlert._alert.position = cc.p(0, 0);
        DoorAlert._alert.setScale(2);
        DoorAlert._alert.opacity = 0;
        DoorAlert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(DoorAlert._alert, true);
        DoorAlert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(DoorAlert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    //转换场景
    self.loadNextSence = function (senceName) {
        cc.director.loadScene(senceName);
    };

    // 按钮点击事件
    self.onButtonClicked = function(event){
        
            self.loadNextSence("CheckAndBookSearch");
      
        
    };

    //

    self.onButtonNextClicked = function(event){
            self.startFadeOut();
    };
  

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        DoorAlert._alert.destroy();
        DoorAlert._enterCallBack = null;
        DoorAlert._alert = null;
        DoorAlert._title = null;
        DoorAlert._detailLabel = null;
        DoorAlert._enterButton = null;
        DoorAlert._animSpeed = 0.3;
        DoorAlert._flag = 0;
        DoorAlert._senceName = null;
    };
};
