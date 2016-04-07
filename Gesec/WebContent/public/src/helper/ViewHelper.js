'use strict';

bonitaApp.factory('ViewHelper', function($rootScope) {
    var ViewHelper = {};
    
    ViewHelper.limpiarValor = function(propiedad, valor) {
        $rootScope[propiedad].select = {};
        $rootScope[propiedad].select.label = "Todos";
        $rootScope[propiedad].select.value = null;
    };
    
    return ViewHelper;
});