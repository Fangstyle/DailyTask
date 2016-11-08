/**
 * Created by Administrator on 2016/11/8.
 */
function gradientAnimationS(obj,json,fn) {
    var timer = null;
    var timers = null;
    clearInterval(timers);
    timers =setInterval(function () {
        //控制判断条件 每次定时器开始的时候为true 然后遍历json时改变
        var flag =true;
        for (var attr in json){
            var start,destination;

            if(attr == "opacity")
            {
                destination =parseFloat(json[attr])*100;
                start = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                //log(start);
            }
            else
            {
                start = parseInt(getStyle(obj,attr)); // 数值
                destination = parseInt(json[attr]);
            }

            var step = (destination - start)/10;
            step= step>0 ? Math.ceil(step) : Math.floor(step);

            if(attr == "opacity")  // 判断用户有没有输入 opacity
            {
                if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
                {
                    // obj.style.opacity
                    obj.style.opacity = (start + step) /100;
                    // console.log(obj.style.opacity);
                }
                else
                {  // obj.style.filter = alpha(opacity = 30)
                    obj.style.filter = "alpha(opacity = "+(start + step)* 10+")";

                }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = start + step+"px";
            }

            if (start !=destination){
                flag= false;
            }
        }
        if (flag){
            clearInterval(timers);
            if(fn){
                fn();
            }
        }
    },30);
}
/*
 * 获取内联样式 ie obj.currentStyle[]   标准 window.getComputedStyle(obj,null)[]
 * */
function  getStyle(obj,type) {
    var types  = obj.currentStyle? obj.currentStyle[type] :window.getComputedStyle(obj,null)[type];
    return  types;
}
function $(id) {
    return document.getElementById(id);
}