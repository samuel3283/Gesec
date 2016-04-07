//bonitaApp.controller('AreaController', ['$scope', '$routeParams', '$uibModal', '$timeout', 'ConfiguracionService','AreaService',
//function AreaController($scope, $routeParams, $uibModal, $timeout, ConfiguracionService, AreaService) {
//    $scope.areas = AreaService.listarAreas();
//
//    var columnDefs = [
//        {headerName: "Descripci\u00F3n", field: "name", width: 450,
//            cellRenderer: {
//                renderer: 'group',
//                innerRenderer: innerCellRenderer
//            }},
//        {headerName: "Tipo", field: "type", width: 200},
//        {headerName: "Estado", field: "estado", width: 90},
//		{headerName: "", field: "id", width: 30, cellRenderer: function(params) {
//            var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(' + params.value + ')"></span>'; // {{data.'+params.colDef.field+'}}
//            var domElement = document.createElement("a");
//            domElement.href = "javascript: void(0);";
//            domElement.innerHTML = html;
///*
//            params.$scope.editar = function(id){
//                $timeout(function(){
//                    $scope.editar(id);
//                }, 0);
//            };
//*/
//            return domElement;
//        }}
//    ];
//	
//	$scope.editar = function(id) {
//		abrirArea($scope.gridArea.selectedRows[0]);
//    };
//	
//	$scope.nuevo = function() {
//        abrirArea({estado: "Seleccione", descripcion: ""});      
//    };
//
//	var abrirArea = function(area) {
//        var modalInstance = $uibModal.open({
//            templateUrl: 'dialogArea.html',
//            controller: 'DialogAreaController',
//            windowClass: 'child',
//            size: 360,
//            resolve: {
//                area: function () {
//                    return area;
//                },
//                buscar: function() {
//                    return $scope.buscar;
//                }
//            }
//        });
//    };
//	
//	
//    $scope.gridArea = {
//        columnDefs: columnDefs,
//        rowData: $scope.areas,
//        rowSelection: 'single',
//        rowsAlreadyGrouped: true,
//        enableColResize: true,
//        enableSorting: false,
//        icons: {
//            groupExpanded: '<i style="padding-right: 10px;" class="glyphicon glyphicon-minus"/>', // fa fa-minus-square-o
//            groupContracted: '<i style="padding-right: 10px;" class="glyphicon glyphicon-plus"/>' // fa fa-plus-square-o
//        },
//        rowClicked: rowClicked,
//        rowSelected: function(row){
//            // console.log(row);
//        }
//    };
//	
//	function rowClicked(params) {
//        var node = params.node;
//        var level = params.node.level;
//        var organizacion = [];
//
//        while (node.parent) {
//            node = node.parent;
//        }
//
//        while(node.children.length > 0 && node.level < level) {
//            node = node.children[0];
//            organizacion.push({"tipo": node.data.type, "descripcion": node.data.name});
//        };
//
//        organizacion[organizacion.length - 1] = {"tipo": params.node.data.type, "descripcion": params.node.data.name};
//        $scope.areasSeleccionada = organizacion;
//    }
//
//    function innerCellRenderer(params) {
//        return "<span style='padding-left: " + (params.node.group ? "0px" : "7px") + ";'>" + params.data.name + "</span>";
//    }
//}]);
//
//
//bonitaApp.controller('DialogAreaController', ['$scope', '$uibModalInstance', '$uibModal', 'area', 'AreaService', 'ConfiguracionService', 'buscar',
//function($scope, $uibModalInstance, $uibModal, area, AreaService, ConfiguracionService, buscar){
//
//    $scope.area = area;
//    $scope.buscar = buscar;
//
//    $scope.estado = {
//        select: {value: ""}, 
//        onSelect: function(item, model){}
//    };
//    $scope.estado.select.value = $scope.area.estado;
//
//    $scope.estados =  ConfiguracionService.listarEstados("Seleccione");
//
//    $scope.guardar = function () {
//        $scope.area.estado = $scope.estado.select.value;
//        AreaService.guardar($scope.area);
//        $scope.buscar();
//        $uibModalInstance.close();
//    };
//
//    $scope.cancelar = function () {
//        $uibModalInstance.dismiss('cancel');
//    };
//}]);
