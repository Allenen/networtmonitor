<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>路由器UI</title>    
    
    <script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>

   	<link rel="stylesheet" href="jqueryEasyUI/easyui.css"/>
	<link rel="stylesheet" href="jqueryEasyUI/icon.css"/>
   
  </head>
  
  <body >
  		
	<!-- 路由器的基本信息 -->
	<div style="overflow:hidden;text-align: center;">
		<label style="font-size:20px;font-family:黑体;margin-top:10px;">${equip.equipKind }</label>
		<table style="width: 100%;margin-left: 20px;">
			<tr align="left">
				<td colspan="1">设备标识:</td>
				<td colspan="1"><input class="easyui-textbox" name="equipId" value="${equip.equipId }" id="equipId" readonly="readonly"/></td>
				<td colspan="1">设备名称:</td>
				<td colspan="1"><input class="easyui-textbox" name="equipName" value="${equip.equipName }" readonly="readonly"/></td>
				<td colspan="1">设备类别:</td>
				<td colspan="1"><input class="easyui-textbox" id="routerEquipKind" value="路由器" name="equipKind" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">管理IP:</td>
				<td colspan="1"><input class="easyui-textbox" name="manageIp" value="${equip.manageIp }" readonly="readonly"/></td>
				<td colspan="1">归属单位:</td>
				<td colspan="1"><input class="easyui-textbox" name="areaUnit" value="${equip.areaUnit }" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">维护单位:</td>
				<td colspan="1"><input class="easyui-textbox"  name="keepUnit" value="${equip.keepUnit}" readonly="readonly"/></td>
				<td colspan="1">联系人:</td>
				<td colspan="1"><input class="easyui-textbox"  name="keepPerson" value="${equip.keepPerson}" readonly="readonly"/></td>
				<td colspan="1">联系电话:</td>
				<td colspan="1"><input class="easyui-textbox"  name="keepPhone" value="${equip.keepPhone}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">测量代理:</td>
				<td colspan="1"><input type="checkbox" name="isProxy" value="${equip.isProxy}" onclick="this.value=(this.checked?1:0)" <c:if test="${equip.isProxy == 1}">checked="checked"</c:if>/></td>
				<td colspan="1">坐标X:</td>
				<td colspan="1"><input class="easyui-textbox" name="positionX" value="${equip.positionX}" readonly="readonly"/></td>
				<td colspan="1">坐标Y:</td>
				<td colspan="1"><input class="easyui-textbox" name="positionY" value="${equip.positionY}" readonly="readonly"/></td>
			</tr>
		</table>
		<label style="font-size:16px;font-family:黑体;margin-top:10px;">SNMP参数</label>
		<table style="width: 100%;margin-left: 20px;">
			<tr align="left">
				<td colspan="1">SNMP端口:</td>
				<td colspan="1"><input class="easyui-textbox" name="snmpPort" value="161" id="snmpPort"/></td>
				<td colspan="1">SNMP版本:</td>
				<td colspan="1"><input class="easyui-textbox" name="snmpVersion" value="${equip.snmpVersion}" readonly="readonly"/></td>
				<td colspan="1">读共同体名:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpRcommunity" id="snmpRcommunity" value="${equip.snmpRcommunity}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">重试次数:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpRetry" id="snmpRetry" value="${equip.snmpRetry}" readonly="readonly"/></td>
				<td colspan="1">超时时间:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpTimeout" id="snmpTimeout" value="${equip.snmpTimeout}" readonly="readonly"/></td>
				<td colspan="1">写共同体:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpWcommunity" id="snmpWcommunity" value="${equip.snmpWcommunity}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">V3安全名:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3SecurityName" value="${equip.snmpV3SecurityName}" readonly="readonly"/></td>
				<td colspan="1">V3安全等级:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3SecurityLevel" value="${equip.snmpV3SecurityLevel}" readonly="readonly"/></td>
				<td colspan="1">V3安全模型:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3SecurityModel" value="${equip.snmpV3SecurityModel}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">V3上下文名:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3ContextName" value="${equip.snmpV3ContextName}" readonly="readonly"/></td>
				<td colspan="1">V3上下文引擎:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3ContextEngoneId" value="${equip.snmpV3ContextEngoneId}" readonly="readonly"/></td>
				<td colspan="1">V3认证协议:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3AuthProtocol" value="${equip.snmpV3AuthProtocol}" readonly="readonly"/></td>
			</tr>
			<tr align="left">
				<td colspan="1">V3认证口令:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3AuthPassword" value="${equip.snmpV3AuthPassword}" readonly="readonly"/></td>
				<td colspan="1">V3私有协议:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3PrivProtocol" value="${equip.snmpV3PrivProtocol}" readonly="readonly"/></td>
				<td colspan="1">V3私有口令:</td>
				<td colspan="1"><input class="easyui-textbox"  name="snmpV3PrivPassword" value="${equip.snmpV3PrivPassword}" readonly="readonly"/></td>
			</tr>
		</table>
		<!-- 路由器的接口信息 -->
  		<div style="overflow: hidden;text-align: center;">
  			<label style="font-size:20px;font-family:黑体;">接口信息</label>
  			
  			<!-- 路由器设备的接口信息 -->
  			<table id="equipInteInfoTable"  class="easyui-datagrid" data-options="singleSelect:true" style="width: 100%"></table>  
		</div>

 	</div>

	<script type="text/javascript" src="js/normalEquip/normalEquip_edit/routerEdit.js"></script>	<!-- 编辑路由器的js文件 -->
	

</body>
</html>
