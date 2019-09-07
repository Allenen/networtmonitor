/**
 * 普通方式显示通用业务性能测量任务创建界面
 */

var CommonServiceTaskName="通用业务-WEB测量任务";

/**
 * 将表单数据以JSON对象返回
 */
$.fn.serializeObject = function()
{   
	var o = {};   
	var a = this.serializeArray();   
	$.each(a, function() {   
		if (o[this.name])
		{   
			if (!o[this.name].push)
			{   
				o[this.name] = [ o[this.name] ];   
			}   
			o[this.name].push(this.value || '');   
		} else
		{   
			o[this.name] = this.value || '';   
		}   
	});   
	return o;   
}; 

$(function(){
	//1.初始化通用业务UI
	initCommonServiceTaskAddUI();
	//2.初始化通用业务性能测量业务类型的触发事件
	commonServiceTypeChangeTrigger();
});

/**
 * 通用业务性能测量业务类型改变触发事件
 */
function commonServiceTypeChangeTrigger()
{
	//通用业务性能测量，业务类型改变
	$("input[name=serviceType]").change(function()
	{
		var checkServiceTypeValue = $("input[name=serviceType]:checked").val();
		switch(checkServiceTypeValue)
		{
			case "web":		//业务类型为WEB业务
				$("#FTPDiv").hide();
				$("#DNSDiv").hide();
				$("#EMAILDiv").hide();
				$("#WEBDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-WEB测量任务"+new Date().toLocaleString());
				
				break;
			case "ftp":		//业务类型为FTP业务
				$("#WEBDiv").hide();
				$("#DNSDiv").hide();
				$("#EMAILDiv").hide();
				$("#FTPDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-FTP测量任务"+new Date().toLocaleString());
				initParaAndTargetDevices("ftp");//初始化策略参数和目标设备
				break;
			case "dns":		//业务类型为DNS业务
				$("#FTPDiv").hide();
				$("#WEBDiv").hide();
				$("#EMAILDiv").hide();
				$("#DNSDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-DNS测量任务"+new Date().toLocaleString());
				initParaAndTargetDevices("dns");//初始化策略参数和目标设备
				break;
			case "email":	//业务类型为EMAIL业务
				$("#FTPDiv").hide();
				$("#DNSDiv").hide();
				$("#WEBDiv").hide();
				$("#EMAILDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-EMAIL测量任务"+new Date().toLocaleString());
				initParaAndTargetDevices("email");//初始化策略参数和目标设备
				break;
			default:
				break;
		}
	});
}

/**
 * 初始化可选目标设备
 */
function initTargetDevices(serviceType,targetDevicesName)
{
	$.ajax({   
			type : 'POST', 
			url : 'getEquipsByEquipKind.html',
			data:{"equipKind":serviceType},
			success: function(data)
			{
				if(data.data.length != 0)
				{
					$.each(data.data, function(i,item)
					{
						var optionContent = "<option value='"+item.equipId+"'>"+item.equipName+"</option>";
						$(targetDevicesName).append(optionContent);
					});
				}
			}
		});
}

/**
 * 初始化策略参数和目标设备
 */
