bonitaApp.controller('TipoComponenteController', ['$scope', '$uibModal', '$timeout', 'ConfiguracionService','TipoComponenteService', 'GridHelper', 'DialogHelper',
function TipoComponenteController($scope, $uibModal, $timeout, ConfiguracionService, TipoComponenteService, GridHelper, DialogHelper) {
    $scope.tipoComponente = {estado: null};
    $scope.estado = {
        select: {label: "Todos", value: null}, 
        onSelect: function(item, model){}
    };
 
    $scope.estados = ConfiguracionService.listarEstados("Todos");

    $scope.limpiar = function() {
        $scope.tipoComponente = {estado: null, elemento: ""};
        $scope.estado.select = {};
        $scope.estado.select.label = "Todos";
        $scope.estado.select.value = null;

        $scope.gridTipoComponente.rowData = [];
        $scope.gridTipoComponente.api.onNewRows();
    }

    $scope.buscar = function() {
        $scope.tipoComponente.estado = $scope.estado.select.value;
        TipoComponenteService.listar($scope.tipoComponente).$promise.then(function(response){
            $scope.gridTipoComponente.rowData = response.listaEntidades;
            $scope.gridTipoComponente.api.onNewRows();
        });
    };

    $scope.nuevo = function() {
        abrirTipoComponente(null);
    };

    $scope.editar = function(id) {
        abrirTipoComponente(id);
    };

    $scope.eliminarVarios = function() {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar los registros seleccionados \u003F", function() {
            var entidades = [];
            for(var i in $scope.gridTipoComponente.selectedRows) {
                entidades.push({"id": $scope.gridTipoComponente.selectedRows[i].id});
            }
            TipoComponenteService.eliminarVarios(entidades, $scope.tipoComponente).$promise.then(function(response){
                $scope.gridTipoComponente.rowData = response.listaEntidades;
                $scope.gridTipoComponente.api.onNewRows();
            });
        }, null);
    };
    
    $scope.eliminar = function(id) {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar el registro seleccionado \u003F", function(){
            TipoComponenteService.eliminar(id, $scope.tipoComponente).$promise.then(function(response){
                $scope.gridTipoComponente.rowData = response.listaEntidades;
                $scope.gridTipoComponente.api.onNewRows();
            });
        }, null);
    };

    var abrirTipoComponente = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogTipoComponente.html',
            controller: 'DialogTipoComponenteController',
            size: 500,
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
        {headerName: "", checkboxSelection: true, width: 30, props: {name: "gridTipoComponente"}},
        {headerName: "C\u00F3digo", field: "id", width: 100},
        {headerName: "Tipo Componente", field: "elemento", width: 200},
        {headerName: "Estado", field: "estado", width: 90, cellRenderer: GridHelper.estadoCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.editarCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.eliminarCellRender}
    ];

    $scope.gridTipoComponente = {
        angularCompileRows: true,
        columnDefs: columnDefs,
        rowData: [],
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        enableColResize: true,
        enableSorting: false,
        headerCellRenderer: GridHelper.headerCellRenderer,
        selectionChanged: GridHelper.cambioSeleccion
    };
}]);

bonitaApp.controller('DialogTipoComponenteController', ['$scope', '$uibModalInstance', '$uibModal', 'DialogHelper', 'TipoComponenteService', 'ConfiguracionService', 'id', 'buscar',
function($scope, $uibModalInstance, $uibModal, DialogHelper, TipoComponenteService, ConfiguracionService, id, buscar){

    $scope.buscar = buscar;
    $scope.estado = {
        select: {label: "Activo", value: "A"},
        onSelect: function(item, model){},
        disabled: false
    };
    $scope.estados =  ConfiguracionService.listarEstados(null);

    if(id != undefined || id != null) {
        TipoComponenteService.obtener(id).$promise.then(function(response){
            $scope.tipoComponente = response.entidad;
            $scope.estado.select = {};
            $scope.estado.select.value = $scope.tipoComponente.estado;
            $scope.estado.select.label = $scope.tipoComponente.estado == 'A' ? 'Activo' : 'Inactivo';
        });
    } else {
        $scope.tipoComponente = {"estado": "A"};
        $scope.estado.disabled = true;
    }
    
    $scope.guardar = function () {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
            $scope.tipoComponente.estado = $scope.estado.select.value;
            TipoComponenteService.guardar($scope.tipoComponente).$promise.then(function(response){
                $scope.buscar();
                $uibModalInstance.close();
            });
        }, null);
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
