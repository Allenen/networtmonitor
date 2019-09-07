<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html style="height: 100%;">
<head>
   	<meta charset="utf-8"/>
    
    <base href="<%=basePath%>">
    <title>底图设置</title>
	
	
	<script src="jqueryEasyUI/jquery-1.11.3.min.js"></script>
    <script src="jqueryEasyUI/jquery.easyui.min.js"></script>
    <script src="qunee/qunee-min.js"></script>
	
	<!-- 自定义javascript文件-->
	<script src="js/topologyManager/bottommanager.js"></script>
	
	
	<link rel="stylesheet" href="jqueryEasyUI/easyui.css" />
	<link rel="stylesheet" href="jqueryEasyUI/icon.css" />
	
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

<body style="overflow: hidden;width:100%;height: 100%;display:block">
     
    <div id="toolbar" class="q-toolbar">
		<div style="display: inline-flex;">
			<div class="input-group input-group-sm">            
				<input type="file" id="openfile" style="display:none" onchange="load_pic()">            
				<button class="easyui-linkbutton" style="height:36px;" onclick="openfile.click()">图片浏览</button>			
				<button class="easyui-linkbutton" id="pic" style="height:36px;width:55px" onclick="fun()">预览</button>            
			</div>
		</div>
		<button class="easyui-linkbutton" id="upload" title="上传图片" onclick="clicklistener()"> 上传底图</button>
		<button class="easyui-linkbutton" id="upload" title="设置显示" onclick="setview()">设置显示</button>
		<button class="easyui-linkbutton" id="upload" title="刷新" onclick="refreshpage()"> 刷新</button>
	</div>
	<br></br>
    <div id="table_panel" style="height:100%;">
    	<table id="bottomimage_table" class="easyui-datagrid" data-options="singleSelect:true,border:false" style="border-color:#95B8E7;width:75%;height:100%;">
			<thead>
				<tr>
					<th data-options="field:'imageId',align:'center'" width="5%">编号</th>
					<th data-options="field:'imageName',align:'center'" width="20%">图片名称</th>
					<th data-options="field:'imagePath',align:'center'" width="45%">图片路径</th>
					<th data-options="field:'image',align:'center'" width="10%">图片</th>
					<th data-options="field:'isFlag'" width="20%">操作</th>
				</tr>
			</thead>
			
			<tbody>
				<c:forEach items="${multipartFileDomainList}" var="multipartFileDomain">
					<tr>
						<td>${multipartFileDomain.imageId }</td>
						<td>${multipartFileDomain.imageName }</td>
						<td>${multipartFileDomain.imagePath }</td>
						<td>
							<img src="${pageContext.request.contextPath }/images/bottomImages/${multipartFileDomain.imageName }" width="30px;" height="30px;"/>
						</td>
                   	 	<td>
                   	 		<input type="radio" name="isFlag" value="${multipartFileDomain.imageId }" <c:if test="${multipartFileDomain.isFlag==1 }">checked="checked"</c:if>/>设置底图
                   	 		<a href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_trash_zfj'" onclick="deleteBottomImageById(${multipartFileDomain.imageId});">删除</a>
                   	 	</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
    </div>

    
</body>

</html>