function initParaAndTargetDevices(serviceType)
{
	switch(serviceType)
	{
		//1.WEB业务类型
		case "web":
		$("#WEBStrategy").combobox({
			url:'getCommonServicePolicyByServiceType.html?serviceType='+serviceType,
			valueField:'text',
			textField:'text',
			onSelect:function(rec)//选中WEB的策略触发事件
			{
				var servicePara = rec.service_para;//得到ftp的策略参数
				var serviceParaArray = servicePara.split(";");
				var serviceParaObj = {};
				for(var i=0;i<serviceParaArray.length;i++)
				{
					var serviceParaUnit = serviceParaArray[i];
					var serviceParaUnitArray = serviceParaUnit.split("=");
					serviceParaObj[serviceParaUnitArray[0]] = serviceParaUnitArray[1];
				}
				
				//1.设置服务器端口
				$("#m_server_port_web").textbox("setValue",serviceParaObj.server_port);
				//2.设置访问文件
				$("#m_file_to_browse_web").textbox("setValue",serviceParaObj.file_to_browse);
				//3.设置时段控制
				$("#is_cycle_web").prop("checked",false);
				if(serviceParaObj.TestTimeSection != "")
				{
					$("#is_cycle_web").prop("checked",true);//设置时段控制是否勾选
					var testTimeSectionArray = serviceParaObj.TestTimeSection.split("-");
					$("#start_time_web").timespinner("setValue",testTimeSectionArray[0]);//设置时段控制开始时间
					$("#end_time_web").timespinner("setValue",testTimeSectionArray[1]);//设置时段控制结束时间
				}
			}
		});
		
		initTargetDevices(serviceType,"#CommonWEBTargetDevices");

		break;
		//2.FTP业务类型
		case "ftp":
		$("#FTPStrategy").combobox({
			url:'getCommonServicePolicyByServiceType.html?serviceType='+serviceType,
			valueField:'text',
			textField:'text',
			onSelect:function(rec)//选中FTP的策略触发事件
			{
				var servicePara = rec.service_para;//得到ftp的策略参数
				var serviceParaArray = servicePara.split(";");
				var serviceParaObj = {};
				for(var i=0;i<serviceParaArray.length;i++)
				{
					var serviceParaUnit = serviceParaArray[i];
					var serviceParaUnitArray = serviceParaUnit.split("=");
					serviceParaObj[serviceParaUnitArray[0]] = serviceParaUnitArray[1];
				}
				
				//1.设置服务器端口
				$("#m_server_port_ftp").textbox("setValue",serviceParaObj.server_port);
				//2.设置用户名
				$("#m_username_ftp").textbox("setValue",serviceParaObj.username);
				//3.设置口令
				$("#m_password_ftp").textbox("setValue",serviceParaObj.password);
				//4.设置下载文件
				$("#m_download_file_ftp").textbox("setValue",serviceParaObj.download_file);
				//5.设置时段控制
				$("#is_cycle_ftp").prop("checked",false);
				if(serviceParaObj.TestTimeSection != "")
				{
					$("#is_cycle_ftp").prop("checked",true);//设置时段控制是否勾选
					var testTimeSectionArray = serviceParaObj.TestTimeSection.split("-");
					$("#start_time_ftp").timespinner("setValue",testTimeSectionArray[0]);//设置时段控制开始时间
					$("#end_time_ftp").timespinner("setValue",testTimeSectionArray[1]);//设置时段控制结束时间
				}

			}
		});
		initTargetDevices(serviceType,"#CommonFTPTargetDevices");
		break;
		//3.DNS业务类型
		case "dns":
		$("#DNSStrategy").combobox({
			url:'getCommonServicePolicyByServiceType.html?serviceType='+serviceType,
			valueField:'text',
			textField:'text',
			onSelect:function(rec)//选中DNS的策略触发事件
			{
				var servicePara = rec.service_para;//得到ftp的策略参数
				var serviceParaArray = servicePara.split(";");
				var serviceParaObj = {};
				for(var i=0;i<serviceParaArray.length;i++)
				{
					var serviceParaUnit = serviceParaArray[i];
					var serviceParaUnitArray = serviceParaUnit.split("=");
					serviceParaObj[serviceParaUnitArray[0]] = serviceParaUnitArray[1];
				}
				
				//1.设置服务器端口
				$("#m_server_port_dns").textbox("setValue",serviceParaObj.server_port);
				//2.设置解析域名
				$("#m_file_to_browse_dns").textbox("setValue",serviceParaObj.file_to_browse);
				//3.设置时段控制
				$("#is_cycle_dns").prop("checked",false);
				if(serviceParaObj.TestTimeSection != "")
				{
					$("#is_cycle_dns").prop("checked",true);//设置时段控制是否勾选
					var testTimeSectionArray = serviceParaObj.TestTimeSection.split("-");
					$("#start_time_dns").timespinner("setValue",testTimeSectionArray[0]);//设置时段控制开始时间
					$("#end_time_dns").timespinner("setValue",testTimeSectionArray[1]);//设置时段控制结束时间
				}
			}
		});
		initTargetDevices(serviceType,"#CommonDNSTargetDevices");
		break;
		//4.EMAIL业务类型
		default:
		$("#EMAILStrategy").combobox({
			url:'getCommonServicePolicyByServiceType.html?serviceType='+serviceType,
			valueField:'text',
			textField:'text',
			onSelect:function(rec)//选中EMAIL的策略触发事件
			{
				var serviceParaObj = {};
				var servicePara = rec.service_para;//得到ftp的策略参数
				var serviceParaArray = servicePara.split(";");
				var serviceType = serviceParaArray[0];
				var serviceTypeArray = serviceType.split("=");
				
				if(serviceTypeArray[1] == "smtp")//smtp
				{
					for(var i=0;i<serviceParaArray.length;i++)
					{
						var serviceParaUnit = serviceParaArray[i];
						var serviceParaUnitArray = serviceParaUnit.split("=");
						serviceParaObj[serviceParaUnitArray[0]] = serviceParaUnitArray[1];
					}
					$("#smtp").prop("checked",true);
					$("#pop3").prop("checked",false);
					//1.1设置SMTP服务器端口号
					$("#m_server_port_smtp").textbox("setValue",serviceParaObj.server_port);
					//1.2设置账户名
					$("#m_mailbox_smtp").textbox("setValue",serviceParaObj.mailbox);
					//1.3设置口令
					$("#m_password_smtp").textbox("setValue",serviceParaObj.password);
					//1.4设置接收者
					$("#m_recv_addr_smtp").textbox("setValue",serviceParaObj.recv_addr);
					
					//1.5设置时段控制的值
					$("#is_cycle_email").prop("checked",false);
					if(serviceParaObj.TestTimeSection != "")
					{
						$("#is_cycle_email").prop("checked",true);//设置时段控制是否勾选
						var testTimeSectionArray = serviceParaObj.TestTimeSection.split("-");
						$("#start_time_email").timespinner("setValue",testTimeSectionArray[0]);
						$("#end_time_email").timespinner("setValue",testTimeSectionArray[1]);
					}
				}else if(serviceTypeArray[1] == "pop3")//pop3
				{
					for(var i=0;i<serviceParaArray.length;i++)
					{
						var serviceParaUnit = serviceParaArray[i];
						var serviceParaUnitArray = serviceParaUnit.split("=");
						serviceParaObj[serviceParaUnitArray[0]] = serviceParaUnitArray[1];
					}
					$("#smtp").prop("checked",false);
					$("#pop3").prop("checked",true);
					//2.1设置POP3服务器端口号
					$("#m_server_port_pop3").textbox("setValue",serviceParaObj.server_port);
					//2.2设置账户名
					$("#m_mailbox_pop3").textbox("setValue",serviceParaObj.mailbox);
					//2.3设置口令
					$("#m_password_pop3").textbox("setValue",serviceParaObj.password);
					
					//2.4设置时段控制的值
					$("#is_cycle_email").prop("checked",false);
					if(serviceParaObj.TestTimeSection != "")
					{
						$("#is_cycle_email").prop("checked",true);//设置时段控制是否勾选
						var testTimeSectionArray = serviceParaObj.TestTimeSection.split("-");
						$("#start_time_email").timespinner("setValue",testTimeSectionArray[0]);
						$("#end_time_email").timespinner("setValue",testTimeSectionArray[1]);
					}
				}else //smtp+pop3
				{
					$("#smtp").prop("checked",true);
					$("#pop3").prop("checked",true);
					var serviceParaArray = servicePara.split("[");
					var smtpPara = serviceParaArray[1],pop3Para = serviceParaArray[2];
					var smtpParaArray = smtpPara.split(";"), pop3ParaArray = pop3Para.split(";");
					var smtpParaObj = {}, pop3ParaObj = {};
					
					//3.1 设置smtp格式
					for(var i=0;i<smtpParaArray.length;i++)
					{
						if(smtpParaArray[i].indexOf("=") >= 0)
						{
							var smtpParaUnitArray = smtpParaArray[i].split("=");
							smtpParaObj[smtpParaUnitArray[0]] = smtpParaUnitArray[1];
						}
					}
					
					//3.2 设置pop3格式
					for(var j=0;j<pop3ParaArray.length;j++)
					{
						if(pop3ParaArray[j].indexOf("=") >= 0)
						{
							var pop3ParaUnitArray = pop3ParaArray[j].split("=");
							pop3ParaObj[pop3ParaUnitArray[0]] = pop3ParaUnitArray[1];	
						}
					}
					
				//1.设置SMTP
					//1.1设置SMTP服务器端口号
					$("#m_server_port_smtp").textbox("setValue",smtpParaObj.server_port);
					//1.2设置账户名
					$("#m_mailbox_smtp").textbox("setValue",smtpParaObj.mailbox);
					//1.3设置口令
					$("#m_password_smtp").textbox("setValue",smtpParaObj.password);
					//1.4设置接收者
					$("#m_recv_addr_smtp").textbox("setValue",smtpParaObj.recv_addr);
				//2.设置POP3
					//2.1设置POP3服务器端口号
					$("#m_server_port_pop3").textbox("setValue",pop3ParaObj.server_port);
					//2.2设置账户名
					$("#m_mailbox_pop3").textbox("setValue",pop3ParaObj.mailbox);
					//2.3设置口令
					$("#m_password_pop3").textbox("setValue",pop3ParaObj.password);
				//3.设置时段控制
					//3.2设置时段控制的值
					$("#is_cycle_email").prop("checked",false);
					if(pop3ParaObj.TestTimeSection != "")
					{
						$("#is_cycle_email").prop("checked",true);//设置时段控制是否勾选
						var testTimeSectionArray = pop3ParaObj.TestTimeSection.split("-");
						$("#start_time_email").timespinner("setValue",testTimeSectionArray[0]);
						$("#end_time_email").timespinner("setValue",testTimeSectionArray[1]);
					}
				}
				
			}
		});	
		initTargetDevices(serviceType,"#CommonEMAILTargetDevices");
		break;
	}
}

