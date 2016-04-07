<%@ attribute name="titulo" required="true" rtexprvalue="true" %>
<%@ attribute name="buscar" required="true" rtexprvalue="true" %>
<%@ attribute name="limpiar" required="true" rtexprvalue="true" %>
<%@ attribute name="nuevo" required="true" rtexprvalue="true" %>
<%@ attribute name="nuevoHide" required="false" rtexprvalue="true" %>
<%@ attribute name="eliminar" required="true" rtexprvalue="true" %>
<%@ attribute name="eliminarHide" required="false" rtexprvalue="true" %>
<%@ attribute name="grid" required="true" rtexprvalue="true" %>

<%@ attribute name="htmlCompuesto" required="false" rtexprvalue="true" %>

<div class="indra-panel-buscar">
    <h1><small>${titulo}</small></h1>
    <div class="row">
        <fieldset>
            <legend>Criterios de B&uacute;squeda</legend>
            <div>
                <jsp:doBody></jsp:doBody>
            </div>
            <table class="table-panel table-right">
                <tr>
                    <td>
<label class="btn btn-primary" ng-click="${buscar}"><span class="glyphicon glyphicon-menu glyphicon-search"></span>Buscar</label>
<label class="btn btn-primary" ng-click="${limpiar}"><span class="glyphicon glyphicon-menu glyphicon-erase"></span>Limpiar</label>
<label class="btn btn-primary" ng-click="${nuevo}" ng-hide="${nuevoHide}"><span class="glyphicon glyphicon-menu glyphicon-duplicate"></span>Nuevo</label>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="row" style="height:5px;">&nbsp;</div>
    <div class="row">
        <fieldset>
            <legend>Resultado</legend>
            <div class="row">
                <table class="table-panel table-right">
                    <tr>
                        <td>
                            ${htmlCompuesto}
                            <label class="btn btn-primary" ng-click="${eliminar}" ng-hide="${eliminarHide}">
                                <span class="glyphicon glyphicon-menu glyphicon-trash"></span>Eliminar
                            </label>
                        </td>
                   </tr>
                </table>
            </div>
            <div class="row">
                <div class="grid-panel" style="height: 250px; width:850px;" ag-grid="${grid}"></div>
            </div>
        </fieldset>
    </div>
</div>