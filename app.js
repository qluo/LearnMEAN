var app = angular.module('flapperNews'. ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url:'/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
    });
    $stateProvider.state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
    });
    $urlRouterProvider.otherwise('home');
}
]);

app.factory('posts', [function(){
    var o = {
        posts:[]
    };
    return o;
}]);

app.controller('MainCtrl', [
'$scope', 'posts', fucntion($scope, posts) {
    $scope.text = 'Hello world!';
    $scope.posts = posts.posts;
    $scope.addPost = function() {
        if(!$scope.title || $scope.title === '') { return; }
        $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments: [
                {author:'Joe', body:'Cool post!', upvotes:0},
                {author:'Bob', body:'Greate idea but everything is wrong!', upvotes:0}
            ]
            });
        $scope.title = '';
        $scope.link = '';
    };
    $scope.incrementUpvotes=function(post){
        post.upvotes += 1;
    };
}
]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
    $scope.post=posts.posts[$stateParams.id];
}
])