<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<tiles:insertDefinition name="default">

    <tiles:putAttribute name="body">
        <table align="center" border="1">
            <tr>
                <td>
                <a href="javascript:onclick=mostrar()"> + </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="javascript:onclick=ocultar()"> - </a>
                <br>
                <br>
                <input type="button" id="mostrar" name="boton1" value="Click para mostrar elementos">
				<input type="button" id="ocultar" name="boton2" value="Click pora ocultar elementos">
                <br>
                  <!-- 
                    <img src="${pageContext.request.contextPath}/public/img/marca/fondo.png" style="margin: auto;"/>
				   -->
				   A<br>
				   B<br>
				   C<br>
				   D<br>
				   E<br>
				   F<br>
				   F<br>
				   H<br>
				   I<br>
				   J<br>
				   
                </td>
            </tr>
        </table>
    </tiles:putAttribute>
</tiles:insertDefinition>