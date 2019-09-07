<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id ="TETestDiv" style="padding:10px;margin:10px 0;display:none;">
    <!-- 编辑TE隧道测量任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(4,'#TETestChooseTargetDevices',0);">保存</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(4,'#TETestChooseTargetDevices',0);">保存并激活</a>
    </div>
    <form id="TETestForm" name ="TETestForm" method="post">
        <h3 class="fl">TE隧道测量任务</h3>
        <input type="hidden" name="task_type" value="4"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称:<input id ="TETestTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体:<input id="TETestTask_subject" style="width:350px;" name="task_subject" /></td>
            </tr>
            <tr>
                <td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 周期性测量   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="30" style="width:50px;"/>
                    <select name="interval_unit" id="detectcc2" class="easyui-combobox" style="width:50px;">
                        <option value="s">秒</option>
                        <option value="m">分</option>
                        <option value="h">时</option>
                    </select>
                </td>
            </tr>
        </table>
        <table  style="border:1px solid #ccc;padding:10px;margin:10px 0;">
            <tr><td colspan="4">策略参数：</td></tr>
            <tr>
                <td colspan="8">丢包阈值:<input id="m_loss_limit" class="easyui-textbox" name="m_loss_limit" value="0" readonly="readonly" style="width:100px;"/>‰
                  时延阈值:<input id="m_delay_limit" class="easyui-textbox" type="text" name="m_delay_limit" value="10" readonly="readonly" style="width:100px;"/>(毫秒)
                    协议:&nbsp;&nbsp;<select name="m_protocol" id="m_protocol" class="easyui-combobox" style="width:100px;">
                        <option value="TCP">TCP</option>
                        <option value="UDP">UDP</option>
                    </select>
                </td>

            </tr>
            <tr>
                <td colspan="8">
                    方向:&nbsp;&nbsp;<select name="m_direction" id="m_direction" class="easyui-combobox" style="width:100px;">
                        <option value="client-to-server">client-to-server</option>
                        <option value="server-to-client">server-to-client</option>
                    </select>
                    区分服务编码:<select name="m_dscp" id="m_dscp" class="easyui-combobox" style="width:100px;">
                    <c:forEach begin="0" end="255" varStatus="status">
                    	<option value="${status.index }">${status.index }</option>
                    </c:forEach>
                    </select>
                    
                </td>
            </tr>
            <tr>
                <td colspan="8">
                    源端口:&nbsp;<input id="m_sender_port" name="m_sender_port" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:100px;"/>(秒)
                    目标端口:<input id="m_receiver_port" name="m_receiver_port" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:100px;"/>
                     发包时间:<input id="m_duration" name="m_duration" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:70px;"/>(秒)
                </td>
            </tr>
            <tr>
                <td colspan="8">
                    发包间隔:<input id="m_time_option " name="m_time_option" class="easyui-textbox" type="text" value="30" readonly="readonly" style="width:100px;"/>(秒)
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
      <a href="#" onclick= "savePolicy(4)" class="easyui-linkbutton">另存策略</a>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                	<input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
                    	至：<input id="end_time" name="e_end_time" class="easyui-timespinner" style="width:150px" value="23:59:59" data-options="showSeconds:true">
                </td>
            </tr>
            <tr>
                <td>选择策略:<input id="strategy4" name="policy_name" style="width:350px;" value="请选择任务策略">
                </td>
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
                    <select  multiple="multiple" id="TETestTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px"/>
                </td>
                <td>
                    <a id="btnd1" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> >> </a>
                </td>
                <td rowspan="2">
                    <select multiple="multiple" id ="TETestChooseTargetDevices" name = "chooseTargetDevicesList4" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px"></select>
                </td>
            </tr>
            <tr>
                <td><a id="btnd2" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"> << </a></td>
            </tr>
        </table>
        <table>
            <tr>
                <td><label><input type="checkbox"> </label>跨域测量</td>
                <td>目标探针申请：</td>
                <td><label><input type="radio" name="tanZhengType" value="dev"> </label>按设备名</td>
                <td><label><input type="radio" name="tanZhengType" value="ip"> </label>按IP</td>
                <td><label><input type="radio" name="tanZhengType" value="com"> </label>按单位名</td>
            </tr>
            <tr> <td colspan="5"><input class="easyui-textbox" type="text" style="width:350px;"/></td></tr>
        </table>
    </form>
</div>
