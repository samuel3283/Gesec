package com.sayri.proyecto.service;

import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sayri.proyecto.dao.UsuarioDAO;
import com.sayri.proyecto.entidad.Usuario;
import com.sayri.proyecto.util.Constante;
import com.sayri.proyecto.validator.GestorDeValidaciones;
import com.sayri.proyecto.web.core.exception.ValidadorException;


@Service("usuarioService")
@Transactional
public class UsuarioService {
    private static final long serialVersionUID = 1L;
    private GestorDeValidaciones gestorValidacion = new GestorDeValidaciones();
    private static final Logger LOG = Logger.getLogger(UsuarioService.class);
    
    private UsuarioDAO usuarioDAO;
    
    @Autowired
    public void setUsuarioDAO(@Qualifier("usuarioDAO") UsuarioDAO usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }

    @PostConstruct
    public void inicializando()  {
    	LOG.info("Inicia constructor.");
    	try {
    	gestorValidacion.registrarPropiedad("usuario", true, Constante.REQUERIDO.format(new String[]{"usuario"}))
            .addLongitud(5L, 3L, Constante.MAXIMO_CARACTERES.format(new String[]{"El nombre", "25"}));
	    } catch (ValidadorException e) {
	        LOG.error("Error al inicializar el gestor de validaciones", e);
	    }
    }

    
    @Transactional(readOnly = true)
    public List<Usuario> buscar(Usuario item) {
    	LOG.info("buscar");
    	return this.usuarioDAO.ejecutarConsulta();
    }
    
    
}
