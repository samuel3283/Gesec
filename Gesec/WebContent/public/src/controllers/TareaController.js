bonitaApp.controller('TareaController', ['$scope', '$uibModal', '$timeout', 'ConfiguracionService','TareaService', 'GridHelper', 'DialogHelper',
function TareaController($scope, $uibModal, $timeout, ConfiguracionService, TareaService, GridHelper, DialogHelper) {

    $scope.tarea = {estado: null};
    
    $scope.estado = {
            select: {label: "Todos", value: null}, 
            onSelect: function(item, model){}
    };

    $scope.estados = ConfiguracionService.listarEstados("Todos");

    $scope.limpiar = function() {
        $scope.tarea = {estado: null, nombre: ""};
        $scope.estado.select = {};
        $scope.estado.select.label = "Todos";
        $scope.estado.select.value = null;

        $scope.gridTarea.rowData = [];
        $scope.gridTarea.api.onNewRows();
    }
    
    $scope.buscar = function() {
        $scope.tarea.estado = $scope.estado.select.value;
        TareaService.listar($scope.tarea).$promise.then(function(response){
            $scope.gridTarea.rowData = response.listaEntidades;
            $scope.gridTarea.api.onNewRows();
        });
    };
       
    $scope.nuevo = function() {
    	abrirTarea(null);
    };
    
    var abrirTarea = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: 'dialogTarea.html',
            controller: 'DialogTareaController',
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

    $scope.editar = function(id) {
    	abrirTarea(id);
    };
    
    $scope.eliminarVarios = function() {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar los registros seleccionados \u003F", function() {
            var entidades = [];
            for(var i in $scope.gridTarea.selectedRows) {
                entidades.push({"id": $scope.gridTarea.selectedRows[i].id});
            }
            TareaService.eliminarVarios(entidades, $scope.tarea).$promise.then(function(response){
                $scope.gridTarea.rowData = response.listaEntidades;
                $scope.gridTarea.api.onNewRows();
            });
        }, null);
    };
    
    
    $scope.eliminar = function(id) {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de eliminar el registro seleccionado \u003F", function(){
            TareaService.eliminar(id, $scope.tarea).$promise.then(function(response){
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
                      {headerName: "", checkboxSelection: true, width: 30, props: {name: "gridTarea", selectAll: false}},
                      {headerName: "C\u00F3digo", field: "id", width: 100},
                      {headerName: "Tarea", field: "nombre", width: 200},
                      {headerName: "Estado", field: "estado", width: 90, cellRenderer: GridHelper.estadoCellRender},
                      {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.editarCellRender},
                      {headerName: "", field: "id", width: 28, cellRenderer: GridHelper.eliminarCellRender},
                      {headerName: "", field: "id", width: 28, cellRenderer: function(params) {
                          var html = '<span class="glyphicon glyphicon-trash" ng-click="listarAplicaTarea(' + params.value + ')"></span>';
                          var domElement = document.createElement("a");
                          domElement.style.marginLeft = "-2px";
                          domElement.href = "javascript: void(0);";
                          domElement.innerHTML = html;

                          params.$scope.listarAplicaTarea = function(id){
                              $timeout(function(){
                                  $scope.abrirApliTarea(id);
                              }, 0);
                          };

                          return domElement;
                      }}
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

bonitaApp.controller('DialogTareaController', ['$scope', '$uibModalInstance', '$uibModal','DialogHelper', 'TareaService', 'ConfiguracionService', 'id', 'buscar',
                                               function($scope, $uibModalInstance, $uibModal, DialogHelper, TareaService, ConfiguracionService, id, buscar){
    $scope.buscar = buscar;
    $scope.estado = {
        select: {label: "Activo", value: "A"},
        onSelect: function(item, model){},
        disabled: false
    };
    $scope.estados =  ConfiguracionService.listarEstados(null);

    if(id != undefined || id != null) {
        TareaService.obtener(id).$promise.then(function(response){
            $scope.tarea = response.entidad;
            $scope.estado.select = {};
            $scope.estado.select.value = $scope.tarea.estado;
            $scope.estado.select.label = $scope.tarea.estado == 'A' ? 'Activo' : 'Inactivo';
            
        });
    } else {
        $scope.tarea = {"estado": "A"};
        $scope.estado.disabled = true;
    }
    
    $scope.guardar = function () {
        DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
            $scope.tarea.estado = $scope.estado.select.value;
            TareaService.guardar($scope.tarea).$promise.then(function(response){
                $scope.buscar();
                $uibModalInstance.close();
            });
        }, null);
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

bonitaApp.controller('DialogAplicacionesPorTareaController', ['$scope', '$uibModalInstance', '$uibModal','DialogHelper', 'TareaService', 'tarea','GridHelper',
                                                                          function($scope, $uibModalInstance, $uibModal, DialogHelper, TareaService, tarea, GridHelper){
  $scope.tarea = tarea;                                                                            
  $scope.estado = {
      select: {label: "Activo", value: "A"},
      onSelect: function(item, model){},
      disabled: false
  };

  if($scope.tarea  != undefined || $scope.tarea  != null) {
      TareaService.obtener($scope.tarea).$promise.then(function(response){
          $scope.tarea = response.entidad;
          $scope.estado.select = {};
          $scope.estado.select.value = $scope.tarea.estado;
          $scope.estado.select.label = $scope.tarea.estado == 'A' ? 'Activo' : 'Inactivo';
          $scope.buscarAplicacionPorTarea(tarea);
      });
  } else {
      $scope.tarea = {};
      $scope.estado.disabled = true;
  }

  $scope.guardar = function () {
      DialogHelper.confirm("\u00BF Est\u00E1 seguro de guardar los cambios realizados \u003F", function(){
          $scope.tarea.estado = $scope.estado.select.value;
          TareaService.guardar($scope.tarea).$promise.then(function(response){
              $scope.buscar();
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
      TareaService.buscarAplicacionPorTarea($scope.TareaOperacion).$promise.then(function(response){
          $scope.gridAplicaPorTarea1.rowData = response.listaEntidades;
          $scope.gridAplicaPorTarea1.api.onNewRows();
      });
  };
  */
  
  
  }]);