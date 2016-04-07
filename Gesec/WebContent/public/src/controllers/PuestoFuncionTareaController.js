'use strict';
bonitaApp.controller('DialogoPuestoFuncionTareaController', ['$scope', '$timeout', '$uibModalInstance', '$uibModal', 'GridHelper', 'FuncionService', 'TareaService', 'PuestoService', 'funcion', 'puesto', 'modo', '$sce',
function($scope, $timeout, $uibModalInstance, $uibModal, GridHelper, FuncionService, TareaService, PuestoService, funcion, puesto, modo, $sce){
    
    $scope.tituloVentana = "Perfilando: Selecci\u00F3n de funciones similares";
    $scope.funcion = funcion; 
    $scope.puesto = puesto;
    $scope.modo = modo;
    $scope.descripcionFuncion = "";
    $scope.funcionSeleccionada = {};
    $scope.tareas = [];
    $scope.tareasAplicar = [];
    
    var actualizarFlujoGrafico = function(_id, _remove, _add) {
        var elements = $(_id);
        elements.each(function( i, o ) {
            var e = $(o);
            if(e.hasClass(_remove)) {
                e.removeClass(_remove)
            }
            if(!e.hasClass(_add)) {
                e.addClass(_add)
            }
        });
    };

    $timeout(function(){
        var enAlta         = $scope.puesto.etapa.id == 0;
        var enPerfilado    = $scope.puesto.etapa.id == 2;
        var enLimites      = $scope.puesto.etapa.id == 3;
        var enAprobacion   = $scope.puesto.etapa.id == 4;
        var enHabilitacion = $scope.puesto.etapa.id == 5;
        
        
        if(enAlta) {
            actualizarFlujoGrafico(".p1", "pasado", "activo");
        }
        if(enPerfilado) {
            actualizarFlujoGrafico(".p1", "activo", "pasado");
            actualizarFlujoGrafico(".p2", "activo", "pasado");            
            actualizarFlujoGrafico(".p3", "pasado", "activo");
        }
        if(enLimites || enAprobacion || enHabilitacion) {
            actualizarFlujoGrafico(".p1", "activo", "pasado");
            actualizarFlujoGrafico(".p2", "activo", "pasado");
            actualizarFlujoGrafico(".p3", "activo", "pasado");
            actualizarFlujoGrafico(".p4", "activo", "pasado");
            actualizarFlujoGrafico(".p5", "activo", "pasado");
        }
        if(enLimites) {
            actualizarFlujoGrafico(".p6", "pasado", "activo");
        }
        if(enAprobacion) {
            actualizarFlujoGrafico(".p6", "activo", "pasado");
            actualizarFlujoGrafico(".p7", "pasado", "activo");
        }
        if(enHabilitacion) {
            actualizarFlujoGrafico(".p6", "activo", "pasado");
            actualizarFlujoGrafico(".p7", "activo", "pasado");
            actualizarFlujoGrafico(".p8", "pasado", "activo");
        }
    }, 0);
    
    var columnDefsFuncion = [
        {headerName: "", checkboxSelection: true, width: 30, props:{name: "gridFuncion"} },
        {headerName: "Nombre Corto", field: "nombre", width: 250},
        {headerName: "Funci\u00F3n", field: "descripcion", width: 390},
        {headerName: "Estructura", field: "descripcionArea", width: 250}
    ];

    var columnDefsTarea = [
        {headerName: "", checkboxSelection: true, width: 30, props:{name: "gridTarea"}},
        {headerName: "", field: "", width: 25, cellRenderer: function(params) {
            var html = '<span href="#" class="glyphicon glyphicon-hand-right glyphicon-red" tooltip-placement="right" tooltip-class="info" uib-tooltip="Requiere Autorizaci&oacute;n, Transacci&oacute;n: HA11"></span>'; // {{data.'+params.colDef.field+'}}
            var domElement = document.createElement("div");
            //domElement.innerHTML = params.data.operacion.restringido == "1" ? html : "";
            return domElement;
        }},
        {headerName: "", field: "", width: 25, cellRenderer: function(params) {
            var html = '<span href="#" class="glyphicon glyphicon-usd glyphicon-red" tooltip-placement="right" tooltip-class="info" uib-tooltip="Requiere Comit&eacute; de L&iacute;mites, Facultad: HA10486001"></span>'; // {{data.'+params.colDef.field+'}}
            var domElement = document.createElement("div");
            //domElement.innerHTML = params.data.facultad.limiteOperacion == "1" ? html : "";
            return domElement;
        }},
        {headerName: "Nombre Corto", field: "funcion.nombre", width: 250, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Funci\u00F3n", field: "funcion.descripcion", width: 390, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Tarea", field: "tarea.nombre", width: 250, cellRenderer: GridHelper.campoCompuestoCellRender}
    ];
    
    var columnDefsFuncionTarea = [
        {headerName: "Nombre Corto", field: "funcion.nombre", width: 250, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Funci\u00F3n", field: "funcion.descripcion", width: 390, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Tarea", field: "tarea.nombre", width: 250, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Ver", field: "idTarea", width: 40, cellRenderer: function(params) {
            var html = '<span class="glyphicon glyphicon-search" ng-click="abrirAplicacion(data.tarea)"></span>';
            var domElement = document.createElement("a");
            domElement.href = "javascript: void(0);";
            domElement.innerHTML = html;
            return domElement;
        }}
    ];

    if($scope.modo == 1) {
        $scope.pag1 = false;
        $scope.pag2 = true;
        $scope.pag3 = true;
    } else {
        $scope.tituloVentana = "Perfilando: Selecci\u00F3n de tareas";
        $scope.pag1 = true;
        $scope.pag2 = false;
        $scope.pag3 = true;
    }

    
    $scope.gridFuncion = GridHelper.crearGrid({
        columnDefs: columnDefsFuncion,
        rowHeight: 70
    });

    $scope.gridTarea = GridHelper.crearGrid({
        columnDefs: columnDefsTarea,
        rowHeight: 70
    });

    $scope.gridFuncionTarea = GridHelper.crearGrid({
        columnDefs: columnDefsFuncionTarea,
        rowHeight: 70
    });

    $scope.buscar = function () {
        var entidad = {"nombre": $scope.descripcionFuncion};
        if(!$scope.pag1) {
//            GridHelper.configurarDataSourceListarPaginado("gridFuncion", $scope.gridFuncion, FuncionService, entidad);
        	FuncionService.contar(entidad).$promise.then(function(response){
	        	var dataSource = {
	                  rowCount: response.props.totalFilas,
	                  pageSize: GridHelper.pageSize,
	                  getRows: function (params) {
	                      var pagNew = params.startRow / GridHelper.pageSize;
	                      FuncionService.listarPaginado(entidad,pagNew).$promise.then(function(response){
	                          params.successCallback(response.listaEntidades, response.listaEntidades.length == GridHelper.pageSize ? -1 : response.listaEntidades.length);
	                      });
	                  }
	              };
	              $scope.gridFuncion.api.setDatasource(dataSource);
        	});
        }
        else if(!$scope.pag2) {
//            TareaService.buscarTareaConSinFunciones(entidad).$promise.then(function(response){
//                $scope.gridTarea.rowData = response.listaEntidades;
//                $scope.gridTarea.api.onNewRows();
//            });
            
            TareaService.contarTareaConSinFunciones(entidad).$promise.then(function(response){
                var dataSource = {
                    rowCount: response.props.totalFilas,
                    pageSize: GridHelper.pageSize,
                    getRows: function (params) {
                        var pagNew = params.startRow / GridHelper.pageSize;
                        TareaService.buscarTareaConSinFunciones(entidad,pagNew).$promise.then(function(response){
                            params.successCallback(response.listaEntidades, response.props.totalFilas);
                        });
                    }
                };
                $scope.gridTarea.api.setDatasource(dataSource);
            });
        }
    };
    
    $scope.atras = function () {
        if(!$scope.pag2) {
            $scope.tituloVentana = "Perfilando: Selecci\u00F3n de funciones similares";
            $scope.pag1 = false;
            $scope.pag2 = true;
            $scope.pag3 = true;
            actualizarFlujoGrafico(".p3", "pasado", "activo");
            actualizarFlujoGrafico(".p4", "activo", "");
        } else if(!$scope.pag3) {
            $scope.tituloVentana = "Perfilando: Selecci\u00F3n de tareas";
            $scope.pag1 = true;
            $scope.pag2 = false;
            $scope.pag3 = true;
            actualizarFlujoGrafico(".p4", "pasado", "activo");
            actualizarFlujoGrafico(".p5", "activo", "");
        }
    };
    
    $scope.siguiente = function () {
        var funcionesSeleccionadas = [];
        if(!$scope.pag1) {
        	actualizarFlujoGrafico(".p3", "activo", "pasado");
            actualizarFlujoGrafico(".p4", "pasado", "activo");
            $scope.tituloVentana = "Perfilando: Selecci\u00F3n de tareas";
            $scope.pag1 = true;
            $scope.pag2 = false;
            $scope.pag3 = true;
            
            for(var i in $scope.gridFuncion.selectedRows) {
                funcionesSeleccionadas.push($scope.gridFuncion.selectedRows[i].id);
            }   
            
            PuestoService.listarTareasPorFunciones(funcionesSeleccionadas).$promise.then(function(response){
                $scope.gridTarea.rowData = response.listaEntidades;
                $scope.gridTarea.api.onNewRows();
            });
            
            $scope.descripcionFuncion = "";
        } else if(!$scope.pag2) {
        	actualizarFlujoGrafico(".p4", "activo", "pasado");
            actualizarFlujoGrafico(".p5", "pasado", "activo");
            $scope.tituloVentana = "Perfilando: Tareas asignadas";
            $scope.pag1 = true;
            $scope.pag2 = true;
            $scope.pag3 = false;
            
            $scope.tareasAplicar = [];
            for(var index in $scope.gridTarea.selectedRows) {
                $scope.tareasAplicar.push(angular.copy($scope.gridTarea.selectedRows[index]));
            }
            
            $scope.gridFuncionTarea.rowData = $scope.tareasAplicar;
            $scope.gridFuncionTarea.api.onNewRows();
        }
    };

    $scope.aceptar = function () {
        for(var i in $scope.gridFuncionTarea.rowData) {
            var funcionTarea = { "tarea": {"id": $scope.gridFuncionTarea.rowData[i].tarea.id}};
            $scope.funcion.listaFuncionTarea.push(funcionTarea);
        }
        actualizarFlujoGrafico(".p3", "activo", "");
        actualizarFlujoGrafico(".p4", "activo", "");
        actualizarFlujoGrafico(".p5", "activo", "");
        actualizarFlujoGrafico(".p3", "pasado", "");
        actualizarFlujoGrafico(".p4", "pasado", "");
        actualizarFlujoGrafico(".p5", "pasado", "");
        $uibModalInstance.close();
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };

    if($scope.funcion.listaFuncionTarea.length > 0) {
        $scope.tituloVentana = "Perfilando: Accesos asignados";
        $scope.pag1 = true;
        $scope.pag2 = true;
        $scope.pag3 = false;
        
        $scope.tareasAplicar = [];
        for(var i in $scope.funcion.listaFuncionTarea) {
            $scope.tareasAplicar.push({"tarea": $scope.funcion.listaFuncionTarea[i].tarea, "funcion": {} });
        }
        
        $timeout(function(){
            $scope.gridFuncionTarea.rowData = $scope.tareasAplicar;
            $scope.gridFuncionTarea.api.onNewRows();
        }, 0);
    }
    
    $scope.abrirAplicacion = function (tarea) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogoAplicacionesPorTarea.html',
            controller: 'DialogAplicacionesPorTareaController',
            windowClass: 'child',
            size: 800,
            resolve: {
                tarea: function () {
                    return tarea;
                }
            }
        });
    };
}]);

