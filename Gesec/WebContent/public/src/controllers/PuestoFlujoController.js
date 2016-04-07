'use strict';
bonitaApp.controller('PuestoFlujoController', ['$scope', '$window', '$uibModal', '$timeout', 'GridHelper', 'DialogHelper', 'ConfiguracionService', 'PuestoService', 'AreaService', 'ParametroService', 'CatalogoTablaService',
function PuestoFlujoController($scope, $window, $uibModal, $timeout, GridHelper, DialogHelper, ConfiguracionService, PuestoService, AreaService, ParametroService, CatalogoTablaService) {
    var url = document.URL;
    var id = parseInt(url.split("puesto/")[1].replace(".html", ""));
    
    var ids = angular.element("#idsPuestosAClonar").val();
    console.log(ids);
    
    $scope.funciones=[];
    $scope.tareaOperacion = {};
    $scope.rol = {};
    
    $scope.descripcionFacultadLimite = "";
    $scope.activarSiguienteEtapa = true;
    $scope.activarEjecutar = true;
    $scope.activarAprobar = true;
    $scope.activarDevolver = true;
    $scope.activarGuardar = true;
    
    $scope.tab1 = {select: false, disabled: true, readOnly: false};
    $scope.tab2 = {select: false, disabled: true, readOnly: false};
    $scope.tab3 = {select: false, disabled: true, readOnly: false};
    $scope.tab4 = {select: false, disabled: true, readOnly: false};
    $scope.tab5 = {select: false, disabled: true, readOnly: false};
    
    $scope.existePuesto=false;
    
    $scope.dateOptions = {
        formatYear: 'YY',
        startingDay: 1
    };
    
    $scope.open = function($event){
        $scope.status.opened=true;
    };
    
    $scope.status={
        opened: false
    };
    
    $scope.dependenciaDirecta = {
        select: {"id": null ,"titulo": "Ninguna"}, 
        onSelect: function(item, model){}
    };
    
    $scope.unidadOrganizativaNombre = "\u00C1rea";
    $scope.unidadOrganizativa = [];
    
    $scope.tipoPuesto = {
        select: {"id":null, "nombre": "Seleccione"}, 
        onSelect: function(item, model){}
    };
    
    $scope.area = {
        select: {nombre: "Seleccione", id: null}, 
        onSelect: function(item, model){
            var areas = []
            buscarEnArbol($scope.arbolDeAreas, {"node": item}, areas);
            if(areas.length > 0) {
                $scope.unidadOrganizativaNombre = areas[0].node.tipo.nombre.capitalizeFirstLetter();
                $scope.unidadOrganizativa = [];
                for(var i = 1; i < areas.length; i++) {
                    areas[i].node.tipo.nombre = areas[i].node.tipo.nombre.capitalizeFirstLetter(); 
                    areas[i].node.nombre = areas[i].node.nombre.capitalizeFirstLetter(); 
                    $scope.unidadOrganizativa.push(areas[i]);
                }
            }
        }
    };
    
    var buscarEnArbol = function(_hoja, _elemento, _areas) {
        var current = null;

        if(_elemento != null && _elemento != undefined) {
            if (_hoja.node.id == _elemento.node.id) {
                current = _hoja;
                _areas.push(current);
            } else {
                for(var i in _hoja.childs) {
                    current = buscarEnArbol(_hoja.childs[i], _elemento, _areas);
                    if(current != null) {
                        if(_hoja.node.nombre != "ROOT") {
                            _areas.push(_hoja);
                        }
                        break;
                    }
                }
            }
        }
        
        return current;
    }
    
    var botonesPorDefecto = function (){
    	$scope.mostrarFichaFunciones = enAlta;
        $scope.mostrarPlantilla = enAlta;
        $scope.mostrarFichaPerfil = enAlta;
        $scope.mostrarEnviar = false;
        $scope.mostrarEjecutar = enAlta;
        $scope.mostrarAprobar = enAlta;
        $scope.mostrarDevolver = enAlta;
        $scope.mostrarGuardar = false;
        $scope.mostrarCancelar = false;
        $scope.activarGuardar = false;
        $scope.activarSiguienteEtapa = false;
        actualizarFlujoGrafico("#p_1", "pasado", "activo");
    }
    
    AreaService.listarArbolDeAreas().$promise.then(function(response) {
        $scope.arbolDeAreas = response.childs[0];
        $scope.arbolDeAreas.parent = null;
        
        var walk = function(_element, _list) {
            if(_element.node.nombre != "ROOT") {
                _element.node.level = _element.level;
                _element.node.tipo.nombre = _element.node.tipo.nombre.capitalizeFirstLetter(); 
                _list.push(_element.node);
            }
            for (var idx in _element.childs) {
                walk(_element.childs[idx], _list);
            }
        }
        
        var areas = [];
        walk($scope.arbolDeAreas, areas);

        $scope.areas = [{"nombre": "Seleccione", "level": 0}].concat(areas);
        PuestoService.listarSinMensaje({"estado": "A","indicador": "1"}).$promise.then(function(response){
            $scope.rol = response.props.rol;
            $scope.dependencias = [{"id": null ,"titulo": "Ninguno", "unidadOrganizativa": {"nombre": "---"}}].concat(response.listaEntidades);
            PuestoService.listarSinMensaje({"estado": "P","indicador": "2"}).$promise.then(function(response){
            	$scope.dependencias = $scope.dependencias.concat(response.listaEntidades);
                
                ParametroService.listar({"parametro": {"id": 13}}).$promise.then(function(response){
                    $scope.tiposPuestos = response.listaEntidades;
                    
                    if(isNaN(id)) {
                    	PuestoService.clonarPuesto(ids).$promise.then(function(response){
                    		$scope.funciones = response.funciones;
                    		$scope.gridFunciones.rowData = $scope.funciones;
                            $scope.gridFunciones.api.onNewRows();
                            botonesPorDefecto();
                        });
                    } else if(id != 0) {
                        PuestoService.obtener(id).$promise.then(function(response){
                            obtener(response);
                        });
                    } else {
                    	botonesPorDefecto();
                    }
                });
            });
        });
    });
    
    $scope.moneda = {
        select: {nombre: "Seleccione", id: null}, 
        onSelect: function(item, model){
            $timeout(function(){
                angular.element("#importe").focus();
            }, 0);
        }
    };
    
    ParametroService.listarSinMensaje({"parametro": {"id": 60}}).$promise.then(function(response){
        if(response.listaEntidades != null || response.listaEntidades != undefined) {
            $scope.monedas = [{"nombre": "Seleccione", "id": null}].concat(response.listaEntidades);
        }
    });
    
    $scope.funcion = {
        "sel": false,
        "listaFuncionTarea": [],
        "estado" : "A"
    };
    
    $scope.puesto = {
        "unidadOrganizativa": {},
        "dependenciaFuncional": null,
        "dependenciaJerarquica": null,
        "epigrafeNef": {},
        "clasificacionFuncional":null,
        "estadoProceso": null,
        "etapa": {"id": 0},
        "estadoSemaforo": null
    };
    
    var enAlta         = true;
    var enPerfilado    = false;
    var enLimites      = false;
    var enAprobacion   = false;
    var enHabilitacion = false;
    
    var esUsuarioEstructura       = true;
    var esComiteLimites           = false;
    var esAprobador               = false;
    var esAdministradorAplicacion = false;
    
    var actualizarFlujoGrafico = function(_id, _remove, _add) {
        var e = $(_id);
        if(e.hasClass(_remove)) {
            e.removeClass(_remove)
        }
        if(!e.hasClass(_add)) {
            e.addClass(_add)
        }
    };
    
    var prepararPuesto = function(puesto){
    	puesto.titulo =  $scope.puesto.titulo == null?null:$scope.puesto.titulo.replace(/</g,'&lt;');
        puesto.titulo =  $scope.puesto.titulo == null?null:$scope.puesto.titulo.replace(/>/g,'&gt;');
        puesto.objetivo =  $scope.puesto.objetivo == null?null:$scope.puesto.objetivo.replace(/</g,'&lt;');
        puesto.objetivo =  $scope.puesto.objetivo == null?null:$scope.puesto.objetivo.replace(/>/g,'&gt;');
        puesto.observacionComite =  $scope.puesto.observacionComite == null?null:$scope.puesto.observacionComite.replace(/</g,'&lt;');
        puesto.observacionComite =  $scope.puesto.observacionComite == null?null:$scope.puesto.observacionComite.replace(/>/g,'&gt;');
        puesto.observacionAprobacion =  $scope.puesto.observacionAprobacion == null?null:$scope.puesto.observacionAprobacion.replace(/</g,'&lt;');
        puesto.observacionAprobacion =  $scope.puesto.observacionAprobacion == null?null:$scope.puesto.observacionAprobacion.replace(/>/g,'&gt;');
        puesto.observacionHabilitacion =  $scope.puesto.observacionHabilitacion == null?null:$scope.puesto.observacionHabilitacion.replace(/</g,'&lt;');
        puesto.observacionHabilitacion =  $scope.puesto.observacionHabilitacion == null?null:$scope.puesto.observacionHabilitacion.replace(/>/g,'&gt;');
    };
    
    var mostrarPuesto = function (puesto){
    	 puesto.titulo =  $scope.puesto.titulo == null?null:$scope.puesto.titulo.replace(/&lt;/g,'<');
         puesto.titulo =  $scope.puesto.titulo == null?null:$scope.puesto.titulo.replace(/&gt;/g,'>');
         puesto.objetivo =  $scope.puesto.objetivo == null?null:$scope.puesto.objetivo.replace(/&lt;/g,'<');
         puesto.objetivo =  $scope.puesto.objetivo == null?null:$scope.puesto.objetivo.replace(/&gt;/g,'>');
         puesto.observacionComite =  $scope.puesto.observacionComite == null?null:$scope.puesto.observacionComite.replace(/&lt;/g,'<');
         puesto.observacionComite =  $scope.puesto.observacionComite == null?null:$scope.puesto.observacionComite.replace(/&gt;/g,'>');
         puesto.observacionAprobacion =  $scope.puesto.observacionAprobacion == null?null:$scope.puesto.observacionAprobacion.replace(/&lt;/g,'<');
         puesto.observacionAprobacion =  $scope.puesto.observacionAprobacion == null?null:$scope.puesto.observacionAprobacion.replace(/&gt;/g,'>');
         puesto.observacionHabilitacion =  $scope.puesto.observacionHabilitacion == null?null:$scope.puesto.observacionHabilitacion.replace(/&lt;/g,'<');
         puesto.observacionHabilitacion =  $scope.puesto.observacionHabilitacion == null?null:$scope.puesto.observacionHabilitacion.replace(/&gt;/g,'>');
    };
    
    var obtener = function(response) {
        if(response.entidad != null || response.entidad != undefined) {
            $scope.puesto = response.entidad;
            mostrarPuesto($scope.puesto);
            
            $scope.area.select = angular.copy($scope.puesto.unidadOrganizativa);
            $scope.area.onSelect($scope.area.select, null);
                    
            if($scope.puesto.idDependenciaJerarquica != null || $scope.puesto.idDependenciaJerarquica != undefined) {
                $scope.dependenciaDirecta.select = angular.copy($scope.puesto.dependenciaJerarquica);
            }
            var rows = $scope.dependencias.length;
            for(var i = 1; i < rows; i++){
                if($scope.dependencias[i].id==$scope.puesto.id){
                    $scope.dependencias.splice(i,1);
                    break;
                }
            }
            
            $scope.tipoPuesto.select=angular.copy($scope.puesto.tipo);
            $scope.existePuesto =  $scope.puesto.id==null?'false':'true';
            $scope.funciones = response.funciones;
            $scope.facultadesConLimites = response.facultadesConLimites || [];
            $scope.limitesDeFacultades = response.limitesDeFacultades || [];
            $scope.rolesEspeciales = response.rolesEspeciales || [];
            $scope.usuariosEspeciales = response.usuariosEspeciales || [];
            
            $scope.gridFunciones.rowData = $scope.funciones;
            $scope.gridFunciones.api.onNewRows();
            
            $scope.gridFacultadesConLimites.rowData = $scope.facultadesConLimites;
            $scope.gridFacultadesConLimites.api.onNewRows();
            
            enAlta         = $scope.puesto.etapa.id == 0;
            enPerfilado    = $scope.puesto.etapa.id == 2;
            enLimites      = $scope.puesto.etapa.id == 3;
            enAprobacion   = $scope.puesto.etapa.id == 4;
            enHabilitacion = $scope.puesto.etapa.id == 5;
            
            esUsuarioEstructura       = $scope.rol.codigo == "USUARIO DE ESTRUCTURAS";
            esComiteLimites           = $scope.rol.codigo == "COMIT\u00C9 DE LIMITES";
            esAprobador               = $scope.rol.codigo == "APROBADOR";
            esAdministradorAplicacion = $scope.rol.codigo == "ADMINISTRADORES DE LAS APLICACIONES";
            
            $scope.tab2.disabled = enAlta;
            $scope.tab3.disabled = ($scope.facultadesConLimites.length == 0 && !enLimites);
            $scope.tab4.disabled = !($scope.puesto.etapa.id >= 4 || ($scope.puesto.observacionAprobacion || '').length > 0);
            $scope.tab5.disabled = !($scope.puesto.etapa.id >= 5 || ($scope.puesto.observacionHabilitacion || '').length > 0);
            
            $scope.tab1.readOnly = !(enAlta || enPerfilado) || !esUsuarioEstructura;
            $scope.tab2.readOnly = !(enAlta || enPerfilado) || !esUsuarioEstructura;
            $scope.tab3.readOnly = !enLimites || !esComiteLimites;
            $scope.tab4.readOnly = !enAprobacion || !esAprobador;
            $scope.tab5.readOnly = !enHabilitacion || !esAdministradorAplicacion; // TODO: Revisar
            
            $scope.tab2.select = enPerfilado;
            $scope.tab3.select = enLimites;
            $scope.tab4.select = enAprobacion;
            $scope.tab5.select = enHabilitacion;
            
            $scope.mostrarFichaFunciones = enAlta;
            $scope.mostrarPlantilla = enAlta;
            $scope.mostrarFichaPerfil = enAlta;
            $scope.mostrarEnviar = esAprobador || esAdministradorAplicacion;
            $scope.mostrarEjecutar = esUsuarioEstructura || esComiteLimites || esAprobador;
            $scope.mostrarAprobar = esUsuarioEstructura ||esComiteLimites || esAdministradorAplicacion;
            $scope.mostrarDevolver = esUsuarioEstructura;
            $scope.mostrarGuardar = false;
            $scope.mostrarCancelar = false;
            
            $scope.activarEjecutar = !(esAdministradorAplicacion && enHabilitacion);
            $scope.activarAprobar  = !(esAprobador && enAprobacion);
            $scope.activarDevolver = !((esComiteLimites && enLimites) || (esAprobador && enAprobacion) || (esAdministradorAplicacion && enHabilitacion));
            $scope.activarGuardar  =       !((esUsuarioEstructura && (enPerfilado || enAlta)) || (esComiteLimites && enLimites) || (esAprobador && enAprobacion) || (esAdministradorAplicacion && enHabilitacion));
			$scope.activarSiguienteEtapa = !((esUsuarioEstructura && (enPerfilado || enAlta)) || (esComiteLimites && enLimites));
            
            if(enAlta) {
                actualizarFlujoGrafico(".p1", "pasado", "activo");            	
            }
            if(enPerfilado) {
                actualizarFlujoGrafico(".p1", "activo", "pasado");
                actualizarFlujoGrafico(".p2", "pasado", "activo");
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
        }
    };
    
    var columnDefsFunciones = [
        {headerName: "", checkboxSelection: true, width: 30, props:{name: "gridFunciones"}},
        {headerName: "Nombre", field: "nombre", width: 450},
        {headerName: "", field: "id", width: 28, cellRenderer: function(params) {
            var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(data)"></span>';
            var domElement = document.createElement("a");
            domElement.style.marginLeft = "-2px";
            domElement.href = "javascript: void(0);";
            domElement.innerHTML = html;

            params.$scope.editar = function(data){
                $timeout(function(){
                    $scope.funcion = data;
                    
                    $scope.funcion.nombre = $scope.funcion.nombre.replace(/&lt;/g,'<');
                    $scope.funcion.nombre = $scope.funcion.nombre.replace(/&gt;/g,'>');
                    $scope.funcion.descripcion = $scope.funcion.descripcion.replace(/&lt;/g,'<');
                    $scope.funcion.descripcion = $scope.funcion.descripcion.replace(/&gt;/g,'>');
                    
                    $scope.pnlFuncionAgregar = true;
                    $scope.pnlFuncionEditar = false;
                    $timeout(function(){
                        angular.element("#nombreCorto").focus();
                    }, 0);
                }, 0);
            };

            return domElement;
        }},
        {headerName: "", field: "id", width: 28, cellRenderer: function(params) {
            var html;
            if(params.data.listaFuncionTarea.length > 0) {
                html = '<span class="glyphicon glyphicon-ok glyphicon-green" tooltip-placement="left" tooltip-class="info" uib-tooltip="Perfilado"></span>';
            } else {
                html = '<span class="glyphicon glyphicon-question-sign glyphicon-red" tooltip-placement="left" tooltip-class="info" uib-tooltip="Pendiente de perfilar"></span>';
            }
            
            var domElement = document.createElement("a");
            domElement.style.marginLeft = "-2px";
            domElement.href = "javascript: void(0);";
            domElement.innerHTML = html;
            return domElement;
        }}
    ];
    $scope.gridFunciones = GridHelper.crearGrid({columnDefs: columnDefsFunciones});
    
    $scope.selectTab = function(idx) {
        if($scope.puesto.etapa.id > 0 && idx == 0) {
            $scope.activarSiguienteEtapa = false;
            $scope.activarGuardar = false;
        } else {
            var enAlta      = $scope.puesto.etapa.id == 0;
            var enPerfilado = $scope.puesto.etapa.id == 2;
            var enLimites   = $scope.puesto.etapa.id == 3;
            
            var esUsuarioEstructura = $scope.rol.codigo == "USUARIO DE ESTRUCTURAS";
            var esComiteLimites     = $scope.rol.codigo == "COMIT\u00C9 DE LIMITES";
            
            if(enAlta || enPerfilado) {
                $scope.activarSiguienteEtapa = !esUsuarioEstructura;
            } else {
                $scope.activarSiguienteEtapa = !esComiteLimites;
            }
        }
    }
    
    $scope.verFuncion = function(idx) {
        $scope.funcion = $scope.funciones[idx];
    }
    
    $scope.imprimirFichaFunciones = function(){};
    $scope.imprimirPlantilla = function(){};
    $scope.imprimirFichaPerfil = function(){};
    
    $scope.ejecutar = function(){
        guardarEnviar(true);
    };
    
    $scope.aprobar = function(){
        guardarEnviar(true);
    };
    
    $scope.devolver = function(){
        PuestoService.devolver($scope.puesto).$promise.then(function(response){
            obtener(response);
        });
    };
    
    var guardarEnviar = function(enviar) {
        for(var i in $scope.funciones) {
            if($scope.funciones[i].id < 0) {
                $scope.funciones[i].id = null;
            }
        }
        
        var limitesDeFacultades = [];
        for(var facultad in $scope.tareaOperacion) {
            for(var i in $scope.tareaOperacion[facultad].limites) {
                if($scope.tareaOperacion[facultad].limites[i].id < 0) {
                    $scope.tareaOperacion[facultad].limites[i].id = null;
                }
                limitesDeFacultades.push($scope.tareaOperacion[facultad].limites[i]);
            }
        }
        
        $scope.puesto.idTipo = $scope.tipoPuesto.select.id;
        $scope.puesto.tipo = $scope.tipoPuesto.select;

        $scope.puesto.idUnidadOrganizativa = $scope.area.select.id;
        if($scope.dependenciaDirecta.select != undefined || $scope.dependenciaDirecta.select != null) {
            $scope.puesto.idDependenciaJerarquica = $scope.dependenciaDirecta.select.id;
        }
        
        var idOld = $scope.puesto.id;
        /*
        if($scope.puesto.etapa.id == 2 && enviar){
    		PuestoService.esFuncionUnica($scope.funciones).$promise.then(function(response) {
                if(response.tipoResultado == "EXITO") {
                    $scope.guardarPorDefecto(enviar, idOld, limitesDeFacultades);
                }
                if(mensajes.length > 0) {
                    DialogHelper.validate(response);
                } 
    		});
        }else{
        	$scope.guardarPorDefecto(enviar, idOld, limitesDeFacultades);
        }*/
        $scope.guardarPorDefecto(enviar, idOld, limitesDeFacultades);
    }
    
    $scope.guardarPorDefecto = function (enviar, idOld, limitesDeFacultades){
    	PuestoService.guardar($scope.puesto, $scope.funciones, limitesDeFacultades, "NO", enviar ? "SI" : "NO").$promise.then(function(response1){
            obtener(response1);
            var mensaje = response1.mensaje;
            if(enviar && response1.tipoResultado == "EXITO") {
                if($scope.puesto.etapa.id == 2 && $scope.funciones.length == 0) {
                    if(idOld == 0 || idOld == null || idOld == undefined) {
                    } else {
                        DialogHelper.warning("Debe registrar al menos una funci\u00F3n");
                    }
                } else {
                    PuestoService.siguienteEtapa($scope.puesto, $scope.funciones, "NO").$promise.then(function(response2) {
                        if(response2.tipoResultado == "EXITO") {
                            obtener(response2);
                            mensaje = mensaje + "\n" + response2.mensaje;
                            DialogHelper.info(mensaje);
                        } else {
                            DialogHelper.show(response2);
                        }
                    });
                }
            } else {
                DialogHelper.show(response1);
            }
        });
    }
    
    $scope.enviar=function(){
        guardarEnviar(true);
    };
    
    $scope.guardar=function(){
        guardarEnviar(false);
    };
    
    $scope.cancelar=function(){
        $window.location.href = obtenerContexto("puesto.html");
    };
    
    $scope.pnlFuncionAgregar = false;
    $scope.pnlFuncionEditar = true;

    var validarFuncion = function() {
        var mensajes = [];
        if($scope.funcion.nombre.length == 0) {
            mensajes.push("El campo nombre corto es obligatorio");
        } else {
            for(var i in $scope.funciones) {
                if($scope.funciones[i].nombre == $scope.funcion.nombre && $scope.funciones[i].id != $scope.funcion.id) {
                    mensajes.push("El nombre corto ya se encuentra registrado");
                    break;
                }
            }
        }
        
        if($scope.funcion.descripcion.length == 0) {
            mensajes.push("El campo funci\u00F3n es obligatorio");
        } else {
            for(var i in $scope.funciones) {
                if($scope.funciones[i].descripcion == $scope.funcion.descripcion && $scope.funciones[i].id != $scope.funcion.id) {
                    mensajes.push("La funci\u00F3n ya se encuentra registrada");
                    break;
                }
            }
        }
        
        return mensajes;
    }
    
    $scope.aceptarFuncion = function() {
        PuestoService.esFuncionUnica($scope.funcion).$promise.then(function(response) {
            var m = "";
            if(response.tipoResultado == "EXITO") {
                m = "La funci\u00F3n ya se encuentra registrada y asignada a otro puesto";
            }
            
            var mensajes = validarFuncion();
            
            if(m.length > 0) {
                mensajes.push(m);
            }
            
            if(mensajes.length > 0) {
                DialogHelper.validate(mensajes, null, function(){
                    $timeout(function(){
                        angular.element("#nombreCorto").focus();
                    }, 0);
                });
            } else {
                $scope.funcion.nombre = $scope.funcion.nombre.replace(/</g,'&lt;');
                $scope.funcion.nombre = $scope.funcion.nombre.replace(/>/g,'&gt;');
                $scope.funcion.descripcion = $scope.funcion.descripcion.replace(/</g,'&lt;');
                $scope.funcion.descripcion = $scope.funcion.descripcion.replace(/>/g,'&gt;');
                if($scope.funcion.id == null || $scope.funcion.id == undefined) {
                    $scope.funcion.id = ($scope.funciones.length + 1) * -1;
                    $scope.funciones.push(angular.copy($scope.funcion));
                } else {
                    for(var i in $scope.funciones) {
                        if($scope.funciones[i].id == $scope.funcion.id) {
                            $scope.funciones[i] = $scope.funcion;
                            break;
                        }
                    }
                }
                $scope.gridFunciones.rowData = $scope.funciones;
                $scope.gridFunciones.api.onNewRows();
                $scope.cancelarFuncion();
            }
        })
    };
    
    $scope.cancelarFuncion = function() {
        $scope.funcion = {
            "sel": false,
            "listaFuncionTarea": [],
            "estado" : "A",
            "nombre": "",
            "descripcion": ""
        }; 
        $scope.pnlFuncionAgregar = false;
        $scope.pnlFuncionEditar = true;
    };
    
    $scope.agregarFuncion = function() {
        $scope.funcion = {
            "sel": false,
            "listaFuncionTarea": [],
            "estado" : "A",
            "nombre": "",
            "descripcion": ""
        };
        $scope.pnlFuncionAgregar = true;
        $scope.pnlFuncionEditar = false;
        $timeout(function(){
            angular.element("#nombreCorto").focus();
        }, 0);
    };

    $scope.quitarFuncion = function() {
        var rows = $scope.gridFunciones.selectedRows;
        for(var j in rows) {
            var funcion = {};
            var size = $scope.funciones.length;
            for(var i = 0; i < size; i++) {
                funcion = $scope.funciones[i];
                if(funcion != undefined && funcion.id == rows[j].id) {
                    $scope.funciones.splice(i, 1);
                    break;
                }
            }
        }
        $scope.gridFunciones.rowData = $scope.funciones;
        $scope.gridFunciones.api.onNewRows();
    };
    
    $scope.abrirFuncionTarea = function (item, modo) {
        PuestoService.esFuncionUnica($scope.funcion).$promise.then(function(response) {
            var m = "";
            if(response.tipoResultado == "EXITO") {
                m = "La funci\u00F3n ya se encuentra registrada y asignada a otro puesto";
            }
            var mensajes = validarFuncion();
            if(m.length > 0) {
                mensajes.push(m);
            }
            
            
            if(mensajes.length > 0) {
                if(modo == 1){
                    mensajes.splice(0, 0, "No se puede perfilar la funci\u00F3n");
                }else {
                    mensajes.splice(0, 0, "No se puede asignar tareas a la funci\u00F3n");
                }
                DialogHelper.validate(mensajes, null, function(){
                    $timeout(function(){
                        angular.element("#nombreCorto").focus();
                    }, 0);
                });
                return;
            }
            
            var modalInstance = $uibModal.open({
                templateUrl: 'dialogoPuestoFuncionTarea.html',
                controller: 'DialogoPuestoFuncionTareaController',
                windowClass: 'child',
                size: 1000,
                resolve: {
                    funcion: function () {
                        return item;
                    },
                    puesto: function () {
                        return $scope.puesto;
                    },
                    modo : function () {
                        return modo;
                    }
                }
            });
        
            modalInstance.result.then(function () {
                $scope.gridFunciones.rowData = $scope.funciones;
                $scope.gridFunciones.api.onNewRows();
            });
        })
    };
    
    var columnDefsFacultadesConLimites = [
        {headerName: "Aplicaci\u00F3n", field: "operacion.aplicacion.nombre", width: 150, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Transacci\u00F3n", field: "operacion.nombre", width: 150, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Facultad", field: "facultad.nombre", width: 150, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: function(params) {
            var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(data)"></span>';
            var domElement = document.createElement("a");
            domElement.style.marginLeft = "-2px";
            domElement.href = "javascript: void(0);";
            domElement.innerHTML = html;

            params.$scope.editar = function(data){
                $timeout(function(){
                    $scope.descripcionFacultadLimite = data.operacion.aplicacion.nombre + " - " + data.operacion.nombre + " - " + data.facultad.nombre;
                    $scope.idFacultadLimite = data.operacion.aplicacion.nombre + data.operacion.nombre + data.facultad.nombre;
                    if($scope.tareaOperacion[$scope.idFacultadLimite] == undefined || $scope.tareaOperacion[$scope.idFacultadLimite] == null) {
                        $scope.tareaOperacion[$scope.idFacultadLimite] = {"tareaOperacion": data, "limites": []};
                        for(var i in $scope.limitesDeFacultades) {
                            if($scope.limitesDeFacultades[i].tareaOperacion.id == data.id) {
                                $scope.tareaOperacion[$scope.idFacultadLimite].limites.push($scope.limitesDeFacultades[i]);
                            }
                        }
                    }

                    $scope.gridLimitesFacultad.rowData = $scope.tareaOperacion[$scope.idFacultadLimite].limites;
                    $scope.gridLimitesFacultad.api.onNewRows();
                    
                    if($scope.tareaOperacion[$scope.idFacultadLimite].limites.length == 0 && !$scope.tab3.readOnly) {
                        $scope.agregarLimite();
                    } else {
                        $scope.cancelarLimite();
                    }
                }, 0);
            };

            return domElement;
        }},
    ];
    $scope.gridFacultadesConLimites = GridHelper.crearGrid({columnDefs: columnDefsFacultadesConLimites});
    
    var columnDefsLimitesFacultad = [
       {headerName: "", checkboxSelection: true,  width: 30, props:{name: "gridLimitesFacultad"}},
       {headerName: "Divisa", field: "divisa.nombre", width: 250,cellRenderer: GridHelper.campoCompuestoCellRender},
       {headerName: "Importe", field: "importe", width: 150},
       {headerName: "", field: "id", width: 28, cellRenderer: function(params) {
           var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(data)"></span>';
           var domElement = document.createElement("a");
           domElement.style.marginLeft = "-2px";
           domElement.href = "javascript: void(0);";
           domElement.innerHTML = html;

           params.$scope.editar = function(data){
               $timeout(function(){
                   $scope.limiteFacultad = data;
                   $scope.moneda.select = angular.copy(data.divisa);
                   $scope.pnlLimiteAgregar = true;
                   $scope.pnlLimiteEditar = false;
                   $timeout(function(){
                       $scope.moneda.onSelect();
                   }, 0);
               }, 0);
           };

           return domElement;
       }}
    ];
    $scope.gridLimitesFacultad = GridHelper.crearGrid({columnDefs: columnDefsLimitesFacultad});
    
    $scope.pnlLimiteAgregar = false;
    $scope.pnlLimiteEditar = true;

    $scope.aceptarLimite = function() {
        var mensajes = [];
        
        if($scope.moneda.select == undefined || $scope.moneda.select == null || $scope.moneda.select.id == null || $scope.moneda.select.id == undefined) {
            mensajes.push("El campo moneda es obligatorio");
        }
        
        if($scope.limiteFacultad.importe == undefined || $scope.limiteFacultad.importe == null) {
            mensajes.push("El campo importe es obligatorio");
        } else {
            if($scope.limiteFacultad.importe <= 0) {
                mensajes.push("El importe debe ser mayor a cero");
            }
        }
        
        if(mensajes.length > 0) {
            DialogHelper.validate(mensajes, null, function(){
                $timeout(function(){
                    angular.element("#nombreCorto").focus();
                }, 0);
            });
        } else {
            var tareaOperacion = $scope.tareaOperacion[$scope.idFacultadLimite];
            if($scope.limiteFacultad.id == null || $scope.limiteFacultad.id == undefined) {
                $scope.limiteFacultad.divisa = angular.copy($scope.moneda.select);
                $scope.limiteFacultad.tareaOperacion = angular.copy(tareaOperacion.tareaOperacion);
                $scope.limiteFacultad.id = (tareaOperacion.limites.length + 1) * -1;
                tareaOperacion.limites.push(angular.copy($scope.limiteFacultad));
            } else {
                for(var i in tareaOperacion.limites) {
                    if(tareaOperacion.limites[i].id == $scope.limiteFacultad.id) {
                        tareaOperacion.limites[i] = $scope.limiteFacultad;
                        break;
                    }
                }
            }
            $scope.gridLimitesFacultad.rowData = tareaOperacion.limites;
            $scope.gridLimitesFacultad.api.onNewRows();
            $scope.cancelarLimite();
        }
    };
    
    $scope.cancelarLimite = function() {
        $scope.moneda.select = {nombre: "Seleccione", id: null}
        $scope.limiteFacultad = {
            "importe": null,
            "estado" : "A"
        };
        $scope.pnlLimiteAgregar = false;
        $scope.pnlLimiteEditar = true;
    };
    
    $scope.agregarLimite = function() {
        $scope.limiteFacultad = {
            "importe": null,
            "estado" : "A"
        };
        $scope.pnlLimiteAgregar = true;
        $scope.pnlLimiteEditar = false;
    };

    $scope.quitarLimite = function() {
        var tareaOperacion = $scope.tareaOperacion[$scope.idFacultadLimite];
        var rows = $scope.gridLimitesFacultad.selectedRows;
        for(var j in rows) {
            var limite = {};
            var size = tareaOperacion.limites.length;
            for(var i = 0; i < size; i++) {
                limite = tareaOperacion.limites[i];
                if(limite != undefined && limite.id == rows[j].id) {
                    tareaOperacion.limites.splice(i, 1);
                    break;
                }
            }
        }
        $scope.gridLimitesFacultad.rowData = tareaOperacion;
        $scope.gridLimitesFacultad.api.onNewRows();
    };
    
    var columnDefsRolesEspeciales = [
        {headerName: "Aplicaci\u00F3n", field: "operacion.aplicacion.nombre", width: 150, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "Transacci\u00F3n", field: "operacion.nombre", width: 150, cellRenderer: GridHelper.campoCompuestoCellRender},
        {headerName: "", field: "id", width: 28, cellRenderer: function(params) {
            var html = '<span class="glyphicon glyphicon-pencil" ng-click="editar(data)"></span>';
            var domElement = document.createElement("a");
            domElement.style.marginLeft = "-2px";
            domElement.href = "javascript: void(0);";
            domElement.innerHTML = html;
            
            params.$scope.editar = function(data){
                $timeout(function(){
                    $scope.descripcionRolEspecial = data.operacion.aplicacion.nombre + " - " + data.operacion.nombre;
                    $scope.idRolEspecial = data.operacion.aplicacion.nombre + data.operacion.nombre;
                    if($scope.operacion[$scope.idRolEspecial] == undefined || $scope.operacion[$scope.idRolEspecial] == null) {
                        $scope.operacion[$scope.idRolEspecial] = {"operacion": data, "usuarios": []};
                            for(var i in $scope.usuarios) {
                                if($scope.usuariosEspeciales[i].operacion.id == data.operacion.id) {
                                    $scope.operacion[$scope.idRolEspecial].usuarios.push($scope.usuariosEspeciales[i]);
                                }
                            }
                        }
                    
                        $scope.gridRolesEspeciales.rowData = $scope.operacion[$scope.idRolEspecial].usuarios;
                        $scope.gridRolesEspeciales.api.onNewRows();
                      
                        if($scope.operacion[$scope.idRolEspecial].usuarios.length == 0 && !$scope.tab4.readOnly) {
                            $scope.agregarLimite();
                        } else {
                            $scope.cancelarLimite();
                        }
                }, 0);
            };
          
            return domElement;
        }},
    ];
    $scope.gridRolesEspeciales = GridHelper.crearGrid({columnDefs: columnDefsRolesEspeciales});
    
}]);