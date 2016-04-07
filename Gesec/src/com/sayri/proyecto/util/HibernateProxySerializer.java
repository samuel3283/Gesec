package com.sayri.proyecto.util;

import java.io.IOException;

import org.hibernate.collection.PersistentCollection;
import org.hibernate.proxy.HibernateProxy;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.BeanPropertyWriter;
import com.fasterxml.jackson.databind.ser.BeanSerializer;
import com.fasterxml.jackson.databind.ser.BeanSerializerBuilder;

public class HibernateProxySerializer extends JsonSerializer<Object> {

    private JavaType javaType;
    private SerializationConfig config;

    public HibernateProxySerializer(JavaType javaType, SerializationConfig config) {
        this.javaType = javaType;
        this.config = config;
    }

    @Override
    public void serialize(Object value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException {

        if (((HibernateProxy) value).getHibernateLazyInitializer().isUninitialized()) {
            jgen.writeNull();
            return;
        }

        if (value instanceof PersistentCollection && !((PersistentCollection) value).wasInitialized()) {
            jgen.writeNull();
            return;
        }

        BeanDescription beanDesc = config.introspect(javaType);
        BeanSerializerBuilder builder = new BeanSerializerBuilder(beanDesc);
        BeanPropertyWriter[] properties = new BeanPropertyWriter[0];
        if(builder.getProperties() != null) {
            properties = builder.getProperties().toArray(new BeanPropertyWriter[] {});
        }
        BeanPropertyWriter[] filteredProperties = new BeanPropertyWriter[] {};
        JsonSerializer<Object> serializer = new BeanSerializer(javaType, builder, properties, filteredProperties);

        // delegate serialization to a build-in serializer
        serializer.serialize(value, jgen, provider);
    }
}
