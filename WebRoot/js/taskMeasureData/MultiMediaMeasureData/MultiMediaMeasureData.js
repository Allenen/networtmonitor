
/**
 * 多媒体业务性能测量数据的js文件 by zxgm 2016-12-7
 * */
 
 var m_taskNum = undefined, m_task = undefined,m_taskSubjectEquipName = undefined,m_taskTargetEquipName = undefined;
 
 /**
  * 初始化多媒体业务性能测量数据的目标探测设备的下拉框数据
  */
 function initComboboxForMultiMediaMeasureDataTaskSubject(taskNum)
 {
	$("#task_target").combobox({
		 url:"getTargetEquipsByTaskNum.html?taskNum="+taskNum,
		 valueField:"valueText",
		 textField:"textText",
		 onLoadSuccess:function()
		 {
			var data = $('#task_target').combobox('getData');
			if(data.length > 0)
				$('#task_target').combobox('select',data[0].valueText);
		 },
		 onSelect:function(record)
		 {
			 m_taskTargetEquipName = record.textText;
			 m_index = 0;
			 getFormateData($("#TestTime").datetimebox("getValue"),record.valueText);
		 }
	 });	 
 }
 
 $(function(){
	 //1.  得到当前选中的任务号
	 var taskNum = $("#task_num").textbox("getValue");
	 m_taskNum = taskNum;
	 
	 //2. 目标探测设备下拉框数据填充
	initComboboxForMultiMediaMeasureDataTaskSubject(taskNum);
	 
	 //3. 任务列表结构初始化
	$('#MultiMediaMeasureDataQueryTree').tree({
		url:'ajaxGetAllTasksByTaskType.html?taskType=7',
		onClick: function(node)
		{
			m_taskNum = node.id;
			initComboboxForMultiMediaMeasureDataTaskSubject(m_taskNum);
			
			$.ajax({
				url:"getTaskByTaskNum.html",
				type:"POST",
				data:{"taskNum":m_taskNum},
				success:function(data)
				{
					m_task = data.task;
					setMultiMediaValue(m_task);	//设置任务名称、任务号、源探测设备
					$('#MultiMediaMeasureDataQueryTable').datagrid('loadData',[]);					
				},
				error:function(){
					console.log("加载多媒体业务性能测量数据失败");
				}
			});
		}
		  
	}); 

	 //4. 列表和图标式模式切换
	$("input:radio[name='showType']").click(function() {
   		if(this.value == 02)//曲线视图
   		{
        	$("#centerTableLayout").hide();
        	$("#centerGraphLayout").show();
        	//曲线图显示
        	loadView_graph();
   		}else{				//列表视图
     		$("#centerGraphLayout").hide();
     		$("#centerTableLayout").show();
   		}
	});
 });

 /**
  * 设置任务名称、任务号、源探测设备以及目标探测设备
  */
function setMultiMediaValue(task)
{
	
	//1. 设置任务名称
	$("#taskName").textbox("setValue",task.task_name);
	
	//2. 设置任务号
	$("#task_num").textbox("setValue",task.task_num);
	
	//3. 设置源探测设备
	setTaskSubjectEquip(task.task_subject);
}

/**
 * 设置源探测设备
 */
function setTaskSubjectEquip(taskSubject)
{
	$.ajax({
		url:"getEquipByEquipId.html",
		type:"POST",
		data:{"equipId":taskSubject},
		success:function(data)
		{
			$("#task_subject").textbox("setValue",data.equipName);
			m_taskSubjectEquipName = data.equipName;
		}
	});
}


 /**
  * 校验时间
  */
 function onSelectDateTime(selectDateTime)
 {
	dateValidator(this.id,selectDateTime,"start_testTime","end_testTime");
 }

