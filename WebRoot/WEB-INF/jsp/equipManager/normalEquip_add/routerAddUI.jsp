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
    
    <title>路由器UI</title>

	
	<link rel="stylesheet" type="text/css" href="jqueryEasyUI/icon.css"/>
    <link rel="stylesheet" type="text/css" href="jqueryEasyUI/easyui.css"/>
    <script type="text/javascript" src="jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="jqueryEasyUI/jquery.easyui.min.js"></script>
    
  </head>
  
  <body >
  	<!-- 路由器设备添加界面的UI -->
  	<div >
  		<form id="routerEquipForm" method="post">
  		<!-- 路由器的基本信息 -->
  		<div style="overflow:hidden;text-align: center;">
  			<label style="font-size:20px;font-family:黑体;margin-top:10px;">添加路由器</label>
  			<table style="width: 100%;margin-left: 20px;">
				<tr>
					<td colspan="1">设备标识:</td>
					<td colspan="1"><input class="easyui-textbox"  name="equipId" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					<td colspan="1">设备名称:</td>
					<td colspan="1"><input class="easyui-textbox"  name="equipName" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					<td colspan="1">设备类别:</td>
					<td colspan="1"><input class="easyui-textbox" type="text" name="equipKind" value="${equipKind }" readonly="readonly" /></td>
				</tr>
				<tr>
					<td colspan="1">管理IP:</td>
					<td colspan="1"><input class="easyui-textbox" name="manageIp" data-options="required:true,missingMessage:'信息不能为空'"/></td>
					<td colspan="1">归属单位:</td>
					<td colspan="2">
						<select class="easyui-combobox" name="areaUnit" style="width:175px;">
						   <c:forEach items="${dictUnitList }" var="gsdw">
								<option>${gsdw.dict_cont }</option>
						   </c:forEach>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan="1">维护单位:</td>
					<td colspan="1"><input class="easyui-textbox"  name="keepUnit" ></td>
					<td colspan="1">联系人:</td>
					<td colspan="1"><input class="easyui-textbox"  name="keepPerson" /></td>
					<td colspan="1">联系电话:</td>
					<td colspan="1"><input class="easyui-textbox"  name="keepPhone" /></td>
				</tr>
				<tr>
					<td colspan="1">测量代理:</td>
					<td colspan="1"><input type="checkbox" name="isProxy" onclick="this.value=this.checked?1:0" /></td>
					<td colspan="1">坐标X:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionX" /></td>
					<td colspan="1">坐标Y:</td>
					<td colspan="1"><input class="easyui-textbox" name="positionY" /></td>
				</tr>
			</table>
			<label style="font-size:16px;font-family:黑体;margin-top:10px;">SNMP参数</label>
			<table style="width: 100%;margin-left: 20px;">
				<tr>
					<td colspan="1">SNMP端口:</td>
					<td colspan="1"><input class="easyui-textbox" name="snmpPort" value="161" id="snmpPort"/></td>
					<td colspan="1">SNMP版本:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpVersion" style="width:175px;">
							<option>V1</option>
							<option>V2</option>
							<option>V3</option>
						</select>
					</td>
					<td colspan="1">读共同体名:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpRcommunity" value="public" id="snmpRcommunity"/></td>
				</tr>
				<tr>
					<td colspan="1">重试次数:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpRetry" value="3" id="snmpRetry"/></td>
					<td colspan="1">超时时间:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpTimeout" value="1" id="snmpTimeout"/></td>
					<td colspan="1">写共同体:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpWcommunity" value="private" id="snmpWcommunity"/></td>
				</tr>
				<tr>
					<td colspan="1">V3安全名:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3SecurityName" value="public" id="snmpV3SecurityName"/></td>
					<td colspan="1">V3安全等级:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3SecurityLevel" style="width:175px;">
							<option value="NOAUTHNOPRIV">NOAUTHNOPRIV</option>
							<option value="AUTHNOPRIV">AUTHNOPRIV</option>
							<option value="AUTHPRIV">AUTHPRIV</option>
						</select>
					</td>
					<td colspan="1">V3安全模型:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3SecurityModel" style="width:175px;">
							<option>V1</option>
							<option>USM</option>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan="1">V3上下文名:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3ContextName" /></td>
					<td colspan="1">V3上下文引擎:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3ContextEngoneId" /></td>
					<td colspan="1">V3认证协议:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3AuthProtocol" style="width:175px;">
							<option>NONE</option>
							<option>SHA</option>
							<option>MD5</option>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan="1">V3认证口令:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3AuthPassword"/></td>
					<td colspan="1">V3私有协议:</td>
					<td colspan="1">
						<select class="easyui-combobox" name="snmpV3PrivProtocol" style="width:175px;">
							<option>NONE</option>
							<option>DES</option>
							<option>3DESEDE</option>
							<option>IDEA</option>
							<option>AES128</option>
							<option>AES192</option>
							<option>AES256</option>
						</select>
					</td>
					<td colspan="1">V3私有口令:</td>
					<td colspan="1"><input class="easyui-textbox"  name="snmpV3PrivPassword"/></td>
				</tr>
			</table>
			<div style="float: right;margin-right:40px;margin-top: 10px;">
				<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveRouterEquipForm();">保存</a>
			</div>
  		</div>
  		
  		</form>
  		
  		
  		<!-- 路由器的接口信息 -->
  		<div style="overflow: hidden;text-align: center;">
  			<label style="font-size:20px;font-family:黑体;">接口信息</label>
  			<table id="dg" class="easyui-datagrid" style="width:100%;" data-options="iconCls:'icon-save'">
				<thead>
					<tr>
						<th data-options="field:'inteId',resizable:false" >接口编号</th>
						<th data-options="field:'inteDesc',resizable:false" >接口描述</th>
						<th data-options="field:'inteTraffic',resizable:false" >标称带宽(Mbps)</th>
						<th data-options="field:'ifType',resizable:false" >类型</th>
						<th data-options="field:'inteStatus',resizable:false" >状态</th>
						<th data-options="field:'measureTime',resizable:false" >查询间隔(秒)</th>
						<th data-options="field:'inTraffic',resizable:false" >入利用率阈值</th>
						<th data-options="field:'outTraffic',resizable:false">出利用率阈值(%)</th>
						<th data-options="field:'inLossRate',resizable:false" >入丢包率阈值(%)</th>
						<th data-options="field:'outLossRate',resizable:false" >出丢包率阈值(%)</th>
						<th data-options="field:'mtu',resizable:false" >最大传送单元(字节)</th>
						<th data-options="field:'inte_ip',resizable:false" >接口IP</th>
						<th data-options="field:'inte_ip_mask',resizable:false" >接口IP掩码</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td >1</td>
						<td >接口1</td>
						<td >1.237</td>
						<td >类型</td>
						<td >up</td>
						<td >10</td>
						<td >43</td>
						<td >23</td>
						<td >7</td>
						<td >3</td>
						<td >1473</td>
						<td >192.168.110.1</td>
						<td >255.255.255.1</td>
					</tr>
					<tr>
						<td >2</td>
						<td >接口2</td>
						<td >1.237</td>
						<td >类型</td>
						<td >up</td>
						<td >10</td>
						<td >43</td>
						<td >23</td>
						<td >7</td>
						<td >3</td>
						<td >1473</td>
						<td >192.168.110.1</td>
						<td >255.255.255.1</td>
					</tr>
				</tbody>
			</table>
			<div style="margin-top:10px;">
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">获取</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">更新</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">添加</a>
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">删除</a>
		</div>
  		</div>
  	</div>
  <script type="text/javascript" src="js/normalEquip/normalEquip_edit/normalEquipEditAndSave.js"></script> <!--编辑普通设备后保存 -->
  </body>
</html>