/**
 * 设置任务策略可编辑
 */
function setPolicyEditable()
{
	$("input[readonly=readonly]").textbox({"readonly":false});
}

/**
 * 设置通用业务性能测量任务策略
 */
function setCommonServiceTaskPolicy()
{
	var jsonObj={};
	var checkServiceTypeValue = $("input[name=serviceType]:checked").val();
	
	switch(checkServiceTypeValue)
	{
		case "web"://web业务类型
			jsonObj = $("#commonWEBForm").serializeObject();
			break;
		case "ftp"://ftp业务类型
			jsonObj = $("#commonFTPForm").serializeObject();
			break;
		case "dns"://dns业务类型
			jsonObj = $("#commonDNSForm").serializeObject();
			break;
		default: //email业务类型
			break;
	}
	
	jsonObj["service_type"] = checkServiceTypeValue;
	return jsonObj;
}

/**
 * email业务类型表单数据单独处理
 */
function commonServiceEmail(policy)
{
	var smtpForm, pop3Form, policyPara = "";
	if($("#smtp").is(":checked"))
		smtpForm = $("#commonEMAILSMTPForm").serializeObject();
	if($("#pop3").is(":checked"))
		pop3Form = $("#commonEMAILPOP3Form").serializeObject();
	var timeForm = $("#commonEMAILTimeForm").serializeObject();
	
	if(smtpForm != null)
	{
		for(var item in smtpForm)
		{
			if(item == "m_service_type")
			{
				policyPara += item.substring(2,item.length)+"=smtp;";
				continue;
			}
				
			if(smtpForm[item] != "" && item.indexOf("m_") >= 0)
				policyPara += item.substring(2,item.length)+"="+smtpForm[item]+";";
		}
	}
	
	if(pop3Form != null)
	{
		if(smtpForm != null)
			policyPara = policyPara+"][";
		for(var item in pop3Form)
		{
			if(item == "m_service_type")
			{
				policyPara += item.substring(2,item.length)+"=pop3;";
				continue;
			}
			if(pop3Form[item] != "" && item.indexOf("m_") >= 0)
				policyPara += item.substring(2,item.length)+"="+pop3Form[item]+";";
		}
		
		if(smtpForm != null)
			policyPara = policyPara+"];";
	}
	
	var startTime = timeForm.s_start_time, endTime = timeForm.e_end_time;
	var policyPara = policyPara+"TestTimeSection="+startTime+"-"+endTime+";";
	
	if(smtpForm != null && pop3Form != null)
		policyPara = "service_type=smtp+pop3;["+policyPara;
	policy["policy_para"] = policyPara;
	
	return policy;
}

