(function (module) {
    angular.module(module).directive('rainMenuItem', rainMenuItem);


    function rainMenuItem() {
        return {
            restrict: 'AE',
            require: '^rainMenu',
            transclude: true,
            scope: {
                label: '@',
                icon:'@',
                route:'@'
            },
            templateUrl: 'rainModules/rainMenu/rainMenuItemTemplate.html',
            link: link
        }
    }

    function link(scope, element, attr, rainMenuCtrl) {

        scope.isActive=function(){
            return element === rainMenuCtrl.getActiveElement();
        };

        scope.isVertical = function(){
            return rainMenuCtrl.isVertical();
        };

        element.on('click',function(e){
            e.stopPropagation();
            e.preventDefault();
            scope.$apply(function(){
                rainMenuCtrl.setActiveElement(element);
                rainMenuCtrl.setRoute(scope.route);
            })
        })
    }
})('rainMenu');