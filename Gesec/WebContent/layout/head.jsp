<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="head">
    <div class="panelCabecera">
    
        <div class="panelUser">
    
            <div class="panelUserBuscar">
                <!--
                <span class="ayuda">Ayuda</span>
                <span class="soporte">Soporte</span>
                <span>Buscar</span>
                 -->
                <c:if test="${sessionScope.__current_user__ != null}">
                    <span>Hola, 
                        <span class="username">${sessionScope.__current_user__.usuario}</span>
                    </span>
                    <a href="${pageContext.request.contextPath}/signOut.html"><span>Desconectar</span>&nbsp;<span
                            class="ui-icon ui-icon-bbva-close">&nbsp;&nbsp;&nbsp;</span></a>
                </c:if>
            </div>
        </div>
        <!-- 
        <div class="panelTitle"><span>Sistema de Perfilado.</span></div>
         -->
    </div>
</div>