var EleMaterAlert = {
    _alert: null,           // prefab
    _eleMater1:null,
    _eleMater2:null,
    _eleMater3:null,
    _enterCallBack:null,   // 回调事件
    _animSpeed:0.3,    // 动画速度
};


EleMaterAlert.show = function (enterCallBack, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (EleMaterAlert._alert != undefined) return;

    // 
    EleMaterAlert._animSpeed = animSpeed ? animSpeed : EleMaterAlert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("AlertEleMaterSearch", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        EleMaterAlert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(EleMaterAlert._animSpeed, 255), cc.scaleTo(EleMaterAlert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(EleMaterAlert._animSpeed, 0), cc.scaleTo(0, 0)), cbFadeOut);

        // 获取子节点
        EleMaterAlert._eleMater1 = cc.find("eleMater1", alert);
        EleMaterAlert._eleMater2 = cc.find("eleMater2", alert);
        EleMaterAlert._eleMater3 = cc.find("eleMater3", alert);

        // 添加点击事件
        EleMaterAlert._eleMater1.on('click', self.onButtonEleMater1Clicked, self);
        EleMaterAlert._eleMater2.on('click', self.onButtonEleMater2Clicked, self);
        EleMaterAlert._eleMater3.on('click', self.onButtonEleMater3Clicked, self);

        // 父视图
        EleMaterAlert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(enterCallBack, animSpeed);
        
    });

    // 参数

    self.configAlert = function (enterCallBack, animSpeed) {

        // 回调
        EleMaterAlert._enterCallBack = enterCallBack;

    
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(EleMaterAlert._alert, true);
        EleMaterAlert._alert.position = cc.p(0, 0);
        EleMaterAlert._alert.setScale(2);
        EleMaterAlert._alert.opacity = 0;
        EleMaterAlert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(EleMaterAlert._alert, true);
        EleMaterAlert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(EleMaterAlert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonEleMater1Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }

        self.startFadeOut();
     
        AlertWarn.show("沙雕","不是这本");
       
    };
    self.onButtonEleMater2Clicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
     
        self.startFadeOut();

        AlertWarn.show("恭喜","获得电子材料");
        Index.isEleMaterAddress = true;
        
    };
    self.onButtonEleMater3Clicked = function(event){
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
        EleMaterAlert._alert.destroy();
        EleMaterAlert._enterCallBack = null;
        EleMaterAlert._alert = null;
        EleMaterAlert._eleMater1 = null;
        EleMaterAlert._eleMater2 = null;
        EleMaterAlert._eleMater3 = null;
        EleMaterAlert._animSpeed = 0.3;
    };
};
