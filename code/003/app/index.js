angular.module("myApp", [])
    .filter('filterCity',function(){


        return function(data,parent)
        {

            var filterCity = [];


            angular.forEach(data,function(obj)
            {


                if(obj.parent===parent)
                {

                    filterCity.push(obj);
                }

            });

            return filterCity;

        }

    })

    .controller('firstController',['$scope',function($scope){

        var that = this;
        $scope.hobbys = [
            {
                'id':1,
                'name':'打球'
            },
            {
                'id':2,
                'name':'打牌'
            },

            {
                'id':3,
                'name':'打遊戲'
            }
        ]






        $scope.cities =
        [
            {
                'name':'台北市',
                'id':1,
                'parent':0

            },
            {
                'name':'桃園市',
                'id':2,
                'parent':0

            },
            {
                'name':'新北市',
                'id':3,
                'parent':0

            },
            {
                'name':'中正區',
                'id':10,
                'parent':1

            },
            {
                'name':'大同區',
                'id':11,
                'parent':1

            },
            {
                'name':'中壢區',
                'id':20,
                'parent':2

            },
            {
                'name':'平鎮區',
                'id':21,
                'parent':2

            },
            {
                'name':'龍潭區',
                'id':22,
                'parent':2

            },
            {
                'name':'萬里區',
                'id':30,
                'parent':3

            },
            {
                'name':'金山區',
                'id':31,
                'parent':3

            },
            {
                'name':'板橋區',
                'id':32,
                'parent':3

            },
            {
                'name':'板橋區中山路',
                'id':320,
                'parent':32

            },
            {
                'name':'板橋區中正路',
                'id':321,
                'parent':32

            },
            {
                'name':'金山區中正路',
                'id':310,
                'parent':31

            },
            {
                'name':'金山區貓貓路',
                'id':311,
                'parent':31

            },
            {
            'name':'板橋區中山路100號',
            'id':3200,
            'parent':320

            },
            {
            'name':'板橋區中山路200號',
            'id':3201,
            'parent':320

            }

        ]




        $scope.toggleHobbySelection = function(id)
        {

            var index = -1;

            if($scope.data.hobbies == undefined)
            {

                $scope.data.hobbies = [];

            }else {

                index = $scope.data.hobbies.indexOf(id);
            }


            if(index===-1)
            {//找索引值，如果沒有在選中的名單中，就加入

                $scope.data.hobbies.push(id);
            }else{
             //如果在名單中，就移除(反選的效用)

                $scope.data.hobbies.splice(index,1);
            }


            console.log('$scope.selectHobby--'+$scope.data.hobbies);

        }



        //預設值
        $scope.data ={

            'hobbies':[2],//興趣
            'address':3201//地址
        } ;



        //先保留一份默認值(把預設值copy給原始ata)
        $scope.orginData = angular.copy($scope.data);

        $scope.reset = function()
        {

            $scope.data = angular.copy($scope.orginData);

            that.initCity();//地址還原為預設值
            $scope.myForm.$setPristine();//angulark表單的重置,myForm.blog.$dirty 髒檢查才能發揮作用

        }





        //從預設值的地址id尋找所屬的第一層～～第四層的下拉選單 begin
        //反找
        this.findAddId = function(parent)
        {
            var parent_id;
            angular.forEach($scope.cities,function(city)
            {


                if(city.id===parent)
                {
                    parent_id = city.parent;

                    return;
                }

            })

            return parent_id;

        }

        //從預設值的地址id尋找所屬的第一層～～第四層的下拉選單 end


        this.initCity = function() {
            if ($scope.data.address !== undefined) {


                $scope.addr4 = $scope.data.address;

                $scope.addr3 = this.findAddId($scope.addr4);

                $scope.addr2 = this.findAddId($scope.addr3);

                $scope.addr1 = this.findAddId($scope.addr2);
            }

        }


        this.initCity.call(this);//第一次進入調用，初始化地址預設選單，使用call是為了把this傳過去，不然就要把調用initCity function裡面的this改成that了
    }]);
