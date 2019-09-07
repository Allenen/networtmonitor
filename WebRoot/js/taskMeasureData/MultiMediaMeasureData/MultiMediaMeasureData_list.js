
/**
 * 多媒体业务性能测量数据的js文件 by zxgm 2016-12-7
 * */
 
 /**
  * 文档加载完成触发事件
  */
 $(function(){
	 //1. 设置起始时间、结束时间
	 $("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 0));
	 $("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 1));
	 
	 //2. 初始化表格测量数据结构
	$('#MultiMediaMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'testTime',title:'测量时间',width:'12%',
				formatter:function(value,row,index)
				{
					var d = new Date(value);
					return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
				}
			},    
	        {field:'flowIdString',title:'流标识',width:'11%'},    
	        {field:'maxDelay',title:'最大单向时延',width:'11%'},
	        {field:'avgDelay',title:'平均单向时延',width:'11%'},
	        {field:'jitter',title:'单向时延抖动', width:'11%'},
	        {field:'lossRate',title:'单向丢包率', width:'11%'},
	        {field:'avgDoubleDelay',title:'平均双向时延', width:'11%'},
			{field:'bitrate',title:'比特率',width:'12%'},
			{field:'level',title:'质量',width:'10%',
				formatter:function(value,row,index)
				{
					switch(value)
					{
						case 1:return "很差";break;
						case 2:return "差";break;
						case 3:return "中";break;
						case 4:return "良";break;
						default:return "优";break;
					}
				}
			}
	    ]]    
	}); 
 });
 
 /**
  * 点击选择按钮，显示满足条件的多媒体业务性能测量数据
  */
 function showSatisfiedMultiMediaMeasureData()
 {
	 //1. 得到当前选中的任务号和目标探测设备
	 var taskNum = m_taskNum,taskTargetId = $("#task_target").combobox("getValue");
	 
	 //2. 得到起始时间和结束时间
	 var startDateTime = $("#start_testTime").datetimebox("getValue"),endDateTime = $("#end_testTime").datetimebox("getValue");
	
	//3. 目标探测设备的唯一标识
	var taskTargetId = $("#task_target").combobox("getValue");
	
	//4. 设置多媒体业务性能测量表格数据
	$.ajax({
		url:"satisfiedMultiMediaMeasureDataQueryByList.html",
		type:"POST",
		data:{"taskNum":taskNum,"startTestTime":startDateTime,"endTestTime":endDateTime,"taskTarget":taskTargetId},
		success:function(data)
		{
			$("#MultiMediaMeasureDataQueryTable").datagrid("loadData",data);
		},
		error:function()
		{
			console.log("显示多媒体业务性能测量表格数据失败!");
		}
	});
 }

 /**
  * 校验多媒体业务性能测量数据的起始时间和结束时间
  */
 function onSelectDateTime(d)
 {
	 dateValidator(this.id,d,"start_testTime","end_testTime");
 }
