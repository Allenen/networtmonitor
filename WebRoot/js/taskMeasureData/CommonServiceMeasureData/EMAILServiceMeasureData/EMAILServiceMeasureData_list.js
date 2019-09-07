/**通用业务性能测量数据-EMAIL业务类型的列表文件**/

/**
 * 文档加载完成触发
 */
$(function(){
	//1. 设置起始时间、结束时间
	$("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 0));
	$("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(), 1));
	
	//2. 设置列表显示的表格结构
	
	
});

function initDatagridTable()
{
	var policyPara = m_task.policy_para;//得到选中的任务
	if(policyPara.indexOf("service_type=smtp;") == 0)		//业务类型为smtp
	{
		$('#EMAILCommonServiceMeasureDataQueryTable_smtp').datagrid({       
			columns:[[    
				{field:'testTime',title:'测量时间',width:'11%',
					formatter:function(value,row,index)
					{
						var d = new Date(value);
						return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
					}
				},    
				{field:'port',title:'服务器端口',width:'11%'},    
				{field:'mailbox',title:'邮箱',width:'11%'},
				{field:'passoword',title:'口令', width:'11%'},
				{field:'recv_addr',title:'收件人', width:'11%'},
				{field:'service_available',title:"服务可用",width:'11%'},
				{field:'response_delay',title:"服务响应时间",width:'11%'},
				{field:'mail_send_delay',title:"邮件发送时间",width:'11%'},
				{field:'mail_size',title:"邮件大小",width:'11%'}
		
			]]    
		}); 
	}else if(policyPara.indexOf("service_type=pop3;") == 0 )//业务类型为pop3
	{
		$('#EMAILCommonServiceMeasureDataQueryTable_pop3').datagrid({       
			columns:[[    
				{field:'testTime',title:'测量时间',width:'12%',
					formatter:function(value,row,index)
					{
						var d = new Date(value);
						return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
					}
				},    
				{field:'port',title:'服务器端口',width:'12%'},    
				{field:'mailbox',title:'邮箱',width:'12%'},
				{field:'passoword',title:'口令', width:'12%'},
				{field:'service_available',title:'服务可用', width:'12%'},
				{field:'response_delay',title:"服务响应时间",width:'12%'},
				{field:'mail_retrieve_delay',title:"邮件收取时间",width:'12%'},
				{field:'mail_size',title:"邮件大小",width:'12%'}
			]]    
		}); 
	}else if(policyPara.indexOf("service_type=smtp+pop3;") == 0)//业务类型为smtp+pop3
	{
		$('#EMAILCommonServiceMeasureDataQueryTable_smtp').datagrid({       
			columns:[[    
				{field:'testTime',title:'测量时间',width:'11%',
					formatter:function(value,row,index)
					{
						var d = new Date(value);
						return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
					}
				},    
				{field:'port',title:'服务器端口',width:'11%'},    
				{field:'mailbox',title:'邮箱',width:'11%'},
				{field:'passoword',title:'口令', width:'11%'},
				{field:'recv_addr',title:'收件人', width:'11%'},
				{field:'service_available',title:"服务可用",width:'11%'},
				{field:'response_delay',title:"服务响应时间",width:'11%'},
				{field:'mail_send_delay',title:"邮件发送时间",width:'11%'},
				{field:'mail_size',title:"邮件大小",width:'11%'}
		
			]]    
		});
		
		$('#EMAILCommonServiceMeasureDataQueryTable_pop3').datagrid({       
			columns:[[    
				{field:'testTime',title:'测量时间',width:'12%',
					formatter:function(value,row,index)
					{
						var d = new Date(value);
						return d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
					}
				},    
				{field:'port',title:'服务器端口',width:'12%'},    
				{field:'mailbox',title:'邮箱',width:'12%'},
				{field:'passoword',title:'口令', width:'12%'},
				{field:'service_available',title:'服务可用', width:'12%'},
				{field:'response_delay',title:"服务响应时间",width:'12%'},
				{field:'mail_retrieve_delay',title:"邮件收取时间",width:'12%'},
				{field:'mail_size',title:"邮件大小",width:'12%'}
			]]    
		}); 
	}
}

/**
 * 显示满足条件的测量数据
 */
function showSatisfiedEMAILCommonServiceMeasureData()
{
	//1. 得到起始时间、结束时间
	var startDateTime = $("#start_testTime").datetimebox("getValue"),endDateTime = $("#end_testTime").datetimebox("getValue");
	
	var policyPara = m_task.policy_para;//得到选中的任务
	if(policyPara.indexOf("service_type=smtp;") == 0)		//业务类型为smtp
	{
		$.ajax({
			url:"satisfiedEMAILServiceMeasureData_smtp.html",
			type:"POST",
			data:{"taskNum":m_taskNum,"startTestTime":startDateTime,"endTestTime":endDateTime},
			success:function(data)
			{
				$("#EMAILCommonServiceMeasureDataQueryTable_smtp").datagrid("loadData",data);
			},
			error:function()
			{
				console.log("加载通用业务性能任务测量数据-EMAIL的SMTP业务测量数据失败!");
			}
		});
	}else if(policyPara.indexOf("service_type=pop3;") == 0 )//业务类型为pop3
	{
		$.ajax({
			url:"satisfiedEMAILServiceMeasureData_pop3.html",
			type:"POST",
			data:{"taskNum":m_taskNum,"startTestTime":startDateTime,"endTestTime":endDateTime},
			success:function(data)
			{
				$("#EMAILCommonServiceMeasureDataQueryTable_pop3").datagrid("loadData",data);
			},
			error:function()
			{
				console.log("加载通用业务性能任务测量数据-EMAIL的POP3业务测量数据失败!");
			}
		});
	}else if(policyPara.indexOf("service_type=smtp+pop3;") == 0)//业务类型为smtp+pop3
	{
		$.ajax({
			url:"satisfiedEMAILServiceMeasureData_smtp.html",
			type:"POST",
			data:{"taskNum":m_taskNum,"startTestTime":startDateTime,"endTestTime":endDateTime},
			success:function(data)
			{
				$("#EMAILCommonServiceMeasureDataQueryTable_smtp").datagrid("loadData",data);
			},
			error:function()
			{
				console.log("加载通用业务性能任务测量数据-EMAIL的SMTP业务测量数据失败!");
			}
		});
		
		$.ajax({
			url:"satisfiedEMAILServiceMeasureData_pop3.html",
			type:"POST",
			data:{"taskNum":m_taskNum,"startTestTime":startDateTime,"endTestTime":endDateTime},
			success:function(data)
			{
				$("#EMAILCommonServiceMeasureDataQueryTable_pop3").datagrid("loadData",data);
			},
			error:function()
			{
				console.log("加载通用业务性能任务测量数据-EMAIL的POP3业务测量数据失败!");
			}
		});	
	}

}

/**
 * 校验通用业务性能测量数据的起始时间和结束时间
 */
function onSelectDateTime(d)
{
	dateValidator(this.id,d,"start_testTime","end_testTime");
}