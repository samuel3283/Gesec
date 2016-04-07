<div id="menu">
    <div class="btn-group dropdown-first" uib-dropdown>
        <button id="mnuPefilado" type="button" class="btn btn-primary btn-first-child" uib-dropdown-toggle>
            <span class="glyphicon glyphicon-menu glyphicon-user"></span>Perfilado<span class="caret"></span>
        </button>
        <ul class="uib-dropdown-menu" role="menu" aria-labelledby="mnuPerfilado">
            <li role="menuitem" id="mnuPuesto"><a href="<%=request.getContextPath()%>/puesto.html">Puesto</a></li>
            <li role="menuitem" id="mnuClonacion"><a href="<%=request.getContextPath()%>/puesto/clonar.html">Clonaci&oacute;n</a></li>
        </ul>
    </div>
    <div class="btn-group" uib-dropdown>
        <button id="mnuMantenimiento" type="button" class="btn btn-primary" uib-dropdown-toggle>
            <span class="glyphicon glyphicon-menu glyphicon-credit-card"></span>Mantenimiento<span class="caret"></span>
        </button>
        <ul class="uib-dropdown-menu" role="menu" aria-labelledby="mnuMantenimiento">
            <li role="menuitem" id="mnuUsuario"><a href="<%=request.getContextPath()%>/mantenimiento/usuario.html">Usuarios</a></li>
            <li role="menuitem" id="mnuTarea"><a href="<%=request.getContextPath()%>/mantenimiento/tarea.html">Tareas</a></li>
            <li role="menuitem" id="mnuAplicacion"><a href="<%=request.getContextPath()%>/mantenimiento/aplicacion.html">Aplicaciones</a></li>
            <li role="menuitem" id="mnuTransaccion"><a href="<%=request.getContextPath()%>/mantenimiento/transaccion.html">Transacciones</a></li>
            <li role="menuitem" id="mnuFacultad"><a href="<%=request.getContextPath()%>/mantenimiento/facultad.html">Facultades</a></li>
            <li role="menuitem" id="mnuRol"><a href="<%=request.getContextPath()%>/mantenimiento/rol.html">Roles (Distribuido)</a></li>
            <li class="divider" id="mnuDivider1"></li>
            <li role="menuitem" id="mnuArea"><a href="<%=request.getContextPath()%>/mantenimiento/area">&Aacute;rea</a></li>
        </ul>
    </div>
    <div class="btn-group" uib-dropdown>
        <button id="mnuAdministracion" type="button" class="btn btn-primary" uib-dropdown-toggle>
            <span class="glyphicon glyphicon-menu glyphicon-cog"></span>Administraci&oacute;n<span class="caret"></span>
        </button>
        <ul class="uib-dropdown-menu" role="menu" aria-labelledby="mnuAdministracion">
            <!--
            <li role="menuitem" id="mnuRol"><a href="<%=request.getContextPath()%>/administracion/rol.html">Roles</a></li>
            <li role="menuitem" id="mnuComponente"><a href="<%=request.getContextPath()%>/administracion/componente.html">Componentes</a></li>
            <li role="menuitem" id="mnuTipoComponente"><a href="<%=request.getContextPath()%>/administracion/tipocomponente.html">Tipos de Componente</a></li>
            <li class="divider" id="mnuDivider2"></li>
            -->
            <li role="menuitem" id="mnuParametro"><a href="<%=request.getContextPath()%>/administracion/parametro.html">P&aacute;rametros</a></li>
            <li role="menuitem" id="mnuCatalogoTabla"><a href="<%=request.getContextPath()%>/administracion/catalogotabla.html">Cat&aacute;logo de Tablas</a></li>
        </ul>
    </div>
</div>