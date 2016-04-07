package com.sayri.proyecto.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.apache.poi.ss.formula.functions.T;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.sayri.proyecto.entidad.Usuario;


@Repository("usuarioDAO")
public class UsuarioDAO extends HibernateEntidadDAO implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final Logger LOG = Logger.getLogger(UsuarioDAO.class);

    /*
    private SessionFactory sessionFactory;
    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }*/

    //public List<T> ejecutarConsulta(Map<String, Object> parametros) {
    public List<Usuario> ejecutarConsulta() {
    	LOG.info("DAO... ejecutarConsulta");
    	String consulta =" select u from Usuario u ";
    	Query query = getSession().createQuery(consulta) ;
    	
    	//Query query = this.sessionFactory.openSession().createQuery(" select u from Usuario u");
        
        return (List<Usuario>) query.list();
    }
    
    
}
