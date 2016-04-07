'use strict';

bonitaApp.factory('ParametroService', function($resource, CrudHelper) {
    var parametroResource = $resource(obtenerContexto('administracion/parametro/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );
    
    var ngParametroService = angular.extend(new CrudHelper(parametroResource), {
    });
    
    return ngParametroService;
});
