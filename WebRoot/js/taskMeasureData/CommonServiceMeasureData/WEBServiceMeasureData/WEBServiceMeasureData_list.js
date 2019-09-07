/**通用业务性能测量数据-web业务类型的列表文件**/

/**
 * 文档加载完成触发
 */
$(function(){
	//1. 设置起始时间、结束时间
	$("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 0));
	$("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 1));
	
	//2. 设置列表显示的表格结构
	$('#WEBCommonServiceMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'testTime',title:'测量时间',width:'15%',
				formatter:function(value,row,index)
				{
					var d = new Date(value);
					return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
				}
			},    
	        {field:'port',title:'服务器端口',width:'11%'},    
	        {field:'browse_file',title:'浏览页面',width:'15%'},
	        {field:'service_available',title:'服务可用',width:'11%'},
	        {field:'response_delay',title:'服务响应时间', width:'11%'},
	        {field:'page_delay',title:'页面下载时间', width:'11%'},
	        {field:'page_size',title:'页面大小', width:'15%'}
	    ]]    
	}); 
	
});

/**
 * 显示满足条件的测量数据
 */
function showSatisfiedWEBCommonServiceMeasureData()
{
	//1. 得到起始时间、结束时间
	var startDateTime = $("#start_testTime").datetimebox("getValue"),endDateTime = $("#end_testTime").datetimebox("getValue");
	
	$.ajax({
		url:"satisfiedWEBServiceMeasureData.html",
		type:"POST",
		data:{"taskNum":m_taskNum,"startTestTime":startDateTime,"endTestTime":endDateTime},
		success:function(data)
		{
			$("#WEBCommonServiceMeasureDataQueryTable").datagrid("loadData",data);
		},
		error:function()
		{
			console.log("加载通用业务性能任务测量数据-WEB业务测量数据失败!");
		}
	});
}

/**
 * 校验通用业务性能测量数据的起始时间和结束时间
 */
function onSelectDateTime(d)
{
	dateValidator(this.id,d,"start_testTime","end_testTime");
}