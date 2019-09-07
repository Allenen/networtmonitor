/**
 * 普通方式显示多媒体业务性能创建界面
 */

var multiMediaTaskName="多媒体业务传输性能测量";

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
	//1.初始化多媒体业务传输性能测量UI
	initMultiMediaTaskAddUI();
	//2.多媒体策略改变触发事件
	multiMediaStrategyChangeTrigger();
});

/**
 * 设置任务策略可编辑
 */
function setPolicyEditable()
{
	$("input[readonly=readonly]").textbox({"readonly":false});
}

/**
 * 多媒体策略改变触发事件
 */
function multiMediaStrategyChangeTrigger()
{
	$("input[name=m_mode_type]").change(function(){
			var checkModeValue = $("input[name=m_mode_type]:checked").val();
			if(checkModeValue == 1){		//回放模式
				$("#customModel").hide();
				$("#playbackModel").show();
				
				//1.3.1 回放模式的下拉选框数据初始化
				$("#playbackService").combobox({
					url:"getCustomServiceByServiceType.html?serviceType=1",
					valueField:'value',
					textField:'text',
					onSelect:function(rec)
					{
						selectPlaybackServiceCombobox(rec);//选中回放模式的业务下拉框	
					}
				});
			}else{							//自定义流模式
				$("#playbackModel").hide();
				$("#customModel").show();
				
				//1.3.2 自定义流模式的下拉选框数据初始化
				$("#defineService").combobox({
					url:"getCustomServiceByServiceType.html?serviceType=2",
					valueField:'value',
					textField:'text',
					onSelect:function(rec)
					{
						selectDefineServiceCombobox(rec);//选中自定义流模式业务下拉框
					}
				});
			}
		});
}

/**
 * 选中自定义流模式业务下拉框
 */
