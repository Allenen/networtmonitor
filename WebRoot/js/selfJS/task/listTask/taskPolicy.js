/**
 * 公用方法
 * */
//格式化策略参数
formatPolicy_para = function(policy_para)
{
	var policyObj = {};
	var poliStrings = policy_para.split(";");
	for(var i=0;i<poliStrings.length;i++)
	{
		var policykeyValue = poliStrings[i].split("=");
		policyObj[policykeyValue[0]] = policykeyValue[1];
	}
	
	return policyObj;
};

//设置双向时延策略参数值
setDLatencyPolicy_paraValue = function(policyObj)
{
	$("#m_LPN").textbox("setValue", policyObj.LPN);
	$("#m_LPL").textbox("setValue", policyObj.LPL);
	$("#m_SPN").textbox("setValue", policyObj.SPN);
	$("#m_SPL").textbox("setValue", policyObj.SPL);
	$("#m_DelayLimit").textbox("setValue", policyObj.DelayLimit);
	$("#m_LossLimit").textbox("setValue", policyObj.LossLimit);
	if(testTimeSection == null) return ;
	var testTimeSection = policyObj.TestTimeSection;
	var testTimeSectionList = testTimeSection.split("-");
	$("#start_time").textbox("setValue", testTimeSectionList[0]);
	$("#end_time").textbox("setValue", testTimeSectionList[1]);
};

//设置单向时延策略参数值
setSLatencyPolicy_paraValue = function(policyObj)
{
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
	if(testTimeSection == null) return ;
	var testTimeSection = policyObj.TestTimeSection;
	var testTimeSectionList = testTimeSection.split("-");
	$("#start_time").textbox("setValue", testTimeSectionList[0]);
	$("#end_time").textbox("setValue", testTimeSectionList[1]);
};

//设置阻断测量任务策略参数值
setBlockPolicy_paraValue = function(policyObj)
{
	$("#m_SendCount").textbox("setValue", policyObj.SendCount);
	$("#m_PacketSize").textbox("setValue", policyObj.PacketSize);
	$("#m_ReceiveTimeOut").textbox("setValue", policyObj.ReceiveTimeOut);
	$("#m_ReportInterval").textbox("setValue", policyObj.ReportInterval);
	if(testTimeSection == null) return ;
	var testTimeSection = policyObj.TestTimeSection;
	var testTimeSectionList = testTimeSection.split("-");
	$("#start_time").textbox("setValue", testTimeSectionList[0]);
	$("#end_time").textbox("setValue", testTimeSectionList[1]);
};

//设置TE测量任务策略参数值
setTETestPolicy_paraValue = function(policyObj)
{
	$("#m_loss_limit").textbox("setValue", policyObj.loss_limit);
	$("#m_delay_limit").textbox("setValue", policyObj.delay_limit);
	$("#m_protocol").textbox("setValue", policyObj.protocol);
	$("#m_direction").textbox("setValue", policyObj.direction);
	$("#m_dscp").textbox("setValue", policyObj.dscp);
	$("#m_sender_port").textbox("setValue", policyObj.sender_port);
	$("#m_receiver_port").textbox("setValue", policyObj.receiver_port);
	$("#m_duration").textbox("setValue", policyObj.duration);
	$("#m_time_type").textbox("setValue", policyObj.time_type);
	if(testTimeSection == null) return ;
	var testTimeSection = data.TestTimeSection;
	var testTimeSectionList = testTimeSection.split("-");
	$("#start_time").textbox("setValue", testTimeSectionList[0]);
	$("#end_time").textbox("setValue", testTimeSectionList[1]);
};

/**
 * 1.列表式编辑任务策略
 * */
//通用业务任务的业务类型发生改变
$("input[name=serviceType]").change(function(){
	var rec = {};
	var serviceType = $(this).next().html();
	console.log("通用业务性能测量任务的业务类型："+serviceType);
	if(serviceType == "WEB")
	{
		rec["id"] = 8;
	}else if(serviceType == "FTP")
	{
		rec["id"] = 9;
	}else if(serviceType == "DNS")
	{
		rec["id"] = 10;
	}else
	{
		rec["id"] = 11;
	}
	initTaskStrategy(rec);
});

