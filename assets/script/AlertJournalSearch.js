var JournalAlert = {
    _alert: null,           // prefab
    _journal1:null,
    _journal2:null,
    _journal3:null,
    _enterCallBack:null,   // 回调事件
    _animSpeed:0.3,    // 动画速度
};


JournalAlert.show = function (enterCallBack, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (JournalAlert._alert != undefined) return;

    // 
    JournalAlert._animSpeed = animSpeed ? animSpeed : JournalAlert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("AlertJournalSearch", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        JournalAlert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(JournalAlert._animSpeed, 255), cc.scaleTo(JournalAlert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(JournalAlert._animSpeed, 0), cc.scaleTo(0, 0)), cbFadeOut);

        // 获取子节点
        JournalAlert._journal1 = cc.find("journal1", alert);
        JournalAlert._journal2 = cc.find("journal2", alert);
        JournalAlert._journal3 = cc.find("journal3", alert);

        // 添加点击事件
        JournalAlert._journal1.on('click', self.onButtonJournal1Clicked, self);
        JournalAlert._journal2.on('click', self.onButtonJournal2Clicked, self);
        JournalAlert._journal3.on('click', self.onButtonJournal3Clicked, self);

        // 父视图
        JournalAlert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(enterCallBack, animSpeed);
        
    });

    // 参数

    self.configAlert = function (enterCallBack, animSpeed) {

        // 回调
        JournalAlert._enterCallBack = enterCallBack;

    
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(JournalAlert._alert, true);
        JournalAlert._alert.position = cc.p(0, 0);
        JournalAlert._alert.setScale(2);
        JournalAlert._alert.opacity = 0;
        JournalAlert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(JournalAlert._alert, true);
        JournalAlert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(JournalAlert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonJournal1Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }

        self.startFadeOut();
     
        AlertWarn.show("沙雕","不是这本");
       
    };
    self.onButtonJournal2Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
     
        self.startFadeOut();

        AlertWarn.show("恭喜","期刊在4楼XXXX");
        Index.isJournalAddress = true;
        
    };
    self.onButtonJournal3Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }

        self.startFadeOut();
        AlertWarn.show("沙雕","不是这本");

    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        JournalAlert._alert.destroy();
        JournalAlert._enterCallBack = null;
        JournalAlert._alert = null;
        JournalAlert._journal1 = null;
        JournalAlert._journal2 = null;
        JournalAlert._journal3 = null;
        JournalAlert._animSpeed = 0.3;
    };
};
