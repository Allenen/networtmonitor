/**
 * 添加任务时可选目标设备的功能
 * */

//可选目标设备的id的集合
var optionalTargetDevices=["#DLatencyTargetDevices","#SLatencyTargetDevices","#BlockTargetDevices",
                           "#TETestTargetDevices","#MultiMediaTargetDevices","#CommonWEBTargetDevices",
                           "#CommonFTPTargetDevices","#CommonDNSTargetDevices","#CommonEMAILTargetDevices"];

var formIdList=["#DLatencyForm","#SLatencyForm","#BlockForm","#TETestForm",
	            "#PathPerformanceForm","#PathChangeForm","#multiMediaForm",
	            "#commonServiceForm","#DeviceForm",
	            "#CommonServiceForm","#MulticastForm","#PathChangeForm"];

var task_subject=["#DLatencyTask_subject","#SLatencyTask_subject","#BlockTask_subject",
                  "#TETestTask_subject","#PathPerformanceTask_subject","#PathChangeTask_subject",
                  "#PathChangeTask_subject","#commonServiceTask_subject","","",""];

//双向时延、单向时延、阻断测量、路由测量、QOS测量、VPN测量、路由器测试测量、链路性能测量、业务测量、性能探针测量、流量探针测量、探针更新、通用业务测量、多播测量、链路变化测量
var divIdList=["#DLatencyDiv","#SLatencyDiv","#BlockDiv","#TETestDiv", "#PathPerformanceDiv",
               "#PathChangeDiv","#multiMediaDiv", "#commonServiceDiv","#DeviceDiv",
               "#CommonServiceDiv","#MulticastDiv","#PathChangeDiv"];

var divNameList=["#DLatencyTaskName","#SLatencyTaskName","#BlockTaskName","#TETestTaskName",
                 "#PathPerformanceTaskName","#PathChangeTaskName","#multiMediaTaskName","#commonServiceTaskName",
                 "#DeviceTaskName","#CommonServiceTaskName","#MulticastTaskName","#PathChangeTaskName"];
var task_type;
//文档加载完成触发
$(function()
{
	//任务主体复选框初始化
	var subject = $("#taskSubject")[0].value;
	$("#taskSubject").combobox(
	{	
		valueField: 'text',
		textField: 'text',
		url: 'get_AjaxTanzhenEquip.html',
		onLoadSuccess: function(param){
			$('#taskSubject').combobox('setValue', subject);
		}
	});
	
	
	//周期性测量    间隔复选款初始化
	$("#detectcc2").combobox(
	{	
		panelHeight: 'auto',
		valueField: 'value',
		textField: 'label',
		data: [{
				label: '秒',
				value: 's'
			},{
				label: '分',
				value: 'm'
			},{
				label: '时',
				value: 'h'
			}]
	});
	
	//选择策略复选款初始化
	task_type = $("input[name='task_type']").val();
	$("#strategy" + task_type).combobox(
	{	
		url: 'getAjaxPolicyBytaskType.html?tasktype='  +  task_type,
		valueField: 'text',
		textField: 'text',
		onSelect: comboboxOnSelect
	});
	
//	var policy = task_type = $("input[name='policy']").val();
//	var policyObj = formatPolicy_para(policy);
//	//console.log(policyObj);
//	setPolicyParaValue(task_type, policyObj);
	
});

function comboboxOnSelect(rec){
    $.ajax(
    { 
        type : 'POST',   
        contentType : 'application/json;charset=UTF-8',  
        url : 'getPolicyParaByPolicyName.html?choosePolicyName=' + rec.text, 
        dataType : 'json',
        success: function(data)
        {
    		var policy = data.policy;
    		var policyObj = formatPolicy_para(policy.policy_para);
    		setPolicyParaValue(policy.policy_type, policyObj);
    		
        }
    } ); 
}

