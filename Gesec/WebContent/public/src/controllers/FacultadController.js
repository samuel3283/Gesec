bonitaApp.controller('FacultadController', ['$scope', '$routeParams', '$uibModal', '$timeout', 'ConfiguracionService','FacultadService',
function FacultadController($scope, $routeParams, $uibModal, $timeout, ConfiguracionService, FacultadService) {
    $scope.facultad = {estado: "Todos"};
    $scope.estado = {
        select: {value: "Todos"}, 
        onSelect: function(item, model){}
    };

    $scope.estados = ConfiguracionService.listarEstados("Todos");

    $scope.limpiar = function() {
        $scope.facultad = {estado: "Todos", nombre: "", tipo: "Todos"};
        $scope.estado.select = {};
        $scope.estado.select.value = "Todos";

        $scope.grigFacultad.rowData = [];
        $scope.grigFacultad.api.onNewRows();
    }

    $scope.buscar = function() {
        $scope.grigFacultad.rowData = FacultadService.listar($scope.facultad);
        $scope.grigFacultad.api.onNewRows();
    };

    var abrirFacultad = function(facultad) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogFacultad.html',
            controller: 'DialogFacultadController',
            size: 360,
            windowClass: 'child',
            resolve: {
                facultad: function () {
                    return facultad;
                },
                buscar: function() {
                    return $scope.buscar;
                }
            }
        });
    };

    $scope.nuevo = function() {
        abrirFacultad({estado: "Seleccione", nombre: "", tipo: "Seleccione"});      
    };

    $scope.editar = function(id) {
        abrirFacultad($scope.grigFacultad.selectedRows[0]);
    };

    $scope.eliminar = function() {
        FacultadService.eliminar($scope.grigFacultad.selectedRows[0].id);
        $scope.buscar();
    };

    var columnDefs = [
        {headerName: "Nombre", field: "nombre", width: 150},
        {headerName: "Descripcion", field: "descripcion", width: 200},
		{headerName: "Limite Operacion", field: "limiteOperacion", width: 130},
		{headerName: "Restringido", field: "restringido", width: 100},
		
        {headerName: "Estado", field: "estado", width: 80},
        
        {headerName: "", field: "id", width: 40, cellRenderer: function(params) {
            var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(' + params.value + ')"></span>'; // {{data.'+params.colDef.field+'}}
            var domElement = document.createElement("a");
            domElement.href = "javascript: void(0);";
            domElement.innerHTML = html;

            params.$scope.editar = function(id){
                $timeout(function(){
                    $scope.editar(id);
                }, 0);
            };

            return domElement;
        }}
    ];

    $scope.grigFacultad = {
        angularCompileRows: true,
        columnDefs: columnDefs,
        rowData: [],
        rowSelection: 'single',
        enableColResize: true,
        enableSorting: false
    };
}]);


bonitaApp.controller('DialogFacultadController', ['$scope', '$uibModalInstance', '$uibModal', 'facultad', 'FacultadService', 'ConfiguracionService', 'PerfiladoService','buscar',
function($scope, $uibModalInstance, $uibModal, facultad, FacultadService, ConfiguracionService, PerfiladoService, buscar){

    $scope.facultad = facultad;
    $scope.buscar = buscar;

    $scope.estado = {
        select: {value: ""}, 
        onSelect: function(item, model){}
    };
    $scope.estado.select.value = $scope.facultad.estado;
    $scope.estados =  ConfiguracionService.listarEstados("Seleccione");
	
	$scope.limiteOperacion = {
        select: {value: "Seleccione"}, 
        onSelect: function(item, model){}
    };
    $scope.limiteOperacion.select.value = $scope.facultad.limiteOperacion;
    $scope.limiteOperaciones =  ConfiguracionService.listarAfirmacionNegacion("seleccione");
	
	$scope.moneda = {
        select: {value: "Seleccione"}, 
        onSelect: function(item, model){}
    };
    $scope.moneda.select.value = $scope.facultad.moneda;
   $scope.monedas =  PerfiladoService.listaMonedas;
	
	$scope.restringido = {
        select: {value: "Seleccione"}, 
        onSelect: function(item, model){}
    };
    $scope.restringido.select.value = $scope.facultad.restringido;
    $scope.restringidos =  ConfiguracionService.listarAfirmacionNegacion("seleccione");
	
    $scope.guardar = function () {
        $scope.facultad.estado = $scope.estado.select.value;
		$scope.facultad.moneda = $scope.moneda.select.value;
		$scope.facultad.limiteOperacion = $scope.limiteOperacion.select.value;
		$scope.facultad.restringido = $scope.restringido.select.value;
        FacultadService.guardar($scope.facultad);
        $scope.buscar();
        $uibModalInstance.close();
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
