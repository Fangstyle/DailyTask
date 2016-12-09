/**
 * Created by Administrator on 2016/12/9.
 */
function FangstyleRect(jsonData) {
    this._init(jsonData);
}
FangstyleRect.prototype = {
    _init:function (jsonData) {
        this.x = jsonData.x===0 ? 0 : jsonData.x || 10;
        this.y = jsonData.y===0 ? 0 : jsonData.y || 10;
        this.w = jsonData.w===0 ? 0 : jsonData.w || 10;
        this.h = jsonData.h===0 ? 0 : jsonData.h || 10;
        this.rotation = jsonData.rotation === 0 ? 0 :jsonData.rotation || 0;
        this.opacity = jsonData.opacity === 0 ? 0 : jsonData.opacity || 1;
        this.scaleX = jsonData.scaleX || 1;
        this.scaleY = jsonData.scaleY || 1;
        this.strokeStyle = jsonData.strokeStyle || "#fff";
        this.fillStyle = jsonData.fillStyle || "fff";
    },
    render:function (contexts) {
        contexts.save();
        contexts.beginPath();
       /* context.rect(x,y,width,height); html5支持绘画的矩形的属性就有4个 所以进行伸缩旋转
        只能旋转它所在的画布进行*/
        contexts.translate(this.x,this.y);
        contexts.rotate(Math.PI/180 * this.rotation);
        contexts.globalAlpha = this.opacity;
        contexts.scale(this.scaleX,this.scaleY);
        contexts.rect(0,0,this.w,this.h);
        contexts.fillStyle = this.fillStyle;
        contexts.fill();

        contexts.strokeStyle = this.strokeStyle;
        contexts.stroke;

        contexts.restore();//还原绘制的状态


    }
}