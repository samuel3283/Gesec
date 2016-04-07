package com.sayri.proyecto.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;

import com.sayri.proyecto.entidad.Usuario;
import com.sayri.proyecto.web.core.service.FilterService;
import com.sayri.proyecto.web.listener.WebServletContextListener;




public class SessionFilter implements Filter {

    private static final Logger LOG = Logger.getLogger(SessionFilter.class);
    private static String NO_AUTORIZADO;
    private static String INICIAR_SESION;
    private static String CERRAR_SESION;
    private static String USUARIO_EN_SESION;
    private FilterService filterService = null;
    
    public static String getUrlCerrarSesion() {
        return CERRAR_SESION;
    }

    @Override
    public void destroy() {
        LOG.info("destroy");
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    	LOG.info("SesionFilter.init.");
        INICIAR_SESION = config.getInitParameter("SIGN_IN");
        CERRAR_SESION = config.getInitParameter("SIGN_OUT");
        NO_AUTORIZADO = config.getInitParameter("NOT_AUTHORIZED");
        USUARIO_EN_SESION = config.getInitParameter("USUARIO_EN_SESION");

        LOG.info("==>INICIAR_SESION:"+INICIAR_SESION+
        		"==>CERRAR_SESION:"+CERRAR_SESION+
        		"==>NO_AUTORIZADO:"+NO_AUTORIZADO+
        		"==>USUARIO_EN_SESION:"+USUARIO_EN_SESION+
        		"==>FILTER_SERVICE:"+config.getInitParameter("FILTER_SERVICE")
        		);
        
        try {
            filterService = WebServletContextListener.getBean(config.getInitParameter("FILTER_SERVICE"));
        } catch (Exception e) {
            LOG.error("FilterService no implementado", e);
        }
    }

    public String loadUser(HttpServletRequest request) {
    	 LOG.info("==>SesionFilter  loadUser:");
    	 String result = request.getRequestURI();
         
    	 
    	 Usuario currentUser = new Usuario();
        // ServiciosSeguridadBBVA ssBbva = null;
        String codigoUsuario = "";

        try {
            //ssBbva = new ServiciosSeguridadBBVA(request);
            String ssBbva = null;
        	if (ssBbva != null) {
                //ssBbva.obtener_ID();
            }
        	
            //if (ssBbva.getUsuario() != null) {
        	if (ssBbva != null) {
                //codigoUsuario = ssBbva.getUsuario().toUpperCase();

                if (filterService != null) {
                    currentUser = filterService.loadUser(codigoUsuario);
                }
            } else {
                LOG.info("3333.");
                //currentUser.getRoles().add(new RolSistema(Constante.USUARIO_DE_ESTRUCTURAS, Constante.USUARIO_DE_ESTRUCTURAS));
                
                currentUser.setNombre("-------");
                currentUser.setUsuario("Anonimo");
                
                //currentUser.setRolActual(currentUser.getRoles().get(0));
                
                Usuario usuarioAutentificado = WebServletContextListener.getBean("usuarioAutentificado");
                BeanUtils.copyProperties(currentUser, usuarioAutentificado);
             
            }
        	LOG.info("44444.");
            request.getSession().setAttribute(USUARIO_EN_SESION, currentUser);
            
        } catch (Exception e) {
            LOG.error("Error al inciar la sesion", e);
            result = NO_AUTORIZADO;
        }
        

        return result;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {

    	HttpServletRequest request = (HttpServletRequest) req;
        String url = request.getRequestURI();
        String[] tmp = request.getRequestURL().toString().split(request.getContextPath());
        String path = tmp[0] + request.getContextPath() + "/";

        LOG.info("filter;;;==>INICIAR_SESION:"+INICIAR_SESION+
        		"==>CERRAR_SESION:"+CERRAR_SESION+
        		"==>NO_AUTORIZADO:"+NO_AUTORIZADO+
        		"==>USUARIO_EN_SESION:"+USUARIO_EN_SESION+
        		"==>URL:"+url+
        		"==>path::"+path
        		);
        
        if (url.indexOf(NO_AUTORIZADO) != -1 && (url.substring(url.length() - NO_AUTORIZADO.length(), url.length()).equalsIgnoreCase(NO_AUTORIZADO) || url.indexOf(";jsessionid=") > -1)) {
            LOG.info("1");
        	chain.doFilter(req, resp);
        } else if (INICIAR_SESION != null && url.indexOf(INICIAR_SESION) != -1 && (url.substring(url.length() - INICIAR_SESION.length(), url.length()).equalsIgnoreCase(INICIAR_SESION) || url.indexOf(";jsessionid=") > -1)) {
            LOG.info("2");
            chain.doFilter(req, resp);
        } else if (CERRAR_SESION != null && url.indexOf(CERRAR_SESION) != -1 && url.substring(url.length() - CERRAR_SESION.length(), url.length()).equalsIgnoreCase(CERRAR_SESION)) {
            LOG.info("3");
            request.getSession().invalidate();
            LOG.error("Sesion invalidada [" + path + CERRAR_SESION + "]");
            chain.doFilter(req, resp);
        } else {
            LOG.info("4");

            if (request.getSession().getAttribute(USUARIO_EN_SESION) != null) {
                LOG.info("5");
                chain.doFilter(req, resp);
            } else {
                LOG.info("6");
                if (NO_AUTORIZADO.equalsIgnoreCase(loadUser(request))) {
                    LOG.error("Forward.. [" + path + NO_AUTORIZADO + "]");
                    request.getRequestDispatcher(NO_AUTORIZADO).forward(req, resp);
                } else {
                    //if(((Usuario) request.getSession().getAttribute(USUARIO_EN_SESION)).getRolActual() != null) {
                	if(((Usuario) request.getSession().getAttribute(USUARIO_EN_SESION)).getUsuario() != null) {
                        LOG.info("7");
                        chain.doFilter(req, resp);
                    } else {
                        LOG.error("Forward... [" + path + CERRAR_SESION + "]");
                        request.getSession().removeAttribute(USUARIO_EN_SESION);
                        request.getRequestDispatcher(CERRAR_SESION).forward(req, resp);
                    }
                }
            }
        }
	
    }
}
