/**
 * Created by Administrator on 2016/12/12.
 */
/*存放所有类 类似于classBean   一些类的集合   */
function Histogram(option){
    this.group = new Konva.Group({
        x : option.x ,
        y : option.y,
    });
    this._init(option);
}
Histogram.prototype = {
    _init:function (option) {
        var self = this;
        this.data = option.data || [];
        //底线的宽度
        this.blWidth = option.blWidth || 2;
        this.blColor = option.blColor || 'lightgreen';
        this.width = option.width || 200;
        this.height = option.height || 200;
        this.fontSize =  option.fontSize || 12;
        //把最高的柱状图的高度换算成 柱状图要求的高度。
        var maxValue = 0;
        for(var i = 0; i < self.data.length; i++ ) {
            maxValue = maxValue > self.data[i].value ? maxValue : self.data[i].value;
        }
        this.height = this.height / maxValue;
        //绘制柱状图的底线
         var bottomLine = new Konva.Line({
             strokeWidth : self.blWidth,
             stroke : self.blColor,
             points : [ 0 , 0 , self.width,0],
             lineCap: 'round',
             lineJoin: 'round'
         });
        this.group.add(bottomLine);

        var rectAllWidth = this.width / this.data.length;
        for(var i = 0 ; i < self.data.length ; i ++){
            var tempData = self.data[i];
            //创建每个柱状图
            // 因为柱状图 是左上角向下拉伸的矩形，所以默认一个向下的柱状图  而我们这需要一个向上的矩形
            //所以将矩形的Y0 向上移动（0-矩形高度） 变成向上的矩形 最后减掉底线宽度 放置压线
            var rect = new Konva.Rect({
                x : (1/4+i)*rectAllWidth,
                y : -self.height*tempData.value - 1/2*option.blWidth,
                width : 1/2 *rectAllWidth,
                height : self.height*tempData.value ,
                fill : tempData.color,
                shadowBlur: 5,
                shadowColor: tempData.color,
                // shadowOffset: {x : 10, y : 10},
                shadowOpacity: 0.5,
                opacity: .5,
                name: 'histogramRect',
                cornerRadius: 5
            });
            var text = new Konva.Text({
                x :rectAllWidth*i,
                //y轴 柱状图 上方文字 （3像素间隔）
                y : -self.height*tempData.value - 1/2*option.blWidth - this.fontSize-3,
                fontSize : this.fontSize  ,
                fontFamily : '微软雅黑',
                fill : tempData.color ,
                text : tempData.value*100+"%",
                width :rectAllWidth,
                name : "percent",
                align : "center",
            });
            var nameText = new Konva.Text({
                x: rectAllWidth * (1/2 + i),
                y: self.blWidth + 3,
                fontSize: self.fontSize,
                fill: tempData.color,
                fontFamily: '微软雅黑',
                text: tempData.name,
                rotation: 30
            });
            this.group.add( rect );
            this.group.add(text);
            this.group.add(nameText);
        }
    },
    playAnimition: function () {
        this.group.to({
            opacity : 1,
            duration : .5,
        });
        this.group.find(".histogramRect").each(function ( item , position) {
            var oldY = item.y();
            var oldHeight = item.height();
            item.y(0);
            item.height(0);

            item.to({
                duration : .8,
                y : oldY,
                height :oldHeight,
                opcatiy: .9,
            })
        });
        this.group.find(".percent").each(function(item , position){
            var oldY = item.y();
            item.y(0);
            item.opacity(.1);
            item.to({
                duration: .8,
                y: oldY,
                opacity: 1
            });
        })
    },
    addToGroupOrLayer: function( group ) {
        group.add(this.group);
    }
}




/*饼状图*/
function PieChart(option) {
    var _this = this;
    if( !option ) {
        throw new Error('请初始化饼状图的参数');
    }
    this.animageIndex = 0;
    this.playAnimateCallee = null;
    this.group = null;
    this.txtGroup = null;
    this.animateDuration = .8;
    this.outerCircle = null;
    this.data  = null;
    this.init(option);//初始化
}

