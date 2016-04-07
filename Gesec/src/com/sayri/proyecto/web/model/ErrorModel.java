package com.sayri.proyecto.web.model;

public class ErrorModel extends Model<Object> {

	private static final long serialVersionUID = 1L;
	private String detalle;
	private StackTraceElement[] stackTrace;

	public String getDetalle() {
		return detalle;
	}

	public void setDetalle(String detalle) {
		this.detalle = detalle;
	}

	public StackTraceElement[] getStackTrace() {
		return stackTrace;
	}

	public void setStackTrace(StackTraceElement[] stackTrace) {
		this.stackTrace = stackTrace;
	}

}
