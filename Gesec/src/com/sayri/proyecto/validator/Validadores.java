package com.sayri.proyecto.validator;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.sayri.proyecto.web.core.exception.ValidadorException;

public class Validadores {

    private List<Validador> validadores;

    public Validadores() {
        super();
        validadores = new ArrayList<Validador>();
    }

    public boolean add(Validador e) {
        return validadores.add(e);
    }

    public Validadores addFormato(FormatoValidador e) {
        validadores.add(e);
        return this;
    }
    
    public Validadores addLongitud(LongitudValidador e) {
        validadores.add(e);
        return this;
    }
    
    public Validadores addNumero(NumeroValidador e) {
        validadores.add(e);
        return this;
    }
    
    public Validadores addFormato(String patron, String mensaje) {
        validadores.add(new FormatoValidador(patron, mensaje));
        return this;
    }
    
    public Validadores addLongitud(Long igualA, String mensaje) throws ValidadorException {
        validadores.add(new LongitudValidador(igualA, mensaje));
        return this;
    }
    
    public Validadores addLongitud(Long menorIgualA, Long mayorIgualA, String mensaje) throws ValidadorException {
        validadores.add(new LongitudValidador(menorIgualA, mayorIgualA, mensaje));
        return this;
    }
    
    public Validadores addNumero(Number igualA, String mensaje) throws ValidadorException {
        validadores.add(new NumeroValidador(igualA, mensaje));
        return this;
    }
    
    public Validadores addNumero(Number menorIgualA, Number mayorIgualA, String mensaje) throws ValidadorException {
        validadores.add(new NumeroValidador(menorIgualA, mayorIgualA, mensaje));
        return this;
    }
    
    public boolean remove(Object o) {
        return validadores.remove(o);
    }

    public boolean addAll(Collection<? extends Validador> c) {
        return validadores.addAll(c);
    }

    public boolean removeAll(Collection<?> c) {
        return validadores.removeAll(c);
    }

    public void clear() {
        validadores.clear();
    }

    public List<Validador> getValidadores() {
        return validadores;
    }
}
