"use strict";angular.module("log",["toastr"]),angular.module("log").constant("WARNING_MESSAGES",{}),angular.module("log").constant("SUCCESS_MESSAGES",{}),angular.module("log").constant("INFO_MESSAGES",{}),angular.module("log").constant("ERROR_MESSAGES",{stateChangeError:{title:"Application error",message:"Could not load page",remedy:"Please try that again"}}),angular.module("packing.item",["core"]),angular.module("packing.item").config(["$stateProvider",function(e){e.state("packing.item",{url:"/:id",templateUrl:"app/packing/item/item.html",controller:"PackingItemCtrl",controllerAs:"packingItemCtrl",resolve:{packingLists:["$stateParams","packingItemService",function(e,t){return t.get(e.id)}]}})}]),angular.module("packing.item").service("packingItemService",["couchdb","couchUtil",function(e,t){function n(e){function t(e){return 3===e.key.length}function n(e){var t=e.key[2];a[t]={productID:t,expectedQty:e.value}}return e.rows.filter(t).forEach(n),a}var a={};this.get=function(a){var r={ddoc:"daily-deliveries",view:"delivery-packing-list",group:!0},i=t.join(a);return angular.extend(r,i),e.view(r).$promise.then(n)},this.isComplete=function(e){var t=!1;e.packedQty>=e.expectedQty&&(t=!0),a[e.productID].complete=t},this.max=function(e){e.packedQty=e.expectedQty,a[e.productID].complete=!0}}]),angular.module("packing.item").controller("PackingItemCtrl",["$stateParams","packingLists","packingItemService",function(e,t,n){this.name=e.id,this.packingLists=t,this.isComplete=n.isComplete,this.max=n.max}]),angular.module("packing.all",["core"]),angular.module("packing.all").config(["$stateProvider",function(e){e.state("packing.all",{url:"/all",templateUrl:"app/packing/all/all.html",controller:"PackingAllCtrl",controllerAs:"packingAllCtrl",resolve:{packings:["packingAllService",function(e){return e.all()}]}})}]),angular.module("packing.all").service("packingAllService",["user","couchdb","couchUtil",function(e,t,n){this.all=function(){var a={ddoc:"daily-deliveries",view:"by-driver",reduce:!1},r=n.key(e.email);return angular.extend(a,r),t.view(a).$promise.then(n.pluckIDs)}}]),angular.module("packing.all").controller("PackingAllCtrl",["packings",function(e){this.packings=e}]),angular.module("user",[]),angular.module("user").constant("user",{email:"abdullahi.ahmed@example.com"}),angular.module("navbar",["core","config"]),angular.module("navbar").service("navbarService",["$state",function(e){this.get=function(){function t(e){return!e.abstract&&e.data&&e.data.label}function n(e){return-1===e.name.indexOf(".")}function a(e){return{name:e.name,label:e.data.label}}var r=e.get();return r.filter(t).filter(n).map(a)}}]),angular.module("navbar").controller("NavbarCtrl",["config","navbarService",function(e,t){this.name=e.name,this.items=t.get()}]),angular.module("log").service("log",["$log","toastr","ERROR_MESSAGES","WARNING_MESSAGES","INFO_MESSAGES","SUCCESS_MESSAGES",function(e,t,n,a,r,i){function l(n,a,r,i,l){i=i||{},angular.isObject(a)||(a={log:a,toastr:a});var o=r[n]||{message:""},c=[o.message];return l&&c.push(l),("error"===a.log||"warn"===a.log)&&c.push(o.remedy),c=c.join(". ")+".",e[a.log](c,o,i),t[a.toastr](c,o.title)}this.error=function(e,t,a){return l(e,"error",n,t,a)},this.warning=function(e,t,n){var r={log:"warn",toastr:"warning"};return l(e,r,a,t,n)},this.info=function(e,t,n){return l(e,"info",r,t,n)},this.success=function(e,t,n){var a={log:"log",toastr:"success"};return l(e,a,i,t,n)}}]),angular.module("footer",["core","config"]),angular.module("footer").controller("FooterCtrl",["config",function(e){this.year=(new Date).getFullYear(),this.author=e.author,this.version=e.version}]),angular.module("couchdb",["ngResource","config"]),angular.module("couchdb").service("couchUtil",function(){function e(e,t){function n(e){return e[t]}return e.rows.map(n)}this.key=function(e){return{startkey:JSON.stringify(e),endkey:JSON.stringify(e+"￰")}},this.join=function(e){return{startkey:JSON.stringify([e]),endkey:JSON.stringify([e,2])}},this.pluckIDs=function(t){return e(t,"id")},this.pluckValues=function(t){return e(t,"value")},this.pluckDocs=function(t){return e(t,"doc")}}),angular.module("couchdb").factory("couchdb",["$resource","config",function(e,t){return e(t.db,{},{view:{method:"GET",url:t.db+"/_design/:ddoc/_view/:view"}})}]),angular.module("core",["ui.router"]),angular.module("packing",["core","user","couchdb"]),angular.module("packing").config(["$stateProvider",function(e){e.state("packing",{url:"/packing",parent:"index",templateUrl:"app/packing/packing.html",controller:"PackingCtrl",controllerAs:"packingCtrl",resolve:{count:["packingService",function(e){return e.count()}]},data:{label:"Packing"}})}]),angular.module("packing").service("packingService",["user","couchdb","couchUtil",function(e,t,n){this.count=function(){var a={ddoc:"daily-deliveries",view:"by-driver"},r=n.key(e.email);return angular.extend(a,r),t.view(a).$promise.then(n.pluckValues)}}]),angular.module("packing").controller("PackingCtrl",["count",function(e){this.count=e[0]||0}]),angular.module("home",["core"]),angular.module("home").config(["$stateProvider",function(e){e.state("home",{url:"/",parent:"index",templateUrl:"app/home/home.html",data:{label:"Home"}})}]),angular.module("directDelivery",["core","navbar","footer","home","log","packing","packing.all","packing.item"]),angular.module("directDelivery").config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("root",{"abstract":!0,views:{root:{templateUrl:"app/index.html",controller:"IndexCtrl"}}}).state("index",{parent:"root","abstract":!0,views:{header:{templateUrl:"components/navbar/navbar.html",controller:"NavbarCtrl",controllerAs:"navbarCtrl"},content:{},footer:{templateUrl:"components/footer/footer.html",controller:"FooterCtrl",controllerAs:"footerCtrl"}}})}]),angular.module("directDelivery").controller("IndexCtrl",["$rootScope","log",function(e,t){function n(e){t.error("stateChangeError",e)}e.$on("$stateChangeError",n)}]),angular.module("config",[]).constant("config",{name:"direct-delivery",version:"1.0.0",author:"eHealth Africa",db:"https://dev-db.ehealth.org.ng/deliveries"}),angular.module("directDelivery").run(["$templateCache",function(e){e.put("app/index.html",'<div ui-view="header"></div><section class="container content"><div ui-view="content"><div ui-view=""></div></div></section><div ui-view="footer"></div>'),e.put("app/home/home.html","<h1>Welcome to Direct Delivery</h1>"),e.put("components/footer/footer.html",'<footer id="footer"><div class="container"><small class="text-muted"><span>©</span> <span ng-bind="::footerCtrl.year"></span> <span ng-bind="::footerCtrl.author"></span> <span class="pull-right"><span>v</span><span ng-bind="::footerCtrl.version"></span></span><nav role="navigation"><ul class="list-inline"><li><a ui-sref="contact">Contact Us</a></li></ul></nav></small></div></footer>'),e.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#/"><span class="glyphicon glyphicon-home"></span> <span ng-bind="::navbarCtrl.name"></span></a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li ng-repeat="item in navbarCtrl.items track by item.name" ui-sref-active="active"><a ui-sref="{{item.name}}" ng-bind="::item.label"></a></li></ul></div></div></nav>'),e.put("app/packing/packing.html",'<h1>Packing List</h1><span>You have</span> <span ng-bind="packingCtrl.count"></span> <a ui-sref="packing.all">active packing lists</a><div ui-view=""></div>'),e.put("app/packing/all/all.html",'<ul><li ng-repeat="packingID in packingAllCtrl.packings"><a ui-sref="packing.item({id: packingID})" ng-bind="packingID"></a></li></ul>'),e.put("app/packing/item/item.html",'<h2 ng-bind="packingItemCtrl.name"></h2><table class="table table-striped"><tr><th class="col-sm-1">Product</th><th class="col-sm-1">Expected Quantity</th><th class="col-sm-1">Complete?</th><th class="col-sm-2">Packed Quantity</th></tr><tr ng-repeat="item in packingItemCtrl.packingLists track by item.productID"><td ng-bind="item.productID"></td><td ng-bind="item.expectedQty"></td><td><span class="glyphicon" ng-class="{\n          \'glyphicon-ok text-success\': item.complete,\n          \'glyphicon-minus text-warning\': !item.hasOwnProperty(\'complete\'),\n          \'glyphicon-remove text-danger\': item.complete === false\n        }"></span></td><td><div class="form-inline"><button type="button" class="btn btn-default" ng-click="packingItemCtrl.max(item)">Max</button> <button type="button" class="btn btn-default" ng-click="item._partial = !item._partial">Partial</button> <input type="number" class="form-control input-sm" min="0" step="1" ng-model="item.packedQty" ng-model-options="{updateOn: \'blur\'}" ng-change="packingItemCtrl.isComplete(item)" ng-show="item._partial"></div></td></tr></table><a class="btn btn-default pull-right" ui-sref="packing.all">Save</a>')}]);