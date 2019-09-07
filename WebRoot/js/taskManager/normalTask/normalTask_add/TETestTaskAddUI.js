/**
 * 普通方式显示TEs隧道测量任务创建界面
 */

var TETestTaskName="TE隧道测量";

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
	//1.初始化TE隧道测量UI
	initTETestTaskAddUI();
});

/**
 * 设置任务策略可编辑
 */
function setPolicyEditable()
{
	$("input[readonly=readonly]").textbox({"readonly":false});
}

/**
 * 保存任务策略
 */
function savePolicy()
{
	//1.表单数据序列化为对象
	var jsonObj = $("#TETestForm").serializeObject();
	//2.提示输入策略名
	var policy={};
	$.messager.prompt("提示","请输入需要保存的策略名",function(r){
		if(r)
		{
			//2.1策略参数格式处理
			policy["policy_name"]=r;
			policy["policy_type"]=4;
			
			/*var policypara="model_type=te;loss_limit="+jsonObj.m_loss_limit+";delay_limit="+jsonObj.m_delay_limit+
	    				";TestTimeSection="+jsonObj.s_start_time+"-"+jsonObj.e_end_time+";flow_num=1|protocol="+jsonObj.m_protocol+";direction="+jsonObj.m_direction+
	    				";sender_port="+jsonObj.m_sender_port+";receiver_port="+jsonObj.m_receiver_port+";duration="+jsonObj.m_duration+";strat_delay=0;content_type=constant"+
	    				";size_option=600;time_type=constant;time_option="+jsonObj.m_time_option+";dscp="+jsonObj.m_dscp;*/
						
			var policypara="model_type=te;loss_limit="+jsonObj.m_loss_limit+";delay_limit="+jsonObj.m_delay_limit+
			";flow_num=1|protocol="+jsonObj.m_protocol+";direction="+jsonObj.m_direction+
			";sender_port="+jsonObj.m_sender_port+";receiver_port="+jsonObj.m_receiver_port+";duration="+jsonObj.m_duration+";strat_delay=0;content_type=constant"+
			";size_option=600;time_type=constant;time_option="+jsonObj.m_time_option+";dscp="+jsonObj.m_dscp;
			policy['policy_para'] = policypara;
			var jsonObjInfo = JSON.stringify(policy);
			console.log("jsonObjInfo="+jsonObjInfo);
			
			//2.2保存策略
			$.ajax( {   
				type : 'POST',   
				contentType : 'application/json',   
				url : 'addAjaxPolicy.html',   
				data : jsonObjInfo,   
				dataType : 'json',   
				success : function(data)
				{   
					//不起作用
	            	/*$.messager.show({
		        		title:'消息提示',
		        		msg:'保存策略成功!',
		        		timeout:1000,
		        		showType:'slide'
		        	});*/
		            window.location.href="taskAddUI.html";
		          },  
		          error:function()
		          {
		        	  /*$.message.show({
		        		 title:"消息提示",
		        		 msg:"bao"
		        	  });*/
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
	var jsonobj = $("#TETestForm").serializeObject();
	//1.判断是否保存编辑任务
	if(taskNum != null)//保存编辑的任务
	{
		deleteTaskByTaskNum(taskNum);
	}
	
	//2.校验时段控制
	if(jsonobj.e_end_time < jsonobj.s_start_time)
	{
		alert("开始时间大于结束时间！");
		return false;
	}
	
	//3.得到已选目标设备
	var task_target, policypara="", filterJsonObj={},policy={};
	task_target = getChooseTargetEquips("#TETestChooseTargetDevices");
	
    //4.获取策略信息
	policypara="model_type=te;loss_limit="+jsonobj.m_loss_limit+";delay_limit="+jsonobj.m_delay_limit+
	    				";TestTimeSection="+jsonobj.s_start_time+"-"+jsonobj.e_end_time+";flow_num=1|protocol="+jsonobj.m_protocol+";direction="+jsonobj.m_direction+
	    				";sender_port="+jsonobj.m_sender_port+";receiver_port="+jsonobj.m_receiver_port+";duration="+jsonobj.m_duration+";strat_delay=0;content_type=constant"+
	    				";size_option=600;time_type=constant;time_option="+jsonobj.m_time_option+";dscp="+jsonobj.m_dscp;
      
    //5.处理任务内容
    //policypara = policy.policy_para+"TestTimeSection="+jsonobj.s_start_time+"-"+jsonobj.e_end_time+";";;
    filterJsonObj["policy_name"]=policy.policy_name;
    jsonobj['task_target']=task_target;
 	jsonobj['policy_para']= policypara;
 	filterJsonObj["task_type"]=jsonobj["task_type"];
 	filterJsonObj["task_subject"]=jsonobj["task_subject"];
 	filterJsonObj["task_name"]=jsonobj["task_name"];
 	filterJsonObj["task_target"]=jsonobj["task_target"];
 	filterJsonObj["policy_para"]=jsonobj["policy_para"];
 	filterJsonObj["is_cycle"]=jsonobj["is_cycle"];
 	
 	if(filterJsonObj["is_cycle"]==1)
 		filterJsonObj["task_interval"]=jsonobj["task_interval"];
 	filterJsonObj["interval_unit"]=jsonobj["interval_unit"];
 	filterJsonObj["send_ip"]=jsonobj["send_ip"];
	 	
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
 * 初始化TE隧道测量UI
 */
function initTETestTaskAddUI()
{
	//1.1设置缺省任务名
	$("#TETestTaskName").textbox("setValue", TETestTaskName+"任务"+new Date().toLocaleString());
	
	//1.2任务主体的数据初始化
	$("#TETestTask_subject").combobox(
	{
		url:'get_AjaxTanzhenEquip.html',
		valueField:'value',
		textField:'text',
		onLoadSuccess:function()
		{
			var data = $("#TETestTask_subject").combobox('getData');
			$("#TETestTask_subject").combobox('select', data[0].text);
		},
		error:function()
		{
			alert("任务主体数据初始化失败");
		}
	});
	
	//1.3策略参数的选择策略下拉数据初始化
	$("#TETestTaskAddUIStrategy").combobox(
	{
		url:'getAjaxPolicyBytaskType.html?tasktype=4',
		valueField:'text',		//策略名称
		textField:'text',		//策略名称
		onSelect: function(rec)
		{
	        $.ajax({ 
	            type : 'POST',   
	            url : 'getPolicyParaByPolicyName.html?choosePolicyName='+rec.text, 
	            success: function(data)
	            {
	        		var policy = data.policy;
	        		var policyObj = {};
	        		
        			var poliStrings = policy.policy_para.split(";");
        			for(var i=0;i<poliStrings.length;i++)
        			{
						if(poliStrings[i].indexOf("|") >= 0)
						{
							var policykeyValue = poliStrings[i].split("|");
							var protocolValue = policykeyValue[1].split("=");
							policyObj[protocolValue[0]] = protocolValue[1];
							continue;
						}
        				var policykeyValue = poliStrings[i].split("=");
        				policyObj[policykeyValue[0]] = policykeyValue[1];
        			}
	        			
        			$("#m_loss_limit").textbox("setValue", policyObj.loss_limit);
					$("#m_delay_limit").textbox("setValue", policyObj.delay_limit);
					
					$("#m_protocol").combobox("select", policyObj.protocol);
					$("#m_direction").combobox("select", policyObj.direction);
					$("#m_dscp").combobox("select", policyObj.dscp);
					
					$("#m_sender_port").textbox("setValue", policyObj.sender_port);
					$("#m_receiver_port").textbox("setValue", policyObj.receiver_port);
					$("#m_duration").textbox("setValue", policyObj.duration);
					$("#m_time_type").textbox("setValue", policyObj.time_type);
					
					//策略表中不包括时段控制
					/*var testTimeSection = data.TestTimeSection;
					var testTimeSectionList = testTimeSection.split("-");
					$("#start_time").textbox("setValue", testTimeSectionList[0]);
					$("#end_time").textbox("setValue", testTimeSectionList[1]);*/
	            }
	        }); 
		}
	});
	
	//1.4目标设备的数据初始化
	$.ajax(
	{   
		type : 'POST', 
		url : 'ajaxGetAllEquips.html',    
		success: function(data)
		{
			$.each(data.data, function(i,item)
			{
				var optionContent = "<option value='"+item.equipId+"'>"+item.equipName+"</option>";
				$("#TETestTargetDevices").append(optionContent);
			});
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