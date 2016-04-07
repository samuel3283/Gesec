'use strict';

bonitaApp.factory('PuestoFuncionService', function($resource, CrudHelper) {
    var puestoFuncionResource = $resource(obtenerContexto('puestoFuncion/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );
    
    var ngPuestoFuncionService = angular.extend(new CrudHelper(puestoFuncionResource), {
        
    });
    
    return ngPuestoFuncionService;
});
