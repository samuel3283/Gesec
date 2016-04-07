//bonitaApp.controller('RolDistribuidoController', ['$scope', '$routeParams', '$uibModal', '$timeout', 'ConfiguracionService','RolService','AplicacionService',
//function RolDistribuidoController($scope, $routeParams, $uibModal, $timeout, ConfiguracionService, RolService,AplicacionService) {
//    $scope.rol = {estado: "Todos"};
//    $scope.estado = {
//        select: {value: "Todos"}, 
//        onSelect: function(item, model){}
//    }; 
//    $scope.estados = ConfiguracionService.listarEstados("Todos");
//	
//	$scope.aplicacion = {
//		select: {nombre: "Todos"}, 
//        onSelect: function(item, model){}
//	};
//	
//	$scope.aplicacion.select = $scope.rol.aplicacion;
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
//
//    $scope.limpiar = function() {
//        $scope.rol = {estado: "Todos", nombre: "", tipo: "Todos"};
//        $scope.estado.select = {};
//        $scope.estado.select.value = "Todos";
//
//		
//		$scope.aplicacion.select = {};
//        $scope.aplicacion.select.nombre = "Todos";
//		
//        $scope.grigRol.rowData = [];
//        $scope.grigRol.api.onNewRows();
//    }
//
//    $scope.buscar = function() {
//        $scope.grigRol.rowData = RolService.listar($scope.rol);
//        $scope.grigRol.api.onNewRows();
//    };
//
//    var abrirRol = function(rol) {
//        var modalInstance = $uibModal.open({
//            templateUrl: 'dialogRol.html',
//            controller: 'DialogRolDistribuidoController',
//            size: 360,
//            windowClass: 'child',
//            resolve: {
//                rol: function () {
//                    return rol;
//                },
//                buscar: function() {
//                    return $scope.buscar;
//                }
//            }
//        });
//    };
//
//    $scope.nuevo = function() {
//        abrirRol({estado: "Seleccione", nombre: "", aplicacion: "Seleccione"});      
//    };
//
//    $scope.editar = function(id) {
//        abrirRol($scope.grigRol.selectedRows[0]);
//    };
//
//    $scope.eliminar = function() {
//        RolService.eliminar($scope.grigRol.selectedRows[0].id);
//        $scope.buscar();
//    };
//
//    var columnDefs = [
//        {headerName: "Nombre", field: "nombre", width: 150},
//        {headerName: "Descripcion", field: "descripcion", width: 300},
//		{headerName: "Aplicacion", field: "aplicacion", width: 200},
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
//    $scope.grigRol = {
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
//bonitaApp.controller('DialogRolDistribuidoController', ['$scope', '$uibModalInstance', '$uibModal', 'rol', 'RolService', 'ConfiguracionService', 'AplicacionService', 'buscar',
//function($scope, $uibModalInstance, $uibModal, rol, RolService, ConfiguracionService, AplicacionService, buscar){
//
//    $scope.rol = rol;
//    $scope.buscar = buscar;
//
//    $scope.estado = {
//        select: {value: ""}, 
//        onSelect: function(item, model){}
//    };
//    $scope.estado.select.value = $scope.rol.estado;
//	$scope.estados =  ConfiguracionService.listarEstados("Seleccione");
//	
//	$scope.aplicacion = {
//		select: {
//			nombre: ""
//		}, 
//        onSelect: function(item, model){}
//	};
//	$scope.aplicacion.select.nombre = $scope.rol.aplicacion;
//	$scope.aplicaciones = AplicacionService.listar(null);
//	
//    
//	
//
//    $scope.guardar = function () {
//        $scope.rol.estado = $scope.estado.select.value;
//		$scope.rol.aplicacion = $scope.aplicacion.select.nombre;
//        RolService.guardar($scope.rol);
//        $scope.buscar();
//        $uibModalInstance.close();
//    };
//
//    $scope.cancelar = function () {
//        $uibModalInstance.dismiss('cancel');
//    };
//}]);
