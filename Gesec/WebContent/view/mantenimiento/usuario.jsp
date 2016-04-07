<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="indra" uri="http://www.indra.com.pe/tags" %>
<tiles:insertDefinition name="default">
    <tiles:putAttribute name="body">
        <script type="text/javascript" src="${pageContext.request.contextPath}/public/src/controllers/UsuarioController.js"></script>
        <div ng-controller="UsuarioController">
            <indra:buscar 
                titulo="Mantenimiento de Usuario" 
                buscar="buscar()" 
                nuevo="nuevo()" 
                eliminar="eliminar()" 
                limpiar="limpiar()"
                grid="gridTarea">
			    <table class="table-panel">
			        <tr>
			            <td>Nombre:&nbsp;</td>
			            <td><input type="text" class="form-control" ng-model="usuario.nombre"/></td>
			            <td class="separator"></td>
			            <td>Estado:&nbsp;</td>
			            <td>
			                <ui-select 
			                    ng-model="estado.select"
			                    on-select="estado.onSelect($item, $model)"
			                    theme="select2" 
			                    style="width: 220px;" 
			                    class="form-control">
			                    <ui-select-match placeholder="Seleccione">
			                        {{$select.selected.value}}
			                    </ui-select-match>
			                    <ui-select-choices repeat="item in estados | filter: $select.search">
			                        <div ng-bind-html="item.value | highlight: $select.search"></div>
			                    </ui-select-choices>
			                </ui-select>
			            </td>
			        </tr>
			    </table>
            </indra:buscar>
        </div>
        
        <indra:dialogo id="dialogUsuario" cerrar="cancelar()" titulo="Registro de Usuario">
            <br/>
            	<div class="row" style="width: 95%; height: 250px; margin-bottom: 15px;">
            	
	            <table class="table-panel">
	                <tr>
	                    <td>C&oacute;digo:</td>
	                    <td><span type="text" class="form-control">{{usuario.id}}</span></td>
	                </tr>
	                <tr>
	                    <td>Nombre:</td>
	                    <td><input type="text" class="form-control" ng-model="usuario.nombre" /></td>
	                </tr>
	                <tr>
	                    <td>Estado:</td>
	                    <td>
	                        <ui-select 
	                            ng-model="estado.select"
	                            on-select="estado.onSelect($item, $model)"
	                            theme="select2" 
	                            style="width: 220px;" 
	                            class="form-control">
	                            <ui-select-match placeholder="Seleccione">
	                                {{$select.selected.value}}
	                            </ui-select-match>
	                            <ui-select-choices repeat="item in estados | filter: $select.search">
	                                <div ng-bind-html="item.value | highlight: $select.search"></div>
	                            </ui-select-choices>
	                        </ui-select>
	                    </td>
	                </tr>
	            </table>
	            </div>
	            <div class="row">
		            <table class="table-panel table-right">
		                <tr>
		                    <td>
		                        <label class="btn btn-primary" ng-click="guardar()">
		                            <span class="glyphicon glyphicon-menu glyphicon-floppy-disk"></span>Guardar
		                        </label>
		                        <label class="btn btn-primary" ng-click="cancelar()">
		                            <span class="glyphicon glyphicon-menu glyphicon-remove"></span>Cancelar
		                        </label>
		                    </td>
		                </tr>
		            </table>
            	</div>
        </indra:dialogo>        
        
        
        <indra:dialogo id="dialogAplicacionporTarea" cerrar="cancelar()" titulo="Registro de Usuario">
            <br/>
            	<div class="row" style="width: 95%; height: 250px; margin-bottom: 15px;">
		            <table class="table-panel">
		                <tr>
		                    <td>Usuario:</td>
		                    <td><input type="text" class="form-control" ng-model="usuario.nombre" disabled="true" /></td>
		                </tr>
	
		            </table>
	            </div>
	            <div class="row">
		            <table class="table-panel table-right">
		                <tr>
		                    <td>
		                        <label class="btn btn-primary" ng-click="guardar()">
		                            <span class="glyphicon glyphicon-menu glyphicon-floppy-disk"></span>Guardar
		                        </label>
		                        <label class="btn btn-primary" ng-click="cancelar()">
		                            <span class="glyphicon glyphicon-menu glyphicon-remove"></span>Cancelar
		                        </label>
		                    </td>
		                </tr>
		            </table>
            	</div>
        </indra:dialogo>         
        
        
    </tiles:putAttribute>
</tiles:insertDefinition>