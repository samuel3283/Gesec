package com.sayri.proyecto.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class CadenaUtil {

    private static final Logger LOG = LoggerFactory.getLogger(CadenaUtil.class);

    private CadenaUtil() {
        super();
    }

    public static String eliminarNulosJSON(String json) {
    	LOG.info("JSON.......:"+json);
        Pattern p = Pattern.compile("([,]?\"[^\"]*\":null[,]?)+");
        Matcher m = p.matcher(json);
        StringBuffer newString = new StringBuffer(json.length());
        while (m.find()) {
            String removed = m.group();
            LOG.debug(removed);
            if (removed.startsWith(",") && removed.endsWith(",")) {
                m.appendReplacement(newString, ",");
            } else {
                m.appendReplacement(newString, "");
            }
        }
        m.appendTail(newString);
        return newString.toString();
    }
}
