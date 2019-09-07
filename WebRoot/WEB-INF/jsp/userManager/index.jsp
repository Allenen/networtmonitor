<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String userid = (String)session.getAttribute("userid"); 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN">
<html lang="en" >
<head>
	<base href="<%=basePath%>">
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    

	
    <title>网络监测系统</title>
    
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css" />
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css" />
    <link rel="stylesheet" href="ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">

    <script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="ztree/js/jquery.ztree.core.js"></script>
    
</head>

<body style="overflow: hidden;">

     <!-- 总结构-->
    <div class="easyui-layout" data-options="fit:true" style="margin-left: 0px;margin-top: 0px;margin-right: 0px;">
        <!-- 北-->
        <div data-options="region:'north',border:false" style="height:12%;border-bottom: 2px #95B8E7 solid;overflow: hidden;background: url('images/mainpage/topbackground.png')">
            <div style="font-size: 25px;margin-left: 20px;margin-top: 15px;">通用网络拓扑设计与实时仿真</div>

            <div style="float: right;margin-right: 20px;">
                <a href="javascript:void(0);" class="easyui-linkbutton" onclick="usermanager()" data-options="iconCls:'icon-usersIcon',plain:true"><span style="font-size: 15px;"><%=userid%></span></a>
                <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon_help_zfj',plain:true"><span style="font-size: 15px;">帮助</span></a>
                <a href="javascript:void(0);" class="easyui-linkbutton" onclick="exit()" data-options="iconCls:'icon_exit_zfj',plain:true"><span style="font-size: 15px;">退出</span></a>
            </div>

        </div>
		<!-- 南-->
        <div data-options="region:'south',border:false" style="text-align:center;height:3%;border-top: 2px #CDF4FF solid;" >Copyright 2017@计科1302赵福建</div>
 
        <!-- 东
        <div data-options="region:'east',border:false" style="width:100px;border-left: 2px #CDF4FF solid;">Copyright 2017</div>-->
		
        <!-- 西-->
        <div data-options="region:'west',title:'菜单栏'" style="width:15%;height:85%;border-right: 2px #95B8E7 solid;overflow: hidden;"> 
        	<div class="easyui-panel" data-options="border:false" style="height:100%;background: url('images/mainpage/firstpage.jpg')">
                <ul id="managerNavigationTree" class="ztree"></ul>
            </div>
        </div>
        <!-- 中-->
        <div id="center_panel" data-options="region:'center',border:false" style="overflow: hidden;background: url('images/mainpage/firstpage.jpg')">
            <div id="tt" class="easyui-tabs" data-options="plain:true,narrow:true" style="overflow: hidden;height: 100%;width:100%">
                <div title="首页" style="height:100%;background: url('images/mainpage/firstpage.jpg')">

					<iframe src="topologyMonitor.html" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>
                </div>

            </div>
        </div>
    </div>
	<script src="js/index.js"></script>
	
</body>
</html>