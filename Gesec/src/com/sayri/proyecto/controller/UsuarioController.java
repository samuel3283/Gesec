package com.sayri.proyecto.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sayri.proyecto.entidad.Usuario;
import com.sayri.proyecto.model.UsuarioModel;
import com.sayri.proyecto.service.UsuarioService;
import com.sayri.proyecto.util.AbstractController;
import com.sayri.proyecto.web.model.Model;
import com.sayri.proyecto.web.model.TipoResultado;


@Controller("usuarioControlador")
@Scope("prototype")
@RequestMapping(value = "mantenimiento/usuario")
public class UsuarioController /*extends ScrudController<Usuario, UsuarioModel> */  
extends AbstractController
{
	//public class UsuarioController extends AbstractController {

    private static final Logger LOG = Logger.getLogger(UsuarioController.class);
    private static final long serialVersionUID = 1L;

    private UsuarioService usuarioService;
    @Autowired
    public void setUsuarioService(@Qualifier("usuarioService") UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    
    @RequestMapping(value = "mantenimiento/catalogotabla")
    public String valores() {
    	LOG.info("valores......");
        return "mantenimiento/usuario";
    }
    
    @RequestMapping(value = "mantenimiento/catalogotabla/listarCatalogo")
    public String valores2() {
    	LOG.info("valores.2.....");
        return "mantenimiento/usuario";
    }
    
    
    @RequestMapping(value = "")
    public String index() {
        return "mantenimiento/usuario";
    }
    

    
    
    //@RequestMapping(value = "buscar", method = {RequestMethod.POST, RequestMethod.GET})
    @RequestMapping(value = "buscar", method = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.GET})
    @ResponseBody
    public String buscar(@RequestBody Model<Usuario> modelRequest, BindingResult bindingResult) {
    //public String buscar(@RequestBody UsuarioModel modelRequest, BindingResult bindingResult) {
    	String resultado="";
    	LOG.info("buscar......");
    	List<Usuario> lista = usuarioService.buscar(new Usuario());
    	LOG.info("buscar......"+lista.size());
    	LOG.info("buscar getcLASS......"+modelRequest.getEntidad().getClass());
    	//LOG.info("buscar......"+modelRequest.getNombre());
    	//LOG.info("buscar......"+modelRequest.getEntidad());
    	/*
    	for(int z=0;z<lista.size();z++) {
    		LOG.info("<"+z+"> buscar......"+lista.get(z).getUsuario());    		
    	}*/
    	
        Model<Usuario> modelResponse = new Model<Usuario>(new Usuario());
        modelResponse.setEntidad((Usuario) modelRequest.getEntidad());
        //modelResponse.setEntidad(modelRequest);
        modelResponse.setListaEntidades(lista);
        resultado = imprimir(modelResponse);
        
        if(modelResponse.getListaEntidades().isEmpty()) {
            modelResponse.setTipoResultado(TipoResultado.SIN_REGISTROS);
        }
        
        LOG.info("resultado......"+resultado);
    	
    	return resultado;
    }
    
}
