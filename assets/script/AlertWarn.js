var AlertWarn = {
    _alert: null,           // prefab
    _detailLabel:null,   // 内容
    _title:null,         //标题
    _enterButton:null,   // 确定按钮
    _enterCallBack:null,   // 回调事件
    _animSpeed:0.3,    // 动画速度
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/
AlertWarn.show = function (title,detailString, enterCallBack, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (AlertWarn._alert != undefined) return;

    // 
    AlertWarn._animSpeed = animSpeed ? animSpeed : AlertWarn._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("Alert", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        AlertWarn._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(AlertWarn._animSpeed, 255), cc.scaleTo(AlertWarn._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(AlertWarn._animSpeed, 0), cc.scaleTo(AlertWarn._animSpeed, 2.0)), cbFadeOut);

        // 获取子节点
        AlertWarn._title = cc.find("Title", alert).getComponent(cc.Label);
        AlertWarn._detailLabel = cc.find("content", alert).getComponent(cc.Label);
        AlertWarn._enterButton = cc.find("known/Know", alert);

        // 添加点击事件
        AlertWarn._enterButton.on('click', self.onButtonClicked, self);

        // 父视图
        AlertWarn._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(title,detailString, enterCallBack, animSpeed);
        
    });

    // 参数

    self.configAlert = function (title,detailString, enterCallBack, animSpeed) {

        // 回调
        AlertWarn._enterCallBack = enterCallBack;

        // 内容
        AlertWarn._detailLabel.string = detailString;
        AlertWarn._title.string = title;

    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(AlertWarn._alert, true);
        AlertWarn._alert.position = cc.p(0, 0);
        AlertWarn._alert.setScale(2);
        AlertWarn._alert.opacity = 0;
        AlertWarn._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(AlertWarn._alert, true);
        AlertWarn._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(AlertWarn._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        self.startFadeOut();
    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        AlertWarn._alert.destroy();
        AlertWarn._enterCallBack = null;
        AlertWarn._alert = null;
        AlertWarn._title = null;
        AlertWarn._detailLabel = null;
        AlertWarn._enterButton = null;
        AlertWarn._animSpeed = 0.3;
    };
};
