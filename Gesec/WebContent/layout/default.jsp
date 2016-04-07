<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="indra" uri="http://www.indra.com.pe/tags" %>
<%@ page language="java" contentType="text/html; charset=UTF8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" ng-app="bonitaApp">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="expires" content="-1"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <tiles:insertAttribute name="script" ignore="true"/>
    <tiles:insertAttribute name="scriptPage" ignore="true"/>
    <title><tiles:insertAttribute name="title" ignore="true"/></title>
</head>
<body>

<div class="ui-widget-overlay-background" data-loading></div>
<div class="ui-widget-overlay" data-loading>
    <div class="loading-center">
        <center>
            <div class="loading">
                <div class="loadingContent">
                    <div class="loadingImage"></div>
                    <span class="loadingText">Cargando...</span>
                </div>
            </div>
        </center>
    </div>
</div>

<div id="layout" class="container" style="display: none;">
    <div>
        <tiles:insertAttribute name="head"/>
        <tiles:insertAttribute name="menu"/>
    </div>
    <div class="well well-lg" style="border: 0px; margin-bottom: 0px;">
        <!-- <div id="body" ng-view></div> -->
        <tiles:insertAttribute name="body"/>
    </div>

    <indra:dialogo id="dialogInfo" cerrar="cancelar()" titulo="Informaci&oacute;n">
        <div class="row" style="margin-bottom: 20px;margin-top: 20px;">
            <table class="ui-messages-info">
                <tr>
                    <td>
                        <img src="${pageContext.request.contextPath}/public/img/dialog/aviso32x32.png">
                    </td>
                    <td style="padding-left: 10px;">
                        <labe style="font-weight: normal;"l>{{mensaje}}</label>
                    </td>
                </tr>
            </table>
        </div>
    </indra:dialogo>

    <indra:dialogo id="dialogConfirm" cerrar="cancelar()" titulo="Confirmaci&oacute;n">
        <div class="row" style="margin-bottom: 20px;margin-top: 20px;">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src="${pageContext.request.contextPath}/public/img/dialog/ayuda32x32.png">
                        </td>
                        <td style="padding-left: 10px;">
                            <label style="font-weight: normal;">{{mensaje}}</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <table class="table-panel table-right">
                <tr>
                    <td>
                        <label class="btn btn-primary" ng-click="aceptar()">Si</label>
                        <label class="btn btn-primary" ng-click="cancelar()">No</label>
                    </td>
                </tr>
            </table>
        </div>
    </indra:dialogo>

    <indra:dialogo id="dialogValidate" cerrar="cancelar()" titulo="Advertencia">
        <div class="row" style="margin-bottom: 20px;margin-top: 20px;">
            <table class="ui-messages-warn">
                <tr>
                    <td>
                        <img src="${pageContext.request.contextPath}/public/img/dialog/alerta32x32warn.png">
                    </td>
                    <td style="padding-left: 10px;">
                        <label style="font-weight: normal;" ng-repeat="linea in mensaje">{{linea}}</label>
                    </td>
                </tr>
            </table>
        </div>
    </indra:dialogo>
    
    <indra:dialogo id="dialogWarning" cerrar="cancelar()" titulo="Advertencia">
        <div class="row" style="margin-bottom: 20px;margin-top: 20px;">
            <table class="ui-messages-warn">
                <tr>
                    <td>
                        <img src="${pageContext.request.contextPath}/public/img/dialog/alerta32x32warn.png">
                    </td>
                    <td style="padding-left: 10px;">
                        <label style="font-weight: normal;">{{mensaje}}</label>
                    </td>
                </tr>
            </table>
        </div>
    </indra:dialogo>
    
    <indra:dialogo id="dialogError" cerrar="cancelar()" titulo="Error">
        <div class="row" style="margin-bottom: 20px;margin-top: 20px;">
            <table class="ui-messages-error">
                <tr>
                    <td>
                        <img src="${pageContext.request.contextPath}/public/img/dialog/activado32x32.png">
                    </td>
                    <td style="padding-left: 10px;">
                        <label style="font-weight: normal;">{{mensaje}}</label>
                    </td>
                 </tr>
                 <tr ng-hide="mostrarDetalle">
                    <td></td>
                    <td style="padding-left: 10px;">
                        Error: <label>{{error}}</label></br>
                        Detalle:
                        <div class="row" style="max-height: 250px; width: 350px; overflow: auto;">
                            <div class="row" ng-repeat="linea in detalle">{{linea.className}}.{{methodName}} ({{linea.lineNumber}})</div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="row">
            <table class="table-panel table-right">
                <tr>
                    <td>
                        <label class="btn btn-primary" ng-click="verDetalle()">
                            <span class="glyphicon glyphicon-menu glyphicon-floppy-disk"></span>{{etiqueta}}
                        </label>
                    </td>
                </tr>
            </table>
        </div>
    </indra:dialogo>
    
    <tiles:insertAttribute name="foot"/>
</div>

</body>
</html>