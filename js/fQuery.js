/**
 * Created by Administrator on 2016/12/28.
 */
function fQuerry( selector ){
    this._select = _selection(selector);
    this.element;
}
fQuerry.prototype = {
    _selection : function (selector) {
        this.element = document.querySelectorAll( selector );
        return this;
    },
    hide:function () {
        var self = this;
        if(self.element.length){
            for(var i = 0 ; i<self.element.length ; i++ ){
                self.element[i].style.display = "none";
            }
        }else {
            self.element.style.display = "none";
        }
    }
}
fQuery = function ( slector ) {
    return new fQuerry( selector )
}