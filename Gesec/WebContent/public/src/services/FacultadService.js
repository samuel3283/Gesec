//'use strict';
//
//bonitaApp.factory('FacultadService', function() {
//    var rowData = [
//        {id: 1, nombre: "Facultad 1", descripcion: "Descripcion Facultad 1", limiteOperacion:"Si",restringido:"Si",estado: "Activo"},
//        {id: 2, nombre: "Facultad 2", descripcion: "Descripcion Facultad 2", limiteOperacion:"Si",restringido:"No",estado: "Inactivo"},
//        {id: 3, nombre: "Facultad 3", descripcion: "Descripcion Facultad 3", limiteOperacion:"No",restringido:"Si",estado: "Activo"}
//    ];
//
//    return {
//        listar: function(facultad) {
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
//        guardar: function(facultad) {
//            var result = false;
//            if(facultad.id == undefined || facultad.id == null || facultad.id == 0) {
//                facultad.id = rowData[rowData.length - 1].id + 1;
//                rowData.push(facultad);
//                result = true;
//            } else {
//                var row = this.obtener(facultad.id);
//                for(var p in facultad) {
//                    row[p] = facultad[p];
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
