package com.sayri.proyecto.validator;

import java.io.Serializable;


public interface Validador extends Serializable {
    
    Validador setMensaje(String mensaje);
    
    String getMensaje();
    
    String getNombreValidacion();
    
    boolean validar(Object objeto);
}
