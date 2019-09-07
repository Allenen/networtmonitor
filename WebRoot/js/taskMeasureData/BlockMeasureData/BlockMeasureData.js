
/**
 * 阻断测量数据的js文件 by zxgm 2016-11-4
 * */
 
var m_taskNum = undefined, m_taskTargetArrayForGraph=[], m_interruptMeasureRecords = undefined;
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
			
			//初始化阻断状态曲线图
			initZDView();
		}else	//2.2 列表视图
		{
			$("#centerGraphLayout").hide();
			$("#centerTableLayout").show();
		}
	});
	
	//3. 阻断测量任务列表初始化
	$('#BlockMeasureDataQueryTree').tree({
		url:'ajaxGetAllTasksByTaskType.html?taskType=3',
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
					setBlockValue(data.task);//点击任务后设置相应任务的数值
					$('#BlockMeasureDataQueryTable').datagrid('loadData',[]);//加载双向时延测量数据
					
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
  * 设置阻断监测任务数值
  */
 function setBlockValue(task)
 {
	$('#taskName').textbox('setValue',task.task_name);//设置任务名称
	$('#task_num').textbox('setValue', task.task_num);//设置任务号
	$('#task_subject').textbox('setValue', task.task_subject);//设置执行探针设备
	
	$("#avgBlock_time").text(0);
	$("#maxBlock_time").text(0);
	$("#minBlock_time").text(0);
	
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
				console.log("单向时延测量数据返回指定设备标识的设备数据失败!");
			}
		});
	}else{												//目标设备为空
		$('#targetEquipDiv').empty();					//清空Div
	}		 
 }

