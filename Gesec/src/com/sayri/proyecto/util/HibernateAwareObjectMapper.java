package com.sayri.proyecto.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class HibernateAwareObjectMapper extends ObjectMapper {
    
    private static final long serialVersionUID = 1L;

    public HibernateAwareObjectMapper() {
        setSerializerFactory(new HibernateAwareSerializerFactory(null));
    }
}
