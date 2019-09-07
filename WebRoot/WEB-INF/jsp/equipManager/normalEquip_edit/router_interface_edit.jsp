<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html style="height: 100%;">
<head>
   	<meta charset="utf-8"/>
    
    <base href="<%=basePath%>">
    <title>接口信息编辑</title>
	
	
    <script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    


   	<link rel="stylesheet" href="jqueryEasyUI/easyui.css"/>
	<link rel="stylesheet" href="jqueryEasyUI/icon.css"/>
	
</head>

<body>
	<input class="easyui-textbox" type="hidden" name="equipId" value="${equipId }" id="equipId"/>
	
	<!-- 路由器的接口信息 -->
	<div style="overflow: hidden;text-align: center;margin-left:10px;" >
		<label style="font-size:20px;font-family:黑体;">接口信息</label>
		
		<!-- 路由器设备的接口信息 -->
		<table id="equipInteInfoTable" style="margin-left:3px;" class="easyui-datagrid" data-options="singleSelect:true,onClickCell:onClickCell,onEndEdit: onEndEdit"  style="width: 100%;"></table>  

  			
  		<div style="margin-top:10px;">
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="update()">更新</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="appendRow();">添加</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="removeRow();">删除</a>
		</div>	
	</div>
	
	<div style="width:360px;height:510px;padding:10px;" id="append" class="easyui-window" title="添加接口信息" data-options="closed:true,iconCls:'icon-save'">
		<div style="padding:5px 0;text-align: center;" id="showMsg">所有的表单字段都是必填的。</div>
		<form id="InterfaceForm" method="post" >

		<table>

    		<tr>
    			<td>接口编号:</td>
    			<td><input class="easyui-textbox" id="info1" type="text" name="equipInteUnionKey.inteId" data-options="required:true"></input></td>
    		</tr>
    		
    		<tr>
    			<td>接口描述:</td>
    			<td><input class="easyui-textbox" id="info2" type="text" name="inteDesc" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>标称带宽(Mbps):</td>
    			<td><input class="easyui-textbox" id="info3" type="text" name="inteTraffic" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>类型:</td>
    			<td>
    				<select class="easyui-combobox" name="ifType" data-options="panelHeight:'auto'"  style="width:150px;" >
					   <c:forEach items="${dictStatusList }" var="jklx">
							<option>${jklx.dict_cont }</option>
					   </c:forEach>
					</select>
    			</td>
    		</tr>
    		<tr>
    			<td>状态:</td>
    			<td>
    				<select class="easyui-combobox" name="inteStatus" id="inteStatus" data-options="panelHeight:'auto'"  style="width:150px;">
						<option>up</option>
						<option>down</option>
						<option>testing</option>
					</select>
    			</td>
    		</tr>
			<tr>
    			<td>查询间隔(秒):</td>
    			<td><input class="easyui-textbox" type="text" id="info4"  name="measureTime" value="10" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>入利用率阈值(%):</td>
    			<td><input class="easyui-textbox" type="text" id="info5" name="inTraffic" value="60" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>出利用率阈值(%):</td>
    			<td><input class="easyui-textbox" type="text" id="info6" name="outTraffic" value="60" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>入丢包率阈值(%):</td>
    			<td><input class="easyui-textbox" type="text" id="info7" name="inLossRate" value="10" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>出丢包率阈值(%):</td>
    			<td><input class="easyui-textbox" type="text" id="info8" name="outLossRate" value="10" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>最大传送单元(字节):</td>
    			<td><input class="easyui-textbox" type="text" id="info9" name="mtu" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>接口IP:</td>
    			<td><input class="easyui-textbox" type="text" id="info10" name="inteIp" data-options="required:true"></input></td>
    		</tr>
    		<tr>
    			<td>接口IP掩码:</td>
    			<td><input class="easyui-textbox" type="text" id="info11" name="inteIpMask" data-options="required:true"></input></td>
    		</tr>
    		 
    		<tr align="center">
    			<td><input type="submit"  value="提交" style="width:40px;height:30px" class="easyui-linkbutton"  onclick="save_interface_info()"></td>
    			<td><input type="reset" value="重置" style="width:40px;height:30px" class="easyui-linkbutton" onclick="Reset()"></td>
    		</tr>

    	</table>
    	<input class="easyui-textbox" type="hidden" name="equipNum" value="${equipNum }" id="equipNum"/>
		<input class="easyui-textbox" type="hidden" name="equipInteUnionKey.equipId" value="${equipId }" id="equipId"/>
    	</form>
	</div>

	<script type="text/javascript" src="js/normalEquip/normalEquip_edit/routerEdit.js"></script>	<!-- 编辑路由器的js文件 -->
 
</body>

</html>