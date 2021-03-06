angular.module('starter.controllers')

.controller('RankingCtrl',RankingCtrl);

RankingCtrl.$inject = ['$scope','$ionicLoading','$q','playerDataService','$state','$ionicModal'];

function RankingCtrl($scope,$ionicLoading,$q,playerDataService,$state,$ionicModal){

  function init() {
    // if (Auth.logged()){
       $scope.show();
       getPlayers();  
    // }else{
    //   $scope.openLogin();
    // }
    
  }

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openLogin = function(){
    $scope.modal.show();
  }

  $scope.closeLogin = function(){
    $scope.modal.hide();
  }


  $scope.doRefresh = function(){
    getPlayers();
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.show = function(){
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>',
      delay: 100
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  function getPlayers() {
    var deferred = $q.defer();

    playerDataService.lista().then(function (result) {
      $scope.players = result.data;
      $scope.hide();
    }, function(err){
      $scope.erro = "Erro -> " + err.statusText;
      $scope.hide();
    });

    return deferred.promise;
  }

  init();

}