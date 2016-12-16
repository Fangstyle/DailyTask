/**
 * Created by Administrator on 2016/12/16.
 */
$(document).ready(function () {
    fangStyle.myAjax("http://localhost/object/product.json",function (result) {
        var resultJson= JSON.parse(result);
        var realProduct = transformProduct(resultJson);
        realProduct.bindDOMDetail();
        realProduct.bindEvents();
    })
});

function transformProduct(data){
    var product =  new Product()
    product.name = data.name;
    product.name=data.name;
    product.description=decodeURI(data.description)
    product.normalPrice=data.price;
    product.youhuijia=data.youhuijia;
    product.buySum=data.sum;
    product.images=[
        {small:'images/s11.jpg',big:'images/s11.jpg'},
        {small:'images/s12.jpg',big:'images/s12.jpg'},
        {small:'images/s13.jpg',big:'images/s13.jpg'}
    ]
    return product
}