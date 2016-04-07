package com.sayri.proyecto.validator;

import java.io.Serializable;

public class ErrorValidacion implements Serializable {

    private static final long serialVersionUID = 1L;
    private String validacion;
    private String mensaje;

    public ErrorValidacion(String validacion, String mensaje) {
        super();
        this.validacion = validacion;
        this.mensaje = mensaje;
    }

    public String getValidacion() {
        return validacion;
    }

    public void setValidacion(String validacion) {
        this.validacion = validacion;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

}