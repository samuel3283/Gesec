<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ attribute name="id" required="true" rtexprvalue="true" %>
<%@ attribute name="cerrar" required="true" rtexprvalue="true" %>
<%@ attribute name="titulo" required="false" rtexprvalue="true" %>
<%@ attribute name="tituloModel" required="false" rtexprvalue="true" %>

<script type="text/ng-template" id="${id}.html">
    <div class="c-contenedores-ventanaModal">
        <div class="contenidoModal">
            <div class="closethick">
                <a href="javascript: void(0);" ng-click="${cerrar}">
                    <span class="ui-icon ui-icon-closethick"/>
                </a>
            </div>
            <div class="titulo">
                <c:if test="${titulo != null}">${titulo}</c:if>
                <c:if test="${tituloModel != null}">{{${tituloModel}}}</c:if>
            </div>
            <div class="cuerpoModal">
                <jsp:doBody></jsp:doBody>
            </div>
        </div>
    </div>
</script>