function selectDefineServiceCombobox(rec)
{
	$("#flowRecord").empty();
	var serviceParaArray = rec.service_para.split("|");
	var flowNum = serviceParaArray.length-1;
	
	var testTimeSectionAndFlowNum = serviceParaArray[0];//时段控制和流数量
	for(var i=0;i<flowNum;i++)
	{
		var flowData = serviceParaArray[i+1];
		var flowDataArray = flowData.split(";");
		var flowDataJson = {};
		for(var j=0;j<flowDataArray.length;j++)
		{
			var flowDataArray2 = flowDataArray[j].split("=");
			flowDataJson[flowDataArray2[0]] = flowDataArray2[1];
		}
		var content = '<div id="flowRecord'+(i+1)+'" name="flowRecords"><br/><hr/><table style="margin-top:10px;"><thead>流记录'+(i+1)+'</thead>'+
		'<tr>'+
		'<td>协议类型:'+
			'<select id="m_protocol'+(i+1)+'" class="easyui-combobox" name="m_protocol" style="width:200px;">'+
				'<option value="TCP">TCP</option>'+
				'<option value="UDP">UDP</option>'+
			'</select>'+
		'</td>'+
		'<td>方向:&nbsp;&nbsp;&nbsp;'+
			'<select id="m_direction'+(i+1)+'" class="easyui-combobox" name="m_direction" style="width:200px;">'+
				'<option value="server-to-client">server-to-client</option>'+
				'<option value="client-to-server">client-to-server</option>'+
			'</select>'+
		'</td>'+
	'</tr>'+
	'<tr>'+
		'<td>源端口号:<input id="m_sender_port'+(i+1)+'" class="easyui-textbox" name="m_sender_port"/></td>'+
		'<td>目标端口号:<input id="m_receiver_port'+(i+1)+'" class="easyui-textbox" name="m_receiver_port"/></td>'+
	'</tr>'+
	'<tr>'+
		'<td>持续时间:<input id="m_duration'+(i+1)+'" class="easyui-textbox" name="m_duration"/>(秒)</td>'+
		'<td>开始时延:&nbsp;<input id="m_strat_delay'+(i+1)+'" class="easyui-textbox" name="m_strat_delay"/>(秒)</td>'+
	'</tr>'+
	'<tr>'+
		'<td>分组大小:'+
			'<select id="group'+(i+1)+'" name="content_type" style="width:200px;">'+
				'<option value="uniform">平均分布</option>'+
				'<option value="constant">常数分布</option>'+
				'<option value="exponential">指数分布</option>'+
				'<option value="normal">正态分布</option>'+
				'<option value="gamma">伽马分布</option>'+
				'<option value="poisson">泊松分布</option>'+
			'</select>'+
		'</td>'+
		'<td id="groupText'+(i+1)+'">范围:'+
			'<input id="s_size_option'+(i+1)+'" class="easyui-textbox" name="s_size_option"/>至<input id="e_size_option'+(i+1)+'" class="easyui-textbox" name="e_size_option"/>(字节)'+
		'</td>'+
	'</tr>'+
	'<tr>'+
		'<td>发包间隔:'+
			'<select id="sendInterval'+(i+1)+'" name="time_type" style="width:200px;">'+
				'<option value="uniform">平均分布</option>'+
				'<option value="constant">常数分布</option>'+
				'<option value="exponential">指数分布</option>'+
				'<option value="normal">正态分布</option>'+
				'<option value="gamma">伽马分布</option>'+
				'<option value="poisson">泊松分布</option>'+
			'</select>'+
		'</td>'+
		'<td id="sendIntervalText'+(i+1)+'"><label>范围:</label>'+
			'<input id="s_time_option'+(i+1)+'" class="easyui-textbox" name="s_time_option"/>至<input id="e_time_option'+(i+1)+'" class="easyui-textbox" name="e_time_option"/>(毫秒)'+
		'</td>'+
	'</tr>'+
	'</table></div>';
	
	//1.设置协议类型的值
	$("#m_protocol"+(i+1)).combobox("select",flowDataJson["protocol"]);
	//2.设置方向的值
	$("#m_direction"+(i+1)).combobox("select",flowDataJson["direction"]);
	
	var obj = $(content).appendTo("#flowRecord");
	$.parser.parse(obj);
	
	//3.设置源端口号
	$("#m_sender_port"+(i+1)).textbox("setValue",flowDataJson["sender_port"]);
	//4.设置目标端口号
	$("#m_receiver_port"+(i+1)).textbox("setValue",flowDataJson["receiver_port"]);
	//5.设置持续时间
	$("#m_duration"+(i+1)).textbox("setValue",flowDataJson["duration"]);
	//6.设置开始时延
	$("#m_strat_delay"+(i+1)).textbox("setValue",flowDataJson["strat_delay"]);
		
	//监听分组大小的事件改变
	$("#group"+(i+1)).combobox({
		onSelect: function(record){
			var sizeOption = flowDataJson["size_option"];
			var selectValue = record.value;
			var groupTextElement = $(this).parent().next();
			$(groupTextElement).empty();
			var groupContent;
			switch(selectValue){
			case "uniform"://平均分布
				var sizeOptionArray = sizeOption.split(",");
				groupContent='<label>范围:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;" value="'+sizeOptionArray[0]+'"/>至<input class="easyui-textbox" name="e_size_option" style="width:175px;" value="'+sizeOptionArray[1]+'"/><label>(字节)</label>';
				break;
			case "constant"://常数分布
				groupContent='<label>数值:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;" value="'+sizeOption+'"/><label>(字节)</label>';
				break;
			case "exponential"://指数分布
				groupContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;" value="'+sizeOption+'"/><label>(字节)</label>';
				break;
			case "normal"://正态分布
				var sizeOptionArray = sizeOption.split(",");
				groupContent='<label>均值:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;" value="'+sizeOptionArray[0]+'"/>(字节) 方差:<input class="easyui-textbox" name="e_size_option" style="width:175px;" value="'+sizeOptionArray[1]+'"/><label>(字节)</label>';
				break;
			case "gamma"://伽马分布
				var sizeOptionArray = sizeOption.split(",");
				groupContent='<label>形状参数值:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;" value="'+sizeOptionArray[0]+'"/>(字节) 尺度:<input class="easyui-textbox" name="e_size_option" style="width:175px;" value="'+sizeOptionArray[1]+'"/><label>(字节)</label>';
				break;
			case "poisson"://泊松分布
				groupContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;" value="'+sizeOption+'"/><label>(字节)</label>';
				break;
			default:
				break;
			}
			$(groupContent).appendTo($(groupTextElement));
			$.parser.parse(obj);
			
			//1.设置协议类型的值
			$("#m_protocol"+(i+1)).combobox("select",flowDataJson["protocol"]);
			//2.设置方向的值
			$("#m_direction"+(i+1)).combobox("select",flowDataJson["direction"]);
		}
	});
	
	//监听发包间隔事件
	$("#sendInterval"+(i+1)).combobox({
		onSelect: function(record){
			var timeOption = flowDataJson["time_option"];
			console.log("timeOption="+timeOption);
			var selectValue = record.value;
			var sendIntervalTextElement = $(this).parent().next();
			$(sendIntervalTextElement).empty();
			var sendIntervalContent;
			switch(selectValue){
			case "uniform"://平均分布
				var timeOptionArray = timeOption.split(",");
				console.log(timeOptionArray[0]);
				sendIntervalContent='<label>范围:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;" value="'+timeOptionArray[0]+'"/>至<input class="easyui-textbox" name="e_time_option" style="width:175px;" value="'+timeOptionArray[1]+'"/><label>(字节)</label>';
				console.log(timeOptionArray[0]);
				break;
			case "constant"://常数分布
				sendIntervalContent='<label>数值:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;" value="'+timeOption+'"/><label>(字节)</label>';
				break;
			case "exponential"://指数分布
				sendIntervalContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;" value="'+timeOption+'"/><label>(字节)</label>';
				break;
			case "normal"://正态分布
				var timeOptionArray = timeOption.split(",");
				sendIntervalContent='<label>均值:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;" value="'+timeOptionArray[0]+'"/>(字节) 方差:<input class="easyui-textbox" name="e_time_option" style="width:175px;" value="'+timeOptionArray[1]+'"/><label>(字节)</label>';
				break;
			case "gamma"://伽马分布
				var timeOptionArray = timeOption.split(",");
				sendIntervalContent='<label>形状参数值:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;" value="'+timeOptionArray[0]+'"/>(字节) 尺度:<input class="easyui-textbox" name="e_time_option" style="width:175px;" value="'+timeOptionArray[1]+'"/><label>(字节)</label>';
				break;
			case "poisson"://泊松分布
				sendIntervalContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;" value="'+timeOption+'"/><label>(字节)</label>';
				break;
			default:
				break;
			}
			$(sendIntervalContent).appendTo($(sendIntervalTextElement));
			$.parser.parse(obj);
			
			//1.设置协议类型的值
			$("#m_protocol"+(i+1)).combobox("select",flowDataJson["protocol"]);
			//2.设置方向的值
			$("#m_direction"+(i+1)).combobox("select",flowDataJson["direction"]);
		}
	});
	
	
	
	//7.设置分组大小
	$("#group"+(i+1)).combobox("select",flowDataJson["content_type"]);
	//8.设置发包间隔
	$("#sendInterval"+(i+1)).combobox("select",flowDataJson["time_type"]);
	
	}
	
}
/**
 * 选中回放模式的业务下拉框触发事件
 */
