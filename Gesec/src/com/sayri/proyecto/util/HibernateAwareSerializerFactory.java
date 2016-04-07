package com.sayri.proyecto.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Transient;

import org.hibernate.bytecode.javassist.FieldHandled;
import org.hibernate.collection.PersistentCollection;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.BeanUtils;
import org.springframework.core.annotation.AnnotationUtils;

import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.cfg.SerializerFactoryConfig;
import com.fasterxml.jackson.databind.ser.BeanPropertyWriter;
import com.fasterxml.jackson.databind.ser.BeanSerializerFactory;

public class HibernateAwareSerializerFactory extends BeanSerializerFactory {

    /**
     * Name of the property added during build-time byte-code instrumentation by
     * Hibernate. It must be filtered out.
     */
    private static final String FIELD_HANDLER_PROPERTY_NAME = "fieldHandler";
    private static final long serialVersionUID = 1L;

    protected HibernateAwareSerializerFactory(SerializerFactoryConfig config) {
        super(config);
    }

    @Override
    public JsonSerializer<Object> createSerializer(SerializerProvider prov, JavaType origType)
            throws JsonMappingException {
        Class<?> clazz = origType.getRawClass();

        if (PersistentCollection.class.isAssignableFrom(clazz)) {
            return new HibernateProxySerializer(origType, prov.getConfig());
        }

        if (HibernateProxy.class.isAssignableFrom(clazz)) {
            return new HibernateProxySerializer(origType, prov.getConfig());
        }

        return super.createSerializer(prov, origType);
    }

    /**
     * The purpose of this method is to filter out {@link Transient} properties
     * of the bean from JSON rendering.
     */
    @Override
    protected List<BeanPropertyWriter> filterBeanProperties(SerializationConfig config,
            BeanDescription beanDesc, List<BeanPropertyWriter> props) {

        // filter out standard properties (e.g. those marked with @JsonIgnore)
        props = super.filterBeanProperties(config, beanDesc, props);

        filterInstrumentedBeanProperties(beanDesc, props);

        // now filter out the @Transient ones as they may trigger "lazy"
        // exceptions by
        // referencing non-initialized properties
        List<String> transientOnes = new ArrayList<String>();
        // BeanUtils and AnnotationUtils are utility methods that come from
        // the Spring Framework
        for (PropertyDescriptor pd : BeanUtils.getPropertyDescriptors(beanDesc.getBeanClass())) {
            Method getter = pd.getReadMethod();
            if (getter != null && AnnotationUtils.findAnnotation(getter, Transient.class) != null) {
                transientOnes.add(pd.getName());
            }
        }

        // remove transient
        for (Iterator<BeanPropertyWriter> iter = props.iterator(); iter.hasNext();) {
            if (transientOnes.contains(iter.next().getName())) {
                iter.remove();
            }
        }

        return props;
    }

    private void filterInstrumentedBeanProperties(BeanDescription beanDesc,
            List<BeanPropertyWriter> props) {

        // all beans that have build-time instrumented lazy-loaded properties
        // will implement FieldHandled interface.
        if (!FieldHandled.class.isAssignableFrom(beanDesc.getBeanClass())) {
            return;
        }

        // remove fieldHandler bean property from JSON serialization as it
        // causes
        // infinite recursion
        for (Iterator<BeanPropertyWriter> iter = props.iterator(); iter.hasNext();) {
            if (iter.next().getName().equals(FIELD_HANDLER_PROPERTY_NAME)) {
                iter.remove();
            }
        }
    }
}