/**
 * 保存任务策略
 */
function savePolicy()
{
	//1.得到表单的策略
	var jsonObj = setCommonServiceTaskPolicy();

	var policy = {};
	//2.保存策略
	$.messager.prompt("提示","请输入需要保存的策略名",function(r)
	{
		if(r)
		{
			policy["policy_name"] = r;
			policy["policy_type"] = 8;
			var serviceType = jsonObj.service_type;
			
			//2.1 EMAIL业务类型单独处理
			if(serviceType == "email")
			{
				policy = commonServiceEmail(policy);
			}else//2.2 WEB、FTP、DNS业务类型
			{
				var policyPara = "", startTime = "", endTime = "", serviceType = "";
				for(var item in jsonObj)
				{
					if(item.indexOf("m_") >=0)
						policyPara += item.substring(2, item.length)+"="+jsonObj[item]+";";
					if(item.indexOf("service_type") == 0)
						policyPara = "service_type="+jsonObj[item]+";"+policyPara;
				}
				if(jsonObj.is_cycle == 1)
				{
					policyPara = policyPara +"TestTimeSection="+jsonObj["s_start_time"]+"-"+jsonObj["e_end_time"]+";";
				}else
				{
					policyPara = policyPara+"TestTimeSection=;";
				}
				
				policy["policy_para"] = policyPara;
			}
			
			//2.3保存策略
			$.ajax({   
				type : 'POST',   
				contentType : 'application/json',   
				url : 'addAjaxPolicy.html',   
				data : JSON.stringify(policy),   
				dataType : 'json',   
				success : function(data)
				{   
		            window.location.href="taskAddUI.html";
		        },  
				error:function()
				{
					console.log("保存策略失败!");
				}      
		  });
			
		}
	});

}

