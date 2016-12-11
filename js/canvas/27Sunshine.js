/**
 * Created by Administrator on 2016/12/11.
 */
window.onload = function () {
    var stage = new Konva.Stage({
        container : "container",
        width : window.innerWidth,
        height : window.innerWidth,
    });
    /*圆心的坐标 已经各个环上的半径*/
    var groupX = stage.getWidth()/2,
        groupY  = stage.getHeight()/2,
        L3_Radius = 217,
        L2_Radius = 125,
        L1_Radius = 90,
        L0_Radius = 66;
    var bgLayer = new Konva.Layer({
        hitGraphEnabled : false,
    });
    /*绘制轨道开始*/
    var circle_L3 = new Konva.Circle({
        x: groupX,
        y: groupY,
        radius: L3_Radius,
        stroke: '#a0a0a0',
        stokeWidth: 2,
        opacity: .3,
        dash: [10,4]
    });
    bgLayer.add(circle_L3);

    //绘制背景圆形 2环
    var circle_L2 = new Konva.Circle({
        x: groupX,
        y: groupY,
        radius: L2_Radius,
        stroke: '#2A3466',
        stokeWidth: 2,
        opacity: .3,
        dash: [10,4]
    });
    bgLayer.add(circle_L2);
    /*绘制轨道结束*/

    /*绘制中心的球体*/
    var centerBall = new CircleItem({
        text : "前段全栈",
        innerRadius : L0_Radius,
        outerRadius : L1_Radius,
        fontSize : 17,
        fontFamily: '微软雅黑',
        fontFill: "#fff",
        fontX: -41,
        fontY: -8,
        x: groupX,
        y: groupY,
        innerFill: "#2A3466",
        outerFill: "#ddd",
        opacity: .8
    });
    var centerGroup = centerBall.createCircleText();
    bgLayer.add(centerGroup);
    stage.add(bgLayer);
    //动画层
    var layer = new Konva.Layer({
        // hitGraphEnabled : false
    });
    stage.add(layer);

    //创建整体的动画组
    var group = new Konva.Group({
        x: groupX,
        y: groupY,
        rotation: 0
    });

//要创建的5个3环的对象数据设置
    var L3CircleData = [{
        text: "WebApp",//创建webapp的圆心组合 1
        innerRadius: 40,
        outerRadius: 50,
        fontSize: 14,
        fontFamily: '微软雅黑',
        fontFill: "#fff",
        fontX: -30,
        fontY: -7,
        x: L3_Radius,
        y: 0,
        x: (Math.cos(20 * Math.PI / 180) * L3_Radius),
        y: (Math.sin(20 * Math.PI / 180) * L3_Radius),
        innerFill: "#CF2782",
        outerFill: "#ddd",
        opacity: .7
    },{
        text: "canvas",//动态创建第2个group
        innerRadius: 40,
        outerRadius: 50,
        fontSize: 16	,
        fontFamily: '微软雅黑',
        fontFill: "purple",
        fontX: -28,
        fontY: -7,
        x: 0,
        y: L3_Radius,
        innerFill: "#7CB9CE",
        outerFill: "#ddd",
        opacity: .7
    },{
        text: "ReactJS",
        innerRadius: 40,
        outerRadius: 50,
        fontSize: 16	,
        fontFamily: '微软雅黑',
        fontFill: "purple",
        fontX: -30	,
        fontY: -7,
        x: -L3_Radius,
        y: 0,
        innerFill: "#68AAFC",
        outerFill: "#ddd",
        opacity: .7
    },{
        text: "NodeJS",
        innerRadius: 40,
        outerRadius: 50,
        fontSize: 16	,
        fontFamily: '微软雅黑',
        fontFill: "purple",
        fontX: -30	,
        fontY: -7,
        x: (Math.cos(-115 * Math.PI / 180) * L3_Radius),
        y: (Math.sin(-115 * Math.PI / 180) * L3_Radius),
        innerFill: "yellow",
        outerFill: "#ddd",
        opacity: .7
    },{
        text: "HTML5",
        innerRadius: 40,
        outerRadius: 50,
        fontSize: 16	,
        fontFamily: '微软雅黑',
        fontFill: "purple",
        fontX: -30	,
        fontY: -7,
        x: (Math.cos(-45 * Math.PI / 180) * L3_Radius),
        y: (Math.sin(-45 * Math.PI / 180) * L3_Radius),
        innerFill: "green",
        outerFill: "#ddd",
        opacity: .7
    }];

    for( var i = 0; i < L3CircleData.length; i++ ) {
        var L3CirclItem = new CircleItem(L3CircleData[i]);
        var circleTextGroup = L3CirclItem.createCircleText();
        group.add(circleTextGroup);
    }

    layer.add(group);
    bgLayer.draw();

    //绘制第二层动画层
    var groupL2 = new Konva.Group({
        x: groupX,
        y: groupY,
        rotation: 0
    });

    // 绘制第二层的一个圆形
    var L2Circcle1 = new CircleItem({
        text: "Android",
        innerRadius: 30,
        outerRadius: 40,
        fontSize: 14	,
        fontFamily: '微软雅黑',
        fontFill: "blue",
        fontX: -27	,
        fontY: -7,
        x: (Math.cos(-75 * Math.PI / 180) * L2_Radius),
        y: (Math.sin(-75 * Math.PI / 180) * L2_Radius),
        innerFill: "orange",
        outerFill: "#ddd",
        opacity: .7
    });
    var groupZepto = L2Circcle1.createCircleText();
    groupL2.add(groupZepto);


    var L2Circcle2 = new CircleItem({
        text: "Ios",
        innerRadius: 30,
        outerRadius: 40,
        fontSize: 14	,
        fontFamily: '微软雅黑',
        fontFill: "blue",
        fontX: -10	,
        fontY: -7,
        x: (Math.cos(105 * Math.PI / 180) * L2_Radius),
        y: (Math.sin(105 * Math.PI / 180) * L2_Radius),
        innerFill: "pink",
        outerFill: "#ddd",
        opacity: .7
    });
    var groupC3 = L2Circcle2.createCircleText();
    groupL2.add(groupC3);
    var angularSpeed = 40;//每秒旋转的角度
     var animition = new Konva.Animation(function (frame) {
         var anglePerFram = frame.timeDiff /1000 * angularSpeed ;
         groupL2.rotate(anglePerFram);
         groupL2.getChildren().each(function(value, index){
             value.rotate(-anglePerFram);
         });
         group.rotate(-anglePerFram);
         group.getChildren().each(function(value, index){
             value.rotate(anglePerFram);
         });
     },layer);
    // 动画事件处理
    group.on('mouseover touchstart',function(e){
        angularSpeed = 10;
    });

    group.on('mouseleave touchend',function(e){
        angularSpeed = 60;
    });
    animition.start();
    layer.add(groupL2);
    layer.batchDraw();
}