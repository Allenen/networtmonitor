
/**
 * 链路性能测量数据的js文件 by zxgm 2016-10-31
 * */
 
 var m_taskNum = undefined, m_taskTargetArrayForGraph=[], m_pathPerformanceMeasureRecords = undefined;
/**
 * 文档加载完成后触发
 */
$(function(){
	//1. 取得当前选中的任务编号
	var taskNum = $("#task_num").val();
	
	//2. 列表与视图相互转换
	$("input:radio[name='showType']").click(function(){
		if(this.value == 02)	//2.1 曲线视图
		{
			$("#centerTableLayout").hide();
			$("#centerGraphLayout").show();
			
			//1.初始化时延、丢包率折线图结构
			initTrafficAndLossRate();
		}else	//2.2 列表视图
		{
			$("#centerGraphLayout").hide();
			$("#centerTableLayout").show();
		}
	});
	
	//3. 双向时延任务列表初始化
	$('#PathPerformanceMeasureDataQueryTree').tree({
		url:'ajaxGetAllTasksByTaskType.html?taskType=5',
		onClick: function(node)
		{
			m_taskNum = node.id;
			m_taskTargetArrayForGraph.length=0;
			$.ajax({
				url:"getTaskByTaskNum.html",
				type:"POST",
				data:{"taskNum":m_taskNum},
				success:function(data)
				{
					setPathPerformanceValue(data.task);//点击任务后设置相应任务的数值
					$('#PathPerformanceMeasureDataQueryTable').datagrid('loadData',[]);//加载双向时延测量数据
					
					m_isAllChecked = false;
					$("#checkAll").prop("checked",false);
					$('.equipNameCheckbox').prop("checked",false);
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
 * 点击相应的任务，设置任务的属性
 */
function setPathPerformanceValue(task)
{
	$('#taskName').textbox('setValue',task.task_name);//设置任务名称
	$('#task_num').textbox('setValue', task.task_num);//设置任务号
	$('#task_subject').textbox('setValue', task.task_subject);//设置执行探针设备
	
	var taskTarget = task.task_target;					//目标设备标识列表 （可以为空）
	
	if(taskTarget != "")								//目标设备标识列表不为空
	{
		/*根据设备标识得到设备*/
		$.ajax({
			url:"getEquipsByEquipIdList.html",
			type:"POST",
			data:{"equipIdList":taskTarget},
			success:function(data)
			{
				var taskTargetArrayName = [], taskTargetArrayIp = [];
				for(var i=0;i<data.length;i++)
				{
					taskTargetArrayName.push(data[i].equipName);
					taskTargetArrayIp.push(data[i].manageIp);
				}
				
				//设置目标设备
				$('#targetEquipDiv').empty();
				var length = taskTargetArrayName.length;
				for(var i=0;i<length;i++)
				{
					if(taskTargetArrayName[i] != "")
					{
						m_taskTargetArrayForGraph.push(taskTargetArrayName[i]);
						var inputElement = "<label><input class ='equipNameCheckbox' onclick='getAllSelect()' type='checkbox' value ='"+taskTargetArrayIp[i]+"'>"+taskTargetArrayName[i]+"</label>";
						$( "#targetEquipDiv" ).append(inputElement);
					}
				}
			},
			error:function()
			{
				
			}
		});
	}else{												//目标设备为空
		$('#targetEquipDiv').empty();					//清空Div
	}	
}


