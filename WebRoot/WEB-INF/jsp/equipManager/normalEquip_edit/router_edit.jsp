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
  	<!-- 路由器设备添加界面的UI -->
  		
  	<form id="routerEquipForm" method="post" >
  		
  		<!-- 标识是否是编辑状态,用此状态来更新设备 -->
  		<input type="hidden"  name="equipNum" value="${equip.equipNum }"/>
  		
  		<!-- 路由器的基本信息 -->
  		<div style="overflow:hidden;text-align: center;">
  			<label style="font-size:20px;font-family:黑体;margin-top:10px;">编辑${equip.equipKind }</label>
  			<table style="width: 100%;margin-left: 20px;">
				<tr align="left">
					<td colspan="1">设备标识:</td>
					<td colspan="1"><input class="easyui-textbox" name="equipId" value="${equip.equipId }" id="equipId" readonly="readonly"/></td>
					<td colspan="1">设备名称:</td>
					<td colspan="1"><input class="easyui-textbox" name="equipName" value="${equip.equipName }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					<td colspan="1">设备类别:</td>
					<td colspan="1"><input class="easyui-textbox" id="routerEquipKind" value="路由器" name="equipKind" readonly="readonly"/></td>
				</tr>
				<tr align="left">
					<td colspan="1">管理IP:</td>
					<td colspan="1"><input class="easyui-textbox" name="manageIp" value="${equip.manageIp }" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					<td colspan="1">归属单位:</td>
					<td colspan="1">
						<select class="easyui-combobox" data-options="panelHeight:'auto'" name="areaUnit" style="width:160px;" >
						   <c:forEach items="${dictUnitList }" var="gsdw">
								<option <c:if test="${gsdw.dict_cont == equip.areaUnit }">selected</c:if> >${gsdw.dict_cont }</option>
						   </c:forEach>
						</select>
					</td>
				</tr>
				<tr align="left">
					<td colspan="1">维护单位:</td>
					<td colspan="1"><input class="easyui-textbox"  name="keepUnit" value="${equip.keepUnit}"></td>
					<td colspan="1">联系人:</td>
					<td colspan="1"><input class="easyui-textbox"  name="keepPerson" value="${equip.keepPerson}"/></td>
					<td colspan="1">联系电话:</td>
					<td colspan="1"><input class="easyui-textbox"  name="keepPhone" value="${equip.keepPhone}"/></td>
				</tr>
				<tr align="left">
					<td colspan="1">测量代理:</td>
					<td colspan="1"><input type="checkbox" name="isProxy" value="${equip.isProxy}" onclick="this.value=(this.checked?1:0)" <c:if test="${equip.isProxy == 1}">checked="checked"</c:if> /></td>
					<td colspan="1">坐标X:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionX" value="${equip.positionX}"/></td>
					<td colspan="1">坐标Y:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionY" value="${equip.positionY}"/></td>
				</tr>
			</table>
			<label style="font-size:16px;font-family:黑体;margin-top:10px;">SNMP参数</label>
			<table style="width: 100%;margin-left: 20px;">
				<tr align="left">
					<td colspan="1">SNMP端口:</td>
					<td colspan="1"><input class="easyui-textbox" name="snmpPort" value="161" id="snmpPort"/></td>
					<td colspan="1">SNMP版本:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpVersion" data-options="panelHeight:'auto'" style="width:175px;">
							<option <c:if test="${equip.snmpVersion == 'V1' }">selected</c:if>>V1</option>
							<option <c:if test="${equip.snmpVersion == 'V2' }">selected</c:if>>V2</option>
							<option <c:if test="${equip.snmpVersion == 'V3' }">selected</c:if>>V3</option>
						</select>
					</td>
					<td colspan="1">读共同体名:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpRcommunity" id="snmpRcommunity" value="${equip.snmpRcommunity}"/></td>
				</tr>
				<tr align="left">
					<td colspan="1">重试次数:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpRetry" id="snmpRetry" value="${equip.snmpRetry}"/></td>
					<td colspan="1">超时时间:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpTimeout" id="snmpTimeout" value="${equip.snmpTimeout}"/></td>
					<td colspan="1">写共同体:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpWcommunity" id="snmpWcommunity" value="${equip.snmpWcommunity}"/></td>
				</tr>
				<tr align="left">
					<td colspan="1">V3安全名:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3SecurityName" id="snmpV3SecurityName" value="${equip.snmpV3SecurityName}"/></td>
					<td colspan="1">V3安全等级:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3SecurityLevel" data-options="panelHeight:'auto'" style="width:175px;">
							<option value="NOAUTHNOPRIV" <c:if test="${equip.snmpV3SecurityLevel == 'NOAUTHNOPRIV' }">selected</c:if>>NOAUTHNOPRIV</option>
							<option value="AUTHNOPRIV" <c:if test="${equip.snmpV3SecurityLevel == 'AUTHNOPRIV' }">selected</c:if>>AUTHNOPRIV</option>
							<option value="AUTHPRIV" <c:if test="${equip.snmpV3SecurityLevel == 'AUTHPRIV' }">selected</c:if>>AUTHPRIV</option>
						</select>
					</td>
					<td colspan="1">V3安全模型:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3SecurityModel" data-options="panelHeight:'auto'" style="width:175px;">
							<option <c:if test="${equip.snmpV3SecurityModel == 'V1' }">selected</c:if>>V1</option>
							<option <c:if test="${equip.snmpV3SecurityModel == 'USM' }">selected</c:if>>USM</option>
						</select>
					</td>
				</tr>
				<tr align="left">
					<td colspan="1">V3上下文名:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3ContextName" value="${equip.snmpV3ContextName}"/></td>
					<td colspan="1">V3上下文引擎:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3ContextEngoneId" value="${equip.snmpV3ContextEngoneId}"/></td>
					<td colspan="1">V3认证协议:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3AuthProtocol" data-options="panelHeight:'auto'" style="width:175px;">
							<option <c:if test="${equip.snmpV3AuthProtocol == 'NONE' }">selected</c:if>>NONE</option>
							<option <c:if test="${equip.snmpV3AuthProtocol == 'SHA' }">selected</c:if>>SHA</option>
							<option <c:if test="${equip.snmpV3AuthProtocol == 'MD5' }">selected</c:if>>MD5</option>
						</select>
					</td>
				</tr>
				<tr align="left">
					<td colspan="1">V3认证口令:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3AuthPassword" value="${equip.snmpV3AuthPassword}"/></td>
					<td colspan="1">V3私有协议:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3PrivProtocol" data-options="panelHeight:'auto'" style="width:175px;">
							<option <c:if test="${equip.snmpV3PrivProtocol == 'NONE' }">selected</c:if>>NONE</option>
							<option <c:if test="${equip.snmpV3PrivProtocol == 'DES' }">selected</c:if>>DES</option>
							<option <c:if test="${equip.snmpV3PrivProtocol == '3DESEDE' }">selected</c:if>>3DESEDE</option>
							<option <c:if test="${equip.snmpV3PrivProtocol == 'IDEA' }">selected</c:if>>IDEA</option>
							<option <c:if test="${equip.snmpV3PrivProtocol == 'AES128' }">selected</c:if>>AES128</option>
							<option <c:if test="${equip.snmpV3PrivProtocol == 'AES192' }">selected</c:if>>AES192</option>
							<option <c:if test="${equip.snmpV3PrivProtocol == 'AES256' }">selected</c:if>>AES256</option>
						</select>
					</td>
					<td colspan="1">V3私有口令:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3PrivPassword" value="${equip.snmpV3PrivPassword}"/></td>
				</tr>
			</table>
			<div style="float: right;margin-right:40px;margin-top: 10px;">
				<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveRouterEquipForm();">保存</a>
				<input type="hidden"  name="is_saved_flag" value="no"/>
			</div>
  		</div>
  		
  	</form>

  	<script type="text/javascript" src="js/normalEquip/normalEquip_edit/normalEquipEditAndSave.js"></script> <!--编辑普通设备后保存 -->

</body>
</html>
