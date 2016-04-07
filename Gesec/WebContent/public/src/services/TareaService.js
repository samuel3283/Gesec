'use strict';

bonitaApp.factory('TareaService', function($resource, CrudHelper) {
    var tareaResource = $resource(obtenerContexto('mantenimiento/tarea/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );

    var ngTareaService = angular.extend(new CrudHelper(tareaResource), {
        buscarTareaConSinFunciones: function(item, pagina) {
            return this.resource.ejecutar({"metodo": "buscarTareaConSinFunciones"}, {"entidad": item , "props": {"nroFilasPag": 10, "pagina": pagina+ 1}}); // , "props": {"nroFilasPag": 10, "pagina": pagina}
        },
        buscarOperacionesPorTarea: function(id) {
            return this.resource.ejecutar({"metodo": "buscarOperacionesPorTarea", "id": id}, {}); // , "props": {"nroFilasPag": 10, "pagina": pagina}
        },
        contarTareaConSinFunciones: function(item) {
            return this.resource.ejecutar({"metodo": "contarTareaConSinFunciones"}, {"entidad": item}); // , "props": {"nroFilasPag": 10, "pagina": pagina}
        }
    });
    
    return ngTareaService;
});