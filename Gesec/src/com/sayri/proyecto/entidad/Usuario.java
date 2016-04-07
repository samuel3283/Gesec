package com.sayri.proyecto.entidad;

import java.io.Serializable;


public class Usuario extends Entidad implements Serializable {
	
    private static final long serialVersionUID = 1L;
    private String nombre;
    private String usuario;
    private String password;
    
	public Usuario() {
		super();
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
    

}
