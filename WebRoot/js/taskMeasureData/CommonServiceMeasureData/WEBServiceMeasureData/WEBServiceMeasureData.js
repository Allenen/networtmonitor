/** 通用业务性能测量数据-web业务类型**/

var m_taskNum = undefined;
/**
 * 文档加载完成后触发
 */
$(function(){
	 //1. 取得选中的任务编号
	 var taskNum = $('#task_num').val();
	 
	 //2. 列表与视图模式切换
	$("input:radio[name='showType']").click(function() {
   		if(this.value == 02)//曲线视图
   		{
        	$("#centerTableLayout").hide();
        	$("#centerGraphLayout").show();
        	
			//通用业务性能测量数据-web业务类型的图标式
			//loadView_graph();
			initResponseDelayAndPageDelay();
   		}else{				//列表视图
     		$("#centerGraphLayout").hide();
     		$("#centerTableLayout").show();
   		}
	});
	
	//3. 通用业务性能测量数据-web业务类型的任务列表初始化
	$('#WEBCommonServiceMeasureDataQueryTree').tree({
		url:'ajaxGetAllTasksByTaskType.html?taskType=8&&serviceType=web',
		onClick: function(node)
		{	
			m_taskNum = node.id;
			
			$.ajax({
				url:"getTaskByTaskNum.html",
				type:"POST",
				data:{"taskNum":m_taskNum},
				success:function(data)
				{
					setWEBServiceValue(data.task);//选中任务后，设置通用业务性能任务-web的数值
					$('#WEBCommonServiceMeasureDataQueryTable').datagrid('loadData',[]);//加载测量数据
				},
				error:function()
				{
					console.log("获取任务数值失败！");
				}
			});
		}
	});
	
});

/**
 * 设置通用业务性能测量任务的数值
 */
function setWEBServiceValue(task)
{
	//1. 设置任务名称
	$('#taskName').textbox('setValue',task.task_name);
	//2. 设置任务号
	$('#task_num').textbox('setValue', task.task_num);
	//3. 设置源探测设备名、目标设备名
	var taskSubjectId = task.task_subject,taskTargetId = task.task_target;//源探测设备标识，目标探测设备标识
	$('#task_subject').textbox('setValue', getEquipByEquipId(taskSubjectId).equipName);//设置源探测设备
	$("#task_target").textbox("setValue", getEquipByEquipId(taskTargetId).equipName);//设置目标探测设备
}

/**
 * 返回指定设备唯一标识的设备
 */
function getEquipByEquipId(equipId)
{
	var equip = undefined;
	$.ajax({
		url:"getEquipByEquipId.html",
		type:"POST",
		async:false,
		data:{"equipId":equipId},
		success:function(data)
		{
			equip = data;
		}
	});
	return equip;
}

