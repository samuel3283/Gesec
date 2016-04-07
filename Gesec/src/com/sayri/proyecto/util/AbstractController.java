package com.sayri.proyecto.util;

import java.io.Serializable;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.validation.ObjectError;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.sayri.proyecto.web.core.exception.ValidadorException;
import com.sayri.proyecto.web.model.ErrorModel;
import com.sayri.proyecto.web.model.Model;
import com.sayri.proyecto.web.model.TipoResultado;

import flexjson.JSONSerializer;

public abstract class AbstractController implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final Logger LOG = Logger.getLogger(AbstractController.class);
    private HibernateAwareObjectMapper mapper;
    public static final String MOSTRAR_MENSAJE = "mostrarMensaje";
    public static final String NO = "no";
    public static final String SI = "si";
    public ObjectMapper omapper = new ObjectMapper();
    
    public AbstractController() {
        super();
        mapper = new HibernateAwareObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    protected String imprimir(Object object) {
        String json = "";

        try {
            LOG.info("json0:::"+object);
            
            json = CadenaUtil.eliminarNulosJSON(mapper.writeValueAsString(object));
            LOG.info("json2:::"+json);
        } catch (JsonProcessingException e) {
            json = imprimirError(e);
            LOG.info("error json3:::"+json);
        }
        
        /*
        try {
        this.omapper = new ObjectMapper();
        mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        json = mapper.writeValueAsString(object);
        LOG.info("==>>>>>>>>>>>>>>>>>>>"+json);
	    } catch (JsonProcessingException e) {
	        json = imprimirError(e);
	        LOG.info("error json3:::"+json);
	    }
        */
        
        return json;
    }
    
    protected String imprimirFlex(Object object, String... ignorableFieldNames) {    
        return CadenaUtil.eliminarNulosJSON(new JSONSerializer().exclude(ignorableFieldNames).deepSerialize(object));
    }
    
    protected String imprimir(Object object, String... ignorableFieldNames) {
        String json = "";  
        SimpleBeanPropertyFilter propertyFilter = SimpleBeanPropertyFilter.serializeAllExcept(ignorableFieldNames);
        FilterProvider filters = new SimpleFilterProvider().addFilter("filter", propertyFilter);
        ObjectWriter writer = mapper.writer(filters);
        
        try {
            json = writer.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            json = imprimirError(e);
        }
        
        return json;
    }

    protected String imprimirError(Exception ex) {
        return imprimirError(ex, SI);
    }
    
    private String imprimirErrorInternal(Exception ex, String mostrarMensaje) {
        String resultado = "{}";
        LOG.error("AbstractController:imprimirError", ex);
        ErrorModel model = new ErrorModel();
        model.setTipoResultado(TipoResultado.ERROR_SISTEMA);
        model.setMensaje("Comuniquese con su Administrador de Sistema.");
        model.getProps().put(MOSTRAR_MENSAJE, mostrarMensaje);
        model.setDetalle(ex.getMessage() == null ? "No se pudo obtener el detalle de error" : ex.getMessage());
        model.setStackTrace(ex.getStackTrace());
        ObjectWriter writer = mapper.writer();
        try {
            resultado = writer.writeValueAsString(model);
        } catch (JsonProcessingException e) {
            LOG.error("Error al serializar el objeto", e);
        }
        return resultado;
    }
    
    protected String imprimirError(Exception ex, String mostrarMensaje) {
        String resultado = "";
        if(ex instanceof ValidadorException) {
            ValidadorException ve = ((ValidadorException) ex);
            if(!ve.getErrores().isEmpty() || !ve.getErroresCompuesto().isEmpty()) {
                Model<Object> model = new Model<Object>();
                model.setTipoResultado(TipoResultado.VALIDACION);
                model.getProps().put(MOSTRAR_MENSAJE, mostrarMensaje);
                model.getProps().put("erroresValidacion", ((ValidadorException) ex).getErrores());
                model.getProps().put("erroresCompuestoValidacion", ((ValidadorException) ex).getErroresCompuesto());
                resultado = imprimir(model);
            } 
        }
        
        if(resultado.isEmpty()) {
            resultado = imprimirErrorInternal(ex, mostrarMensaje);
        }
        
        return resultado;
    }

    protected String imprimirError(List<ObjectError> ex) {
        Model<Object> baseModel = new Model<Object>();

        StringBuilder sb = new StringBuilder();
        for (ObjectError e : ex) {
            LOG.error("renderErrorSistema [ObjectName:" + e.getObjectName() + ", DefaultMessage:" + e.getDefaultMessage() + "]");
            sb.append("Objeto: ");
            sb.append(e.getObjectName());
            sb.append(" - Mensaje: ");
            sb.append(e.getDefaultMessage());
            sb.append("<br/>");
        }

        baseModel.setMensaje(sb.toString());
        baseModel.setTipoResultado(TipoResultado.ERROR_SISTEMA);
        return imprimir(baseModel);
    }

//
//    public void renderErrorSistema(Exception ex, HttpServletResponse response) throws IOException {
//        this.renderBytes(response, TrazaUtil.mostrarEnHTML(ex).getBytes(), FormatoArchivo.HTML, "error-" + FechaUtil.ahoraEnCadena(FechaUtil.DDMMYYYY_HH24MMSS) + ".html");
//    }
//    
//    public void renderBytes(HttpServletResponse response, byte[] bytes, FormatoArchivo produces, String fileName) throws IOException {
//        response.setContentType(produces.getTipo());
//        response.setContentLength(bytes.length);
//        response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName));
//
//        OutputStream outStream = response.getOutputStream();
//        outStream.write(bytes);
//        outStream.close();
//    }
//
//    public void renderInputStream(HttpServletResponse response, String fileName, String fileNameDownload, FormatoArchivo produces, boolean useExtensionProduce) throws IOException {
//        byte[] bytes = new byte[0];
//
//        File file = new File(fileName);
//        if (file.exists()) {
//            try {
//                FileInputStream fin = new FileInputStream(file);
//                bytes = new byte[(int) file.length()];
//                fin.read(bytes);
//                fin.close();
//                this.renderBytes(response, bytes, produces, fileNameDownload + (useExtensionProduce ? "." + produces.getExtension() : ""));
//            } catch (FileNotFoundException e) {
//                this.renderErrorSistema(e, response);
//            } catch (IOException e) {
//                this.renderErrorSistema(e, response);
//            }
//        } else {
//            this.renderBytes(response, ("El archivo " + fileName + ", no existe.").getBytes(), FormatoArchivo.TXT, "error-" + FechaUtil.ahoraEnCadena(FechaUtil.DDMMYYYY_HH24MMSS) + ".html");
//        }
//    }
}
