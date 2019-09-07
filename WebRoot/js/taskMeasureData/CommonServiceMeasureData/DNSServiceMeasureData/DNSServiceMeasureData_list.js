/**通用业务性能测量数据-DNS业务类型的列表文件**/

/**
 * 文档加载完成触发
 */
$(function(){
	//1. 设置起始时间、结束时间
	$("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 0));
	$("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 1));
	
	//2. 设置列表显示的表格结构
	$('#DNSCommonServiceMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'testTime',title:'测量时间',width:'16%',
				formatter:function(value,row,index)
				{
					var d = new Date(value);
					return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
				}
			},    
	        {field:'port',title:'服务器端口',width:'16%'},    
	        {field:'resolve_name',title:'解析域名',width:'16%'},
	        {field:'service_available',title:'服务可用', width:'16%'},
	        {field:'response_delay',title:'服务响应时间(ms)', width:'16%'},
			{field:'resoved_ip_num',title:"解析成功IP数",width:'16%'}
	
	    ]]    
	}); 
	
});

/**
 * 显示满足条件的测量数据
 */
function showSatisfiedDNSCommonServiceMeasureData()
{
	//1. 得到起始时间、结束时间
	var startDateTime = $("#start_testTime").datetimebox("getValue"),endDateTime = $("#end_testTime").datetimebox("getValue");
	
	$.ajax({
		url:"satisfiedDNSServiceMeasureData.html",
		type:"POST",
		data:{"taskNum":m_taskNum,"startTestTime":startDateTime,"endTestTime":endDateTime},
		success:function(data)
		{
			$("#DNSCommonServiceMeasureDataQueryTable").datagrid("loadData",data);
		},
		error:function()
		{
			console.log("加载通用业务性能任务测量数据-FTP业务测量数据失败!");
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