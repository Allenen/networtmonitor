<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String right = ">>", left = "<<";
String flag = "2";
 %>
<div id ="SLatencyDiv" style="padding:10px;margin:10px 0;display:none;">
    <!-- 编辑单向时延任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(2,'#SLatencyChooseTargetDevices',0);">保存</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(2,'#SLatencyChooseTargetDevices',1);">接口信息</a>
    </div>
    <form id="SLatencyForm" name ="SLatencyForm" method="post">
        <h3 class="fl">单向时延、丢包、时延抖动任务</h3>
        <input type="hidden" name="task_type" value="2"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称:<input id ="SLatencyTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体:<input id="SLatencyTask_subject" style="width:350px;" name="task_subject" data-options="required:true,missingMessage:'信息不能为空'"/></td>
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
                <td colspan="8">长包数:&nbsp;<input id="m_LPN" class="easyui-textbox" name="m_LPN" value="10" readonly="readonly" style="width:70px;"/>
                    长包长度:<input id="m_LPL" class="easyui-textbox" type="text" name="m_LPL" value="1000" readonly="readonly" style="width:70px;"/>
                    短包数:&nbsp;<input id="m_SPN" class="easyui-textbox" type="text" name="m_SPN" value="10" readonly="readonly" style="width:70px;"/>
                    短包长度:<input id="m_SPL" class="easyui-textbox" type="text" name="m_SPL" value="64" readonly="readonly" style="width:70px;"/>
                </td>

            </tr>
            <tr>
                <td colspan="8">协议:&nbsp;&nbsp;<select id="cc" class="easyui-combobox" name="m_Protocol" style="width:70px;">
                    <option value="UDP">UDP</option>
                    <option value="TCP">TCP</option>
                </select>
                    目标端口:<input id="m_DestPort" class="easyui-textbox" type="text" name="m_DestPort" value="9500" readonly="readonly" style="width:70px;"/>
                    发包间隔:<input id="m_SendInterval" class="easyui-textbox" type="text" name="m_SendInterval" value="1" readonly="readonly" style="width:70px;"/>（毫秒）
                </td>
            </tr>
            <tr>
                <td colspan="7">时延阈值:<input id="m_DelayLimit" class="easyui-textbox" type="text" name="m_DelayLimit" value="100" readonly="readonly" style="width:70px;"/>(毫秒)
                    丢包阈值:<input id="m_LossLimit" class="easyui-textbox" type="text" name="m_LossLimit" value="20" readonly="readonly" style="width:70px;"/>(%)
                    接收超时:<input id="m_ReceiveTimeOut" class="easyui-textbox" type="text" name="m_ReceiveTimeOut" value="1000" readonly="readonly" style="width:70px;"/>(毫秒)
                    &nbsp;<a href="#" onclick= "editPolicy()" class="easyui-linkbutton">修改策略</a>
                </td>
            </tr>
            <tr>
                <td colspan="7"><span style="width:50px;"></span><input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" value="00:00:00" style="width:150px" data-options="showSeconds:true">
                    至：<input id="end_time" name="e_end_time" class="easyui-timespinner" value="23:59:59"style="width:150px" data-options="showSeconds:true">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick= "savePolicy(2)" class="easyui-linkbutton">另存策略</a>
                </td>
            </tr>
            <tr>
                <td>选择策略:<input id="strategy2" name="policy_name" style="width:350px;" value="请选择任务策略">
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
                    <select  multiple="multiple" id="SLatencyTargetDevices" name = "targetDevices" ondblclick="moveOptionDbclickTrigger(this,'leftToRight')" size=16 style="width:200px"></select>

                </td>
                <td>
                    <a id="btnd1" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'leftToRight')"> <%=right %> </a>
                </td>
                <td rowspan="2">
                    <select multiple="multiple" id ="SLatencyChooseTargetDevices" name = "chooseTargetDevicesList2" ondblclick="moveOptionDbclickTrigger(this,'rightToLeft')" size=16 style="width:200px"></select>
                </td>
            </tr>
            <tr>
                <td><a id="btnd2" href="#" class="easyui-linkbutton" onclick="moveOptionButtonTrigger(this,'rightToLeft')"> <%=left %> </a></td>
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
