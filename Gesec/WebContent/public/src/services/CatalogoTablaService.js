'use strict';

bonitaApp.factory('CatalogoTablaService', function($resource, CrudHelper) {
    var catalogoResource = $resource(obtenerContexto('mantenimiento/catalogotabla/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );
    
    var ngCatalogotablaService = angular.extend(new CrudHelper(catalogoResource), {
/*
    	listarCatalogo: function(item) {
    		alert("listarCatalogo222222222222");
            return this.resource.ejecutar({"metodo": "listarCatalogo"}, {"entidad": item});
        }
  */
    	});
    
    return ngCatalogotablaService;
    //return new CrudHelper(catalogoResource);
    
});