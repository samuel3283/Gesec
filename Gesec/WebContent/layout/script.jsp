<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/boostrap.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/select.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/select2.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/select2-bootstrap.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/angular-grid.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/theme-fresh.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/lightbox.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/app.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/style.min.css" />

<link rel="stylesheet" href="<%=request.getContextPath()%>/public/css/ComponentesSayri.css" />

<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular-locale_es-pe.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular-touch.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular-animate.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular-resource.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular-route.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular-sanitize.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/angular-grid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/highcharts-ng.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/select.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/ui-bootstrap-tpls-0.14.3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/jquery.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/splitter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/lib/jstree.min.js"></script>


<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/app.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/directives/LoadingDirective.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/helper/CrudHelper.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/helper/DialogHelper.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/helper/GridHelper.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/helper/ViewHelper.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/util/DateUtil.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/controllers/DialogController.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/services/ConfiguracionService.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/services/UsuarioService.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/public/src/services/CatalogoTablaService.js"></script>



<script type="text/javascript">

$().ready(function() {
    $('#treenuevo').jstree();
    $('#treenuevo2').jstree();
    
 //   $("#splitterContainer").splitter({minAsize:100,maxAsize:300,splitVertical:true,A:$('#leftPane'),B:$('#rightPane'),slave:$("#rightSplitterContainer"),closeableto:0});
 //   $("#rightSplitterContainer").splitter({splitHorizontal:true,A:$('#rightTopPane'),B:$('#rightBottomPane'),closeableto:100});

	$(".simple3").splitter({
		outline: true,
		minLeft: 200, sizeLeft: 250, maxLeft: 350,
		accessKey: "V",
		splitHorizontal:true
		
	});
	$(".simple").splitter({
		outline: true,
		minLeft: 200, sizeLeft: 250, maxLeft: 350,
		accessKey: "V"
		
	});
	$(".simple2").splitter({
    	outline: true,
		minLeft: 200, sizeLeft: 250, maxLeft: 350,
		accessKey: "V"
		
	});

	
	
	   
	$("#splitterContainer").splitter({
	minAsize:100,maxAsize:300,
	minLeft: 200, sizeLeft: 250, maxLeft: 350,
	splitVertical:true,
	A:$('#leftPane'),
	B:$('#rightPane'),
	slave:$("#rightSplitterContainer"),
	closeableto:0
	});

	$("#splitterContainer2").splitter({
	minAsize:100,maxAsize:300,
	minLeft: 200, sizeLeft: 250, maxLeft: 350,
	splitVertical:true,
	A:$('#leftPane2'),
	B:$('#rightPane2'),
	slave:$("#rightSplitterContainer"),
	closeableto:0
	});

	$("#ZZZZrightSplitterContainer").splitter({
	splitHorizontal:true,
	A:$('#rightTopPane'),
	B:$('#rightBottomPane'),
	closeableto:100
	});


	
	$("#mostrar").on( "click", function() {	
		
		$('#rightBottomPane').show();		
		
		$('#rightBottomPane').css({"width":"100%"} );
		$('#rightBottomPane').css({"overflow:auto":"auto%"} );
		$('#rightBottomPane').css({"margin":"0px"} );
		$('#rightBottomPane').css({"padding":"0px"} );
		
		
		$('#rightBottomPane').css({"height":"50%"} );
	  	$('#rightTopPane').css({"height":"50%"} );
				
	});
	$("#ocultar").on( "click", function() {
		//$('#rightBottomPane').css({"height":"100%"} );
		
		$('#rightTopPane').css({"height":"100%"} );
		$('#rightBottomPane').css({"height":"0%"} );
		$('#rightBottomPane').hide();
		
		$('#rightTopPane').css({"height":"100%"} );
		$('#rightBottomPane').css({"height":"0%"} );
		
		$('#rightBottomPane').hide();		
	});	
   
	
});

	function mostrar2() {
		
		
		document.getElementById('simple2').style.display = 'block';
		document.getElementById('simple').style.height = '50%';
		document.getElementById('simple2').style.height = '50%';		
		
		//document.getElementById('simple').style.width = '100%';
		//document.getElementById('simple2').style.width = '100%';		
		document.getElementById('simple2').style.border = '1px';
		
	}
	function ocultar3() {
		document.getElementById('simple2').style.display = 'none';
		document.getElementById('simple').style.height = '100%';
		document.getElementById('simple2').style.height = '100%';		
	}

    var obtenerContexto = function (_url) {
        var context = "<%=request.getContextPath()%>";
        var url = document.URL;
        var tmp = url.split(context);

        return tmp[0] + context + "/" + _url;
    };
</script>