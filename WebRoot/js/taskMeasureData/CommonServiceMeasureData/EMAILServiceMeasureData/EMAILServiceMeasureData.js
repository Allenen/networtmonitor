/** 通用业务性能测量数据-EMAIL业务类型**/

var m_taskNum = undefined,m_task = undefined;
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
        	
			//通用业务性能测量数据-EMAIL业务类型的图标式	
			//initResponseDelayAndFileDelay();
   		}else{				//列表视图
     		$("#centerGraphLayout").hide();
     		$("#centerTableLayout").show();
   		}
	});
	
	//3. 通用业务性能测量数据-EMAIL业务类型的任务列表初始化
	$('#EMAILCommonServiceMeasureDataQueryTree').tree({
		url:'ajaxGetAllTasksByTaskType.html?taskType=8&&serviceType=email',
		onClick: function(node)
		{	
			m_taskNum = node.id;
			$("#datagridTable").empty();
			$("#centerGraphLayout").empty();
			$.ajax({
				url:"getTaskByTaskNum.html",
				type:"POST",
				data:{"taskNum":m_taskNum},
				success:function(data)
				{
					
					m_task = data.task;
					
					setEMAILServiceValue(m_task);//选中任务后，设置通用业务性能任务-EMAIL的数值
					var policyPara = m_task.policy_para;//得到选中的任务
					if(policyPara.indexOf("service_type=smtp;") == 0)		//业务类型为smtp
					{
						//1. 插入SMTP的表格
						$("#datagridTable").append("<table id='EMAILCommonServiceMeasureDataQueryTable_smtp'></table>");
						initDatagridTable();
						$('#EMAILCommonServiceMeasureDataQueryTable_smtp').datagrid('loadData',[]);//加载测量数据
						
						//2. 插入SMTP的曲线
						var smtpResponseDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForSMTPResponseDelay" style="height:750px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_SMTPResponseDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">收件人:<label id="recv_addr_SMTPResponseDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_SMTPResponseDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">服务响应时间:平均<label id="avgSMTPResponseDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxSMTPResponseDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minSMTPResponseDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//服务响应时间
						var smtpMailSendDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForSMTPMailSendDelay" style="height:750px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_SMTPMailSendDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">收件人:<label id="recv_addr_SMTPMailSendDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_SMTPMailSendDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件发送时间:平均<label id="avgSMTPMailSendDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxSMTPMailSendDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minSMTPMailSendDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//邮件发送时间
						$("#centerGraphLayout").append(smtpResponseDelayContent);
						$("#centerGraphLayout").append(smtpMailSendDelayContent);
						initSMTPGraphStructure();
					}else if(policyPara.indexOf("service_type=pop3;") == 0 )//业务类型为pop3
					{
						//1. 插入POP3的表格
						$("#datagridTable").append("<table id='EMAILCommonServiceMeasureDataQueryTable_pop3'></table>");
						initDatagridTable();
						$('#EMAILCommonServiceMeasureDataQueryTable_pop3').datagrid('loadData',[]);//加载测量数据
						
						//2. 插入POP3的曲线
						var pop3ResponseDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForPOP3ResponseDelay" style="height:750px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_POP3ResponseDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_POP3ResponseDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">服务响应时间:平均<label id="avgPOP3ResponseDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxPOP3ResponseDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minPOP3ResponseDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//服务响应时间
						var pop3MailRetrieveDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForPOP3MailRetrieveDelay" style="height:750px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_POP3MailRetrieveDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_POP3MailRetrieveDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件收取时间:平均<label id="avgPOP3MailRetrieveDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxPOP3MailRetrieveDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minPOP3MailRetrieveDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//邮件收取时间
										
						$("#centerGraphLayout").append(pop3ResponseDelayContent);
						$("#centerGraphLayout").append(pop3MailRetrieveDelayContent);
						
						initPOP3GraphStructure();
					}else if(policyPara.indexOf("service_type=smtp+pop3;") == 0)//业务类型为smtp+pop3
					{
						//1. 插入SMTP、POP3的表格
						$("#datagridTable").append("<div style='width:49%;float:left;'><table id='EMAILCommonServiceMeasureDataQueryTable_smtp'></table></div>");
						$("#datagridTable").append("<div style='width:49%;float:right;'><table id='EMAILCommonServiceMeasureDataQueryTable_pop3'></table></div>");
						initDatagridTable();
						$('#EMAILCommonServiceMeasureDataQueryTable_smtp').datagrid('loadData',[]);//加载测量数据
						$('#EMAILCommonServiceMeasureDataQueryTable_pop3').datagrid('loadData',[]);//加载测量数据
					
						//2. 插入SMTP和POP3的曲线
						var smtpResponseDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForSMTPResponseDelay" style="height:360px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_SMTPResponseDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">收件人:<label id="recv_addr_SMTPResponseDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_SMTPResponseDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">服务响应时间:平均<label id="avgSMTPResponseDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxSMTPResponseDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minSMTPResponseDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//服务响应时间
						var smtpMailSendDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForSMTPMailSendDelay" style="height:360px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_SMTPMailSendDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">收件人:<label id="recv_addr_SMTPMailSendDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_SMTPMailSendDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件发送时间:平均<label id="avgSMTPMailSendDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxSMTPMailSendDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minSMTPMailSendDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//邮件发送时间
						var pop3ResponseDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForPOP3ResponseDelay" style="height:360px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_POP3ResponseDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_POP3ResponseDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">服务响应时间:平均<label id="avgPOP3ResponseDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxPOP3ResponseDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minPOP3ResponseDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//服务响应时间
						var pop3MailRetrieveDelayContent = ' <div style="float: left;width: 49%;border: 2px #CDF4FF solid;">'+
											'<div id="dynamicViewForPOP3MailRetrieveDelay" style="height:360px;"></div>'+
											'<div style="text-align: center;">'+
												'<span style="margin-right:40px;font-size:20px;">邮箱:<label id="mailbox_POP3MailRetrieveDelay">test@lgdx.mtn</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件大小:<label id="mail_size_POP3MailRetrieveDelay">1023</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">邮件收取时间:平均<label id="avgPOP3MailRetrieveDelay">20</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最大<label id="maxPOP3MailRetrieveDelay">40</label>ms</span>'+
												'<span style="margin-right:40px;font-size:20px;">最小<label id="minPOP3MailRetrieveDelay">40</label>ms</span><br/>'+
											'</div>'+
										'</div>';//邮件收取时间
						$("#centerGraphLayout").append(smtpResponseDelayContent);
						$("#centerGraphLayout").append(smtpMailSendDelayContent);
						$("#centerGraphLayout").append(pop3ResponseDelayContent);
						$("#centerGraphLayout").append(pop3MailRetrieveDelayContent);
						
						initSMTPGraphStructure();
						initPOP3GraphStructure();
					}
					
					
					
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
function setEMAILServiceValue(task)
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

