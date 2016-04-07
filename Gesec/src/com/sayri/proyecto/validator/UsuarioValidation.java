package com.sayri.proyecto.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.sayri.proyecto.entidad.Usuario;

@Component("usuarioValidation")
public class UsuarioValidation implements Validator {

	public boolean supports(Class<?> klass) {
		return Usuario.class.isAssignableFrom(klass);
	}
	
	public void validate(Object target, Errors errors) {
		Usuario usuario = (Usuario) target;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "usuario",
				"NotEmpty.registration.usuario","Usuario no puede ser nulo.");
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password",
				"NotEmpty.registration.password","Password no puede ser nulo.");
		
		if ((usuario.getUsuario().length()) > 10) {
			errors.rejectValue("usuario",
					"lengthOfUser.registration.userName","Usuario no puede tener mas de 10 caracteres.");
		}
		if ((usuario.getPassword().length()) > 10) {
			errors.rejectValue("password",
					"matchingPassword.registration.password","Password no puede tener mas de 10 caracteres.");
		}
		
	}

}