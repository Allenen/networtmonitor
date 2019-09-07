<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>任务添加UI</title>

	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
	
	<link rel="stylesheet" type="text/css" href="css/normalEquip/normalEquip_add/image-hover.css"/>
	<link rel="stylesheet" type="text/css" href="ztree/css/zTreeStyle/zTreeStyle2.css"/>
	
	<script type="text/javascript" src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	
  </head>
  
  <body>
    <div style="margin-left: 100px;overflow: hidden;">
    	<!-- 两行四列 -->
        <div style="margin-left: 40px;">
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" onclick="showDLatencyTaskAddUI();"><img src="images/taskAddImage/双向时延、丢包率、时延抖动测量.png" alt="双向时延、丢包率、时延抖动测量任务"></a>
            </div>
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" onclick="showSLatencyTaskAddUI();"><img src="images/taskAddImage/单向时延、丢包率、时延抖动测量.png" alt="单向时延、丢包率、时延抖动测量任务"></a>
            </div>
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" onclick="showBlockTaskAddUI();"><img src="images/taskAddImage/阻断测量.png" alt="阻断测量任务"></a>
            </div>
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" onclick="showTETestTaskAddUI();"><img src="images/taskAddImage/TE隧道测量.png" alt="TE隧道测量任务"></a>
            </div>
            
        </div>
        <div style="margin-left: 40px;">
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" onclick="showPathPerformanceTaskAddUI();"><img src="images/taskAddImage/链路性能测量.png" alt="链路性能测量任务"></a>
            </div>
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" id="" onclick="showPathChangeTaskAddUI();"><img src="images/taskAddImage/链路变化监测.png" alt="链路变化监测任务"></a>
            </div>
             <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" onclick="showMultiMediaTaskAddUI();"><img src="images/taskAddImage/多媒体业务性能监测.png" alt="多媒体业务性能测量任务"></a>
            </div>
            <div class="myImage" style="float: left;">
                <a href="javascript:void(0);" onclick="showCommonServiceTaskAddUI();"><img src="images/taskAddImage/通用业务测量.png" alt="通用业务测量任务"></a>
            </div>
        </div>
    </div>
    
    <div id="showTaskUI"></div>
    <script type="text/javascript" src="js/taskManager/normalTask/normalTask_add/taskAddUI.js"></script>	<%-- 任务添加的UI--%>
    
  </body>
</html>
