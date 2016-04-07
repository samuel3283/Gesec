<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="indra" uri="http://www.indra.com.pe/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<%@ page language="java" contentType="text/html; charset=UTF8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" ng-app="bonitaApp">

  <head>
    <meta charset="UTF-8">
    <title>Login</title>
     
  <style>
  body {
  font-family: "Open Sans", sans-serif;
  height: 100vh;
  background: url("public/img/fondo_login.jpg") 50% fixed;
  background-size: cover;
}

@keyframes spinner {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(359deg);
  }
}
* {
  box-sizing: border-box;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  background: rgba(4, 40, 68, 0.85);
}

.estilo_login {
  border-radius: 2px 2px 5px 5px;
  padding: 10px 20px 20px 20px;
  width: 90%;
  max-width: 320px;
  background: #ffffff;
  position: relative;
  padding-bottom: 80px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
}
.estilo_login.loading button {
  max-height: 100%;
  padding-top: 50px;
}
.estilo_login.loading button .spinner {
  opacity: 1;
  top: 40%;
}
.estilo_login.ok button {
  background-color: #8bc34a;
}
.estilo_login.ok button .spinner {
  border-radius: 0;
  border-top-color: transparent;
  border-right-color: transparent;
  height: 20px;
  animation: none;
  transform: rotateZ(-45deg);
}
.estilo_login input {
  display: block;
  padding: 15px 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ddd;
  transition: border-width 0.2s ease;
  border-radius: 2px;
  color: #ccc;
}
.estilo_login input + i.fa {
  color: #fff;
  font-size: 1em;
  position: absolute;
  margin-top: -47px;
  opacity: 0;
  left: 0;
  transition: all 0.1s ease-in;
}
.estilo_login input:focus {
  outline: none;
  color: #444;
  border-color: #2196F3;
  border-left-width: 35px;
}
.estilo_login input:focus + i.fa {
  opacity: 1;
  left: 30px;
  transition: all 0.25s ease-out;
}
.estilo_login a {
  font-size: 0.8em;
  color: #2196F3;
  text-decoration: none;
}
.estilo_login .title {
  color: #444;
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px 0 30px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
.estilo_login button {
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  background: #2196F3;
  color: #fff;
  display: block;
  border: none;
  margin-top: 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  max-height: 60px;
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 2px 2px;
  transform: rotateZ(0deg);
  transition: all 0.1s ease-out;
  border-bottom-width: 7px;
}
.estilo_login button .spinner {
  display: block;
  width: 40px;
  height: 40px;
  position: absolute;
  border: 4px solid #ffffff;
  border-top-color: rgba(255, 255, 255, 0.3);
  border-radius: 100%;
  left: 50%;
  top: 0;
  opacity: 0;
  margin-left: -20px;
  margin-top: -20px;
  animation: spinner 0.6s infinite linear;
  transition: top 0.3s 0.3s ease, opacity 0.3s 0.3s ease, border-radius 0.3s ease;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
}
.estilo_login:not(.loading) button:hover {
  box-shadow: 0px 1px 3px #2196F3;
}
.estilo_login:not(.loading) button:focus {
  border-bottom-width: 4px;
}

footer {
  display: block;
  padding-top: 50px;
  text-align: center;
  color: #ddd;
  font-weight: normal;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.2);
  font-size: 0.8em;
}
footer a, footer a:link {
  color: #fff;
  text-decoration: none;
}

.msg_info, .msg_success, .msg_warning, .msg_error {
margin: 8px 0px;
padding:10px;
}
.msg_info {
    color: #00529B;
    background-color: #BDE5F8;
}
.msg_success {
    color: #4F8A10;
    background-color: #DFF2BF;
}
.msg_warning {
    color: #9F6000;
    background-color: #FEEFB3;
}
.msg_error {
    color: #D8000C;
}
.msg_info i, .msg_success i, .msg_warning i, .msg_error i {
    margin:8px 15px;
    font-size:2em;
    vertical-align:middle;
}

    </style>

    
   
   
    
  </head>

  <body>


    <div class="wrapper">
  
 
<form:form method="POST" action="validar.html" commandName="usuario" cssClass="estilo_login">
  
    <p class="title">Empresa</p>

    <form:errors path="usuario" cssClass="msg_error"/>
	<form:input path="usuario" id="usuario" />
    
    <form:errors path="password" cssClass="msg_error"/>	
	<form:password path="password" id="password" />


	<br>
    <button type="submit">
    <span class="state">Ingresar</span>
    </button>
  </form:form>

  
  
</div>

    
    
  </body>
</html>

