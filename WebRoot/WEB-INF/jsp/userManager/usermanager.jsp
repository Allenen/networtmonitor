<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html style="height:100%">
<head>
    
    <title>用户管理</title>
    <base href="<%=basePath%>">
	<meta charset="UTF-8">
	
	<link rel="stylesheet" href="jqueryEasyUI/easyui.css" />
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css"/>
	<link rel="stylesheet" href="jqueryEasyUI/icon.css">
	<link rel="stylesheet" href="css/topologymanager.css"/>

	<script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script src="qunee/qunee-min.js"></script>
	
	<script src="js/topologyManager/common.js"></script>
	<script src="js/userManager/usermanager.js"></script>

</head>
  
<body style="height:100%">
	<div id="toolbar" class="q-toolbar"></div>

	<div id="table_panel" style="height:100%">			
		<table id="user_tab" class="easyui-datagrid" data-options="singleSelect:true,onClickCell:onClickCell,border:false" style="border-color: #95B8E7;width: 100%;height:100%;selectOnCheck:false">

			<thead>
				<tr>
					<th data-options="field:'userId',align:'center'" width="15%">用户名</th>				
					<th data-options="field:'userPassword',align:'center',editor:'textbox'"  width="12%">登录密码</th>
					<th data-options="field:'userPhone',align:'center',editor:'textbox'" width="12%">联系电话</th>
					<th data-options="field:'userRealName',align:'center',editor:'textbox'" width="10%">真实姓名</th>
					<th data-options="field:'userUnit',align:'center',editor:'textbox'" width="18%">单位</th>	
					<th data-options="field:'userMemo',align:'center',editor:'textbox'" width="18%">备注</th>	
					<th data-options="field:'status',align:'center'" width="15%">状态</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${userlist}" var="user">
					<tr>
						<td>${user.userId}</td>
						<td>${user.userPassword}</td>
						<td>${user.userPhone}</td>

						<td>${user.userRealName}</td>
						<td>${user.userUnit}</td>
						<td>${user.userMemo}</td>
						<td>
							<input type="checkbox" name="isselect" value="${user.userId}"/>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
	<div style="width:380px;height:370px;padding:10px;" id="append" class="easyui-window" title="添加用户" data-options="closed:true,iconCls:'icon-save'">
	    	<div style="padding:5px 0;text-align: center;align:center" id="showMsg">所有的表单字段都是必填的。</div>
	    	<table >

	    		<tr>
	    			<td>用户名:</td>
	    			<td><input class="easyui-textbox" id="id_text" type="text" name="userId" data-options="required:true"></input></td>
	    		</tr>
	    		
	    		<tr>
	    			<td>登录密码:</td>
	    			<td><input class="easyui-textbox" id="pwd_text" type="text" name="userPassword" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td>联系电话:</td>
	    			<td><input class="easyui-textbox" id="phone_text" type="text" name="userPhone" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td>真实姓名:</td>
	    			<td>
	    				<input class="easyui-textbox" id="name_text" type="text" name="userRealName" data-options="required:true"></input>
	    			</td>
	    		</tr>
	    		<tr>
	    			<td>单位:</td>
	    			<td>
	    				<input class="easyui-textbox" id="unit_text" type="text" name="userUnit" data-options="required:true"></input>
	    			</td>
	    		</tr>
				<tr>
	    			<td>备注:</td>
	    			<td><input class="easyui-textbox" id="memo_text" type="text" name="userMemo" data-options="required:true"></input></td>
	    		</tr>
	    		 
	    		<tr>
	    			<td><input type="submit"  value="提交" style="width:40px;height:30px"  onclick="submit()" class="easyui-linkbutton"></td>
	    			<td><input type="reset" value="重置" style="width:40px;height:30px" class="easyui-linkbutton" onclick="reset()"></td>
	    		</tr>
	    	 	
	    	</table>

    </div>
	
</body>	

</html>
