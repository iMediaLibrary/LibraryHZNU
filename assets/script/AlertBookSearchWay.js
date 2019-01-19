var BookSearchWayAlert = {
    _alert: null,           // prefab
   _webSearch:null,
   _wechatSearch:null,
    _enterCallBack:null,   // 回调事件
    _animSpeed:0.3,    // 动画速度
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/
BookSearchWayAlert.show = function (enterCallBack, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (BookSearchWayAlert._alert != undefined) return;

    // 
    BookSearchWayAlert._animSpeed = animSpeed ? animSpeed : BookSearchWayAlert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("AlertWay", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        BookSearchWayAlert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(BookSearchWayAlert._animSpeed, 255), cc.scaleTo(BookSearchWayAlert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(BookSearchWayAlert._animSpeed, 0), cc.scaleTo(0, 0)), cbFadeOut);

        // 获取子节点
        BookSearchWayAlert._webSearch = cc.find("webSearch", alert);
        BookSearchWayAlert._wechatSearch = cc.find("wechatSearch", alert);
    

        // 添加点击事件
        BookSearchWayAlert._webSearch.on('click', self.onButtonWebSearchClicked, self);
        BookSearchWayAlert._wechatSearch.on('click', self.onButtonWechatSearchClicked, self);
       

        // 父视图
        BookSearchWayAlert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(enterCallBack, animSpeed);
        
    });

    // 参数

    self.configAlert = function (enterCallBack, animSpeed) {

        // 回调
        BookSearchWayAlert._enterCallBack = enterCallBack;

    
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(BookSearchWayAlert._alert, true);
        BookSearchWayAlert._alert.position = cc.p(0, 0);
        BookSearchWayAlert._alert.setScale(2);
        BookSearchWayAlert._alert.opacity = 0;
        BookSearchWayAlert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(BookSearchWayAlert._alert, true);
        BookSearchWayAlert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(BookSearchWayAlert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonWebSearchClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        console.log("11111111111");
        self.startFadeOut();
        BookSearchClassAlert.show();
       
    };
    self.onButtonWechatSearchClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        console.log("000000002");
        self.startFadeOut();
        BookSearchClassAlert.show();
        
    };
  
    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        BookSearchWayAlert._alert.destroy();
        BookSearchWayAlert._enterCallBack = null;
        BookSearchWayAlert._alert = null;
        BookSearchWayAlert._webSearch = null;
        BookSearchWayAlert._wechatSearch = null;
        BookSearchWayAlert._animSpeed = 0.3;
    };
};
