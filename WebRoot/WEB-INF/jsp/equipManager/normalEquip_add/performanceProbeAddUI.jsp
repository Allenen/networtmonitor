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
    
    <title>性能探针UI</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script type="text/javascript" src="jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>

    
  </head>
  
  <body >

    <div id="testEquipDiv" style="padding:10px;margin:10px 0;text-align: center;">
    	<form id="testEquipForm" method="post">
			<label style="font-size:20px;font-family:黑体;margin-top:10px;">编辑性能探针</label>
			<!-- 编辑性能探测设备的基本信息 -->
			<table style="margin-top: 5px;width: 100%;height: 300px;">
				<tr>
					<td colspan="1">设备标识:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="equipId" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					<td colspan="1">设备名称:</td>
					<td colspan="1"><input class="easyui-textbox" type="text"  name="equipName" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					<td colspan="1">设备类别:</td>
					<td colspan="1"><input class="easyui-textbox" id="equipKind" type="text" name="equipKind" value="${equipKind }" data-options="required:true,missingMessage:'信息不能为空'" readonly="readonly"/></td>
				</tr>
				<tr>
					<td colspan="1">管理IP:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="manageIp" data-options="required:true,missingMessage:'信息不能为空'" /></td>
					<td colspan="1">归属单位:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="areaUnit" style="width:175px;">
						   <c:forEach items="${dictUnitList }" var="gsdw">
								<option>${gsdw.dict_cont }</option>
						   </c:forEach>
						</select>
					</td>
					<td colspan="1">规格型号:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="probeType" style="width:175px;">
	                                <option>A型性能探测设备</option>
	                                <option>B型性能探测设备</option>
	                    </select>
					</td>
				</tr>
				<tr>
					<td colspan="1">维护单位:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="keepUnit"/></td>
					<td colspan="1">联系人:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="keepPerson"/></td>
					<td colspan="1">联系电话:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="keepPhone"/></td>
				</tr>
				<tr>
					<td colspan="1">坐标X:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionX"/></td>
					<td colspan="1">坐标Y:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionY"/></td>
				</tr>
				<tr>
	                <td colspan="1">挂接路由器:</td>
	                <td colspan="1">
	                	<select class="easyui-combobox" name="probeRouter" style="width: 175px;">
	                		<option>南京路由器</option>
	                        <option>北京路由器</option>
	                        <option>路由器111</option>
	                	</select>
	                </td>        
	            </tr>
	            <tr>
	                <td colspan="1">路由映射:</td>        
	                <td colspan="3"><input class="easyui-textbox" type="text" name="routerMap" style="width:430px;"/>
	                </td>
	            </tr>
			</table>
			
			<div style="float: right;">
				<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTestEquipForm();">保存</a>
			</div>
			
		</form>
	</div>
	
	<script type="text/javascript" src="js/normalEquip/normalEquip_edit/normalEquipEditAndSave.js"></script> <!--编辑普通设备后保存 -->
  </body>
</html>