function selectPlaybackServiceCombobox(rec)
{
	var servicePara = rec.service_para;
	var serviceParaArray = servicePara.split(";");
	var serviceTypeString = serviceParaArray[0];
	var serviceNameString = serviceParaArray[1];
	var serviceTypeArray = serviceTypeString.split("=");
	var serviceNameArray = serviceNameString.split("=");
	
	$("#m_service_type").combobox('select',serviceTypeArray[1]);
	$("#m_servicename").combobox('select', serviceNameArray[1]);
}

/**
 * 保存任务策略
 */
function savePolicy()
{
	var modelForm = $("#modelForm").serializeObject();//选择的模式表单	
	var playbackForm = $("#playbackForm").serializeObject();//回放模式的表单
	var customForm = $("#customForm").serializeObject();//自定义模式的表单
	
	//1.提示输入策略名
	var policy={};
	$.messager.prompt("提示","请输入需要保存的策略名",function(r){
		if(r)
		{
			//1.1策略参数格式处理
			policy["policy_name"]=r;
			policy["policy_type"]=7;
			
			//1.2 回放模式
			if(modelForm.m_mode_type == 1)
			{
				//1.2.1 业务参数
				var playbackService = playbackForm.service_name;
				var policyPara="mode_type=playback;";
				$.ajax({
					type:"POST",
					url:"getCustomService.html",
					async:false,
					data:{"serviceNum":playbackService},
					success:function(data)
					{
						var customService = data.customService;
						policyPara = policyPara+customService.service_para;
					},
					error:function()
					{
						console.log("获取业务参数失败");
					}
				});
				policy['policy_para'] = policyPara;
				
			}else//1.3 自定义流模式
			{
				//1.3.1 业务参数
				var defineService = customForm.service_name;
				var policyPara = "mode_type=define;";
				$.ajax({
					type:"POST",
					url:"getCustomService.html",
					async:false,
					data:{"serviceNum":defineService},
					success:function(data)
					{
						var customService = data.customService;
						policyPara = policyPara+customService.service_para;
					},
					error:function()
					{
						console.log("获取业务参数失败");
					}
				});
				policy['policy_para'] = policyPara;
			}
			
			//1.4 保存策略
			var jsonObjInfo = JSON.stringify(policy);
			$.ajax({
				type:"POST",
				contentType:"application/json",
				url:"addAjaxPolicy.html",
				data:jsonObjInfo,
				dataType:"json",
				success:function(data)
				{
					console.log("保存策略成功");
				},
				error:function()
				{
					console.log("保存策略失败");
				}
			});		
		}
	});
}