/**
 * 保存任务
 */
function saveTask(isActive,taskNum)
{
	//var jsonobj = $("#commonServiceForm").serializeObject();
	//1. 得到通用业务性能测量表单数据
	var commonServiceObj = $("#commonServiceForm").serializeObject();
	
	//1.判断是否保存编辑任务
	if(taskNum != null)//保存编辑的任务
	{
		deleteTaskByTaskNum(taskNum);
	}
	
	//2.校验时段控制
	if(commonServiceObj.e_end_time < commonServiceObj.s_start_time)
	{
		alert("开始时间大于结束时间！");
		return false;
	}
	
	//2. 得到通用业务性能测量策略参数
	var serviceType = commonServiceObj.serviceType, jsonObj={},task_target, choosePolicyName, policy={};
	switch(serviceType)
	{
		case "web"://WEB业务类型
			choosePolicyName = $("#WEBStrategy").combobox("getValue");//得到WEB业务类型的策略名称
			task_target = $("#CommonWEBChooseTargetDevices").val();
			break;
		case "ftp"://FTP业务类型
			choosePolicyName = $("#FTPStrategy").combobox("getValue");//得到FTP业务类型的策略名称
			task_target = $("#CommonFTPChooseTargetDevices").val();
			break;
		case "dns"://DNS业务类型
			choosePolicyName = $("#DNSStrategy").combobox("getValue");//得到DNS业务类型的策略名称
			task_target = $("#CommonDNSChooseTargetDevices").val();
			break;
		default: //EMAIL业务类型
			choosePolicyName = $("#EMAILStrategy").combobox("getValue");//得到EMAIL业务类型的策略名称
			task_target = $("#CommonEMAILChooseTargetDevices").val();
			break;
	}
	//得到策略的参数
    $.ajax(
    {
    	type:"POST",
    	data:{"choosePolicyName":choosePolicyName},
    	url:"getPolicyParaByPolicyName.html",
    	async:false,							//设置为同步
    	success:function(data)
    	{
    		policy = data.policy;
    	},
    	error:function()
    	{
    		console.log("保存任务时，得到策略的参数信息失败!");
    	}
    });
	
	var filterJsonObj={};
	filterJsonObj["task_type"]=commonServiceObj.task_type;
	filterJsonObj["task_subject"] = commonServiceObj.task_subject;
	filterJsonObj["task_name"] = commonServiceObj.task_name;
	filterJsonObj["task_target"] = task_target;
	filterJsonObj["policy_para"] = policy.policy_para;
	filterJsonObj["is_cycle"]=commonServiceObj.is_cycle;
 	
 	if(filterJsonObj["is_cycle"]==1)
 		filterJsonObj["task_interval"]=commonServiceObj.task_interval;
 	filterJsonObj["interval_unit"]=commonServiceObj.interval_unit;
 	filterJsonObj["send_ip"]=commonServiceObj.send_ip;
	
	//6.判断是否激活任务
    if(isActive == 1)//激活任务
 	{
 		var currentDate = new Date();
 		filterJsonObj["start_time"] = currentDate;
 		filterJsonObj["task_stat"] = 1;
 	}
 	
 	//7.采用异步的方式添加任务
 	addTask(JSON.stringify(filterJsonObj));
}

