var BookSearchClassAlert = {
    _alert: null,           // prefab
   _library:null,
   _journal:null,
   _eleMater:null,
    _enterCallBack:null,   // 回调事件
    _animSpeed:0.3,    // 动画速度
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/
BookSearchClassAlert.show = function (enterCallBack, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (BookSearchClassAlert._alert != undefined) return;

    // 
    BookSearchClassAlert._animSpeed = animSpeed ? animSpeed : BookSearchClassAlert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("AlertBookSearchClass", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        BookSearchClassAlert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(BookSearchClassAlert._animSpeed, 255), cc.scaleTo(BookSearchClassAlert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(BookSearchClassAlert._animSpeed, 0), cc.scaleTo(0, 0)), cbFadeOut);

        // 获取子节点
        BookSearchClassAlert._library = cc.find("library", alert);
        BookSearchClassAlert._journal = cc.find("journal", alert);
        BookSearchClassAlert._eleMater = cc.find("eleMater", alert);
    

        // 添加点击事件
        BookSearchClassAlert._library.on('click', self.onButtonLibraryClicked, self);
        BookSearchClassAlert._journal.on('click', self.onButtonJournalClicked, self);
        BookSearchClassAlert._eleMater.on('click', self.onButtonEleMaterClicked, self);
       

        // 父视图
        BookSearchClassAlert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(enterCallBack, animSpeed);
        
    });

    // 参数

    self.configAlert = function (enterCallBack, animSpeed) {

        // 回调
        BookSearchClassAlert._enterCallBack = enterCallBack;

    
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(BookSearchClassAlert._alert, true);
        BookSearchClassAlert._alert.position = cc.p(0, 0);
        BookSearchClassAlert._alert.setScale(2);
        BookSearchClassAlert._alert.opacity = 0;
        BookSearchClassAlert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(BookSearchClassAlert._alert, true);
        BookSearchClassAlert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(BookSearchClassAlert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonLibraryClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        self.startFadeOut();
        BookAlert.show();
       
    };
    self.onButtonJournalClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        console.log("000000002");
        self.startFadeOut();
        JournalAlert.show();

        
    };
  
    self.onButtonEleMaterClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        console.log("000000002");
        self.startFadeOut();
        EleMaterAlert.show();

       
        
    };
  
    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        BookSearchClassAlert._alert.destroy();
        BookSearchClassAlert._enterCallBack = null;
        BookSearchClassAlert._alert = null;
        BookSearchClassAlert._library = null;
        BookSearchClassAlert._journal = null;
        BookSearchClassAlert._eleMater = null;
        BookSearchClassAlert._animSpeed = 0.3;
    };
};
