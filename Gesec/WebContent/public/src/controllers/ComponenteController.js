bonitaApp.controller('ComponenteController', ['$scope', '$uibModal', '$timeout', 'ConfiguracionService','ComponenteService', 'GridHelper', 'DialogHelper',
function ComponenteController($scope, $uibModal, $timeout, ConfiguracionService, ComponenteService, GridHelper, DialogHelper) {
    $scope.componente = {estado: null};
    $scope.estado = {
        select: {label: "Todos", value: null}, 
        onSelect: function(item, model){}
    };
 
    $scope.estados = ConfiguracionService.listarEstados("Todos");

    $scope.limpiar = function() {
        $scope.componente = {estado: null, elemento: ""};
        $scope.estado.select = {};
        $scope.estado.select.label = "Todos";
        $scope.estado.select.value = null;

        $scope.gridComponente.rowData = [];
        $scope.gridComponente.api.onNewRows();
    }

    $scope.buscar = function() {
        $scope.componente.estado = $scope.estado.select.value;
        ComponenteService.listar($scope.componente).$promise.then(function(response){
            $scope.gridTipoComponente.rowData = response.listaEntidades;
            $scope.gridTipoComponente.api.onNewRows();
        });
    };

    $scope.nuevo = function() {
        abrirComponente(null);
    };

    $scope.editar = function(id) {
        abrirComponente(id);
    };

    $scope.eliminarVarios = function() {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar los registros seleccionados \u003F", function() {
            var entidades = [];
            for(var i in $scope.gridComponente.selectedRows) {
                entidades.push({"id": $scope.gridComponente.selectedRows[i].id});
            }
            ComponenteService.eliminarVarios(entidades, $scope.componente).$promise.then(function(response){
                $scope.gridComponente.rowData = response.listaEntidades;
                $scope.gridComponente.api.onNewRows();
            });
        }, null);
    };
    
    $scope.eliminar = function(id) {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar el registro seleccionado \u003F", function(){
            ComponenteService.eliminar(id, $scope.componente).$promise.then(function(response){
                $scope.gridComponente.rowData = response.listaEntidades;
                $scope.gridComponente.api.onNewRows();
            });
        }, null);
    };

    var abrirComponente = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogComponente.html',
            controller: 'DialogComponenteController',
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
        {headerName: "", checkboxSelection: true, width: 30, props: {name: "gridComponente"}},
        {headerName: "C\u00F3digo", field: "id", width: 100},
        {headerName: "Componente", field: "elemento", width: 200},
        {headerName: "Estado", field: "estado", width: 90, cellRenderer: GridHelper.estadoCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.editarCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.eliminarCellRender}
    ];

    $scope.gridComponente = {
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

bonitaApp.controller('DialogComponenteController', ['$scope', '$uibModalInstance', '$uibModal', 'DialogHelper', 'ComponenteService', 'ConfiguracionService', 'id', 'buscar',
function($scope, $uibModalInstance, $uibModal, DialogHelper, ComponenteService, ConfiguracionService, id, buscar){

    $scope.buscar = buscar;
    $scope.estado = {
        select: {label: "Activo", value: "A"},
        onSelect: function(item, model){},
        disabled: false
    };
    $scope.estados =  ConfiguracionService.listarEstados(null);

    if(id != undefined || id != null) {
        ComponenteService.obtener(id).$promise.then(function(response){
            $scope.componente = response.entidad;
            $scope.estado.select = {};
            $scope.estado.select.value = $scope.tipoComponente.estado;
            $scope.estado.select.label = $scope.tipoComponente.estado == 'A' ? 'Activo' : 'Inactivo';
        });
    } else {
        $scope.componente = {"estado": "A"};
        $scope.estado.disabled = true;
    }
    
    $scope.guardar = function () {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
            $scope.componente.estado = $scope.estado.select.value;
            ComponenteService.guardar($scope.componente).$promise.then(function(response){
                $scope.buscar();
                $uibModalInstance.close();
            });
        }, null);
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
