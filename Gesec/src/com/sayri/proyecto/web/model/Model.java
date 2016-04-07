package com.sayri.proyecto.web.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.ConstructorUtils;
import org.apache.log4j.Logger;

import com.sayri.proyecto.util.AbstractController;

public class Model<T> implements Serializable {
	
    private static final Logger LOG = Logger.getLogger(Model.class);
    private static final long serialVersionUID = 1L;
    private Map<String, Object> props;
    private TipoResultado tipoResultado;
    private String mensaje;
    private T entidad;
    private List<T> listaEntidades;
    
    public Model() {
        super();
        props = new LinkedHashMap<String, Object>();
        props.put(AbstractController.MOSTRAR_MENSAJE, AbstractController.SI);
        this.setTipoResultado(TipoResultado.EXITO);
        //this.listaEntidades = new ArrayList();
    }
    
    @SuppressWarnings("unchecked")
    public Model(T Clazz) {
        this();
        try {
        	LOG.info("==>getClass:"+Clazz.getClass());
            entidad = (T) ConstructorUtils.invokeConstructor(Clazz.getClass(), new Object[] {});
            listaEntidades = (List<T>) ConstructorUtils.invokeConstructor(ArrayList.class, new Object[] {});
        } catch (Exception e) {
            LOG.error(Clazz.getClass().getCanonicalName(), e);
        }
    }

    /*
    @SuppressWarnings("unchecked")
    public Model(Class<? extends T> clazz) {
        this();
        try {
            entidad = (T) ConstructorUtils.invokeConstructor(clazz, new Object[] {});
            listaEntidades = (List<T>) ConstructorUtils.invokeConstructor(ArrayList.class, new Object[] {});
        } catch (Exception e) {
            LOG.error(clazz.getCanonicalName(), e);
        }
    }
    */
    
    public TipoResultado getTipoResultado() {
        return tipoResultado;
    }

    public void setTipoResultado(TipoResultado tipoResultado) {
        this.tipoResultado = tipoResultado;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    //public T getEntidad() {
    public Object getEntidad() {
        return entidad;
    }

    public void setEntidad(T entidad) {
    //public void setEntidad(Object entidad) {
        this.entidad = entidad;
    }

    public List<T> getListaEntidades() {
    //public List<Object> getListaEntidades() {
        return listaEntidades;
    }

    public void setListaEntidades(List<T> listaEntidades) {
    //public void setListaEntidades(List<Object> listaEntidades) {
        this.listaEntidades = listaEntidades;
    }

    public Map<String, Object> getProps() {
        return props;
    }

    public void setProps(Map<String, Object> props) {
        this.props = props;
    }

    public Object put(String key, Object value) {
        return props.put(key, value);
    }

    public void putAll(Map<? extends String, ? extends Object> m) {
        props.putAll(m);
    }

    @SuppressWarnings("unchecked")
    public <E> E get(String key) {
        E val = null;
        if(props != null && props.containsKey(key)) {
            val = (E) props.get(key);
        }
        return val;
    }
}
