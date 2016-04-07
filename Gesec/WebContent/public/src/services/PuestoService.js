'use strict';

bonitaApp.factory('PuestoService', function($resource, CrudHelper) {
    var puestoResource = $resource(obtenerContexto('puesto/:metodo/:id.json'),
            {"metodo": '@_metodo', "id": '@_id'},
            {"ejecutar" : { "method": 'POST' }}
        );
    
    var ngPuestoService = angular.extend(new CrudHelper(puestoResource), {
        listarTareasPorFunciones: function(idFunciones) {
            return this.resource.ejecutar({"metodo": "listarTareasPorFunciones"}, {"idFunciones": idFunciones});
        },
        devolver: function(puesto) {
            return this.resource.ejecutar({"metodo": "devolver", "id": puesto.id}, {"entidad": puesto});
        },
        siguienteEtapa: function(item, funciones, mostrarMensaje) {
            return this.resource.ejecutar({"metodo": "siguienteEtapa", "id": item.id}, {
                "entidad": item, 
                "funciones": funciones,
                "props": {"mostrarMensaje": mostrarMensaje || "SI"}
            });
        },
        guardar: function(item, funciones, limitesDeFacultades, mostrarMensaje, aplicarValidacionCompleta) {
            var metodo = "actualizar";
            if(item.id == undefined || item.id == null || item.id == 0) {
                metodo = "agregar";
            }
            return this.resource.ejecutar({"metodo": metodo, "id": item.id}, {
                "entidad": item,
                "funciones": funciones,
                "limitesDeFacultades": limitesDeFacultades,
                "props": {
                    "mostrarMensaje": mostrarMensaje || "SI",
                    "aplicarValidacionCompleta": aplicarValidacionCompleta || "NO"
                }
            });
        },
        cambiarEstado: function(puestos, estado) {
            return this.resource.ejecutar({"metodo": "cambiarEstado", "id" : estado}, {"listaEntidades" : puestos});
        },
        esFuncionUnica: function(funcion) {
            return this.resource.ejecutar({"metodo": "esFuncionUnica"}, {"entidad" : funcion, "props": { "mostrarMensaje": "NO" }});
        },
        clonarPuesto: function(ids) {
            return this.resource.ejecutar({"metodo": "clonar"}, {"ids" : ids});
        }
    });
    
    return ngPuestoService;
});
