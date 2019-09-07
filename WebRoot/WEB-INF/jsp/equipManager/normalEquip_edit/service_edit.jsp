<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>编辑服务器/其他设备</title>
	
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
    
    <script type="text/javascript" src="jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
    
    <script type="text/javascript" src="js/jquery.json-2.2.min.js"></script>
  </head>
  
  <body>
	
	<form id="serverEquipForm" method="post">
		
		<!-- 标识是否是编辑状态,用此状态来更新设备 -->
  		<input type="hidden"  name="equipNum" value="${equip.equipNum }"/>
  		<div id ="serviceDiv" style="overflow:hidden;text-align: center;">
			<label style="font-size:20px;font-family:黑体;margin-top:10px;">编辑${equip.equipKind }</label>
			<!-- 编辑服务器/其他设备的基本信息 -->
			<table style="width: 100%;margin-left: 20px;">
				<tr align="left">
					<td colspan="1">设备标识:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="equipId" value="${equip.equipId}" readonly="readonly"/></td>
					<td colspan="1">设备名称:</td>
					<td colspan="1"><input class="easyui-textbox" type="text"  name="equipName" value="${equip.equipName}" data-options="required:true"/></td>
					<td colspan="1">设备类别:</td>
					<td colspan="1"><input class="easyui-textbox" id="serverEquipKind" type="text" name = "equipKind" value="${equip.equipKind}" readonly="readonly"/></td>
				</tr>
				<tr align="left">
					<td colspan="1">管理IP:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="manageIp" value="${equip.manageIp}" data-options="required:true"/></td>
					<td colspan="1">归属单位:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="areaUnit" data-options="panelHeight:'auto'" style="width:175px;">
						  <c:forEach items="${dictUnitList }" var="gsdw">
								<option <c:if test="${gsdw.dict_cont == equip.areaUnit }">selected</c:if>>${gsdw.dict_cont }</option>
						   </c:forEach>
						</select>
					</td>
				</tr>
				<tr align="left">
					<td colspan="1">维护单位:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="keepUnit" value="${equip.keepUnit}"/></td>
					<td colspan="1">联系人:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="keepPerson" value="${equip.keepPerson}"/></td>
					<td colspan="1">联系电话:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="keepPhone" value="${equip.keepPhone}"/></td>
				</tr>
				<tr align="left">
					<td colspan="1">坐标X:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionX" value="${equip.positionX}"/></td>
					<td colspan="1">坐标Y:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionY" value="${equip.positionY}"/></td>
				</tr>
			</table>
			
			<div style="float: right;">
				<a href="javascript:void(0);" id="save_equip" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveServerEquipForm();">保存</a>
				<input type="hidden"  name="is_saved_flag" value="no"/>
			</div>
		</div>
	</form>
	
	
	<script type="text/javascript" src="js/normalEquip/normalEquip_edit/normalEquipEditAndSave.js"></script> <!--编辑普通设备后保存 -->
	</body>
</html>
