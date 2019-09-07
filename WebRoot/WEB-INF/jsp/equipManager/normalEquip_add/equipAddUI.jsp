<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>设备添加UI</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	
	<script type="text/javascript" src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	<script src="bootstrap/bootstrap.min.js"></script>	
	
		
	<link rel="stylesheet" href="bootstrap/bootstrap.min.css">
	<link rel="stylesheet" href="jqueryEasyUI/easyui.css" >
	<link rel="stylesheet" href="jqueryEasyUI/icon.css" />
	<link rel="stylesheet" href="css/normalEquip/normalEquip_add/image-hover.css">
  </head>
  
  <body>
    <div style="margin-left: 100px;overflow: hidden;">
    	<!-- 三行四列 -->
        <div style="margin-left: 40px;">
            <div class="myImage" style="float: left;" id="routerAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('路由器');"><img src="images/equipAddImage/路由器.png" alt="路由器"></a>
            </div>
            <div class="myImage" style="float: left;" id="performanceHardProbeAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('性能软探针');"><img src="images/equipAddImage/性能硬探针.png" alt="性能硬探针"></a>
            </div>
            <div class="myImage" style="float: left;" id="performanceSoftProbeAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('性能软探针');"><img src="images/equipAddImage/性能软探针.png" alt="性能软探针"></a>
            </div>
            <div class="myImage" style="float: left;" id="flowProbeAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('流量探针');"><img src="images/equipAddImage/流量探针.png" alt="流量探针"></a>
            </div>
            
        </div>
        <div style="margin-left: 40px;">
            <div class="myImage" style="float: left;" id="serveAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('服务器');"><img src="images/equipAddImage/服务器.png" alt="服务器"></a>
            </div>
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" id="" onclick="showEquipUI('PC机')"><img src="images/equipAddImage/PC机.png" alt="PC机"></a>
            </div>
             <div class="myImage" style="float: left;" id="webServeAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('WEB服务器');"><img src="images/equipAddImage/WEB服务器.png" alt="WEB服务器"></a>
            </div>
            <div class="myImage" style="float: left;" id="dnsServeAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('DNS服务器');"><img src="images/equipAddImage/DNS服务器.png" alt="DNS服务器"></a>
            </div>
        </div>
        <div style="margin-left: 40px;">
            <div class="myImage" style="float: left;" id="emailServeAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('EMAIL服务器');"><img src="images/equipAddImage/EMAIL服务器.png" alt="EMAIL服务器"></a>
            </div>
            <div class="myImage" style="float: left;" id="ftpServeAddUI">
                <a href="javascript:void(0);" onclick="showEquipUI('FTP服务器');"><img src="images/equipAddImage/FTP服务器.png" alt="FTP服务器"></a>
            </div>
             <div class="myImage" style="float: left;" id="otherAddUI">
                <a href="javascript:void(0);"><img src="images/equipAddImage/其他.png" alt="其他"></a>
            </div>
            <div class="myImage" style="float: left;">
                
            </div>
        </div>
    </div>
    

    <script type="text/javascript" src="js/normalEquip/normalEquip_add/equipAddUI.js"></script>	<%-- 设备添加的UI--%>
  </body>
</html>
