var BookAlert = {
    _alert: null,           // prefab
   _book1:null,
   _book2:null,
   _book3:null,
    _enterCallBack:null,   // 回调事件
    _animSpeed:0.3,    // 动画速度
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/
BookAlert.show = function (enterCallBack, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (BookAlert._alert != undefined) return;

    // 
    BookAlert._animSpeed = animSpeed ? animSpeed : BookAlert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("AlertBookSearch", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        BookAlert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(BookAlert._animSpeed, 255), cc.scaleTo(BookAlert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(BookAlert._animSpeed, 0), cc.scaleTo(BookAlert._animSpeed, 2.0)), cbFadeOut);

        // 获取子节点
        BookAlert._book1 = cc.find("Book1", alert);
        BookAlert._book2 = cc.find("Book2", alert);
        BookAlert._book3 = cc.find("Book3", alert);

        // 添加点击事件
        BookAlert._book1.on('click', self.onButtonBook1Clicked, self);
        BookAlert._book2.on('click', self.onButtonBook2Clicked, self);
        BookAlert._book3.on('click', self.onButtonBook3Clicked, self);

        // 父视图
        BookAlert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(enterCallBack, animSpeed);
        
    });

    // 参数

    self.configAlert = function (enterCallBack, animSpeed) {

        // 回调
        BookAlert._enterCallBack = enterCallBack;

    
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(BookAlert._alert, true);
        BookAlert._alert.position = cc.p(0, 0);
        BookAlert._alert.setScale(2);
        BookAlert._alert.opacity = 0;
        BookAlert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(BookAlert._alert, true);
        BookAlert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(BookAlert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonBook1Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        console.log("11111111111");
        self.startFadeOut();
        AlertWarn.show("沙雕","不是这本");
       
    };
    self.onButtonBook2Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        console.log("000000002");
        self.startFadeOut();
        AlertWarn.show("恭喜","书在2楼209");
        
    };
    self.onButtonBook3Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        console.log("00000000000000003");
        self.startFadeOut();
        AlertWarn.show("沙雕","不是这本");
    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        BookAlert._alert.destroy();
        BookAlert._enterCallBack = null;
        BookAlert._alert = null;
        BookAlert._book1 = null;
        BookAlert._book2 = null;
        BookAlert._book3 = null;
        BookAlert._animSpeed = 0.3;
    };
};
