angular.module("myApp", [])
    //數據
    .factory('Data',function(){

        return [
            {
                title:'標題1',
                content:'內文1'

            },
            {
                title:'標題2',
                content:'內文2'

            },
            {
                title:'標題3',
                content:'內文3'

            }

        ]
    })
    //控制器
    .controller('firstController',['$scope','Data',function($scope,Data){

        $scope.data = Data;


    }])
    .directive('kittencupGroup',function(){


        return{
            restrict:'E',
            replace:true,
            template:'<div class="panel-group" ng-transclude></div>',
            transclude:true,
            controllerAs:'kittencupGroupController',
            controller:function(){

                this.groups = [];

                this.closeOtherCollapse = function(nowScope)//nowScope =>目前被點選的項目
                {

                    angular.forEach(this.groups,function(scope)//循環每個子元素的元素
                    {

                        if(scope !== nowScope)//如果目前子元素不是被點選的項目，關閉
                        {
                            scope.isOpen = false;

                        }
                    })
                }


            }


        }
    })
    .directive('kittencupCollapse',function(){

        return{
            restrict:'E',
            replace:true,
            require:'^kittencupGroup',//向上尋找元素(如果目標元素是父元素者)
            templateUrl:'app/tmp/kittencupCollapse.html',
            scope:{
                'heading':'@'

            },
            link:function(scope,element,attrs,kittencupGroupController)//Link會把上一個controller(kittencupGroupController)自動依賴注入進來
            {

                console.log("kittencupGroupController");
                console.log(kittencupGroupController);
                scope.isOpen = false;//close
                //scope.isOpen = false;//open

                scope.onChangeOpen = function()
                {
                    scope.isOpen = !scope.isOpen;

                    kittencupGroupController.closeOtherCollapse(scope);//關閉被點擊item以外的鄰居

                }

                kittencupGroupController.groups.push(scope);//存放子元素的每一個scope循環的value（isOpen）

            },
            transclude:true

        }

    })