bonitaApp.controller('DialogAplicacionesPorTareaController', ['$scope', '$uibModalInstance', '$uibModal', 'GridHelper', 'TareaService', 'tarea',
   function($scope, $uibModalInstance, $uibModal, GridHelper, TareaService, tarea){
       $scope.tarea = tarea;

       var columnDefsAplicaciones = [
             {headerName: "", field: "", width: 25, cellRenderer: function(params) {
                 var html = '<span href="#" class="glyphicon glyphicon-hand-right glyphicon-red" tooltip-placement="right" tooltip-class="info" uib-tooltip="Requiere Autorizaci&oacute;n"></span>'; // {{data.'+params.colDef.field+'}}
                 var domElement = document.createElement("div");
                 domElement.innerHTML = params.data.operacion.restringido == "1" ? html : "";
                 return domElement;
             }},
             {headerName: "", field: "", width: 25, cellRenderer: function(params) {
                 var html = '<span href="#" class="glyphicon glyphicon-usd glyphicon-red" tooltip-placement="right" tooltip-class="info" uib-tooltip="Requiere Comit&eacute; de L&iacute;mites"></span>'; // {{data.'+params.colDef.field+'}}
                 var domElement = document.createElement("div");
                 domElement.innerHTML = params.data.facultad != undefined &&params.data.facultad.limiteOperacion == "1" ? html : "";
                 return domElement;
             }},
           {headerName: "Tipo", field: "operacion.aplicacion.tipo.nombre", width: 100,cellRenderer: GridHelper.campoCompuestoCellRender},
           {headerName: "Aplicaci\u00F3n", field: "operacion.aplicacion.nombre", width: 195,cellRenderer: GridHelper.campoCompuestoCellRender},
           {headerName: "Transacci\u00F3n / Rol", field: "operacion.nombre", width: 195, cellRenderer: GridHelper.campoCompuestoCellRender},
           {headerName: "Facultad", field: "facultad.nombre", width: 195, cellRenderer: GridHelper.campoCompuestoCellRender}
       ];

    $scope.gridAplicaciones = GridHelper.crearGrid({
        columnDefs: columnDefsAplicaciones
    });

    $scope.cancelar = function () {
       $uibModalInstance.dismiss('cancel');
    };
        
    TareaService.buscarOperacionesPorTarea($scope.tarea.id).$promise.then(function(response){
        $scope.gridAplicaciones.rowData = response.listaEntidades;
        $scope.gridAplicaciones.api.onNewRows();
    }); 
}]);