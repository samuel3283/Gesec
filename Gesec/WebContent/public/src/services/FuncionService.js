'use strict';

bonitaApp.factory('FuncionService', function($resource, CrudHelper) {
    var funcionResource = $resource(obtenerContexto('funcion/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );
    
    var ngFuncionService = angular.extend(new CrudHelper(funcionResource), {
        obtener2: function(id) {
            return this.resource.ejecutar({"metodo": "obtener", "id": id}, {});
        }
    });
    
    return ngFuncionService;
});
