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
    
	<style>	
	.simple {
	    height: 100%;
	    width: 100%;
	    border:1px solid silver;
	}
	.simple div {
	    overflow: auto
	}
	.vsplitbar {
	    width: 5px;
	    background: #cab
	}
	.vsplitbar:hover{
	    background: #eab
	}

	.simple2 {
	    height: 100%;
	    width: 100%;
	    display: block;
	    /* visiblity: 'hidden';*/
	    
	}
	.simple2 div {
	    overflow: auto
	}

	.simple3 {
	    height: 100%;
	    width: 100%;
	    /* visiblity: 'hidden';*/	    
	}
	.simple3 div {
	    overflow: auto
	}


	.demo { 
	border:1px solid silver; 
	width: 200px;
	}

	.der {
	    border:2px solid silver;
	}
	.izq {
	    border:2px solid silver;
	}
      
      /*
    .rigthPane2 {
	    border:2px solid silver;
	}  */
      
      
      
	#splitterContainer {/* Main splitter element */
	height:95%;width:100%;margin:0;padding:0;margin-top:0px;
	}
	#splitterContainer2 {/* Main splitter element */
	height:95%;
	width:100%;
	margin:0;
	padding:0;
	margin-top:0px;
	/*display:none; */ /* NUEVO */
	
	}
	
	#leftPane{
	float:left;width:15%;height:100%;border-top:solid 0px #9cbdff;
	/*background:#c4dcfb;*/
	overflow: auto;
	margin:0px;padding:0px;
	padding-top: 0px;
	margin-top: 0px;
	}
	#leftPane2{
	float:left;width:15%;height:100%;border-top:solid 0px #9cbdff;
	/*background:#c4dcfb;*/
	overflow: auto;
	}
	#rightPane{	/*Contains toolbar and horizontal splitter*/
	float:right;width:85%;height:100%;
	/*background:#f4f4f4;*/
	}
	#rightPane2{	/*Contains toolbar and horizontal splitter*/
	float:right;width:85%;height:100%;
	/*background:#f4f4f4;*/
	}
	#rightSplitterContainer{/*horizontal splitter*/	
	width:100%;
	height:100%;
	background:#FFFFFF;border-top:solid 2px #aa88ff;  /*#9cbdff;*/
	margin:0px;
	padding:0px;
	padding-top: 0px;
	margin-top: 0px;
	} 
	
	#rightTopPane{/*Top nested in horizontal splitter */
	width:100%;height:100%;overflow:auto;background:#f4f4f4;
	margin:0px;
	padding:0px;
	padding-top: 0px;
	margin-top: 0px;
	}
	#rightBottomPane{/*Bottom nested in horizontal splitter */
	display:none;    /* NUEVO */
	/*background:#f4f4f4;*/
	width:100%;
	height:50%;
	overflow:auto;
	margin:0px;
	padding:0px;
	padding-top: 0px;
	margin-top: 0px;
	}
	
	
	/* Splitbar styles; these are the default class names and required styles */
	.splitbarV {
	float:left;width:6px;height:100%;
	line-height:0px;font-size:0px;
	border-left:solid 1px #9cbdff;border-right:solid 1px #9cbdff;
	background:#cbe1fb url(img/panev.gif) 0% 50%;
	}
	.splitbarH {
	height:6px;text-align:left;line-height:0px;font-size:0px;
	border-top:solid 1px #9cbdff;border-bottom:solid 1px #9cbdff;
	background:#cbe1fb url(img/paneh.gif) 50% 0%;
	}
	
	.splitbuttonV{
	margin-top:-41px;margin-left:-4px;top:50%;position:relative;
	height:83px;width:10px;
	background:transparent url(img/panevc.gif) 10px 50%;
	}
	.splitbuttonV.invert{
	margin-left:0px;background:transparent url(img/panevc.gif) 0px 50%;
	}
	.splitbuttonH{
	margin-left:-41px;left:50%;position:relative;
	height:10px !important;width:83px;
	background:transparent url(img/panehc.gif) 50% 0px;
	}
	.splitbuttonH.invert{
	margin-top:-4px;background:transparent url(img/panehc.gif) 50% -10px;
	}
	.splitbarV.working,.splitbarH.working,.splitbuttonV.working,.splitbuttonH.working{
	 -moz-opacity:.50; filter:alpha(opacity=50); opacity:.50;
	}
      
	</style>

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

<!-- 
<div id="layout" class="container" style="display: none;">
 -->


    <div>
        <tiles:insertAttribute name="head"/>
        <tiles:insertAttribute name="menu"/>
    </div>

	<!-- margin-bottom: 0px;  style="border: 1px; width: 150px;  float: left; "-->
	
	
		<div id="rightSplitterContainer" style="height:95%">
		
		<div id="rightTopPane">
		
			<div id="splitterContainer">
			
			<div id="leftPane">  <tiles:insertAttribute name="izquierda"/>		</div>
			<div id="rigthPane"> <tiles:insertAttribute name="body"/> 			</div>
			
			</div>
		
		</div>
			
			<!-- #rightTopPane-->
		<div id="rightBottomPane">
		
			<!-- style="align:left; float:left; " -->
			<div id="splitterContainer2">
			<div id="leftPane2">  <tiles:insertAttribute name="izquierda2"/>		</div>
			<div id="rigthPane2"> <tiles:insertAttribute name="body2"/> 			</div>
				
			</div>

		</div>

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

<!-- 
</div>
 -->

</body>
</html>