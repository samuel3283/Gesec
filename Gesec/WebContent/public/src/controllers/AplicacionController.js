'use strict';

bonitaApp.controller('AplicacionController', ['$scope', '$uibModal', '$timeout', 'ConfiguracionService','AplicacionService', 'GridHelper', 'DialogHelper','CatalogoTablaService',
function AplicacionController($scope, $uibModal, $timeout, ConfiguracionService, AplicacionService, GridHelper, DialogHelper, CatalogoTablaService) {

    $scope.aplicacion = {estado: null};
    $scope.estado = {
        select: {label: "Todos", value: null}, 
        onSelect: function(item, model){}
    };
    $scope.estados = ConfiguracionService.listarEstados("Todos");
    
    
    $scope.tipoAplicacion = {
       select : {"id" :null , "nombre" : "Todos"},
       onSelect: function(item, model){}
    };
    
    CatalogoTablaService.listar({"catalogoTabla": {"id": 6}}).$promise.then(function(response){
        $scope.tipoAplicaciones = response.listaEntidades;
    });

    $scope.limpiar = function() {
        $scope.aplicacion = {estado: null};
        ViewHelper.limpiarValor("estado", "Todos");
        $scope.tipoAplicacion.select = {nombre : "Todos"};
        
        $scope.gridAplicacion.rowData = [];
        $scope.gridAplicacion.api.onNewRows();
    }

    $scope.buscar = function() {
        $scope.aplicacion.estado = $scope.estado.select.value;
        $scope.aplicacion.tipo = { "id": $scope.tipoAplicacion.select.id };
        GridHelper.configurarDataSourceListarPaginado("gridAplicacion", $scope.gridAplicacion, AplicacionService, $scope.aplicacion);
    };
    
    $scope.nuevo = function() {
        abrirAplicacion(null);
    };

    $scope.editar = function(id) {
        abrirAplicacion(id);
    };

    $scope.eliminarVarios = function() {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar los registros seleccionados \u003F", function() {
            var entidades = [];
            for(var i in $scope.gridAplicacion.selectedRows) {
                entidades.push({"id": $scope.gridAplicacion.selectedRows[i].id});
            }
            AplicacionService.eliminarVarios(entidades, $scope.rol).$promise.then(function(response){
                $scope.gridAplicacion.rowData = response.listaEntidades;
                $scope.gridAplicacion.api.onNewRows();
            });
        }, null);
    };

    $scope.eliminar = function() {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar los registros seleccionados \u003F", function() {
            var entidades = [];
            for(var i in $scope.gridAplicacion.selectedRows) {
                entidades.push({"id": $scope.gridAplicacion.selectedRows[i].id});
            }
            AplicacionService.eliminarVarios(entidades).$promise.then(function(response){
                $scope.buscar();
            });
        }, null);
    };

    var abrirAplicacion = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogAplicacion.html',
            controller: 'DialogAplicacionController',
            size: 700,
            windowClass: 'child',
            resolve: {
                id: function () {
                    return id;
                },
                buscar: function() {
                    return $scope.buscar;
                }
            }
        });
    };
    
    var columnDefs = [
        {headerName: "", checkboxSelection: true, width: 30, props:{name: "gridAplicacion"}},
        {headerName: "C\u00F3digo", field: "id", width: 100},
        {headerName: "Aplicacion", field: "nombre", width: 200},
        {headerName: "Descripcion", field: "descripcion", width: 200},
        {headerName: "Tipo", field: "tipo.nombre", width: 120, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Estado", field: "estado", width: 90, cellRenderer: GridHelper.estadoCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.editarCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.eliminarCellRender}
    ];

    $scope.gridAplicacion = GridHelper.crearGrid({columnDefs: columnDefs});
}]);

bonitaApp.controller('DialogAplicacionController', ['$scope', '$uibModalInstance', '$uibModal','DialogHelper', 'AplicacionService', 'ConfiguracionService', 'CatalogoTablaService', 'id', 'buscar',
function($scope, $uibModalInstance, $uibModal, DialogHelper, AplicacionService, ConfiguracionService, CatalogoTablaService, id, buscar){

    $scope.buscar = buscar;
    $scope.estado = {
        select: {label: "Activo", value: "A"},
        onSelect: function(item, model){},
        disabled: false
    };
    
    $scope.tipoAplicacion = {
        select : {"id": null, "nombre": "Seleccione"},
        onSelect: function(item, model){}
    };
    $scope.estados =  ConfiguracionService.listarEstados(null);
    $scope.tipoAplicaciones = [];
    
    CatalogoTablaService.listar({ "catalogoTabla": {"id": 6} }).$promise.then(function(response){
        $scope.tipoAplicaciones = response.listaEntidades;
    });
    
    if(id != undefined || id != null) {
        AplicacionService.obtener(id).$promise.then(function(response){
            $scope.aplicacion = response.entidad;
            $scope.estado.select = {};
            $scope.estado.select.value = $scope.aplicacion.estado;
            $scope.estado.select.label = $scope.aplicacion.estado == 'A' ? 'Activo' : 'Inactivo';
            
            $scope.tipoAplicacion.select = $scope.aplicacion.tipo;
        });
    } else {
        $scope.aplicacion = {"estado": "A"};
        $scope.estado.disabled = true;
    }

    $scope.guardar = function () {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
            $scope.aplicacion.estado = $scope.estado.select.value;
            $scope.aplicacion.tipo = {"id": $scope.tipoAplicacion.select.id};
            AplicacionService.guardar($scope.aplicacion).$promise.then(function(response){
                $scope.buscar();
            });
        }, null);
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);