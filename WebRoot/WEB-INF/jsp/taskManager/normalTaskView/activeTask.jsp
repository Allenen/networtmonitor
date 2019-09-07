<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>激活任务</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	
  </head>
  
  <body>
 
    <form id="activeTaskff" method="post">
    	<%-- <input name="task_num" type="hidden" value=${task.task_num }>  --%>
		<table>
			<tr>
				<th colspan="2"><label for="name">任务名称:</label>  ${task.task_name }</th>
			</tr>
			<tr>
				<td><label for="name"> 触发时间</label></td>
				<td><input id="beginDate" name="start_time" class="easyui-datetimebox" value ="<%=new Date() %>" style="width:150px" data-options="onSelect:onSelectedDate,required:true"></td>
			</tr>
			<tr>
				<td><label for="end"> 结束时间</label></td>
				<td><input id="endDate" name="end_time" class="easyui-datetimebox"  value ="<%=new Date() %>" style="width:150px" data-options="onSelect:onSelectedDate"></td>
			</tr>
			<tr>
				<td colspan="2" style="text-align: right;"><a class="easyui-linkbutton" onclick="activeTaskForm()">确定</a> <a class="easyui-linkbutton" onclick="closeDialog()">关闭</a></td>
			</tr>
		</table>
   </form>
   
   <script type="text/javascript" src="js/selfJS/dateValidator.js"></script>     <!--用于日期的校验：起始日期小于终止日期-->
  </body>
</html>
