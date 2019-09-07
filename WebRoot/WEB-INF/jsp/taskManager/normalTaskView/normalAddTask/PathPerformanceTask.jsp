<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id ="PathPerformanceDiv" style="padding:10px;margin:10px 0;display:none;">
    <!-- 链路性能测量任务的菜单栏 -->
    <div style="float: right;margin-top:2px;">
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="saveTask(5,null,0);">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="saveTask(5,null,1);">保存并激活</a>
    </div>
    <form id="PathPerformanceForm" name ="PathPerformanceForm" method="post">
        <h3 class="fl">链路性能测量任务</h3>
        <input type="hidden" name="task_type" value="5"/>
        <input type="hidden" name="level" value="4"/>
        <table style="width: 100%;">
            <tr>
                <td colspan="8">任务名称:<input id ="PathPerformanceTaskName" class="easyui-textbox" style="width:350px;" name="task_name" data-options="required:true,missingMessage:'信息不能为空'"/></td>
            </tr>
            <tr>
                <td colspan="8">任务主体:<input id="PathPerformanceTask_subject" style="width:350px;" name="task_subject" /></td>
            </tr>
            <tr>
                <td colspan="8">上报IP:&nbsp;<input class="easyui-textbox" type="text" name = "send_ip" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 上报间隔   间隔：<input class="easyui-textbox" type="text" name = "task_interval" value="30" style="width:50px;"/>
                <select name="interval_unit" id="detectcc1" class="easyui-combobox" style="width:50px;">
                                        <option value="s">秒</option>
                                    </select>
                </td>
            </tr>
            <tr>
                <td colspan="7"><input type="checkbox" name="is_cycle" value="0" onclick="this.value=(this.value==0)?1:0"> 时段控制  自：<input id="start_time" name="s_start_time" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
                    至：<input id="end_time" name="e_end_time" class="easyui-timespinner" style="width:150px" data-options="showSeconds:true">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
            </tr>
        </table>
        选择路由器及接口：
        <ul id="pathPerformanceTree"></ul>
    </form>
</div>
