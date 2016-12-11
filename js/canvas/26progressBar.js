/**
 * Created by Administrator on 2016/12/11.
 */
window.onload = function () {
    var stage = new Konva.Stage({
        container : "container",
        width : window.innerWidth,
        height : window.innerHeight,
    })
     var layer = new Konva.Layer();
     stage.add(layer);
    var group = new Konva.Group({
        x: stage.getWidth() / 8,
        y: stage.getHeight() / 2,
    })
    var progressLine = new Konva.Rect({
        strokeWidth: 5,
        x: 0,
        y: 0,
        height: 40,
        width: stage.getWidth() / 8 * 6,
        stroke: '#d0d0d0',
        cornerRadius: 5,
        shadowBlur: 4,
        shadowColor: '#f0f0f0',
        shadowOffset: {x : 0, y : 0},
        shadowOpacity: 0.5
    });
     var progress = new Konva.Rect({
         x : 0,
         y : 0,
         height : 40 ,
         width: stage.getWidth() *2 /8,
         fill:"lightblue",
         cornerRadius:   5 ,
     });
    group.add(progressLine);
    group.add(progress);
    layer.add(group);
     layer.draw();
    setInterval(function () {
        if(progress.getWidth() <progressLine.getWidth()){
            progress.width(progress.getWidth()+1);
            layer.batchDraw();//layer重绘
        }
    },20);
}