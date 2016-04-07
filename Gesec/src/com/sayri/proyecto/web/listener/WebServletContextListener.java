package com.sayri.proyecto.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;


public class WebServletContextListener implements ServletContextListener {

    private static ApplicationContext springContext;
    private static final Logger LOG = Logger.getLogger(WebServletContextListener.class);
    
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        springContext = null;
    }

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
    	LOG.info("contextInitialized....");
        springContext = WebApplicationContextUtils.getWebApplicationContext(servletContextEvent.getServletContext());
    }

    public static ApplicationContext getApplicationContext() {
        return springContext;
    }

    public static void setApplicationContext(ApplicationContext applicationContext) {
        springContext = applicationContext;
    }
    
    @SuppressWarnings("unchecked")
    public static <T> T getBean(String beanName) {
        return (T) springContext.getBean(beanName);
    }
}
