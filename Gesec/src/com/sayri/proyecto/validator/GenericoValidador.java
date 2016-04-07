package com.sayri.proyecto.validator;


public abstract class GenericoValidador<T> implements Validador {

    private static final long serialVersionUID = 1L;
    private String mensaje;
    
    public GenericoValidador() {
        super();
    }

    public GenericoValidador(String mensaje) {
        super();
        this.mensaje = mensaje;
    }

    @Override
    public Validador setMensaje(String mensaje) {
        this.mensaje = mensaje;
        return this;
    }

    @Override
    public String getMensaje() {
        return mensaje;
    }

    @SuppressWarnings("unchecked")
    @Override
    public boolean validar(Object objeto) {
        return _validar((T) objeto);
    }
    
    protected abstract boolean _validar(T objeto);
}