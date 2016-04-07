package com.sayri.proyecto.validator;

public class FormatoValidador extends GenericoValidador<String> {

    private static final long serialVersionUID = 1L;
    private String patron;
    
    public FormatoValidador() {
        super();
    }

    public FormatoValidador(String patron, String mensaje) {
        super(mensaje);
        this.patron = patron;
    }

    @Override
    public String getNombreValidacion() {
        return "formato";
    }

    public String getPatron() {
        if(patron == null) {
            patron = ".*";
        }
        return patron;
    }

    public void setPatron(String patron) {
        this.patron = patron;
    }

    @Override
    public boolean _validar(String objeto) {
        return objeto.matches(getPatron());
    }

}
