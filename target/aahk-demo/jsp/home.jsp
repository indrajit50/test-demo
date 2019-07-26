<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>AAHK Demo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet"  type="text/css" href="../css/aahk-auto.css"/>

<link rel="stylesheet"  type="text/css" href="../css/app.component.css"/>


<script type="text/javascript" src="../js/aahk-demo.js"></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>
<section class=" bg-light inner-header">			
	<img style="height: 150px; margin-left:-50px;margin-top:-50px; margin-bottom:-50px ; padding:0 0 0 0 px;" src="img/hpesm_pri_grn_pos_rgb.svg" id="icon" alt="User Icon" />		
</section>
<h4 style="margin-left:10px;margin-top:10px;">Welcome <c:out value="${lstNotification}" /></h4>
</body>
</html>
