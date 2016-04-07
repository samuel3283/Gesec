'use strict';

bonitaApp.factory('ConfiguracionService', function($resource, CrudHelper) {
    var ConfiguracionService = {};

    ConfiguracionService.listarEstados = function(valorDefecto){
        var estados = [];
        
        if(valorDefecto != null) {
            estados.push({"label": valorDefecto, "value": null});
        }
        estados.push({"label": "Activo"  , "value": 'A'});
        estados.push({"label": "Inactivo", "value": 'I'});
        
        return estados;
    };
    
    ConfiguracionService.listarEstadosPuesto = function(valorDefecto){
        var estados = [];
        
        if(valorDefecto != null) {
            estados.push({"label": valorDefecto, "value": null});
        }
        estados.push({"label": "Activo"    , "value": 'A'});
        estados.push({"label": "Inactivo"  , "value": 'I'});
        estados.push({"label": "En proceso", "value": 'P'});
        
        return estados;
    };
    
    return ConfiguracionService;
});