PieChart.prototype = {
    constructor: PieChart,
    init: function(option) {
        //饼状图数据：[{name:'',value:.2,color:'red'},...]
        option.data = option.data || [];

        //动画执行的时间
        option.animateDuration = option.animateDuration || .8;
        this.animateDuration = option.animateDuration;
        //动画执行的效果
        option.easing = option.easing || Konva.Easings.Linear;
        //x,y坐标
        option.x = option.x || 0;
        option.y = option.y || 0;
        //饼状图半径
        option.radius = option.radius === 0 ? 0 : option.radius || 100;

        option.txtAwayFromWedge = option.txtAwayFromWedge || 20;

        this.data = option.data;
        //扇区的组
        this.group = new Konva.Group({
            x: option.x,
            y: option.y
        });

        //文字的组
        this.txtGroup = new Konva.Group({
            x: option.x,
            y: option.y
        });

        //默认的旋转角度
        var tempAngel = -90;
        //遍历生成所有扇形的对象
        for(var i = 0; i < option.data.length; i++ ) {
            var wedgeAngel = option.data[i].value * 360;
            var wedge = new Konva.Wedge({
                x: 0,
                y: 0,
                radius: option.radius,
                fill: option.data[i].color,
                angle: 0,//后面有计算出角度放到数组中
                opacity: .6,
                id: option.data[i].name,
                name: wedgeAngel + '',
                rotation: tempAngel,
                visible: true
            });
            this.group.add(wedge);

            //当前 扇形的对象 和扇形的需要旋转的角度
            // arr.push({value: wedge, angle: option.data[i].value * 360});

            //绘制 文字
            //扇形区域的中间
            var rotationAngle = 0;
            var totalAngle = tempAngel + 1/2 * wedgeAngel;
            //设置文字的x坐标
            var txtX = Math.cos( totalAngle * Math.PI / 180) * (option.radius + option.txtAwayFromWedge);
            // 设置文字的y坐标
            var txtY = Math.sin( totalAngle * Math.PI / 180) * (option.radius + option.txtAwayFromWedge);
            var txtTitle = option.data[i].name +' ' + option.data[i].value * 100 + '%';
            var txt = new Konva.Text({
                x: txtX,
                y: txtY,
                fill: option.data[i].color,
                fontSize: '16px',
                fontFamily: '微软雅黑',
                fontStyle: 'bold',
                align: 'left',
                id: 'txt_' + option.data[i].name,
                text: txtTitle,
                rotation: rotationAngle,
                visible: false //默认隐藏
            });

            this.txtGroup.add(txt);

            //下面这段代码是根据 文字的位置设置一下文字的距离原型的位置
            if( totalAngle > 90 && totalAngle < 270 ) {
                // rotationAngle = -30;
                txt.x( txt.x()-txt.getWidth() );
            }

            //设置下一个元素旋转到具体的位置
            tempAngel += option.data[i].value * 360;
        }

        // 绘制外圆
        this.outerCircle = new Konva.Circle({
            stroke: '#a0a0a0',
            strokeWidth: 1,
            radius: option.radius + 5,
            x: option.x,
            y: option.y
        });


    },
    //展示动画
    playAnimate: function() {
        _this = this;
        if(this.animageIndex >= this.data.length) {
            _this.animageIndex = 0;
            return;
        }

        //先初始化到0的状态，然后进行绘制。
        if(this.animageIndex == 0) {
            _this.group.getChildren().each(function(value, index){
                value.angle(0);
            });
            _this.txtGroup.getChildren().each(function(value,index){
                value.hide();
            });
        }
        this.playAnimateCallee= arguments.callee;//当前函数

        //绘制一个 扇区的动画
        var wedge = this.group.getChildren()[this.animageIndex];
        var angel = Number(wedge.name());//扇区的度数
        wedge.to({
            angle: angel,
            duration: angel * this.animateDuration / 360,
            onFinish: function() {
                _this.txtGroup.getChildren()[_this.animageIndex].show();
                _this.txtGroup.getParent().draw();
                _this.animageIndex++;
                _this.playAnimateCallee();//调用当前函数自身，形成动画队列。
            }
        });
    },
    //把当前 饼状图添加到 层
    addToLayer: function(layer) {
        layer.add(this.group);
        layer.add(this.txtGroup);
        layer.add(this.outerCircle);
        layer.draw();
    },
};
