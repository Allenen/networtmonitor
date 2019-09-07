<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>性能探测设备</title>
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
    
    <script type="text/javascript" src="jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
    
    <script type="text/javascript" src="js/jquery.json-2.2.min.js"></script>
  </head>
  
  <body>
  
 		<div id="testEquipDiv" style="overflow:hidden;text-align: center;">
		<label style="font-size:20px;font-family:黑体;margin-top:10px;">${equip.equipKind }</label>
		<!-- 编辑性能探测设备的基本信息 -->
		<table style="margin-top: 5px;margin-left: 20px;width: 100%;height: 300px;">
			<tr align="left">
				<td colspan="1">设备标识:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="equipId" value="${equip.equipId}" readonly="readonly"/></td>
				<td colspan="1">设备名称:</td>
				<td colspan="1"><input class="easyui-textbox" type="text"  name="equipName" value="${equip.equipName}" readonly="readonly"/></td>
				<td colspan="1">设备类别:</td>
				<td colspan="1"><input class="easyui-textbox" id="equipKind" type="text" name="equipKind" value="${equip.equipKind}" readonly="readonly" /></td>
			</tr>
			<tr align="left">
				<td colspan="1">管理IP:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="manageIp" value="${equip.manageIp}" readonly="readonly"/></td>
				<td colspan="1">归属单位:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="areaUnit" value="${equip.areaUnit}" readonly="readonly"/></td>
				<td colspan="1">规格型号:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="probeType" value="${equip.probeType}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">维护单位:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="keepUnit" value="${equip.keepUnit}" readonly="readonly"/></td>
				<td colspan="1">联系人:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="keepPerson" value="${equip.keepPerson}" readonly="readonly"/></td>
				<td colspan="1">联系电话:</td>
				<td colspan="1"><input class="easyui-textbox" type="text" name="keepPhone" value="${equip.keepPhone}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">坐标X:</td>
				<td colspan="1"><input class="easyui-textbox" name="positionX" value="${equip.positionX}" readonly="readonly"/></td>
				<td colspan="1">坐标Y:</td>
				<td colspan="1"><input class="easyui-textbox" name="positionY" value="${equip.positionY}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
                <td colspan="1">挂接路由器:</td>
				<td colspan="1"><input class="easyui-textbox" name="probeRouter" value="${equip.probeRouter}" readonly="readonly"/></td>       
            </tr>
            <tr align="left">
                <td colspan="1">路由映射:</td>        
                <td colspan="3"><input class="easyui-textbox" type="text" name="routerMap" value="${equip.routerMap}" style="width:430px;" readonly="readonly"/>
                </td>
            </tr>
		</table>
			
	</div>	

  </body>
</html>
