package com.sayri.proyecto.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sayri.proyecto.entidad.Usuario;
import com.sayri.proyecto.validator.UsuarioValidation;


@Controller("loginControlador")
@Scope("prototype")
//@RequestMapping(value = "login")
public class LoginController {
	
    private static final long serialVersionUID = 1L;
    private static final Logger LOG = Logger.getLogger(LoginController.class);
    
    @Autowired
    private UsuarioValidation usuarioValidation;

	public void setUsuarioValidation(@Qualifier("usuarioValidation") UsuarioValidation usuarioValidation) {
		this.usuarioValidation = usuarioValidation;
	}

	
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public String index(@ModelAttribute("usuario") Usuario usuario, ModelMap model, HttpServletRequest request, HttpServletResponse response) {
        LOG.info("LoginController  metodo index");
    	//model.addAttribute("nuevoHide", "false");
        return "common/login";
    }
	

    @RequestMapping(value = "validar", method = RequestMethod.POST)
    public String validar(@Valid @ModelAttribute("usuario") Usuario usuario, BindingResult result) {
        LOG.info("LoginController  metodo login/validar");
        LOG.info("validar:: "+usuario.getPassword());
        
        usuarioValidation.validate(usuario, result);
        
        LOG.info("hasErrors:: "+result.hasErrors());
        
		if (result.hasErrors()) { 
	        LOG.info("error::: "+result.hasErrors());
	        return "common/login";
			//return null;
		} else {
			return "common/principal"; 
		} 
        
        
    }

	
}