function setPolicyParaValue(policyType, policyObj){
	switch(policyType)
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



//点击移动按钮移动项
function moveOptionButtonTrigger(obj, direction)
{
    var leftDivObj, rightDivObj;
    var parentNode = $(obj).parent().parent();
    if(direction === "leftToRight")
    {
        leftDivObj = $(parentNode).children().eq(0).children();
        rightDivObj =$(parentNode) .children().eq(2).children();
    }else{
        leftDivObj = $(obj).parent().parent().prev().children().eq(2).children();
        rightDivObj = $(obj).parent().parent().prev().children().eq(0).children();
    }

    moveAction(leftDivObj, rightDivObj);
}


//双击移动效果(目标设备列表)
function moveOptionDbclickTrigger(obj, direction)
{
    var rightDivObj;
    if (direction === "leftToRight")
    {
        rightDivObj = $(obj).parent().parent().children().eq(2).children();
    }else{
        rightDivObj = $(obj).parent().parent().children().eq(0).children();
    }

    var leftDivObj = obj;

    moveAction(leftDivObj, rightDivObj);

}

//移动的动作
moveAction = function(leftDivObj, rightDivObj)
{
    var leftSelectOption = $(leftDivObj).children();
    for(var i=0;i<leftSelectOption.length;i ++ )
    {
        if (leftSelectOption.eq(i).is(":selected"))
        {
            $( rightDivObj).append(leftSelectOption.eq(i));
        }
    }
};

//返回已选目标设备
function getChooseTargetEquips(DLatencyChooseTargetDevicesId)
{
	 var rightOption = $(DLatencyChooseTargetDevicesId).children();
	 
	 var task_target="";
	 for(var i = 0; i < rightOption.length; i ++ )
	 {
		task_target = task_target + rightOption[i].value + ";"; 
	 }
	 
	 return task_target;
};



//保存任务(保存的任务类型,保存的任务的目标设备id,是否激活)
function saveTask(flag, chooseTargetDevicesId, isActive, taskNum){

	var jsonobj = $(formIdList[flag - 1]).serializeObject();
	console.log(jsonobj);
	//校验时间
	if(jsonobj.e_end_time < jsonobj.s_start_time){
		$.messager.confirm( '提示', '开始时间大于结束时间!',function(r){});
		return false;
	}
	
	
	var task_target;
	if(chooseTargetDevicesId != "")
	{
		task_target = getChooseTargetEquips(chooseTargetDevicesId);
		console.log(task_target);
	}
	
	if(flag == 8)
	{
		var commonServiceType = $("input[name=serviceType]:checked").next().html();
		switch(commonServiceType)
		{
			case "WEB":
				flag = 8;
				task_target = $("#CommonWEBChooseTargetDevices").val();
				break;
			case "FTP":
				flag = 9;
				task_target = $("#CommonFTPChooseTargetDevices").val();
				break;
			case "DNS":
				flag = 10;
				task_target = $("#CommonDNSChooseTargetDevices").val();
				break;
			case "EMAIL":
				flag = 11;
				task_target = $("#CommonEMAILChooseTargetDevices").val();
				break;
			default:
				break;
		}
	}
  
  var policypara = "", filterJsonObj = {}, policy = {};
  var filterJson;
  filterJsonObj["task_num"] = jsonobj["task_num"];
  if(flag == 5 || flag == 6)//链路性能或者链路变化
  {
	  var policypara = getPathPolicypara(jsonobj,flag);//得到链路性能或者链路变化的策略
	  filterJsonObj["task_type"] = jsonobj["task_type"];
	  filterJsonObj["task_subject"] = jsonobj["task_subject"];
	  filterJsonObj["task_name"] = jsonobj["task_name"][0];//有待优化
	  //filterJsonObj["task_target"] = null;
	  filterJsonObj["policy_para"] = policypara;
	  filterJsonObj["is_cycle"] = jsonobj["is_cycle"];
 	
	  if(filterJsonObj["is_cycle"] ==1){
		  filterJsonObj["task_interval"] = jsonobj["task_interval"];
	  }
 	
	  filterJsonObj["interval_unit"] = jsonobj["interval_unit"];
	  filterJsonObj["send_ip"] = jsonobj["send_ip"];
	  filterJsonObj["policy_name"] = "策略";
	 	
  }
  else
  {
	  var choosePolicyName = $("#strategy" + flag).combobox("getValue");//得到策略的名称
	  console.log("选中的策略的名称:" + choosePolicyName);
      //根据策略的名称得到策略信息
      $.ajax(
      {
      	type: "POST",
      	data: {"choosePolicyName": choosePolicyName},
      	url: "getPolicyParaByPolicyName.html",
      	async: false,							//设置为同步
      	success: function(data)
      	{
      		console.log("保存任务时，得到策略的参数信息成功!");
      		policy = data.policy;
      		policypara = policy.policy_para;
            filterJsonObj["policy_name"] = policy.policy_name;
            
            jsonobj['task_target'] = task_target;
            jsonobj['policy_para'] =  policypara;
      	 	
      	 	//对jsonobj的内容进行过滤
            filterJsonObj["task_type"] = jsonobj["task_type"];
            filterJsonObj["task_subject"] = jsonobj["task_subject"];
            filterJsonObj["task_name"] = jsonobj["task_name"];
            filterJsonObj["task_target"] = jsonobj["task_target"];
            filterJsonObj["policy_para"] = jsonobj["policy_para"];
            filterJsonObj["is_cycle"] = jsonobj["is_cycle"];
       	
            if(filterJsonObj["is_cycle"] ==1){
          	  filterJsonObj["task_interval"] = jsonobj["task_interval"];
            }
            filterJsonObj["interval_unit"] = jsonobj["interval_unit"];
            filterJsonObj["send_ip"] = jsonobj["send_ip"];
      	},
      	error: function()
      	{
      		console.log("保存任务时，得到策略的参数信息失败!");
      	}
      });	 	
  }
	
  if(isActive == 1 || isActive == 2) //激活任务
  {
		var currentDate = new Date();
		console.log("激活任务的时间:" + currentDate);
		filterJsonObj["start_time"] = currentDate;
		filterJsonObj["task_stat"] = isActive;
  }
	
	filterJson = JSON.stringify(filterJsonObj);
	console.log("保存的任务的信息:" + filterJson);
	
	//采用异步的方式添加任务
	$.ajax( {   
	    type: 'POST',   
	    contentType: 'application/json',   
	    url: 'updateAjaxTask.html',   
	    data: filterJson,   
	    dataType: 'json',   
	    success: function(data) {
	    	$("#popUpWindow").dialog("close");
	    	$.messager.show({
	    		title: "消息提示",
	    		msg: "任务编辑保存完成！",
	    		timeout: 1000,
	    		showType: 'slide'
	    	});
	    },   
	    error : function(XMLHttpRequest, textStatus, errorThrown) {   
	     alert(XMLHttpRequest.status + ";" + XMLHttpRequest.readyState + ";" + textStatus + ";" + errorThrown);  
	   }   
  }); 
	
}





