
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start:function () {

    },

    showYes:function () {
        AlertWarn.show("恭喜","选对了！",  null, 0.3, 1);
    },

    showNo:function () {
        AlertWarn.show("傻了吧","你si不si傻",  null, 0.3, 1);
    }

    // update (dt) {},
});
