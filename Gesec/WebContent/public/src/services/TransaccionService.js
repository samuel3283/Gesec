//'use strict';
//
//bonitaApp.factory('TransaccionService', function() {
//    var rowData = [
//        {id: 1, nombre: "Transaccion 1", descripcion: "Descripcion Transaccion 1", aplicacion:"Apuntes Masivos", restringido:"Si", estado: "Activo"},
//        {id: 2, nombre: "Transaccion 2", descripcion: "Descripcion Transaccion 2", aplicacion:"Cuentas Personales", restringido:"Si", estado: "Inactivo"},
//        {id: 3, nombre: "Transaccion 3", descripcion: "Descripcion Transaccion 3", aplicacion:"FATCA", restringido:"Si",estado: "Activo"}
//    ];
//
//    return {
//        listar: function(transaccion) {
//            return rowData;
//        },
//        obtener: function(id) {
//            var row = {};
//            for(var i in rowData) {
//                if(rowData[i].id == id) {
//                    row = rowData[i];
//                    break;
//                }
//            }
//
//            return row;
//        },
//        guardar: function(transaccion) {
//            var result = false;
//            if(transaccion.id == undefined || transaccion.id == null || transaccion.id == 0) {
//                transaccion.id = rowData[rowData.length - 1].id + 1;
//                rowData.push(transaccion);
//                result = true;
//            } else {
//                var row = this.obtener(transaccion.id);
//                for(var p in transaccion) {
//                    row[p] = transaccion[p];
//                }
//                result = true;
//            }
//
//            return result;
//        },
//        eliminar: function(id) {
//            var result = false;
//            for(var i in rowData) {
//                if(rowData[i].id == id) {
//                    rowData.splice(i, 1);
//                    result = true;
//                    break;
//                }
//            }
//
//            return rowData;
//        }
//    }
//});
