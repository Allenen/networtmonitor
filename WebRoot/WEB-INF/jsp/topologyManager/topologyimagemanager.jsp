<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
request.setAttribute("path", path);
%>
<!DOCTYPE html>
<html style="height: 100%;">
<head>
    <meta charset="utf-8"/>
    <base href="<%=basePath%>">
    <title>域管理设置</title>
	
	<script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    
    <link rel="stylesheet" href="jqueryEasyUI/easyui.css" />
	<link rel="stylesheet" href="jqueryEasyUI/icon.css" />
	
	<!-- 自定义javascript文件-->
	<script src="js/topologyManager/topologyimagemanager.js"></script>
	
	

	
	<style>
		#toolbar {
            background-color: #F8F8F8;
            border-bottom: solid 1px #DDD;
            padding: 5px;
        }
		#toolbar .easyui-linkbutton, #toolbar .btn-group {
            margin-right: 5px;
        }
        #toolbar .btn-group .btn {
            margin-right: 0px;
        }

		.q-toolbar {
            position: absolute;
            top: 0px;
			left: 0px;
            width: 100%;
        }
	</style>

	
</head>

<body style="overflow: hidden;height: 100%;">
     
    <div id="toolbar" class="q-toolbar">
		<div style="display: inline-flex;">
			<div class="input-group input-group-sm">            
				<input type="file" id="openfile"  style="display:none" onchange="load_pic()">            
				<button class="easyui-linkbutton" style="height:36px;" onclick="openfile.click()">图片浏览</button>			
				<button class="easyui-linkbutton" id="pic" style="height:36px;width:55px"onclick="preview()">预览</button>            
			</div>
		</div>
		<div style="display: inline-flex;height:27px;width: 200px;">
			<input id="imageType" value="请选择上传的图片类型" style="height:100%;width:100%"/> 
		</div>
		<button class="easyui-linkbutton" id="upload" title="上传图片" onclick="clicklistener()"> 上传图片</button>
		<button class="easyui-linkbutton" id="setTopologyImage" title="设置显示" onclick="setview()">设置显示</button>
		<button class="easyui-linkbutton" title="刷新" onclick="refreshpage()"> 刷新</button>
	</div>
	<br></br>
    <div id="table_panel" style="height:100%;">
    	<table id="image_table" class="easyui-datagrid" data-options="singleSelect:true,border:false" style="border-color: #95B8E7;width: 98%;height:100%;">
			<thead>
				<tr>
					<th data-options="field:'topologyImageId'" width="7%">编号</th>
					<th data-options="field:'topologyImageName'" width="14%">图片名称</th>
					<th data-options="field:'topologyImagePath'" width="42%">图片路径</th>
					<th data-options="field:'image'" width="7%">图片</th>
					<th data-options="field:'topologyImageType'" width="9%">所属类型</th>
					<th data-options="field:'isFlag'" width="21%">操作</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${topologyImageList}" var="topologyImage">
					<tr>
						<td>${topologyImage.topologyImageId }</td>
						<td>${topologyImage.topologyImageName }</td>
						<td>${topologyImage.topologyImagePath }</td>
						<td>
							<img src="${pageContext.request.contextPath }/images/topologyImages/${topologyImage.topologyImageName }" width="30px;" height="30px;"/>
						</td>
						<td>${topologyImage.topologyImageType }</td>
						<td>
							<input type="checkbox" name="isFlag" value="${topologyImage.topologyImageId}" <c:if test="${topologyImage.isFlag == 1}">checked="checked"</c:if>/>设置显示
							<a class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_trash_zfj'" onclick="deleteTopologyImageById(${topologyImage.topologyImageId});">删除</a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
    </div>
    
</body>


</html>