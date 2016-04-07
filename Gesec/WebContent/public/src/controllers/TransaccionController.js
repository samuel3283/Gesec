//bonitaApp.controller('TransaccionController', ['$scope', '$routeParams', '$uibModal', '$timeout', 'ConfiguracionService','TransaccionService','AplicacionService',
//function TransaccionController($scope, $routeParams, $uibModal, $timeout, ConfiguracionService, TransaccionService,AplicacionService) {
//    $scope.transaccion = {estado: "Todos"};
//    $scope.estado = {
//        select: {value: "Todos"}, 
//        onSelect: function(item, model){}
//    }; 
//    $scope.estados = ConfiguracionService.listarEstados("Todos");
//	
//	$scope.aplicacion = {
//		select: {
//			nombre: ""
//		}
//	};
//	$scope.aplicacion.select = $scope.transaccion.aplicacion;
//	$scope.aplicaciones = [];
//	$scope.aplicaciones.push({nombre:"Todos"});
//	var rows = AplicacionService.listar(null);
//	for(index in rows) {
//		o = angular.copy(rows[index]);
//		$scope.aplicaciones.push(o);
//	}
//	
//	$scope.aplicacion.select={nombre:"Todos"};
//
//    $scope.limpiar = function() {
//        $scope.transaccion = {estado: "Todos", nombre: "", aplicacion: ""};
//        $scope.estado.select = {};
//        $scope.estado.select.value = "Todos";
//		
//		$scope.aplicacion.select= {};
//		$scope.aplicacion.select.nombre="Seleccione";
//
//        $scope.grigTransaccion.rowData = [];
//        $scope.grigTransaccion.api.onNewRows();
//    }
//
//    $scope.buscar = function() {
//        $scope.grigTransaccion.rowData = TransaccionService.listar($scope.transaccion);
//        $scope.grigTransaccion.api.onNewRows();
//    };
//
//    var abrirTransaccion = function(transaccion) {
//        var modalInstance = $uibModal.open({
//            templateUrl: 'dialogTransaccion.html',
//            controller: 'DialogTransaccionController',
//            size: 360,
//            windowClass: 'child',
//            resolve: {
//                transaccion: function () {
//                    return transaccion;
//                },
//                buscar: function() {
//                    return $scope.buscar;
//                }
//            }
//        });
//    };
//
//    $scope.nuevo = function() {
//        abrirTransaccion({estado: "Seleccione", nombre: "", tipo: "Seleccione"});      
//    };
//
//    $scope.editar = function(id) {
//        abrirTransaccion($scope.grigTransaccion.selectedRows[0]);
//    };
//
//    $scope.eliminar = function() {
//        TransaccionService.eliminar($scope.grigTransaccion.selectedRows[0].id);
//        $scope.buscar();
//    };
//
//    var columnDefs = [
//        {headerName: "Nombre", field: "nombre", width: 150},
//        {headerName: "Descripcion", field: "descripcion", width: 200},
//		{headerName: "Aplicacion", field: "aplicacion", width: 200},
//		{headerName: "Restringido", field: "restringido", width: 100},
//        {headerName: "Estado", field: "estado", width: 90},
//        
//        {headerName: "", field: "id", width: 40, cellRenderer: function(params) {
//            var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(' + params.value + ')"></span>'; // {{data.'+params.colDef.field+'}}
//            var domElement = document.createElement("a");
//            domElement.href = "javascript: void(0);";
//            domElement.innerHTML = html;
//
//            params.$scope.editar = function(id){
//                $timeout(function(){
//                    $scope.editar(id);
//                }, 0);
//            };
//
//            return domElement;
//        }}
//    ];
//
//    $scope.grigTransaccion = {
//        angularCompileRows: true,
//        columnDefs: columnDefs,
//        rowData: [],
//        rowSelection: 'single',
//        enableColResize: true,
//        enableSorting: false
//    };
//}]);
//
//
//bonitaApp.controller('DialogTransaccionController', ['$scope', '$uibModalInstance', '$uibModal', 'transaccion', 'TransaccionService', 'ConfiguracionService', 'AplicacionService', 'buscar',
//function($scope, $uibModalInstance, $uibModal, transaccion, TransaccionService, ConfiguracionService, AplicacionService, buscar){
//
//    $scope.transaccion = transaccion;
//    $scope.buscar = buscar;
//
//    $scope.estado = {
//        select: {value: ""}, 
//        onSelect: function(item, model){}
//    };
//    $scope.estado.select.value = $scope.transaccion.estado;
//	$scope.estados =  ConfiguracionService.listarEstados("Seleccione");
//	
//	$scope.aplicacion = {
//		select: {
//			nombre: ""
//		}, 
//        onSelect: function(item, model){}
//	};
//	$scope.aplicacion.select.nombre = $scope.transaccion.aplicacion;
//	$scope.aplicaciones = AplicacionService.listar(null);
//	
//    $scope.restringido = {
//        select: {value: "Seleccione"}, 
//        onSelect: function(item, model){}
//    };
//    $scope.restringido.select.value = $scope.transaccion.restringido;
//    $scope.restringidos =  ConfiguracionService.listarAfirmacionNegacion("seleccione");
//	
//
//    $scope.guardar = function () {
//        $scope.transaccion.estado = $scope.estado.select.value;
//		$scope.transaccion.aplicacion = $scope.aplicacion.select.nombre;
//		$scope.transaccion.restringido = $scope.restringido.select.value;
//        TransaccionService.guardar($scope.transaccion);
//        $scope.buscar();
//        $uibModalInstance.close();
//    };
//
//    $scope.cancelar = function () {
//        $uibModalInstance.dismiss('cancel');
//    };
//}]);
