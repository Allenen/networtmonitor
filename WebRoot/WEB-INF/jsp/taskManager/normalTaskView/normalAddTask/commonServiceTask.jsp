<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id ="commonServiceDiv" style="padding:10px;margin:10px 0;display:none;">
    <!-- 编辑通用业务性能测量任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(8,'',0);">保存</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(8,'',1);">保存并激活</a>
    </div>
    <form id="commonServiceForm" name ="commonServiceForm" method="post">
        <h3 class="fl">通用业务性能测量任务</h3>
        <input type="hidden" name="task_type" value="8"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称:<input id ="commonServiceTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体:<input id="commonServiceTask_subject" style="width:350px;" name="task_subject" /></td>
            </tr>
            <tr>
                <td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" value="192.9.201.10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="30" style="width:50px;"/>
                    <select name="interval_unit" id="detectcc2" class="easyui-combobox" style="width:50px;">
                        <option value="s">秒</option>
                        <option value="m">分</option>
                        <option value="h">时</option>
                    </select>
                </td>
            </tr>
            <tr style="margin-top:5px;">
            	<td>
	            	<label>业务类型:</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType" checked="checked"/><label>WEB</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType"/><label>FTP</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType"/><label>DNS</label>&nbsp;&nbsp;
	            	<input type="radio" name="serviceType"/><label>EMAIL</label>
            	</td>
            	<td></td>
            </tr>
        </table>
        </form>
        <!-- web类型的业务 -->
        <div id="WEBDiv" >
        	<form id="commonWEBForm">
        	<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
	            <tr><td colspan="4">策略参数：</td></tr>
	            <tr>
	                <td colspan="8">
	                	<label>服务器端口:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="80" readonly="readonly" style="width:70px;"/>
	                 	<label>访问文件:</label><input id="m_file_to_browse" class="easyui-textbox" type="text" name="m_file_to_browse" value="/" style="width:100px;"/>
	                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;<a href="#" onclick= "savePolicy(8)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td>选择策略:<input id="strategy8" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
	            </tr>
        	</table>
        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select multiple="multiple" id="CommonWEBTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px"/>
                </td>
                <td>
                </td>
                <td rowspan="2">
                    <select style="width:200px;" id="CommonWEBChooseTargetDevices"></select>
                </td>
            </tr>
        </table>
        	</form>
        </div>
        
        <!-- FTP类型的业务 -->
        <div id="FTPDiv" style="display:none;">
        	<form id="commonFTPForm">
        	<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
	            <tr><td colspan="4">策略参数：</td></tr>
	            <tr>
	                <td colspan="8">
	                	<label>服务器端口:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="21" readonly="readonly" style="width:70px;"/>
	                 	<label>用户名:</label><input id="m_username" class="easyui-textbox" type="text" name="m_username" value="anonymous" readonly="readonly" style="width:100px;"/>
	                 	<label>口令:</label><input id="m_password" class="easyui-textbox" type="text" name="m_password" value="user@test.org" readonly="readonly" style="width:100px;"/>
	                	<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="8">
	                	<label>下载文件:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="/test.txt" readonly="readonly" style="width:70px;"/>
	                	<a href="#" onclick= "savePolicy(8)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	                </td>
	            </tr>
	            <tr>
	                <td>选择策略:<input id="strategy9" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
	            </tr>
        	</table>
        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select  multiple="multiple" id="CommonFTPTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px"/>
                </td>
                <td>
                </td>
                <td rowspan="2">
                	<select style="width:200px;" id="CommonFTPChooseTargetDevices"></select>
                </td>
            </tr>
        </table>
        	</form>
        </div>
        
        <!-- DNS类型的业务 -->
        <div id="DNSDiv" style="display:none;">
        	<form id="commonDNSForm">
        	<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
	            <tr><td colspan="4">策略参数：</td></tr>
	            <tr>
	                <td colspan="8">
	                	<label>服务器端口:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="53" readonly="readonly" style="width:70px;"/>
	                 	<label>解析域名:</label><input id="m_file_to_browse" class="easyui-textbox" type="text" name="m_file_to_browse" value="www.lgdx.mtn" readonly="readonly" style="width:100px;"/>
	                	<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "savePolicy(8)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
	            <tr>
	                <td>选择策略:<input id="strategy10" name="policy_name" style="width:350px;" value="请选择任务策略"> </td>
	            </tr>
        	</table>
        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select  multiple="multiple" id="CommonDNSTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px"/>
                </td>
                <td>
                </td>
                <td rowspan="2">
                	<select style="width:200px;" id="CommonDNSChooseTargetDevices"></select>
                </td>
            </tr>
        </table>
        	</form>
        </div>
        
        <!-- EMAIL类型的业务 -->
        <div id="EMAILDiv" style="display:none;">
        	<!-- <form id="commonEMAILForm"> -->
        	<table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
	            <tr><td colspan="4">策略参数：</td></tr>
	            <tr>
	                <td colspan="8">
	                <form id="commonEMAILSMTPForm">
	                	<input id="smtp" type="checkbox" name="m_service_type" onclick="this.value=($(this).is(':checked') ? 'smtp':'')"/><label>SMTP</label>
	                	<label>SMTP服务器端口:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="25" readonly="readonly" style="width:70px;"/>
	                 	<label>账户名:</label><input id="m_mailbox" class="easyui-textbox" type="text" name="m_mailbox" value="user@lgdx.mtn" readonly="readonly" style="width:100px;"/>
	                 	<label>口令:</label><input id="m_password" class="easyui-textbox" type="text" name="m_password" value="123" readonly="readonly" style="width:70px;"/>
	                	<label>接收者:</label><input id="m_recv_addr" class="easyui-textbox" type="text" name="m_recv_addr" value="usera@mail.zc" readonly="readonly" style="width:100px;"/>
	                </form>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="8">
	                <form id="commonEMAILPOP3Form">
	                	<input id="pop3" type="checkbox" name="m_service_type" onclick="this.value=($(this).is(':checked') ? 'pop3':'')"/><label>POP3</label>
	                	<label>POP3服务器端口:</label>
	                	<input id="m_server_port" class="easyui-textbox" name="m_server_port" value="110" readonly="readonly" style="width:70px;"/>
	                 	<label>账户名:</label><input id="m_mailbox" class="easyui-textbox" type="text" name="m_mailbox" value="user@lgdx.mtn" readonly="readonly" style="width:100px;"/>
	                 	<label>口令:</label><input id="m_password" class="easyui-textbox" type="text" name="m_password" value="123" readonly="readonly" style="width:70px;"/>
	                </form>
	                </td>
	            </tr>
	            <tr>
	                <td colspan="7">
	                <form id="commonEMAILTimeForm">
	                	<input id="time" type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制 
	                	 自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
	                                                                   至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59" style="width:150px" data-options="showSeconds:true">
	                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
	                </form>
	                </td>
	            </tr>
	            <tr>
	                <td>
	                	选择策略:<input id="strategy11" class="easyui-combobox" style="width:350px;" value="请选择任务策略">
	                	<a href="#" onclick="savePolicy(8)" class="easyui-linkbutton">另存策略</a>
	                </td>
	            </tr>
        	</table>
        	</form>
        	<table>
            <tr>
                <td>可选目标设备：</td>
                <td>
                </td>
                <td>已选目标设备：</td>
            </tr>
            <tr>
                <td rowspan="2">
                    <select  multiple="multiple" id="CommonEMAILTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px"/>
                </td>
                <td> </td>
                <td rowspan="2">
                	<select style="width:200px;" id="CommonEMAILChooseTargetDevices"></select>
                </td>
            </tr>
        </table>
        </div>
        
        
</div>
