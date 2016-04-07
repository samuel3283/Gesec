'use strict';

bonitaApp.factory('GridHelper', function($timeout, $rootScope, DialogHelper) {
    var GridHelper = {};
    
    GridHelper.pageSize = 10;
    
    GridHelper.localeText = {
        // for filter panel
        page: 'P\u00E1gina',
        more: 'm\u00E1s',
        to: 'a',
        of: 'de',
        next: '&rsaquo;',
        last: '&raquo;',
        first: '&laquo;',
        previous: '&lsaquo;'
    }
    
    GridHelper.crearGrid = function(configuracion) {
        return angular.extend({
            angularCompileRows: true,
            localeText: GridHelper.localeText,
            rowData: [],
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableColResize: true,
            enableSorting: false,
            headerCellRenderer: GridHelper.headerCellRenderer,
            rowSelected: GridHelper.cambioSeleccion
        }, configuracion || {});
    }
    
    GridHelper.configurarDataSourceListarPaginado = function(gridName, grid, service, item) {
        service.contar(item).$promise.then(function(response){
            $rootScope.$$childTail["rows_" + gridName] = response.props.totalFilas;
            var dataSource = {
                rowCount: $rootScope.$$childTail["rows_" + gridName],
                pageSize: GridHelper.pageSize,
                getRows: function (params) {
                    var pagNew = params.startRow / GridHelper.pageSize;
                    service["listarPaginado"](item, pagNew).$promise.then(function(response){
                        params.successCallback(response.listaEntidades, $rootScope.$$childTail["rows_" + gridName]);
                    });
                }
            };
            grid.api.setDatasource(dataSource);
        });
    }
    
    /*GridHelper.configurarDataSourceListarPaginado = function(gridName, grid, service, item) {
        service.contar(item).$promise.then(function(response){
            $rootScope.$$childTail["rows_" + gridName] = response.props.totalFilas;
            var dataSource = {
                rowCount: $rootScope.$$childTail["rows_" + gridName],
                pageSize: GridHelper.pageSize,
                getRows: function (params) {
                    var pagNew = params.startRow / GridHelper.pageSize;
                    service.listarPaginado(item, pagNew).$promise.then(function(response){
                        params.successCallback(response.listaEntidades, $rootScope.$$childTail["rows_" + gridName]);
                    });
                }
            };
            grid.api.setDatasource(dataSource);
        });
    }*/
    
    GridHelper.headerCellRenderer = function(params) {
        var eHeader = document.createElement('span');
        if(params.colDef.checkboxSelection) {
        	params.colDef.props = params.colDef.props == undefined ? {} : params.colDef.props;
        	params.colDef.props.selectAll = false;
            var eCheckbox = document.createElement("input");
            eCheckbox.id = "checkbox_" + params.colDef.props.name;
            eCheckbox.type = "checkbox";
            eCheckbox.onclick = function() {
                if($(this).is(":checked")) {
                	params.api.selectAll();
                    // $rootScope.$$childTail[params.colDef.props.name].api.selectAll();
                    params.colDef.props.selectAll = true;
                } else {
                	params.api.deselectAll();
                	// $rootScope.$$childTail[params.colDef.props.name].api.deselectAll();
                    params.colDef.props.selectAll = false;
                }
            }
            eHeader.style.paddingLeft = "8px";
            eHeader.appendChild(eCheckbox);
        } else {
            var eTitle = document.createTextNode(params.colDef.headerName);
            eHeader.appendChild(eTitle);
        }
        return eHeader;
    }
    
    GridHelper.estadoCellRender = function(params) {
        var domElement = document.createElement("span");
        domElement.innerHTML = params.value == "A" ? "Activo" : params.value == "I" ? "Inactivo" : "En Proceso" ;

        return domElement;
    }
    
    GridHelper.editarCellRender = function(params) {
        var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(' + params.value + ')"></span>';
        var domElement = document.createElement("a");
        domElement.style.marginLeft = "-2px";
        domElement.href = "javascript: void(0);";
        domElement.innerHTML = html;

        params.$scope.editar = function(id){
            $timeout(function(){
                $rootScope.$$childTail.editar(id);
            }, 0);
        };

        return domElement;
    }
    
    GridHelper.eliminarCellRender = function(params) {
        var html = '<span class="glyphicon glyphicon-trash" ng-click="eliminar(' + params.value + ')"></span>';
        var domElement = document.createElement("a");
        domElement.style.marginLeft = "-2px";
        domElement.href = "javascript: void(0);";
        domElement.innerHTML = html;

        params.$scope.eliminar = function(id){
            $timeout(function(){
                $rootScope.$$childTail.eliminar(id);
            }, 0);
        };

        return domElement;
    }

    GridHelper.campoCompuestoCellRender = function(params) {
        var html = '<span>{{data.'+params.colDef.field+'}}</span>';
        var domElement = document.createElement("span");
        domElement.innerHTML = html;
        return domElement;
    };
    
    
    GridHelper.campoCellRender = function(params) {
    	var html = '<span>{{'+params.colDef.field+'}}</span>';
        var domElement = document.createElement("span");
        domElement.innerHTML = html;
        return domElement;
    };

    GridHelper.cambioSeleccion = function(selected) {
        console.log(selected);
    }
    
    return GridHelper;
});