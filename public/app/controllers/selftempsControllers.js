angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplate, $scope, $location, $routeParams) {
        
        var app = this;

        function refresh() {
           SelfTemplate.getAllSelfTemplates().then(function(data) {               
                $scope.template = data.data[0];
                $scope.templateData = data.data;
           })
        }
        refresh();

        app.clone = function() {
            SelfTemplate.cloneSelfTemplate($scope.template); // Clone a template to create a new object
            var cloneObj = $scope.templateData.slice(-1)[0]; // Select the last element of database to use it as a cloned object
            refresh(); 
                $location.url('/selftemps/' + cloneObj._id);
                    SelfTemplate.getSelfTemplateById($routeParams._id).then(function(data) {
                        console.log($routeParams._id);
                    })

        }
        


    })