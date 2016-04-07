'use strict';

bonitaApp.factory('AreaService', function($resource, CrudHelper) {
    var areaResource = $resource(obtenerContexto('mantenimiento/area/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );
    
    var ngAreaService = angular.extend(new CrudHelper(areaResource), {
        listarArbolDeAreas: function() {
            return this.resource.ejecutar({"metodo": "listarArbolDeAreas"}, {});
        }
    });
    
    return ngAreaService;
});