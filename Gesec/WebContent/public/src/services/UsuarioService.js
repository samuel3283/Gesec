'use strict';
bonitaApp.factory('UsuarioService', function($resource, CrudHelper) {
    var usuarioResource = $resource(obtenerContexto('mantenimiento/usuario/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );
    
    var ngUsuarioService = angular.extend(new CrudHelper(usuarioResource), {
        listado: function(item) {
        	return this.resource.ejecutar({"metodo": "buscar"}, {"entidad": item, "props": {"mostrarMensaje": "NO"}});
        },

        /*
    	buscarTareaConSinFunciones: function(item, pagina) {
            return this.resource.ejecutar({"metodo": "buscarTareaConSinFunciones"}, {"entidad": item , "props": {"nroFilasPag": 10, "pagina": pagina+ 1}}); // , "props": {"nroFilasPag": 10, "pagina": pagina}
        },
        buscarOperacionesPorTarea: function(id) {
            return this.resource.ejecutar({"metodo": "buscarOperacionesPorTarea", "id": id}, {}); // , "props": {"nroFilasPag": 10, "pagina": pagina}
        },
        contarTareaConSinFunciones: function(item) {
            return this.resource.ejecutar({"metodo": "contarTareaConSinFunciones"}, {"entidad": item}); // , "props": {"nroFilasPag": 10, "pagina": pagina}
        }*/
    });
    
    return ngUsuarioService;
});