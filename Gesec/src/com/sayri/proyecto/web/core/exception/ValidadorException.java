package com.sayri.proyecto.web.core.exception;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.sayri.proyecto.validator.ErrorValidacion;


public class ValidadorException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private Map<String, List<ErrorValidacion>> errores;
    private Map<String, Map<String, List<ErrorValidacion>>> erroresCompuesto;

    public Map<String, List<ErrorValidacion>> getErrores() {
        if(this.errores == null) {
            this.errores = new LinkedHashMap<String, List<ErrorValidacion>>();
        }
        return errores;
    }

    public void setErrores(Map<String, List<ErrorValidacion>> errores) {
        this.errores = errores;
    }

    public Map<String, Map<String, List<ErrorValidacion>>> getErroresCompuesto() {
        if(this.erroresCompuesto == null) {
            this.erroresCompuesto = new LinkedHashMap<String, Map<String, List<ErrorValidacion>>>();
        }
        return erroresCompuesto;
    }

    public void setErroresCompuesto(Map<String, Map<String, List<ErrorValidacion>>> erroresCompuesto) {
        this.erroresCompuesto = erroresCompuesto;
    }

    public ValidadorException() {
        super();
    }

    public ValidadorException(String message, Throwable cause) {
        super(message, cause);
    }

    public ValidadorException(String message) {
        super(message);
        String validacion = "validacion";
        this.errores = new LinkedHashMap<String, List<ErrorValidacion>>();
        this.errores.put(validacion, new ArrayList<ErrorValidacion>());
        this.errores.get(validacion).add(new ErrorValidacion(validacion, message));
    }

    public ValidadorException(Throwable cause) {
        super(cause);
    }

    public ValidadorException(Map<String, List<ErrorValidacion>> errores) {
        super();
        this.errores = errores;
    }

    public ValidadorException(Map<String, Map<String, List<ErrorValidacion>>> erroresCompuesto, String message) {
        super(message);
        this.erroresCompuesto = erroresCompuesto;
    }
    

}