//初始化任务的策略
initTaskStrategy = function(rec)
{
	var strategy = "#strategy"+rec.id;
	
	//选择策略，变动策略参数（双向时延策略参数）
	$(strategy).combobox(
	{
		url:'get_AjaxPolicyBytaskType.html?tasktype='+rec.id,
		valueField:'text',		//策略名称
		textField:'text',		//策略名称
		onSelect: function(rec)
		{
	        $.ajax(
	        { 
	            type : 'POST',   
	            contentType : 'application/json;charset=UTF-8',  
	            url : 'getPolicyparaByPolicyName.html?choosePolicyName='+rec.text, 
	            dataType : 'json',
	            success: function(data)
	            {
	        		var policy = data.policy;
	        		
	        		console.log("进入格式化策略参数方法");
	        		var policyObj = formatPolicy_para(policy.policy_para);
	        		console.log("离开格式化策略参数方法");
		        	
	        		switch(policy.policy_type)
	        		{
		        		case 1://双向时延任务
		        			setDLatencyPolicy_paraValue(policyObj);
		        			break;
		        		case 2://单向时延任务
		        			setSLatencyPolicy_paraValue(policyObj);
		        			break;
		        		case 3://阻断监测任务
		        			setBlockPolicy_paraValue(policyObj);
		        			break;
		        		case 4://TE隧道测量任务
		        			setTETestPolicy_paraValue(policyObj);
		        			break;
		        		case 5://链路性能测量任务
		        			break;
		        		case 6://链路变化监测任务
		        			break;
		        		case 7://多媒体业务性能测量任务
		        			
		        			break;
		        		case 8://WEB业务测量任务
		        			break;
		        		case 9://FTP业务测量任务
		        			break;
		        		case 10://DNS业务测量任务
		        			break;
		        		case 11://EMAIL业务测量任务
		        			break;
		        		
		        		default:
		        			break;
	        		}
	            }
	        } ); 
		}
	});
};

//多媒体策略改变触发事件
multiMediaStrategyChangeTrigger = function()
{
	$("input[name=m_mode_type]").change(function(){
		var checkModeValue = $("input[name=m_mode_type]:checked").val();
		if(checkModeValue == 0){		//回放模式
			console.log("回放模式");
			$("#customModel").hide();
			$("#playbackModel").show();
		}else{							//自定义流模式
			console.log("自定义流模式");
			$("#playbackModel").hide();
			$("#customModel").show();
		}
	});
};


//修改策略
function editPolicy(){
  $("input[readonly=readonly]").textbox({"readonly":false});
}

//多媒体业务性能测量任务----回放模式
multiMediaTaskPolicy_playback = function(playbackForm, policypara, policy)
{
	for(var item in playbackForm)
	{
 	   if(item.indexOf('m_')>=0)
 	   {
 	       policypara +=item.substring(2,item.length)+"="+playbackForm[item]+";";
 	   }
 	   if(item.indexOf("s_")>=0)
 	   {
 		  startTime = playbackForm[item];
 	   }
 	   if(item.indexOf("e_")>=0)
 	   {
 		  endTime = playbackForm[item];
 	   }
	 }
 
	policypara = policypara+"TestTimeSection="+startTime+"-"+endTime+";";
    policy['policy_para'] = policypara;
    var jsonobjinfo = $.toJSON(policy);
    console.log("多媒体业务性能测量任务----回放模式的策略="+jsonobjinfo);
    return jsonobjinfo;
};


//多媒体业务性能测量任务----自定义模式
multiMediaTaskPolicy_define = function(customForm, policypara, policy)
{
 	var startTime = customForm.s_start_time;
    var endTime = customForm.e_end_time;
    policypara+="TestTimeSection="+startTime+"-"+endTime+";";
    
    var flowNum = customForm.m_protocol.length;
    policypara+="flow_num="+flowNum;
    for(var num=0; num< flowNum;num++)
    {
    	policypara+="|";
    	for(var item in customForm)
        {
    		if(customForm[item] != "")
    		{
    			if(item.indexOf("m_")>=0)
	        	{
	        		policypara += item.substring(2,item.length)+"="+customForm[item].shift()+";";
	        	}
	        	if(item == "content_type")
	        	{
	        		var content_type = customForm[item].shift();
	        		policypara+="content_type="+content_type+";";
	        		if(content_type=="uniform" || content_type=="normal"
	        			|| content_type == "gamma")
	        		{
	        			var s,e;
	        			if(customForm["s_size_option"] != "" && customForm["e_size_option"] != "")
	        			{
	        				s = customForm["s_size_option"].slice(num,num+1);
	        			e = customForm["e_size_option"].slice(num,num+1);
	        			policypara+="size_option="+s+","+e+";";
	        			}
	        			
	        		}else{
	        			var s;
	        			if(customForm["s_size_option"] != "")
	        			{
	        				s = customForm["s_size_option"].slice(num,num+1);
	        				policypara+="size_option="+s+";";
	        			}
	        			
	        		}
	        	 }
	        	 if(item == "time_type")
	        	 {
	        		 var time_type = customForm[item].slice(num,num+1);
	        		policypara+="time_type="+time_type+";";
	        		if(time_type=="uniform" || time_type=="normal"
	        			|| time_type == "gamma")
	        		{
	        			var s,e;
	        			if(customForm["s_size_option"] != "" && customForm["e_size_option"] != "")
	        			{
	        				s = customForm["s_time_option"].slice(num,num+1);
	        				e = customForm["e_time_option"].slice(num,num+1);
	        				policypara+="time_option="+s+","+e+";";
	        			}
	        			
	        		}else{
	        			var s;
	        			if(customForm["s_size_option"] != "")
	        			{
	        				s = customForm["s_time_option"].slice(num,num+1);
	        				policypara+="time_option="+s+";";
	        			}
	        			
	        		}
	        	 }
    		}
        	
         }
    }

    policy['policy_para'] = policypara;
    var jsonobjinfo = $.toJSON(policy);
    alert(jsonobjinfo);
};

