package com.sayri.proyecto.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.commons.beanutils.ConstructorUtils;
import org.apache.log4j.Logger;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sayri.proyecto.entidad.Entidad;
import com.sayri.proyecto.util.AbstractController;
import com.sayri.proyecto.web.model.Model;


public abstract class ScrudController<E extends Entidad, T extends Model<E>> extends AbstractController {

    protected static final String EXITO_AGREGAR = "EXITO_AGREGAR";
    protected static final String EXITO_ACTUALIZAR = "EXITO_ACTUALIZAR";
    protected static final String EXITO_ELIMINAR = "EXITO_ELIMINAR";
    protected static final String EXITO_ELIMINAR_MULTIPLE = "EXITO_ELIMINAR_MULTIPLE";
    protected static final String PAGINA = "pagina";
    protected static final String NRO_FILAS_PAG = "nroFilasPag";
    protected static final String TOTAL_FILAS = "totalFilas";

    
    private static final long serialVersionUID = 1L;
    private static final Logger LOG = Logger.getLogger(ScrudController.class);

    //private ScrudService<E> entidadServicio;
    private Map<String, String> propiedades;
    

    
    @PostConstruct
    public void inicializando() {
        propiedades = new LinkedHashMap<String, String>();
        setPropiedad(EXITO_AGREGAR, "Se registr\u00F3 correctamente el item");
        setPropiedad(EXITO_ACTUALIZAR, "Se actualiz\u00F3 correctamente el item");
        setPropiedad(EXITO_ELIMINAR, "Se elimin\u00F3 el item");
        setPropiedad(EXITO_ELIMINAR_MULTIPLE, "Se eliminaron los items seleccionados");
        _inicializando();
    }
    
    @SuppressWarnings("unchecked")
    @Override
    protected String imprimir(Object object) {

        return super.imprimir(object);
    }


/*
    protected void setEntidadServicio(ScrudService<E> entidadServicio) {
        this.entidadServicio = entidadServicio;
    }

    protected ScrudService<E> getEntidadServicio() {
        return entidadServicio;
    }
*/
    protected void setPropiedad(String clave, String valor) {
        propiedades.put(clave, valor);
    }
    
    protected String getPropiedad(String clave) {
        return propiedades.get(clave);
    }
    
    protected void transferirPropiedades(Model<?> modelRequest, Model<?> modelResponse) {
        String mostrarMensaje = modelRequest.get(MOSTRAR_MENSAJE);
        if(mostrarMensaje != null) {
            modelResponse.put(MOSTRAR_MENSAJE, mostrarMensaje);
        }
    }
    
    @RequestMapping(value = "buscar", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody String buscar(@RequestBody T model, BindingResult bindingResult) {
    	LOG.info("metodo buscar:"+model.getEntidad());
        return _buscar(model, bindingResult);
    }
    
    
    @SuppressWarnings("unchecked")
    protected String _buscar(T modelRequest, BindingResult bindingResult) {
        String resultado = "";
        try {
            Model<E> modelResponse;
            if (!bindingResult.hasErrors()) {
                Integer pagina = modelRequest.get(PAGINA);
                Integer nroFilasPag = modelRequest.get(NRO_FILAS_PAG);
                modelResponse = (Model<E>) ConstructorUtils.invokeConstructor(Model.class, new Object[] {});
                if(pagina == null) {
                	modelResponse.setListaEntidades(new ArrayList());
                     //modelResponse.setListaEntidades(getEntidadServicio().buscar(modelRequest.getEntidad()));
                } else {
                	modelResponse.setListaEntidades(new ArrayList());
                    //modelResponse.setListaEntidades(getEntidadServicio().buscarPaginado(modelRequest.getEntidad(), nroFilasPag, pagina));
                }
                if(modelResponse.getListaEntidades().isEmpty()) {
                    modelResponse.setTipoResultado(null);
                }
                transferirPropiedades(modelRequest, modelResponse);
                resultado = imprimir(modelResponse);
            } else {
                resultado = imprimirError(bindingResult.getAllErrors());
            }
        } catch (Exception e) {
            resultado = imprimirError(e);
        }
        return resultado;
    }


    protected void _inicializando() {}
}
