'use strict';

bonitaApp.factory('DialogHelper', ['$uibModal',
    function($uibModal) {
       var DialogHelper = {};
       
       DialogHelper.open = function(template, mensaje, error, detalle, aceptar, cancelar, width) {
           var modalInstance = $uibModal.open({
               templateUrl: template,
               controller: 'DialogController',
           size: width || 400,
           windowClass: 'child',
           resolve: {
               mensaje: function() {
                   return mensaje;
               },
               error: function() {
                   return error;
               },
               detalle: function() {
                   return detalle;
               },
               aceptar: function () {
                   return aceptar;
               },
               cancelar: function() {
                   return cancelar;
               }
           }
       });
           
       modalInstance.result.then(function () {
       }, function () {
           if($.isFunction(cancelar)){
               cancelar();
           };
       });
    };
    
    DialogHelper.info     = function(mensaje, aceptar, cancelar){ this.open("dialogInfo.html"   , mensaje, "", [], aceptar, cancelar); };
    DialogHelper.confirm  = function(mensaje, aceptar, cancelar){ this.open("dialogConfirm.html", mensaje, "", [], aceptar, cancelar); };
    DialogHelper.warning  = function(mensaje, aceptar, cancelar){ this.open("dialogWarning.html", mensaje, "", [], aceptar, cancelar); };
    DialogHelper.validate = function(mensaje, aceptar, cancelar){ this.open("dialogValidate.html", mensaje, "", [], aceptar, cancelar); };
    DialogHelper.error    = function(mensaje, error, detalle, aceptar, cancelar){ this.open("dialogError.html"  , mensaje, error, detalle, aceptar, cancelar); };
    DialogHelper.show     = function(response) {
        var reject = false;
        if(response.tipoResultado == "SIN_REGISTROS") {
            this.info("No se encontrar\u00F3n resultados para mostrar");
        } else if(response.tipoResultado == "ERROR" || response.tipoResultado == "ERROR_SISTEMA") {
            this.error(response.mensaje, response.detalle || "", response.stackTrace || []);
            reject = true;
        } else if(response.tipoResultado == "VALIDACION") {
            var mensajes = [];
            if(response.props.erroresValidacion) {
                for(var prop in response.props.erroresValidacion) {
                    for(var i in response.props.erroresValidacion[prop]) {
                        mensajes.push(response.props.erroresValidacion[prop][i].mensaje);
                    }
                }
            }
            if(response.props.erroresCompuestoValidacion) {
                for(var prop in response.props.erroresCompuestoValidacion) {
                    for(var i in response.props.erroresCompuestoValidacion[prop]) {
                        var funcion = parseInt(prop.replace("funcion[", "").replace("]", "")) + 1
                        mensajes.push("Funci\u00F3n Nro. " + funcion + ": " + response.props.erroresCompuestoValidacion[prop][i][0].mensaje);
                    }
                }
            }
            this.validate(mensajes);
            reject = true;
        } else if(response.tipoResultado == "EXITO" && response.mensaje != null) {
            this.info(response.mensaje);
        }
    }
    return DialogHelper;
}]);