//保存多媒体业务性能测量任务策略
saveMultiMediaTaskPolicy = function(policytype)
{
	//多媒体业务性能测量任务策略
	var jsonobj = $(formIdList[policytype-1]).serializeObject();//任务的主表单的值
	var modelForm = $("#modelForm").serializeObject();//选择的模式表单
	var playbackForm = $("#playbackForm").serializeObject();//回放模式的表单
	var customForm = $("#customForm").serializeObject();//自定义模式的表单
	var policy = {};
	
	$.messager.prompt("提示","请输入要将本部分参数保存为策略的策略名", function(r){
		if(r){
			policy['policy_name']=r;
	        policy['policy_type'] = policytype;
	        var policypara = "", startTime="", endTime="";
	        
	        policypara +="mode_type="+modelForm.m_mode_type+";";
	        if(modelForm.m_mode_type == "playback")//回放模式
	        {
	        	console.log("进入多媒体业务性能测量任务----回放模式方法");
	        	var policyJson = multiMediaTaskPolicy_playback(playbackForm, policypara, policy);
	        	console.log("离开多媒体业务性能测量任务----回放模式方法");
	        	
	        	savePolicyByAjax(policyJson);	//利用ajax方式保存策略
	        }else{
	        	console.log("进入多媒体业务性能测量任务----自定义模式方法");
	        	var policyJson = multiMediaTaskPolicy_define(customForm, policypara, policy);
	        	console.log("进入多媒体业务性能测量任务----自定义模式方法");
	        	
				savePolicyByAjax(policyJson);	//利用ajax方式保存策略 
	        }
		}
	});
};

//保存通用业务性能测量任务策略
setCommonServiceTaskPolicy = function()
{
	var jsonobj, jsonJsonObj={};
	var checkServiceTypeValue = $("input[name=serviceType]:checked").next().html();
	
	switch(checkServiceTypeValue)
	{
		case "WEB":					//WEB业务类型
			jsonobj = $("#commonWEBForm").serializeObject();
			policytype=8;
			break;
		case "FTP":					//FTP业务类型
			jsonobj = $("#commonFTPForm").serializeObject();
			policytype=9;
			break;
		case "DNS":					//DNS业务类型
			jsonobj = $("#commonDNSForm").serializeObject();
			policytype=10;
			break;
		case "EMAIL":				//EMAIL业务类型
			jsonobj = {};
			policytype=11;
			break;
		default:
			break;
	}
	
	jsonobj["service_type"]=checkServiceTypeValue;
	jsonJsonObj["jsonobj"]=jsonobj;
	jsonJsonObj["policytype"]=policytype;
	return jsonJsonObj;
};

//通用业务中的Email业务
commonServiceEmail = function(policy)
{
	var smtpForm, pop3Form, policypara="";
	if($("#smtp").is(":checked"))//如果smtp被勾选
	{
		smtpForm = $("#commonEMAILSMTPForm").serializeObject();
	}
	
	if($("#pop3").is(":checked"))//如果pop3被勾选
	{
		pop3Form = $("#commonEMAILPOP3Form").serializeObject();
	}
	
	var timeForm = $("#commonEMAILTimeForm").serializeObject();
	if(smtpForm != null)
	{
		for(var item in smtpForm)
		  {
			  if(smtpForm[item] != "")
			  {
				  if(item.indexOf("m_")>=0)
				  {
					  policypara += item.substring(2,item.length)+"="+smtpForm[item]+";";
				  }
			  }
		  }	
	}
	
	if(pop3Form != null)
	{
		if(smtpForm != null)
		{
			policypara = policypara+"][";
		}
		for(var item in pop3Form)
		  {
			  if(pop3Form[item] != "")
			  {
				  
				  if(item.indexOf("m_")>=0)
				  {
					  policypara += item.substring(2,item.length)+"="+pop3Form[item]+";";
				  }
			  }
		  }
		
		if(smtpForm != null)
		{
			policypara = policypara+"];";
		}
	}
	
	var startTime = timeForm.s_start_time, endTime = timeForm.e_end_time;
	var policypara = policypara+"TestTimeSection="+startTime+"-"+endTime+";";
	
	if(smtpForm != null && pop3Form != null)//同时选SMTP和POP3服务
	{
		policypara = "service_type=smtp+pop3;["+policypara;
	}
	
	policy['policy_para'] = policypara;
	
	return policy;
};

