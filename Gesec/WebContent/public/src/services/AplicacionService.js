'use strict';

bonitaApp.factory('AplicacionService', function($resource, CrudHelper) {
    var aplicacionResource = $resource(obtenerContexto('mantenimiento/aplicacion/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );

    return new CrudHelper(aplicacionResource);
});
