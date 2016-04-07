package com.sayri.proyecto.web.model;

public enum TipoResultado {

    ADVERTENCIA("ADVERTENCIA"),
    CONFLICTO("CONFLICTO"),
    EXITO("EXITO"),
    ERROR("ERROR"),
    ERROR_SISTEMA("ERROR_SISTEMA"),
    NINGUNO("NINGUNO"),
    PREGUNTA("PREGUNTA"),
    SIN_PERMISOS("SIN_PERMISOS"),
    SIN_REGISTROS("SIN_REGISTROS"),
    VALIDACION("VALIDACION");

    private String tipoResultado;

    TipoResultado(String tipoResultado) {
        this.tipoResultado = tipoResultado;
    }

    @Override
    public String toString() {
        return tipoResultado;
    }
}
