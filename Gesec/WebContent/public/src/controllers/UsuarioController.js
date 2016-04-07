'use strict';
bonitaApp.controller('UsuarioController', ['$scope', '$uibModal', '$timeout', 'ConfiguracionService','UsuarioService', 'GridHelper', 'DialogHelper',
function UsuarioController($scope, $uibModal, $timeout, ConfiguracionService, UsuarioService, GridHelper, DialogHelper) {
	
    $scope.usuario = {estado: null};
    
    $scope.estado = {
            select: {label: "Todos", value: null}, 
            onSelect: function(item, model){}
    };
    
    $scope.aplicacion = {
            select: {label: "Todos", value: null}, 
            onSelect: function(item, model){}
    };

    /*
    	var tablaEtapa = {
            "id":null,
            "catalogoTabla": {"id": 1}
        };
        
        CatalogoTablaService.listarCatalogo(tablaEtapa).$promise.then(function(response){
        	
            alert("valores.............."+response.listaEntidades);
        	
            
        	$scope.aplicaciones = [{"nombre": "Todos"}]
            
        	for(var i in response.listaEntidades) {
                response.listaEntidades[i].nombre = response.listaEntidades[i].nombre.capitalizeFirstLetter()
                $scope.aplicaciones.push(response.listaEntidades[i]);
            }
        });
        */
        
    $scope.estados = ConfiguracionService.listarEstados("Todos");
    /*
    CatalogoTablaService.listarCatalogo({"id": 13}).$promise.then(function(response){
    alert("response:"+response.listaEntidades);
    	if(response.listaEntidades != null || response.listaEntidades != undefined) {
            $scope.aplicaciones = [{"nombre": "Todos"}].concat(response.listaEntidades);
        }
    });
    */
    
    $scope.limpiar = function() {
    	
        $scope.usuario = {estado: null, nombre: ""};
        $scope.estado.select = {};
        $scope.estado.select.label = "Todos";
        $scope.estado.select.value = null;

        $scope.gridTarea.rowData = [];
        $scope.gridTarea.api.onNewRows();
    
    }
    
    $scope.buscar = function() {
    	
    	alert("valor:::"+$scope.usuario.nombre);
        //$scope.usuario.estado = $scope.estado.select.value;
        UsuarioService.listado($scope.usuario).$promise.then(function(response){
        	//alert("==>rpta::::"+response);
        	//alert("==>1:::"+response.mostrarMensaje);
        	//alert("==>2:::"+response.tipoResultado);
            alert("==>>>>>11buscar:::::"+response.listaEntidades);
            $scope.gridTarea.rowData = response.listaEntidades;
            $scope.gridTarea.api.onNewRows();
        });
        
    };
       
    $scope.nuevo = function() {
    	abrirUsuario(null);
    };
    
    var abrirUsuario = function(id) {
    	
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogUsuario.html',
            controller: 'DialogUsuarioController',
            size: 700,
            windowClass: 'child',
            resolve: {
                id: function () {
                    return id;
                },
                buscar: function() {
                    //return $scope.buscar;
                }
            }
        });
       
    };

    
    $scope.editar = function(id) {
    	abrirUsuario(id);
    };
    
    $scope.eliminarVarios = function() {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar los registros seleccionados \u003F", function() {
            var entidades = [];
            for(var i in $scope.gridTarea.selectedRows) {
                entidades.push({"id": $scope.gridTarea.selectedRows[i].id});
            }
            UsuarioService.eliminarVarios(entidades, $scope.usuario).$promise.then(function(response){
                $scope.gridTarea.rowData = response.listaEntidades;
                $scope.gridTarea.api.onNewRows();
            });
        }, null);
    };
    
    
    $scope.eliminar = function(id) {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar el registro seleccionado \u003F", function(){
            UsuarioService.eliminar(id, $scope.usuario).$promise.then(function(response){
                $scope.gridTarea.rowData = response.listaEntidades;
                $scope.gridTarea.api.onNewRows();
            });
        }, null);
    };  
        
    $scope.abrirApliTarea = function(tarea) {
    	abrirAplicacionesPorTarea(tarea);
    }
	
    
    var abrirAplicacionesPorTarea = function(tarea) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogAplicacionporTarea.html',
            controller: 'DialogAplicacionesPorTareaController',
            size: 700,
            windowClass: 'child',
            resolve: {
                tarea: function () {
                    return tarea;
                }
        		/*
                buscarAplicacionporTarea: function() {
                    return $scope.buscar;
                }
                */
            }
        });
    };
    
    var columnDefs = [
                      {headerName: "", checkboxSelection: true, width: 50, props: {name: "gridTarea", selectAll: false}},
                      {headerName: "id", field: "id", width: 100},
                      {headerName: "nombre", field: "nombre", width: 100},
                      {headerName: "usuario", field: "usuario", width: 100}
   ];

    
    $scope.gridTarea = {
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

bonitaApp.controller('DialogUsuarioController', ['$scope', '$uibModalInstance', '$uibModal','DialogHelper', 'UsuarioService', 'ConfiguracionService', 'id', 'buscar',
                                               function($scope, $uibModalInstance, $uibModal, DialogHelper, UsuarioService, ConfiguracionService, id, buscar){
	$scope.buscar = buscar;
    $scope.estado = {
        select: {label: "Activo", value: "A"},
        onSelect: function(item, model){},
        disabled: false
    };
    
    $scope.estados =  ConfiguracionService.listarEstados(null);
    /*
    $scope.aplicacion = {
            select: {label: "Todos", value: null}, 
            onSelect: function(item, model){}
    };
    
    CatalogoTablaService.listarCatalogo({"id": 13}).$promise.then(function(response){
    alert("response2:"+response.listaEntidades);
    	if(response.listaEntidades != null || response.listaEntidades != undefined) {
            $scope.aplicaciones = [{"nombre": "Todos"}].concat(response.listaEntidades);
        }
    });
     */
    
    	

    if(id != undefined || id != null) {
    	alert("4....");
        UsuarioService.obtener(id).$promise.then(function(response){
            $scope.usuario = response.entidad;
            $scope.estado.select = {};
            $scope.estado.select.value = $scope.usuario.estado;
            $scope.estado.select.label = $scope.usuario.estado == 'A' ? 'Activo' : 'Inactivo';
            
        });
    } else {
    	alert("5....");
        $scope.usuario = {"estado": "A"};
        $scope.estado.disabled = true;
    }
    
    $scope.guardar = function () {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
            $scope.usuario.estado = $scope.estado.select.value;
            UsuarioService.guardar($scope.usuario).$promise.then(function(response){
                $scope.buscar();
                $uibModalInstance.close();
            });
        }, null);
    };
     
    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

bonitaApp.controller('DialogAplicacionesPorTareaController', ['$scope', '$uibModalInstance', '$uibModal','DialogHelper', 'UsuarioService', 'tarea','GridHelper',
                                                                          function($scope, $uibModalInstance, $uibModal, DialogHelper, UsuarioService, tarea, GridHelper){
  $scope.usuario = tarea;                                                                            
  $scope.estado = {
      select: {label: "Activo", value: "A"},
      onSelect: function(item, model){},
      disabled: false
  };

  if($scope.usuario  != undefined || $scope.usuario  != null) {
      UsuarioService.obtener($scope.usuario).$promise.then(function(response){
          $scope.usuario = response.entidad;
          $scope.estado.select = {};
          $scope.estado.select.value = $scope.usuario.estado;
          $scope.estado.select.label = $scope.usuario.estado == 'A' ? 'Activo' : 'Inactivo';
          //$scope.buscarAplicacionPorTarea(tarea);
      });
  } else {
      $scope.usuario = {};
      $scope.estado.disabled = true;
  }

  $scope.guardar = function () {
      DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
          $scope.usuario.estado = $scope.estado.select.value;
          UsuarioService.guardar($scope.usuario).$promise.then(function(response){
             // $scope.buscar();
          });
      }, null);
      
  };

  $scope.cancelar = function () {
      $uibModalInstance.dismiss('cancel');
      };
  
  $scope.gridAplicaPorTarea1 = {
	        angularCompileRows: true,
	        columnDefs: columnDefs1,
	        rowData: [],
	        rowSelection: 'multiple',
	        suppressRowClickSelection: true,
	        enableColResize: true,
	        enableSorting: false,
	        headerCellRenderer: GridHelper.headerCellRenderer,
	        selectionChanged: GridHelper.cambioSeleccion
	    };
  
  var columnDefs1 = [
                    {headerName: "", checkboxSelection: true, width: 30, props: {name: "gridAplicaPorTarea1", selectAll: false}},
                    {headerName: "Aplicacion", field: "nombre", width: 200},
                    {headerName: "Operacion", field: "nombre", width: 200},
                    {headerName: "Facultad", field: "nombre", width: 200},
                    {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.eliminarCellRender}

                    ];
  
  // quiciera que me liste la consulta
  /*
  $scope.buscarAplicacionPorTarea = function() {
      $scope.listarAplicacionPorTarea.estado = $scope.estado.select.value;
      UsuarioService.buscarAplicacionPorTarea($scope.usuarioOperacion).$promise.then(function(response){
          $scope.gridAplicaPorTarea1.rowData = response.listaEntidades;
          $scope.gridAplicaPorTarea1.api.onNewRows();
      });
  };
  */
  
  
  }]);