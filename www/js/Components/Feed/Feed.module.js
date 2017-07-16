var Feed = angular.module('Feed', [])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Feed/src/Template/Feed.html',
        controller: 'FeedViewController'
      }
    }
  })
  .state('app.feedview', {
    url: '/feed/{feed:json}',
    params: {feed: null},
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Feed/src/Template/FullFeed.html',
        controller: 'FullFeedViewController'
      }
    }
  })
})

.directive('searchBar', [function () {
  return {
    scope: {
      ngModel: '='
    },
    require: ['^ionNavBar', '?ngModel'],
    restrict: 'E',
    replace: true,
    template: '<ion-nav-buttons side="right">'+
    '<div class="searchBar">'+
    '<div class="searchTxt" ng-show="ngModel.show">'+
    '<div class="bgdiv"></div>'+
    '<div class="bgtxt">'+
    '<input type="text" placeholder="Procurar..." ng-model="ngModel.txt">'+
    '</div>'+
    '</div>'+
    '<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></i>'+
    '</div>'+
    '</ion-nav-buttons>',

    compile: function (element, attrs) {
      var icon=attrs.icon
        || (ionic.Platform.isAndroid() && 'ion-android-search')
        || (ionic.Platform.isIOS()     && 'ion-ios7-search')
        || 'ion-search';
      angular.element(element[0].querySelector('.icon')).addClass(icon);

      return function($scope, $element, $attrs, ctrls) {
        var navBarCtrl = ctrls[0];
        $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;

      };
    },
    controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
      var title, definedClass;
      $scope.$watch('ngModel.show', function(showing, oldVal, scope) {
        if(showing!==oldVal) {
          if(showing) {
            if(!definedClass) {
              var numicons=$scope.navElement.children().length;
              angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
            }

            title = $ionicNavBarDelegate.getTitle();
            $ionicNavBarDelegate.setTitle('');
          } else {
            $ionicNavBarDelegate.setTitle(title);
          }
        } else if (!title) {
          title = $ionicNavBarDelegate.getTitle();
        }
      });
    }]
  };
}])