//保存普通的任务策略
saveCommonPolicy = function (jsonobj, policytype)
{
	var policy = {};
    $.messager.prompt('提示', '请输入要将本部分参数保存为策略的策略名', function(r)
    {
    	if (r)
        {
    		policy['policy_name']=r;
	        policy['policy_type'] = policytype;
	        if(policytype == 4)//TE隧道测量
    		{
    			var policypara="model_type=te;loss_limit="+jsonobj.m_loss_limit+";delay_limit"+jsonobj.m_delay_limit+
    				";TestTimeSection="+jsonobj.s_start_time+"-"+jsonobj.e_end_time+";flow_num=1|protocol="+jsonobj.m_protocol+";direction="+jsonobj.m_direction+
    				";sender_port="+jsonobj.m_sender_port+";receiver_port="+jsonobj.m_receiver_port+";duration="+jsonobj.m_duration+";strat_delay=0;content_type=constant"+
    				";size_option=600;time_type=constant;time_option="+jsonobj.m_time_option+";dscp="+jsonobj.m_dscp;
    			policy['policy_para'] = policypara;
    			var jsonobjinfo = JSON.stringify(policy);
			    alert(jsonobjinfo);
				     
				savePolicyByAjax(jsonobjinfo);	//利用ajax方式保存策略
    			
    		}else if(policytype == 11)//通用业务任务中Email业务类型
    		{
		        console.log("进入通用业务中的Email业务方法");
		        policy = commonServiceEmail(policy);
		        console.log("离开通用业务中的Email业务方法");
		        
			    var jsonobjinfo = $.toJSON(policy);
			    alert(jsonobjinfo);
			    savePolicyByAjax(jsonobjinfo);	//利用ajax方式保存策略
    		}else
    		{
	            var policypara = "", startTime = "", endTime =  "",serviceType = "";
			 	for(var item in jsonobj)
			 	{
				 	if(item.indexOf('m_') >= 0)
				 	{
				 		policypara += item.substring(2, item.length) + "=" + jsonobj[item] + ";";
				 	}
				 	if(item.indexOf("s_") >= 0)//用于开始时段控制的值
				 	{
				 		startTime = jsonobj[item];
				 	}
				 	if(item.indexOf("e_") == 0)//用于结束时段控制的值
				 	{
				 		endTime = jsonobj[item];
				 	}
				 	if(item.indexOf("service_type") == 0)//用于通用业务性能测量任务的业务类型
				 	{
				 		policypara = "service_type=" + jsonobj[item] + ";" + policypara;
				 	}
			 	}
			 	 if($("#timeFlag")[0].value == 1)
			 		 policypara = policypara + "TestTimeSection=" + startTime + "-" + endTime + ";";
			     policy['policy_para'] = policypara;
			     var jsonobjinfo = JSON.stringify(policy);
			     console.log(jsonobjinfo);
				     
				 savePolicyByAjax(jsonobjinfo);	//利用ajax方式保存策略
    		}
    		
        }
    });
};

//保存策略
function savePolicy(policytype)
{
	if(policytype == 7)//保存多媒体业务性能测量任务策略
	{
		saveMultiMediaTaskPolicy(policytype); 
	}else
	{
		var jsonobj;
		if(policytype == 8)//保存通用业务测量
		{
			var jsonJsonObj = setCommonServiceTaskPolicy();
			jsonobj = jsonJsonObj["jsonobj"];
			policytype=jsonJsonObj["policytype"];
			
			console.log("jsonobj="+jsonobj);
			console.log("policytype="+policytype);
		}else//其余任务类型
		{
			jsonobj = $(formIdList[policytype-1]).serializeObject();
		}
		console.log(jsonobj);
		saveCommonPolicy(jsonobj, policytype);//保存普通的任务策略
	}
 
  }

//利用ajax方式保存策略
function savePolicyByAjax(jsonobjinfo)
{
	$.ajax( {   
          type : 'POST',   
          contentType : 'application/json',   
          url : 'addAjaxPolicy.html',   
          data : jsonobjinfo,   
          dataType : 'json',   
          success : function(data) { 
             if (data.success == "true") { 
            	$.messager.show({
	        		title: '消息提示',
	        		msg: '保存策略成功!',
	        		timeout: 1000,
	        		showType: 'slide'
	        	});
	             window.location.href="listTasks.html"; 
	          }else{
	        	$.messager.show({
	        		title: '消息提示',
	        		msg: '保存策略失败!',
	        		timeout: 1000,
	        		showType: 'slide'
	        	}); 
	          }   		           
          },   
            
        });
	
}
    

    
	
	
	
	
	