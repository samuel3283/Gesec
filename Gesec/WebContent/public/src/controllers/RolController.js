bonitaApp.controller('RolController', ['$scope', '$uibModal', '$timeout', 'ConfiguracionService','RolService', 'GridHelper', 'DialogHelper',
function RolController($scope, $uibModal, $timeout, ConfiguracionService, RolService, GridHelper, DialogHelper) {
    $scope.rol = {estado: null};
    $scope.estado = {
        select: {label: "Todos", value: null}, 
        onSelect: function(item, model){}
    };
 
    $scope.estados = ConfiguracionService.listarEstados("Todos");

    $scope.limpiar = function() {
        $scope.rol = {estado: null, nombre: ""};
        $scope.estado.select = {};
        $scope.estado.select.label = "Todos";
        $scope.estado.select.value = null;

        $scope.gridRol.rowData = [];
        $scope.gridRol.api.onNewRows();
    }

    $scope.buscar = function() {
        $scope.rol.estado = $scope.estado.select.value;
        RolService.listar($scope.rol).$promise.then(function(response){
            $scope.gridRol.rowData = response.listaEntidades;
            $scope.gridRol.api.onNewRows();
        });
    };

    $scope.nuevo = function() {
        abrirRol(null);
    };

    $scope.editar = function(id) {
        abrirRol(id);
    };

    $scope.eliminarVarios = function() {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar los registros seleccionados \u003F", function() {
            var entidades = [];
            for(var i in $scope.gridRol.selectedRows) {
                entidades.push({"id": $scope.gridRol.selectedRows[i].id});
            }
            RolService.eliminarVarios(entidades, $scope.rol).$promise.then(function(response){
                $scope.gridRol.rowData = response.listaEntidades;
                $scope.gridRol.api.onNewRows();
            });
        }, null);
    };

    $scope.eliminar = function(id) {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar el registro seleccionado \u003F", function(){
            RolService.eliminar(id, $scope.rol).$promise.then(function(response){
                $scope.gridRol.rowData = response.listaEntidades;
                $scope.gridRol.api.onNewRows();
            });
        }, null);
    };
    
    var abrirRol = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogRol.html',
            controller: 'DialogRolController',
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
        {headerName: "", checkboxSelection: true, width: 30, props: {name: "gridRol", selectAll: false}},
        {headerName: "C\u00F3digo", field: "id", width: 100},
        {headerName: "Rol", field: "nombre", width: 200},
        {headerName: "Estado", field: "estado", width: 90, cellRenderer: GridHelper.estadoCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.editarCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.eliminarCellRender}
    ];

    $scope.gridRol = {
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

bonitaApp.controller('DialogRolController', ['$scope', '$uibModalInstance', '$uibModal', 'DialogHelper', 'RolService', 'ConfiguracionService', 'id', 'buscar',
function($scope, $uibModalInstance, $uibModal, DialogHelper, RolService, ConfiguracionService, id, buscar){

    $scope.buscar = buscar;
    $scope.estado = {
        select: {label: "Activo", value: "A"},
        onSelect: function(item, model){},
        disabled: false
    };
    $scope.estados =  ConfiguracionService.listarEstados(null);

    if(id != undefined || id != null) {
        RolService.obtener(id).$promise.then(function(response){
            $scope.rol = response.entidad;
            $scope.estado.select = {};
            $scope.estado.select.value = $scope.rol.estado;
            $scope.estado.select.label = $scope.rol.estado == 'A' ? 'Activo' : 'Inactivo';
        });
    } else {
        $scope.rol = {"estado": "A"};
        $scope.estado.disabled = true;
    }
    
    $scope.guardar = function () {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
            $scope.rol.estado = $scope.estado.select.value;
            RolService.guardar($scope.rol).$promise.then(function(response){
                $scope.buscar();
                $uibModalInstance.close();
            });
        }, null);
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