/**
 * 定制为新业务
 */
function saveService()
{
	var policyJson, customServiceJson = {};;
	var modelForm = $("#modelForm").serializeObject();//选择的模式表单	
	var playbackForm = $("#playbackForm").serializeObject();//回放模式的表单
	var customForm = $("#customForm").serializeObject();//自定义模式的表单
	
	console.log("自定义模式表单"+JSON.stringify(customForm));
	
	$.messager.prompt("提示","请输入需要保存的业务名",function(r){
		if(r)
		{
			customServiceJson["service_name"]=r;//定制业务模板的业务名称
			
			//1.回放模式,定制为新业务
			if(modelForm.m_mode_type == 1)
			{
				var servicePara = "service_type="+playbackForm.m_service_type
					+";servicename="+playbackForm.m_servicename+";TestTimeSection=";
				if(playbackForm.is_timeController == 1)//时段控制选中
				{
					servicePara = servicePara+playbackForm.s_start_time+"-"+playbackForm.e_end_time;
				}
				
				servicePara = servicePara+";";	
				customServiceJson["service_type"]=1;//定制业务模板的业务类型
				customServiceJson["service_para"]=servicePara;//定制业务模板的业务参数	
			}else//2.自定义流模式,定制为新业务
			{
				var servicePara = "TestTimeSection=";
				
				if(customForm.is_timeController == 1)//时段控制选中
				{
					servicePara = servicePara+customForm.s_start_time+"-"+customForm.e_end_time;
				}
				var flowNum = $("div[name='flowRecords']").length;
				servicePara = servicePara+";flow_num="+flowNum;
				
				for(var num=0;num<flowNum;num++)
				{
					servicePara += "|";
					for(var item in customForm)
					{
						if(customForm[item] != "")
						{
							if(item.indexOf("m_") >= 0)
							{
								console.log(flowNum == 1);
								if(flowNum == 1)
								{
									servicePara += item.substring(2, item.length)+"="+customForm[item]+";";
								}else
								{
									servicePara += item.substring(2, item.length)+"="+customForm[item].shift()+";";
								}
									
							}
								
							if(item == "content_type")
							{
								console.log(customForm[item].length);
								var content_type;
								if(flowNum == 1)
								{
									content_type = customForm[item];
								}else
								{
									content_type = customForm[item].shift();
								} 
								servicePara += "content_type="+content_type+";";
								if(content_type == "uniform" || content_type == "normal" || content_type == "gamma")
								{
									if(customForm["s_size_option"] != "" && customForm["e_size_option"] != "")
									{
										var s = customForm["s_size_option"].slice(num, num+1);
										var e = customForm["e_size_option"].slice(num, num+1);
										servicePara += "size_option="+s+","+e+";";
									}
								}else
								{
									if(customForm["s_size_option"] != "")
									{
										var s = customForm["s_size_option"].slice(num, num+1);
										servicePara += "size_option="+s+";";
									}
								}
							}
							
							if(item == "time_type")
							{
								var time_type;
								if(flowNum == 1)
								{
									time_type = customForm[item];
								}else
								{
									time_type = customForm[item].slice(num, num+1);
								}
								
								servicePara += "time_type="+time_type+";";
								if(time_type == "uniform" || time_type == "normal" || time_type == "gamma")
								{
									if(customForm["s_size_option"] != "" && customForm["e_size_option"] != "")
									{
										var s = customForm["s_time_option"].slice(num,num+1);
										var e = customForm["e_time_option"].slice(num,num+1);
										servicePara+="time_option="+s+","+e;
									}
								}else
								{
									if(customForm["s_size_option"] != "")
									{
										var s = customForm["s_time_option"].slice(num,num+1);
										servicePara+="time_option="+s;
									}
								}
								
							}
						}
					}
				}
			
				customServiceJson["service_type"] = 2;//定制业务模板的业务类型
				customServiceJson["service_para"] = servicePara;//定制业务模板的业务参数
			}
			
			//保存多媒体业务性能的业务
			$.ajax({
				type:"POST",
				contentType:"application/json",
				data:JSON.stringify(customServiceJson),
				url:"saveService.html",
				dataType:"json",
				success:function(data)
				{
					console.log("多媒体业务保存成功");
				},
				error:function()
				{
					console.log("多媒体业务保存失败");
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
	var multiMediaForm = $("#multiMediaForm").serializeObject();//得到多媒体业务性能测量的表单任务
	var modelForm = $("#modelForm").serializeObject();//选择的模式表单	
	var playbackForm = $("#playbackForm").serializeObject();//回放模式的表单
	var customForm = $("#customForm").serializeObject();//自定义模式的表单
	
	console.log("modelForm:"+JSON.stringify(modelForm));
	
	//1.判断是否保存编辑任务
	if(taskNum != null)//保存编辑的任务
	{
		deleteTaskByTaskNum(taskNum);
	}
	
	//2.格式化任务参数
	var filterJsonObj = {}, task_target;
	task_target = getChooseTargetEquips("#MultiMediaChooseTargetDevices");
	filterJsonObj["task_type"] = multiMediaForm.task_type;//任务类别
	filterJsonObj["task_subject"] = multiMediaForm.task_subject;//任务主体
	filterJsonObj["task_name"] = multiMediaForm.task_name;//任务名称
	filterJsonObj["task_target"] = task_target;//任务目标													
	filterJsonObj["is_cycle"] = multiMediaForm.is_cycle;//周期性测量
	
	if(filterJsonObj["is_cycle"]==1)
 		filterJsonObj["task_interval"] = multiMediaForm.task_interval;//测量间隔
	filterJsonObj["interval_unit"]=multiMediaForm.interval_unit;//测量间隔单位
 	filterJsonObj["send_ip"]=multiMediaForm.send_ip;//上报IP
	
	var policyPara = "", serviceNum;
	
	if(modelForm.m_mode_type == 1)//回放模式
	{
		serviceNum = playbackForm.service_name;
		policyPara = "mode_type=playback;";	
	}else//自定义模式
	{
		serviceNum = customForm.service_name;
		policyPara = "mode_type=define;";
	}
	
	//3.从业务模板表中获取业务参数
	$.ajax({
		type:"POST",
		url:"getCustomService.html",
		async:false,
		data:{"serviceNum":serviceNum},
		success:function(data)
		{
			var customService = data.customService;
			policyPara = policyPara+customService.service_para;
		},
		error:function()
		{
			console.log("获取业务参数失败");
		}
	});
	
	filterJsonObj["policy_para"] = policyPara;//策略参数
	//4.判断是否激活任务
    if(isActive == 1)//激活任务
 	{
 		var currentDate = new Date();
 		filterJsonObj["start_time"] = currentDate;
 		filterJsonObj["task_stat"] = 1;
 	}
	
	//5.采用异步的方式添加任务
 	addTask(JSON.stringify(filterJsonObj));
	
}

/**
 * 初始化多媒体业务传输性能测量任务UI
 */
function initMultiMediaTaskAddUI()
{
	//1.1设置缺省任务名
	$("#multiMediaTaskName").textbox("setValue", multiMediaTaskName+"任务"+new Date().toLocaleString());
	
	//1.2任务主体的数据初始化
	$("#multiMediaTask_subject").combobox(
	{
		url:'get_AjaxTanzhenEquip.html',
		valueField:'value',
		textField:'text',
		onLoadSuccess:function()
		{
			var data = $("#multiMediaTask_subject").combobox('getData');
			$("#multiMediaTask_subject").combobox('select', data[0].text);
		},
		error:function()
		{
			alert("任务主体数据初始化失败");
		}
	});
	
	//1.3 目标设备的数据初始化
	$.ajax(
	{   
		type : 'POST', 
		url : 'ajaxGetAllEquips.html',    
		success: function(data)
		{
			$.each(data.data, function(i,item)
			{
				var optionContent = "<option value='"+item.equipId+"'>"+item.equipName+"</option>";
				$("#MultiMediaTargetDevices").append(optionContent);
			});
		}
	});
	
	//1.4 回放模式的下拉选框数据初始化
	$("#playbackService").combobox({
		url:"getCustomServiceByServiceType.html?serviceType=1",
		valueField:'value',
		textField:'text',
		onSelect:function(rec)
		{
			selectPlaybackServiceCombobox(rec);//选中回放模式的业务下拉框	
		}
	});
	
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

var i=0;
/**
 * 多媒体业务自定义流模式增加流记录
 */
function addFlowRecord()
{
	i++;
	var content = '<div id="flowRecord'+i+'" name="flowRecords"><br/><hr/><table style="margin-top:10px;"><thead>流记录'+i+'</thead>'+
	'<tr>'+
	'<td>协议类型:'+
		'<select class="easyui-combobox" name="m_protocol" style="width:200px;">'+
			'<option value="TCP">TCP</option>'+
			'<option value="UDP">UDP</option>'+
		'</select>'+
	'</td>'+
	'<td>方向:&nbsp;&nbsp;&nbsp;'+
		'<select class="easyui-combobox" name="m_direction" style="width:200px;">'+
			'<option value="server-to-client">server-to-client</option>'+
			'<option value="client-to-server">client-to-server</option>'+
		'</select>'+
	'</td>'+
'</tr>'+
'<tr>'+
	'<td>源端口号:<input class="easyui-textbox" name="m_sender_port"/></td>'+
	'<td>目标端口号:<input class="easyui-textbox" name="m_receiver_port"/></td>'+
'</tr>'+
'<tr>'+
	'<td>持续时间:<input class="easyui-textbox" name="m_duration"/>(秒)</td>'+
	'<td>开始时延:&nbsp;<input class="easyui-textbox" name="m_strat_delay"/>(秒)</td>'+
'</tr>'+
'<tr>'+
	'<td>分组大小:'+
		'<select name="content_type" style="width:200px;" id="group'+i+'">'+
			'<option value="uniform">平均分布</option>'+
			'<option value="constant">常数分布</option>'+
			'<option value="exponential">指数分布</option>'+
			'<option value="normal">正态分布</option>'+
			'<option value="gamma">伽马分布</option>'+
			'<option value="poisson">泊松分布</option>'+
		'</select>'+
	'</td>'+
	'<td id="groupText'+i+'">范围:'+
		'<input class="easyui-textbox" name="s_size_option"/>至<input class="easyui-textbox" name="e_size_option"/>(字节)'+
	'</td>'+
'</tr>'+
'<tr>'+
	'<td>发包间隔:'+
		'<select name="time_type" style="width:200px;" id="sendInterval'+i+'">'+
			'<option value="uniform">平均分布</option>'+
			'<option value="constant">常数分布</option>'+
			'<option value="exponential">指数分布</option>'+
			'<option value="normal">正态分布</option>'+
			'<option value="gamma">伽马分布</option>'+
			'<option value="poisson">泊松分布</option>'+
		'</select>'+
	'</td>'+
	'<td id="sendIntervalText'+i+'"><label>范围:</label>'+
		'<input class="easyui-textbox" name="s_time_option"/>至<input class="easyui-textbox" name="e_time_option"/>(毫秒)'+
	'</td>'+
'</tr>'+
'</table></div>';
	var obj = $(content).appendTo("#flowRecord");
	$.parser.parse(obj);
	
	//监听发包间隔事件
	$("#sendInterval"+i).combobox({
		onSelect: function(record){
			var selectValue = record.value;
			var sendIntervalTextElement = $(this).parent().next();
			$(sendIntervalTextElement).empty();
			var sendIntervalContent;
			switch(selectValue){
			case "uniform"://平均分布
				sendIntervalContent='<label>范围:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;"/>至<input class="easyui-textbox" name="e_time_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "constant"://常数分布
				sendIntervalContent='<label>数值:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "exponential"://指数分布
				sendIntervalContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "normal"://正态分布
				sendIntervalContent='<label>均值:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;"/>(字节) 方差:<input class="easyui-textbox" name="e_time_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "gamma"://伽马分布
				sendIntervalContent='<label>形状参数值:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;"/>(字节) 尺度:<input class="easyui-textbox" name="e_time_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "poisson"://泊松分布
				sendIntervalContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_time_option" style="width:175px;"/><label>(字节)</label>';
				break;
			default:
				break;
			}
			var obj1 = $(sendIntervalContent).appendTo($(sendIntervalTextElement));
			$.parser.parse(obj);
		}
	});
	
	//监听分组大小的事件改变
	$("#group"+i).combobox({
		onSelect: function(record){
			var selectValue = record.value;
			var groupTextElement = $(this).parent().next();
			$(groupTextElement).empty();
			var groupContent;
			switch(selectValue){
			case "uniform"://平均分布
				groupContent='<label>范围:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;"/>至<input class="easyui-textbox" name="e_size_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "constant"://常数分布
				groupContent='<label>数值:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "exponential"://指数分布
				groupContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "normal"://正态分布
				groupContent='<label>均值:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;"/>(字节) 方差:<input class="easyui-textbox" name="e_size_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "gamma"://伽马分布
				groupContent='<label>形状参数值:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;"/>(字节) 尺度:<input class="easyui-textbox" name="e_size_option" style="width:175px;"/><label>(字节)</label>';
				break;
			case "poisson"://泊松分布
				groupContent='<label>平均:</label>'+
				'<input class="easyui-textbox" name="s_size_option" style="width:175px;"/><label>(字节)</label>';
				break;
			default:
				break;
			}
			var obj1 = $(groupContent).appendTo($(groupTextElement));
			$.parser.parse(obj);
		}
	});
}
	
/**
 * 多媒体业务自定义流模式删除制定流记录
 */
function deleteFlowRecord(id)
{
	var flowRecordObj = $("#flowRecord"+id);
	$(flowRecordObj).remove();
}
	
	