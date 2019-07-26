<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>AAHK Demo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="css/aahk-auto.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet"  type="text/css" href="css/bootstrap.min.css"/>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/aahk-demo.js"></script>
</head>

<body bgcolor="#eaeaea">
<section class=" bg-light inner-header">			
	<img style="height: 150px; margin-left:-322px;margin-top:-50px; margin-bottom:-50px ; padding:0 0 0 0 px;" src="img/hpesm_pri_grn_pos_rgb.svg" id="icon" alt="User Icon" />		
</section>
	<div class="wrapper fadeInDown">
		<div id="formContent">
			<!-- Tabs Titles -->

			<!-- Icon -->
			<!-- <div class="fadeIn first">
				<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon"
					alt="User Icon" />
			</div> -->

			<br/>
			<!-- Login Form -->
			<form id="loginForm" method="post" action="">
				<input type="text" id="login" class="fadeIn second" name="login"
					placeholder="login"> <input type="password" id="password"
					class="fadeIn third" name="password" placeholder="password"> <input
						type="button" onclick="oamLogin()" class="fadeIn fourth"
						value="Log In">
			</form>

			<!-- Remind Passowrd -->
			<div id="formFooter">
				<a class="underlineHover" href="#">Forgot Password?</a>
			</div>

		</div>
	</div>
</body>
</html>
