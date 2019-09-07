/**
 * 普通方式显示单向时延创建界面
 */

var SLatencyTaskName="单向时延";

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
	//1.初始化双向时延UI
	initSLatencyTaskAddUI();
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
	var jsonObj = $("#SLatencyForm").serializeObject();
	//2.提示输入策略名
	var policy={};
	$.messager.prompt("提示","请输入需要保存的策略名",function(r){
		if(r)
		{
			//2.1策略参数格式处理
			policy["policy_name"]=r;
			policy["policy_type"]=2;
			var policyPara="",startTime="",endTime="",serviceType="";
			for(var item in jsonObj)
			{
				if(item.indexOf("m_") >= 0)
					policyPara += item.substring(2,item.length)+"="+jsonObj[item]+";";
				if(item.indexOf("s_") >= 0)//用于开始时段控制的值
					startTime = jsonObj[item];
				if(item.indexOf("e_") == 0)//用于结束时段控制的值
			 		endTime = jsonObj[item];
			 	if(item.indexOf("service_type") == 0)//用于通用业务性能测量任务的业务类型
			 		policyPara = "service_type="+jsonObj[item]+";"+policyPara;
			}
			
			//策略表中不保存时段控制信息
			//policyPara = policyPara+"TestTimeSection="+startTime+"-"+endTime+";";
			
			policy['policy_para'] = policyPara;
			
			//2.2策略对象转化为json字符串
			var jsonObjInfo = JSON.stringify(policy);
			
			//2.3保存策略
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
	var jsonobj = $("#SLatencyForm").serializeObject();
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
	task_target = getChooseTargetEquips("#SLatencyChooseTargetDevices");
	
    //4.获取策略信息
    var choosePolicyName = $("#SLatencyTaskAddUIStrategy").combobox("getValue");//得到策略的名称
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
      
    //5.处理任务内容
    policypara = policy.policy_para+"TestTimeSection="+jsonobj.s_start_time+"-"+jsonobj.e_end_time+";";;
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
 * 初始化双向时延UI
 */
function initSLatencyTaskAddUI()
{
	//1.1设置缺省任务名
	$("#SLatencyTaskName").textbox("setValue", SLatencyTaskName+"任务"+new Date().toLocaleString());
	
	//1.2任务主体的数据初始化
	$("#SLatencyTask_subject").combobox(
	{
		url:'get_AjaxTanzhenEquip.html',
		valueField:'value',
		textField:'text',
		onLoadSuccess:function()
		{
			var data = $("#SLatencyTask_subject").combobox('getData');
			$("#SLatencyTask_subject").combobox('select', data[0].text);
		},
		error:function()
		{
			alert("任务主体数据初始化失败");
		}
	});
	
	//1.3策略参数的选择策略下拉数据初始化
	$("#SLatencyTaskAddUIStrategy").combobox(
	{
		url:'getAjaxPolicyBytaskType.html?tasktype=2',
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
        				var policykeyValue = poliStrings[i].split("=");
        				policyObj[policykeyValue[0]] = policykeyValue[1];
        			}
	        			
        			$("#m_LPN").textbox("setValue", policyObj.LPN);
					$("#m_LPL").textbox("setValue", policyObj.LPL);
					$("#m_SPN").textbox("setValue", policyObj.SPN);
					$("#m_SPL").textbox("setValue", policyObj.SPL);
					$("#m_Protocol").textbox("setValue", policyObj.Protocol);
					$("#m_DestPort").textbox("setValue", policyObj.DestPort);
					$("#m_SendInterval").textbox("setValue", policyObj.SendInterval);
					$("#m_ReceiveTimeOut").textbox("setValue", policyObj.ReceiveTimeOut);
					$("#m_DelayLimit").textbox("setValue", policyObj.DelayLimit);
					$("#m_LossLimit").textbox("setValue", policyObj.LossLimit);
					//策略表中不包括时段控制
					/*var testTimeSection = policyObj.TestTimeSection;
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
				$("#SLatencyTargetDevices").append(optionContent);
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