package com.sayri.proyecto.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.T;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;


@SuppressWarnings("unchecked")
public abstract class HibernateEntidadDAO extends HibernateDaoSupport {

    private static final long serialVersionUID = 1L;

    /*
    private SessionFactory sessionFactory;
    @Autowired
    public void setHibernateSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
  */
    
    @Autowired
    public void setHibernateSessionFactory(SessionFactory sessionFactory) {
        super.setSessionFactory(sessionFactory);
    }
    

    public void agregarOActualizarTodos(List<T> list) {
        super.getHibernateTemplate().saveOrUpdateAll(list);
        super.getHibernateTemplate().flush();
        
    }

    public void agregarOActualizar(T t) {
        super.getHibernateTemplate().saveOrUpdate(t);
        super.getHibernateTemplate().flush();
    }


    public void agregar(T t) {
        super.getHibernateTemplate().save(t);
        super.getHibernateTemplate().flush();
    }

    public void actualizar(T t) {
        super.getHibernateTemplate().update(t);
        super.getHibernateTemplate().flush();
    }
    
    public void eliminar(T t) {
        super.getHibernateTemplate().delete(t);
        super.getHibernateTemplate().flush();
    }

    public void eliminarTodos(List<T> t) {
        super.getHibernateTemplate().deleteAll(t);
        super.getHibernateTemplate().flush();
    }


    public T obtener(long id, Class<?> clase) {
        Criteria criteria = this.getCriteria(clase);
        criteria.add(Restrictions.eq("id", id));
        return (T) criteria.uniqueResult();
    }
    
    public T obtener(long id, Class<?> clase, List<String> dependencias) {
        Criteria criteria = this.getCriteria(clase);
        criteria.add(Restrictions.eq("id", id));
        for (String dependencia : dependencias) {
            criteria.setFetchMode(dependencia, FetchMode.JOIN);
        }
        return (T) criteria.uniqueResult();
    }
    
   
    public List<T> ejecutarConsulta(String consulta, Map<String, Object> parametros) {
    	Query query = this.getSession().createQuery(consulta) ;

        for (String nombre : parametros.keySet()) {
        	query.setParameter(nombre, parametros.get(nombre));
        }
        return query.list();
    }

    protected Criteria getCriteria(Class<?> clase) {
        return super.getSession().createCriteria(clase);
    }
     
    
}