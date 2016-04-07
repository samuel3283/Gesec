'use strict';

bonitaApp.factory('CrudHelper', function() {
    var CrudHelper = function(_resource){
        this.resource = _resource;
        
        this.listar = function(item) {
        	return this.resource.ejecutar({"metodo": "buscar"}, {"entidad": item, "props": {"mostrarMensaje": "NO"}});
        };
        /*
        this.contar = function(item) {
            return this.resource.ejecutar({"metodo": "contar"}, {"entidad": item});
        };
        
        this.listarPaginado = function(item, pagina) {
            return this.resource.ejecutar({"metodo": "buscar"}, {"entidad": item, "props": {"nroFilasPag": 10, "pagina": pagina + 1}});
        };
        
        this.listarSinMensaje = function(item) {
            return this.resource.ejecutar({"metodo": "buscar"}, {"entidad": item, "props": {"mostrarMensaje": "NO"}});
        };
    
        this.obtenerSinMensaje = function(id) {
            return this.resource.ejecutar({"metodo": "obtener", "id": id}, {"props": {"mostrarMensaje": "NO"}});
        };
        
        this.obtener = function(id) {
            return this.resource.ejecutar({"metodo": "obtener", "id": id}, {});
        };
        
        this.guardar = function(item) {
            var metodo = "actualizar";
            if(item.id == undefined || item.id == null || item.id == 0) {
                metodo = "agregar";
            }
            return this.resource.ejecutar({"metodo": metodo, "id": item.id}, {"entidad": item});
        };
        
        this.eliminar = function(id, item) {
            return this.resource.ejecutar({"metodo": "eliminar", "id": id}, {"entidad": item});
        };
        
        this.eliminarVarios = function(entidades, item) {
            return this.resource.ejecutar({"metodo": "eliminar"}, {"entidad": item, "listaEntidades": entidades});
        };*/
        
    };
    
    return CrudHelper;
});