/**
 * Created by ehealthafrica on 3/19/15.
 */

angular.module('home.returned')
  .service('returnedService', function(packingAllService){

    this.get = function(){
      return packingAllService.all();
    };

  });
