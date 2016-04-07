package com.sayri.proyecto.validator;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.log4j.Logger;

import com.sayri.proyecto.web.core.exception.ValidadorException;


public class GestorDeValidaciones implements Serializable {

    private static final Logger LOG = Logger.getLogger(GestorDeValidaciones.class);
    private static final long serialVersionUID = 1L;
    private static GestorDeValidaciones instancia;
    private Map<String, Boolean> propiedadesRequeridas;
    private Map<String, String> mensajesRequeridos;
    private Map<String, Validadores> validadoresRegistradas;
    
    public GestorDeValidaciones() {
        super();
        validadoresRegistradas = new LinkedHashMap<String, Validadores>();
        propiedadesRequeridas = new LinkedHashMap<String, Boolean>();
        mensajesRequeridos = new LinkedHashMap<String, String>();
    }

    public static GestorDeValidaciones getInstancia() {
        if(instancia == null) {
            instancia = new GestorDeValidaciones();
        }
        
        return instancia;
    }
    
    public Validadores registrarPropiedad(String propiedad) {
        return this.registrarPropiedad(propiedad, false, "El campo es obligatorio");
    }
    
    public Validadores registrarPropiedad(String propiedad, boolean requerido, String mensajeRequerido) {
        Validadores validador = new Validadores();
        if(!validadoresRegistradas.containsKey(propiedad)) {
            validadoresRegistradas.put(propiedad, validador);
            propiedadesRequeridas.put(propiedad, requerido);
            mensajesRequeridos.put(propiedad, mensajeRequerido);
        } else {
            LOG.info("[" + propiedad + "] -> Propiedad registrada");
        }
        return validador;
    }
    
    private Object obtenerValor(Object objeto, String propiedad) {
        Object valorPropiedad = null;
        try {
            valorPropiedad = PropertyUtils.getNestedProperty(objeto, propiedad);
        } catch (Exception e) {
            LOG.info("No se puedo obtener el valor de la propiedad [" + propiedad + "]");
            LOG.debug("Error:", e);
        }
        return valorPropiedad;
    }
    
    private List<ErrorValidacion> ejecutarValidacion(Object objeto, String propiedad, Validadores validadoresAdicionales) {
        boolean requerido = propiedadesRequeridas.get(propiedad);
        List<Validador> validadores = new ArrayList<Validador>(validadoresRegistradas.get(propiedad).getValidadores());
        if(validadoresAdicionales != null) {
            validadores.addAll(validadoresAdicionales.getValidadores());
        }
        List<ErrorValidacion> errores = new ArrayList<ErrorValidacion>();
        if((objeto == null || (objeto instanceof String && objeto.toString().isEmpty()) )&& requerido) {
            errores.add(new ErrorValidacion("requerido", mensajesRequeridos.get(propiedad)));
        } else if(objeto != null){
            for(Validador validador : validadores) {
                if(!validador.validar(objeto)) {
                    errores.add(new ErrorValidacion(validador.getNombreValidacion(), validador.getMensaje()));
                }
            }
        }
        

        
        return errores;
    }

    public void ejecutarValidacion(Object objeto) throws ValidadorException {
        Map<String, List<ErrorValidacion>> errores = this.validar(objeto);
        if(!errores.isEmpty()) {
            throw new ValidadorException(errores);
        }
    }
    
    public Map<String, List<ErrorValidacion>> validar(Object objeto) {
        return validar(objeto, new LinkedHashMap<String, Validadores>());
    }
    
    public Map<String, List<ErrorValidacion>> validar(Object objeto, Map<String, Validadores> validadoresAdicionales) {
        Map<String, List<ErrorValidacion>> resultado = new LinkedHashMap<String, List<ErrorValidacion>>();
        Object valorPropiedad;
        List<ErrorValidacion> errores;
        
        if(objeto != null) {
            for(String propiedad : validadoresRegistradas.keySet()) {
                valorPropiedad = obtenerValor(objeto, propiedad);
                errores = ejecutarValidacion(valorPropiedad, propiedad, validadoresAdicionales.get(propiedad));
                if(!errores.isEmpty()) {
                    resultado.put(propiedad, errores);
                }
            }
        }
        
        return resultado;
    }
}