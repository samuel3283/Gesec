'use strict';
bonitaApp.controller('PuestoController', ['$scope', '$window', '$uibModal', '$timeout', 'ViewHelper', 'GridHelper', 'DialogHelper', 'ConfiguracionService', 'PuestoService', 'AreaService', 'CatalogoTablaService',
function PuestoController($scope, $window, $uibModal, $timeout, ViewHelper, GridHelper, DialogHelper, ConfiguracionService, PuestoService, AreaService, CatalogoTablaService) {
    $scope.puesto = {estado: null};
    $scope.rol = null;
    
    $scope.etapa = {
        select: {nombre: "Todos", value: null}, 
        onSelect: function(item, model){}
    };
    
    $scope.estado = {
        select: {label: "Todos", value: null}, 
        onSelect: function(item, model){}
    };
    
    $scope.area = {
        select: {nombre: "Todos", id: null}, 
        onSelect: function(item, model){}
    };
    
    AreaService.listar({"area": {}}).$promise.then(function(response){
        if(response.listaEntidades != null || response.listaEntidades != undefined) {
            $scope.areas = [{"nombre": "Todos"}].concat(response.listaEntidades);
        }
    });

    var tablaEtapa = {
        "id":null,
        "catalogoTabla": {"id": 1}
    };
    
    CatalogoTablaService.listar(tablaEtapa).$promise.then(function(response){
        $scope.etapas = [{"nombre": "Todos"}]
        for(var i in response.listaEntidades) {
            response.listaEntidades[i].nombre = response.listaEntidades[i].nombre.capitalizeFirstLetter()
            $scope.etapas.push(response.listaEntidades[i]);
        }
    });
    
    $scope.estados = ConfiguracionService.listarEstadosPuesto("Todos");
    
    $scope.nuevo = function(){
    	  $window.location.href = obtenerContexto("puesto/0.html");
    };
    
    $scope.clonar = function(){
    	var puestos = "";
    	for(var i in $scope.gridPuesto.selectedRows) {
    		puestos += "," + $scope.gridPuesto.selectedRows[i].id;
        }
    	puestos = puestos.substring(1, puestos.length)
    	$window.location.href = obtenerContexto("puesto/clonarPuesto.html?ids=" + puestos);
    };
    
    $scope.limpiarCheckBox = function() {
        var eCheckbox = $("#checkbox_gridPuesto");
        if(eCheckbox.is(":checked")) {
        	eCheckbox.click();
        }
    }
    
    $scope.limpiar = function() {
        $scope.puesto = {estado: null};
        $scope.estado.select = {label: "Todos"};
        $scope.area.select = {nombre: "Todos"};
        $scope.etapa.select = {nombre: "Todos"};
        $scope.gridPuesto.rowData = [];
        $scope.gridPuesto.api.onNewRows();
        $scope.limpiarCheckBox();
    }
    
    
    $scope.buscar = function(dato) {
    	$scope.limpiarCheckBox();
        $scope.puesto.estado = $scope.estado.select.value;
        $scope.puesto.etapa = {"id": $scope.etapa.select.id};
        $scope.puesto.unidadOrganizativa = $scope.area.select;
        $scope.puesto.indicador = dato;
        
        PuestoService.contar($scope.puesto).$promise.then(function(response){
            $scope.rowCount = response.props.totalFilas;
            var dataSource = {
                rowCount: $scope.rowCount,
                pageSize: GridHelper.pageSize,
                getRows: function (params) {
                    var pagNew = params.startRow / GridHelper.pageSize;
                    PuestoService.listarPaginado($scope.puesto, pagNew).$promise.then(function(response){
                        $scope.rol = response.props.rol.nombre;
                        params.successCallback(response.listaEntidades, $scope.rowCount);
                    });
                }
            };
            $scope.gridPuesto.api.setDatasource(dataSource);
        });
    }
    
    var columnDefs = [
        {headerName: "", checkboxSelection: true, width: 30, props:{name: "gridPuesto"}},
        {headerName: "C\u00F3digo", field: "codigo", width: 70, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Puesto", field: "titulo", width: 240, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "\u00C1rea", field: "unidadOrganizativa.nombre", width: 240, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Etapa" , field: "etapa.nombre", width: 90 , cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Estado", field: "estado", width: 90 , cellRenderer: GridHelper.estadoCellRender},
        {headerName: "", field: "estadoSemaforo", width: 30, cellRenderer: function(params) {
            var html;
            params
            if(params.value == "A") {
                html = '<span class="glyphicon indicadorAmarrillo"></span>';
            } else if(params.value == "R") {
                html = '<span class="glyphicon indicadorRojo"></span>';
            } else if(params.value == "V") {
                html = '<span class="glyphicon indicadorVerde"></span>';
            }
            var domElement = document.createElement("a");
            domElement.innerHTML = html;
            return domElement;
        }},
        {headerName: "", field: "id", width: 30, cellRenderer: function(params) {
            var html;
            if($scope.rol == "USUARIO DE ESTRUCTURAS" && (params.data.idEtapa == 0 || params.data.idEtapa == 2 || params.data.estado == 'A')) {
                var html = '<span class="glyphicon glyphicon-pencil" tooltip-placement="left" tooltip-class="info" uib-tooltip="Editar"></span>';
            } else {
                var html = '<span class="glyphicon glyphicon-search" tooltip-placement="left" tooltip-class="info" uib-tooltip="Ver"></span>';
            }
            
            var domElement = document.createElement("a");
            domElement.href = obtenerContexto("puesto/" + params.value + ".html");
            domElement.innerHTML = html;
            return domElement;
        }}/*,
        {headerName: "", field: "id", width: 30, cellRenderer: function(params) {
            var html = '<span class="glyphicon glyphicon-search" tooltip-class="info" uib-tooltip="Ver versiones" ng-click="verVersion('+params.value+')"></span>'; // {{data.'+params.colDef.field+'}}
            var domElement = document.createElement("a");
            domElement.href = "javascript: void(0);";
            domElement.innerHTML = html;
            params.$scope.verVersion = function(id){
                $timeout(function(){
                    $scope.verVersion(id);
                }, 0);
            };
            return domElement;
        }}*/
    ];
    
    $scope.gridPuesto = GridHelper.crearGrid({columnDefs: columnDefs});
    
    var cambiarEstado = function(estado){
        var puestos = [];
        var menAct ='';
        var mensaje ='';
        for(var i in $scope.gridPuesto.selectedRows){        	
        	puestos.push($scope.gridPuesto.selectedRows[i]);        	           
        }
    	if(puestos.length==1){
    		menAct = estado=='I'?'Inactivado':'Activado';
    		mensaje='El puesto seleccionado fue '+menAct+' correctamente';
    	}else if(puestos.length>1){
    		menAct = estado=='I'?'Inactivados':'Activados';
    		mensaje='Los puestos seleccionados fueron '+menAct+' correctamente';
    	}
        
    	if(puestos.length>0){
	        PuestoService.cambiarEstado(puestos, estado).$promise.then(function(response){        	
		    	if(response.tipoResultado == 'EXITO'){	    		
					$scope.buscar();
					DialogHelper.info(mensaje,null,null);
		    	}
	        });
    	}else{
    		DialogHelper.info('Debe seleccionar un puesto',null,null);
    	}
    };
    
    $scope.desactivar = function(){
        cambiarEstado("I");
    }
    
    $scope.activar = function(){
        cambiarEstado("A");
    }
    
    $scope.buscar(0);

    
}]);