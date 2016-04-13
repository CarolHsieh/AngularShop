angular.module("myApp", [])
    //數據
    .factory('Data',function(){

        return [
            {
                title:'no1',
                content:'no1-content'

            },
            {
                title:'no2',
                content:'no2-content'

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
            transclude:true


        }
    })
    .directive('kittencupCollapse',function(){

        return{
            restrict:'E',
            replace:true,
            templateUrl:'app/tmp/kittencupCollapse.html'

        }

    })

