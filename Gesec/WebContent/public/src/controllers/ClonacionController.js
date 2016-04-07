//'use strict';
//
//bonitaApp.controller('ClonacionController', ['$scope', '$routeParams', '$location', '$uibModal', 'PerfiladoService', 'AreaService', 'CargoService','ConfiguracionService',
//function ClonacionController($scope, $routeParams, $location, $uibModal, PerfiladoService, AreaService, CargoService, ConfiguracionService) {
//	$scope.nuevohide = true;
//	$scope.eliminarhide = true;
//	
//	$scope.cargo = {nombre: ""};
//	/*------------------------------*/
//	var columnDefs = [
//        {headerName: ""      , checkboxSelection: true, width: 30},
//        {headerName: "Codigo", field: "cargo.codigo"               , width: 100, cellRenderer: function(params) {return renderComposite(params);}},
//        {headerName: "Nombre", field: "cargo.descripcion"          , width: 250, cellRenderer: function(params) {return renderComposite(params);}},
//        {headerName: "Area"  , field: "organizacion[0].descripcion", width: 250, cellRenderer: function(params) {return renderComposite(params);}},
//        {headerName: "Estado", field: "estado"                     , width: 150, cellRenderer: function(params) {return renderComposite(params);}}
//    ];
//
//	var renderComposite = function(params) {
//		var html = '<span>{{data.'+params.colDef.field+'}}</span>';
//		var domElement = document.createElement("span");
//		domElement.innerHTML = html;
//		return domElement;
//	};
//	
//    $scope.grigCargo = {
//        angularCompileRows: true,
//        columnDefs: columnDefs,
//        rowData: [],
//        enableColResize: true,
//        enableSorting: false,
//        rowSelection: 'multiple',
//        suppressRowClickSelection: true
//    };
//	
//	$scope.buscar = function() {
//        $scope.grigCargo.rowData = CargoService.listar($scope.cargo);
//        $scope.grigCargo.api.onNewRows();
//    };
//
//    $scope.clonar = function() {
//        var puesto = $scope.grigCargo.selectedRows[0];
//        console.log(puesto);
//        $location.path("estructurasEspecialista/perfilado/clonar/" + puesto.id);
//        $location.replace();
//    };
//
//
//    $scope.nuevo = function() {
//		$scope.perfil = {};
//		$location.path("/bandeja/perfilado/undefined");
//    };
//
//	$scope.area = {
//        select: {value: "Todos"}, 
//        onSelect: function(item, model){}
//    };
//	
//	$scope.estado = {
//        select: {value: "Todos"}, 
//        onSelect: function(item, model){}
//    };
//    $scope.estados =  ConfiguracionService.listarEstados("Todos");
//    $scope.comboAreas=AreaService.listarCboAreas();
//	
//	
//	$scope.limpiar = function() {
//        $scope.cargo = {nombre: ""};
//        $scope.estado.select = {};
//        $scope.estado.select.value = "Todos";
//		
//		$scope.area.select = {};
//        $scope.area.select.value = "Todos";
//
//        $scope.grigCargo.rowData = [];
//        $scope.grigCargo.api.onNewRows();
//    }
//	
//	/*---------------------------*/
//}]);
