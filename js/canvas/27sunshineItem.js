/**
 * Created by Administrator on 2016/12/11.
 */
//旋转图像的组合对象
function CircleItem(option) {
    // 文字内容
    // 圆的半径
    // 默认坐标位置
    // 颜色圆
    // 颜色光环
    // 透明度
    option = option || {};
    option.text = option.text || "canvas";
    option.innerRadius = option.innerRadius || 40;
    option.outerRadius = option.outerRadius || 60;
    option.fontSize =  option.fontSize || 14;
    option.fontWeight = option.fontWeight || "bold";
    option.fontFamily = option.fontFamily || '微软雅黑';
    option.fontFill = option.fontFill || "#FFF";
    option.fontX = option.fontX ||-20;
    option.fontY = option.fontY ||-7;
    option.x = option.x === 0 ? 0 : option.x || 217;
    option.y = option.y === 0 ? 0 : option.y || 217;
    option.innerFill = option.innerFill || "teal";
    option.outerFill = option.outerFill || "#ddd";
    option.opacity = option.opacity || .5;

    //创建旋转组合对象的 组
    this.createCircleText = function() {
        var group = new Konva.Group({
            x: option.x,
            y: option.y,
            rotation: 0
        });

        //内圆
        var innerCircle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: option.innerRadius,
            fill: option.innerFill,
            opacity: option.opacity,
            perfectDrawEnabled : false
        });
        group.add(innerCircle);

        //环形
        var outerRing = new Konva.Ring({
            x: 0,
            y: 0,
            innerRadius: option.innerRadius,
            outerRadius: option.outerRadius,
            fill: option.outerFill,
            opacity: option.opacity,
            perfectDrawEnabled: false

        });

        group.add(outerRing);

        //文字
        var text = new Konva.Text({
            text: option.text,
            fontSize: option.fontSize,
            fontFamily: option.fontFamily,
            fontStyle: 'bold',
            fill: option.fontFill,
            x: option.fontX,
            y: option.fontY,
            align: 'left'
        });
        group.add(text);

        return group;
    }
}