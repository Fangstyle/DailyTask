/**
 * 作者：Mc小震
 * 开发日期：2016/12/15
 * 描述：通用框架的封装
 */
var FangStyle = function () {}
FangStyle.prototype = {
    id : function ( id ) {
        return  document.getElementById(id);
    },//去除空格
    trim : function (str) {
        return str.replace(/(^\s*)|(\s$)/g,"");
    },//字符串中替换以@（） 中间的字符
    formateString : function(str ,data ){
        return  str.replace(/@\((\w+)\)/g,function (match , key) {
            return data[key]});
    }

    /*
    * template模版 compile类型   它的是匹配的类型source是一个字符串
     var source = '<ul>'
     +    '{{each list as value i}}'
     +        '<li>索引 {{i + 1}} ：{{value}}</li>'
     +    '{{/each}}'
     + '</ul>';

     var render = template.compile(source);
     var html = render({
     list: ['摄影', '电影', '民谣', '旅行', '吉他']
     });
     */
    ,templateString : function (source ,data) {
        var render = template.compile(source);
       /* var html = render({
            list: ['摄影', '电影', '民谣', '旅行', '吉他']
        });*/
       return render(data);
    }, // 上面的那个的升级版  升级内容 ：返回拼接完的字符串并绑定
    templateStringBind : function (source ,data ,container) {
        var render = template.compile(source);
        var html = render(data);
        document.getElementById(container).innerHTML = html;
    }
    /* 匹配的不是一个字符串 而是一个html标签
    * <script id="test" type="text/html">
     {{if isAdmin}}

     <h1>{{title}}</h1>
     <ul>
     {{each list as value i}}
     <li>索引 {{i + 1}} ：{{value}}</li>
     {{/each}}
     </ul>

     {{/if}}
     </script>

     <script>
     var data = {
     title: '基本例子',
     isAdmin: true,
     list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
     };
     var html = template('test', data);
     document.getElementById('content').innerHTML = html;
     </script>
     * */
    ,templateHtml : function (id , data) {
        return  template( id ,data);
    },// 上面的那个的升级版  升级内容 ：返回拼接完的字符串并绑定
    templateHtmlBind : function (id , data , container) {
        document.getElementById(container).innerHTML = template( id ,data);
    },//生成随机数
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },//使用window.location = "html名称" + "?参数"; 打开一个页面 类似于startAcivity
     //而接受 传过来的参数 即intent 择需要window.location.search获取？后的参数  字符串 ，
    //操作字符串 将字符串变成一个 json对象 方便操作
    getIntent: function(){//获取URL查询字符串参数值的通用函数
        //console.log(window.location.search);  "？参数"
        var str = window.location.search.substring(1);//去除？，获取查询字符串，即"id=1&name=location"的部分
        var arr = str.split("&");//以&符号为界把查询字符串分割成数组
        var json = {};//定义一个临时对象
        for(var i=0;i<arr.length;i++)//遍历数组
        {
            var c = arr[i].indexOf("=");//获取每个参数中的等号小标的位置
            if(c==-1) continue;//如果没有发现测跳到下一次循环继续操作
            var d = arr[i].substring(0,c);//截取等号前的参数名称，这里分别是id和name
            var e = arr[i].substring(c+1);//截取等号后的参数值
            json[d] = e;//以名/值对的形式存储在对象中
        }
        return json;//返回对象
    },
}
var fangStyle = new FangStyle();