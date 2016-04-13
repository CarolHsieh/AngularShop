var myProductData = [
    {
        id:1000,
        name:'iphone6s',
        quantity:3,
        price:5688

    },
    {
        id:1001,
        name:'iphone5s',
        quantity:3,
        price:15688

    },
    {
        id:1002,
        name:'iphone5s',
        quantity:3,
        price:5688

    },
    {
        id:1003,
        name:'iphone5s',
        quantity:3,
        price:5688

    }
];
angular.module("myApp", [],function($filterProvider,$provide,$controllerProvider)
{

    /* 自定義過濾器：(價格超過1萬元的商品)  begin */
    $provide.service('Data',function(){

        return myProductData;


    });


    $filterProvider.register('filterPrice',function(){

        return function(obj){
            var newobj = [];

            angular.forEach(obj,function(o)
            {
                if(o.price>10000)
                {
                    newobj.push(o);
                }
            });

            return newobj;
        }
    });


    $controllerProvider.register('firstController',function($scope,Data){

        $scope.data = Data;
    })

    /* 自定義過濾器：(價格超過1萬元的商品)  end */
})
    .service('productData',function(){
        return myProductData;
    })
    .controller("produncController", function($scope,productData) {





        /**
         * 購物車內的data
         * @type {*[]}
         */
        $scope.cart = productData;
        $scope.today = new Date();


        /**
         * 排序的類別
         * @type {string}
         */
        $scope.orderType = 'id';

        $scope.order = '-';


        $scope.changeOrder = function(orderType)
        {

            $scope.orderType = orderType;

            if($scope.order==="")
            {

                $scope.order = '-';

            }else{

                $scope.order = '';

            }
        }


        /**
         *  計算總金額
         * @returns {number}
         */
        $scope.totalPrice = function()
        {
            var total = 0;

            angular.forEach($scope.cart,function(item){

                total += parseInt(item.quantity * item.price);

            });

            return total;
        }

        /**
         * 計算總數量
         * @returns {number}
         */
        $scope.totalCount = function()
        {

            var total = 0;

            angular.forEach($scope.cart,function(item)
            {

                total+= parseInt(item.quantity);


            });

            return total;
        }


        /**
         * 移除購物車商品項目
         * @param id
         */
        $scope.remove = function(id)
        {

            var index = -1;

            angular.forEach($scope.cart,function(item,key){


                if(id==item.id)
                {

                    index = key;

                }

            });

            if(index !== -1)
            {

                $scope.cart.splice(index,1);

            }

        }



        /**
         * 傳入商品id,回傳資料索引值
         * @param id
         * @returns {number}
         */
        var findIndex = function(id)
        {

            var index = -1;

            angular.forEach($scope.cart,function(item,key){


                if(id==item.id)
                {

                    index = key;

                    return;

                }

            });


            return index;

        };

        /**
         * 針對某產品，數量減一
         * @param id
         */
        $scope.reduce = function(id)
        {

            var index = -1;

            index =  findIndex(id);

            if(index!=-1)
            {
                var item = $scope.cart[index];

                if(item.quantity>1)
                {
                    --$scope.cart[index].quantity;

                }else{//已經減到沒數量，詢問user是否在購物車移除該商品項目

                    var returnKey = confirm("是否在購物車移除該商品項目?");

                    if(returnKey)
                    {

                        $scope.remove(id);//移除
                    }

                }

            }



        };


        /**
         * 針對某產品，數量增一
         * @param id
         */
        $scope.add = function(id)
        {

            var index = -1;

            index = findIndex(id);

            if(index!=-1)
            {

                ++$scope.cart[index].quantity;


            }


        };

        $scope.$watch('cart',function(newValue,oldValue){

            angular.forEach(newValue,function(item,key){


                if(item.quantity<1) {

                    var returnKey = confirm("是否在購物車移除該商品項目?");

                    if (returnKey) {
                        $scope.remove(item.id);


                    }else{

                        //如果user不移除，有可能是輸入錯誤，就讓原來的值取代現在的值
                        item.quantity = oldValue[key].quantity;
                        return;
                    }


                }


            });

        },true);
    }).filter('filterProduct',function(){
    /* 自定義過濾器2：商品名稱6s begin */
    return function(obj){

        var newobj = [];

        angular.forEach(obj,function(o){

            if(o.name=="iphone6s")
            {
                newobj.push(o);
            }
        });

        return newobj;
    }
    /* 自定義過濾器2：商品名稱6s end */
})