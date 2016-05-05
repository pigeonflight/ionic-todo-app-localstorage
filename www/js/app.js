var MyApp = angular.module('DemoApp', ['firebase','ionic']);

MyApp.constant(
    
       'FIREBASE_URL',
       'https://anothertodo.firebaseio.com/todolist/todos');



// "timestamp"
MyApp.controller('TodoCtrl', function(
    $firebaseArray,LSFactory, FIREBASE_URL
    ){
   // Sync to Localstorage 
   this.todos = LSFactory;
   // $firebaseArray(new Firebase(FIREBASE_URL));
   
   // Add TODO
   this.addTodo = function() {
       date_key = new Date().valueOf()
       this.todos.set("todo-"+date_key,{
           name: this.title,
           date: date_key
       });
       this.title = null;
   }.bind(this)
        
    // Remove Todo
    this.removeItem = function (item){
        
        this.todos.delete(item);
    };
    });

MyApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

MyApp.factory('LSFactory',[function(){
    var LSAPI = {
        clear: function(){
            return localStorage.clear();
        },
        get: function(key){
            return JSON.parse(localStorage.getItem(key));
        },
        set: function(key, data){
            return localStorage.setItem(key,JSON.stringify(data));
        },
        delete: function(key){
            return localStorage.removeItem(key);
        },
        getAll: function(){
            var todos = [];
            var items_fromLS = Object.keys(localStorage);
            for (var i = 0; i < items_fromLS.length; i++){
                if (items_fromLS[i] !== 'user' || items_fromLS[i] != 'token'){
                    todos.push(JSON.parse(localStorage[items_fromLS[i]]));
                }
            }
            return todos;
        }
    };
    return LSAPI;
    
}])