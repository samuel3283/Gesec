package com.sayri.proyecto.validator;

import com.sayri.proyecto.web.core.exception.ValidadorException;

public class LongitudValidador extends GenericoValidador<String> {

    public static LongitudValidador LONGITUD_4000;
    public static LongitudValidador LONGITUD_50;
    private static final long serialVersionUID = 1L;
    private Long igualA;
    private Long menorIgualA;
    private Long mayorIgualA;

    static {
        try {
            LONGITUD_4000 = new LongitudValidador(4000L, 0L, "El nombre debe tener como m\u00E1ximo 4000 caracteres");
            LONGITUD_50 = new LongitudValidador(50L, 0L, "El nombre debe tener como m\u00E1ximo 50 caracteres");
        } catch (ValidadorException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    public LongitudValidador() {
        super();
    }

    public LongitudValidador(Long igualA, String mensaje) throws ValidadorException {
        super();
        setIgualA(igualA);
        setMensaje(mensaje);
    }
    
    public LongitudValidador(Long menorIgualA, Long mayorIgualA, String mensaje) throws ValidadorException {
        super();
        setMenorIgualA(menorIgualA);
        setMayorIgualA(mayorIgualA);
        setMensaje(mensaje);
    }
    
    public Long getIgualA() {
        return igualA;
    }

    public LongitudValidador setIgualA(Long igualA) throws ValidadorException {
        if(menorIgualA != null || mayorIgualA != null) {
            throw new ValidadorException("Se esta usando la restrinci\u00F3n [Menor A] o [Mayor A]");
        }
        this.igualA = igualA;
        return this;
    }

    public Long getMenorIgualA() {
        return menorIgualA;
    }

    public LongitudValidador setMenorIgualA(Long menorIgualA) throws ValidadorException {
        if(igualA != null) {
            throw new ValidadorException("Se esta usando la restrinci\u00F3n [Igual A]");
        }
        this.menorIgualA = menorIgualA;
        return this;
    }

    public Long getMayorIgualA() {
        return mayorIgualA;
    }

    public LongitudValidador setMayorIgualA(Long mayorIgualA) throws ValidadorException {
        if(igualA != null) {
            throw new ValidadorException("Se esta usando la restrinci\u00F3n [Igual A]");
        }
        this.mayorIgualA = mayorIgualA;
        return this;
    }

    @Override
    public boolean _validar(String objeto) {
        boolean resultado = false;
        
        if(igualA != null) {
            resultado = igualA.intValue() == objeto.length();
        } else {
            if(mayorIgualA != null) {
                resultado = objeto.length() >= mayorIgualA.intValue();
            }
            if(menorIgualA != null) {
                resultado = resultado & objeto.length() <= menorIgualA.intValue();
            }
        }
        
        return resultado;
    }

    @Override
    public String getNombreValidacion() {
        return "longitud";
    }

}
