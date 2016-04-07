package com.sayri.proyecto.validator;

import com.sayri.proyecto.web.core.exception.ValidadorException;


public class NumeroValidador extends GenericoValidador<Number> {

    private static final long serialVersionUID = 1L;
    private Number igualA;
    private Number menorIgualA;
    private Number mayorIgualA;

    public NumeroValidador() {
        super();
    }

    public NumeroValidador(Number igualA, String mensaje) throws ValidadorException {
        super();
        setIgualA(igualA);
        setMensaje(mensaje);
    }
    
    public NumeroValidador(Number menorIgualA, Number mayorIgualA, String mensaje) throws ValidadorException {
        super();
        setMenorIgualA(menorIgualA);
        setMayorIgualA(mayorIgualA);
        setMensaje(mensaje);
    }
    public Number getIgualA() {
        return igualA;
    }

    public NumeroValidador setIgualA(Number igualA) throws ValidadorException {
        if(menorIgualA != null || mayorIgualA != null) {
            throw new ValidadorException("Se esta usando la restrinci\u00F3n [Menor A] o [Mayor A]");
        }
        this.igualA = igualA;
        return this;
    }

    public Number getMenorIgualA() {
        return menorIgualA;
    }

    public NumeroValidador setMenorIgualA(Number menorIgualA) throws ValidadorException {
        if(igualA != null) {
            throw new ValidadorException("Se esta usando la restrinci\u00F3n [Igual A]");
        }
        this.menorIgualA = menorIgualA;
        return this;
    }

    public Number getMayorIgualA() {
        return mayorIgualA;
    }

    public NumeroValidador setMayorIgualA(Number mayorIgualA) throws ValidadorException {
        if(igualA != null) {
            throw new ValidadorException("Se esta usando la restrinci\u00F3n [Igual A]");
        }
        this.mayorIgualA = mayorIgualA;
        return this;
    }

    @Override
    public boolean _validar(Number objeto) {
        boolean resultado = false;
        
        if(igualA != null) {
            resultado = igualA.doubleValue() == objeto.doubleValue();
        } else {
            if(mayorIgualA != null) {
                resultado = objeto.doubleValue() >= mayorIgualA.doubleValue();
            }
            if(menorIgualA != null) {
                resultado = resultado & objeto.doubleValue() >= menorIgualA.doubleValue();
            }
        }
        
        return resultado;
    }

    @Override
    public String getNombreValidacion() {
        return "numero";
    }

}
