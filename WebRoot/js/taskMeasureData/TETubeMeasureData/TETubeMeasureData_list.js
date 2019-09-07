
/**
 * TE隧道测量数据的js文件 by zxgm 2016-11-8
 * */
 
/**
 * 文档加载完成后触发
 */
$(function(){
	
	//1. 起始时间和结束时间默认初始化(起始时间小于结束时间一天)
	$("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(),0));
	$("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(),1));
	
	//2. 双向时延测量表格的格式初始化
	$('#TETubeMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'testTime',title:'测量时间',width:'25%',
				formatter:function(value,row,index)
				{
					var d = new Date(value);
					return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
				}
			},    
	        {field:'maxDelay',title:'最大单向时延',width:'13%'},    
	        {field:'avgDelay',title:'平均单向时延',width:'13%'},
	        {field:'jitter',title:'单向时延抖动',width:'13%'},
	        {field:'lossRate',title:'丢包(‰)', width:'12%'},
	        {field:'bitrate',title:'比特率', width:'12%'},
	        {field:'level',title:'质量', width:'12%'}
	    ]]    
	});
});

/**
 * 点击选择，以列表式方式显示满足条件的TE隧道测量数据
 */
function showSatisfiedVPNTEMeasureData()
{
	//1. 得到选中的任务号
	var taskNum = m_taskNum;

	//2. 得到起始时间和结束时间
	var startTestTime = $("#start_testTime").datetimebox("getValue"),endTestTime = $("#end_testTime").datetimebox("getValue");
	
	//3. 得到符合条件的双向时延测量数据
	$.ajax({
		url:"satisfiedTETubeMeasureDataQueryByList.html",
		type:"POST",
		data:{"taskNum":taskNum,"startTestTime":startTestTime,"endTestTime":endTestTime},
		success:function(data)
		{
			$('#TETubeMeasureDataQueryTable').datagrid('loadData',data);//加载双向时延测量数据
		},
		error:function()
		{
			console.log("没有符合条件的结果数据");
		}
	});	
	
}

/**
 * 校验双向时延测量数据列表的日期
 */
function onSelectDateTime(selectedDate)
{
	dateValidator(this.id,selectedDate,"start_testTime","end_testTime");
}