/**
 * 初始化通用业务UI
 */
function initCommonServiceTaskAddUI()
{
	//1.1设置缺省任务名
	$("#commonServiceTaskName").textbox("setValue", CommonServiceTaskName+new Date().toLocaleString());
	
	//1.2任务主体的数据初始化
	$("#commonServiceTask_subject").combobox(
	{
		url:'get_AjaxTanzhenEquip.html',
		valueField:'value',
		textField:'text',
		onLoadSuccess:function()
		{
			var data = $("#commonServiceTask_subject").combobox('getData');
			$("#commonServiceTask_subject").combobox('select', data[0].value);
		},
		error:function()
		{
			alert("任务主体数据初始化失败");
		}
	});
	initParaAndTargetDevices("web");//初始化策略参数和目标设备
}

/**
 * 删除指定编号的任务
 * @param taskNum
 */
function deleteTaskByTaskNum(taskNum)
{
	$.ajax({
		type:"POST",
		data:{"taskNumList":taskNum},
		url:"ajaxDeleteTasks.html",
		async:false,//用于同步操作
		success:function(data){
			console.log("删除需要编辑的任务成功!");
		},
		error:function(){
			console.log("删除需要编辑的任务失败!");
		}
	});
}

/**
 * 添加任务
 * @param filterJson
 */
function addTask(filterJson)
{
	$.ajax( {   
	      type : 'POST',   
	      contentType : 'application/json',   
	      url : 'addAjaxTask.html',   
	      data : filterJson,   
	      dataType : 'json',   
	      success : function(data)
	      {   
	          window.location.href="taskAddUI.html";     
	      },   
	      error : function(XMLHttpRequest, textStatus, errorThrown) {   
	       alert(XMLHttpRequest.status+";"+XMLHttpRequest.readyState+";"+textStatus+";"+errorThrown);  
	     }   
	    });
}