/**
 * Created by fangzhen on 2017/4/4.
 */
function texter(txt) {
    var tempList = txt.split('');
    var pointCount = 0;
    if(tempList[0]=='.'){
        return "首字母不能为."
    }
    if(tempList[tempList.length-1]=='.'){
        return "末尾不能为."
    }
    for(var _i = 0 ; _i< tempList.length;_i++){
        if(_i<tempList.length&&tempList[_i]=='.'){
            pointCount++;
            if(tempList[_i+1]=='.'){
                pointCount = 0;
                return "连续."
            }
        }
    }
    if(tempList.length-pointCount>4){
        return '目前长度为'+(tempList.length-pointCount) +'超过4位';
    }
    return "正确"+(tempList.length-pointCount);
}
console.log(texter('f.fff1'));