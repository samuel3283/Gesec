'use strict';

bonitaApp.controller('DialogController', ['$scope', '$uibModalInstance', 'mensaje', 'error', 'detalle', 'aceptar', 'cancelar',
function DialogController($scope, $uibModalInstance, mensaje, error, detalle, aceptar, cancelar) {
    $scope.mensaje = mensaje;
    $scope.error = error;
    $scope.detalle = detalle;
    $scope.mostrarDetalle = true;
    $scope.etiqueta = "Ver detalle";
    
    $scope.aceptar = function() {
        if($.isFunction(aceptar)){
            aceptar();
        }
        $uibModalInstance.close();
    };
  
    $scope.cancelar = function() {
        if($.isFunction(cancelar)){
            cancelar();
        };
        $uibModalInstance.dismiss('cancel');
    };
  
    $scope.verDetalle = function() {
        $scope.mostrarDetalle = !$scope.mostrarDetalle;
        if($scope.mostrarDetalle) {
            $scope.etiqueta = "Ver detalle";
        } else {
            $scope.etiqueta = "Ocultar detalle";
        }
    }
}]);