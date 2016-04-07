'use strict';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

var bonitaApp = angular.module('bonitaApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'ui.select', 'angularGrid', "highcharts-ng"]);

bonitaApp.config(function($httpProvider) {
    var 
    statusLoad = function (data, headersGetter) {
        return data;
    },
    statusUnload = function (data, headers) {
        return data;
    };
    
    $httpProvider.defaults.transformResponse.push(statusUnload);
    $httpProvider.defaults.transformRequest.push(statusLoad);

    $httpProvider.interceptors.push(function ($q, $injector) {
        return {
            'request': function (config) {
                return config || $q.when(config);
            },
            'response': function (response) {
                if(response.data != null) {
                    if(response.data.props != null && response.data.props.mostrarMensaje.toLowerCase() == 'si') {
                        if($injector.get("DialogHelper").show(response.data)) {
                            return $q.reject(response);
                        }
                    }
                }
                
                return response || $q.when(response);
            },
            'responseError': function (response) {
                return response || $q.when(response);
            },
            'requestError': function (response) {
                return response || $q.when(response);
            }
        };
    });
});
