/**
 * Created by ehealthafrica on 3/19/15.
 */

angular.module('home.returned')
  .controller('ReturnedCtrl', function(dailySchedule, dbService, $state, scheduleService, AuthService, log, utility, STORAGE_ATTRIBUTES){
    var vm = this;
    var packedProductJson = {};

    vm.productLength = 0;
    vm.queryDate = utility.extractDate(new Date());
    vm.storageAttributes = STORAGE_ATTRIBUTES;
    function calcFaciltyBalance(products){
      dailySchedule.facilityRounds.forEach(function(round){
        round.packedProduct.forEach(function(product){
          var bal;
          products[product.productID].totalRetrieved += angular.isNumber(product.returnedQty) ? product.returnedQty: 0;
          products[product.productID].totalDelivered += angular.isNumber(product.deliveredQty) ? product.deliveredQty: 0;
          bal = (products[product.productID].packedQty +products[product.productID].totalRetrieved) - products[product.productID].totalDelivered;
          products[product.productID].balance = angular.isNumber(bal) ? bal : 0;
          products[product.productID].calcdBalance = angular.isNumber(bal) ? bal : 0;
          products[product.productID].storageID = product.storageID;
        });
      });
    }

    function reset(schedule){
      var keyOrder = [];
      vm.packedProducts = [];
      if(schedule.packingList){
        schedule.packingList.forEach(function(product){
          keyOrder.push(product.productID);
          packedProductJson[product.productID] = {
            totalRetrieved : 0,
            totalDelivered: 0,
            packedQty: (parseInt(product.packedQty)) || 0,
            balance: 0,
            calcdBalance: 0,
            id: product.productID
          };
        });

        calcFaciltyBalance(packedProductJson);
        vm.productLength = keyOrder.length;
        keyOrder.forEach(function(key){
          vm.packedProducts.push(packedProductJson[key]);
        });

      }
    }
    if(!angular.isArray(dailySchedule.balance)){
      reset(dailySchedule);
    }else{
      vm.packedProducts = dailySchedule.balance;
    }


    vm.setDate = function(date){
      packedProductJson = {};
      scheduleService.getDaySchedule(AuthService.currentUser.name, date)
        .then(function(response){
          reset(response);
        });
      vm.productLength = Object.keys(packedProductJson).length;
    };

    vm.save = function(){
      dailySchedule.balance = vm.packedProducts;
      dbService.save(dailySchedule)
          .then(function(){
            log.success('returnedStockSaved');
            $state.go('home.schedule');
          })
          .catch(function(err){
            log.error('returnedFailed', err);
          });
    }
  });