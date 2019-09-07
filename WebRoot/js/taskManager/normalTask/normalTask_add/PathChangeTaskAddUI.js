/**
 * 普通方式显示链路变化测量任务创建界面
 */
 
 /**
  * 路由器及接口的树形结构
  */
 IDMark_A="_a";
 var setting={
	check:{enable:true},
	data:{simpleData:{enable:true}},
	view:{addDiyDom:addDiyDom},
	async:{
		enable:true,
		url:"getRouterAndInterface.html?equip_kind=路由器",
		autoParam:["id","name=n","level=lv"],
		otherParam:{"otherParam":"zTreeAsyncTest"},
		dataFilter:filter
	}
 };

/**
 * 加载json数据
 */
function filter(treeId, parentNode, childNodes)
{
	if(!childNodes) return null;
	for(var i=0,l=childNodes.length;i<l;i++)
	{
		childNodes[i].name = childNodes[i].name.replace(/\.n/g,'.');
	}
	
	return childNodes;
}

/**
 * 自定义树形结构
 */
function addDiyDom(treeId,treeNode)
{
	if(treeNode.pId == null) return;
	var aObj=$("#"+treeNode.tId+IDMark_A);
	var editStr='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接口扫描间隔:<span class="textbox" style="width: 125px;height:16px;">'+
				'<input id="diyInput'+treeNode.id+'" type="text" class="textbox-text validatebox-text" autocomplete="off" tabindex="" placeholder="" style="text-align: start; margin: 0px; padding-top: 0px; padding-bottom: 0px; height: 22px; line-height: 22px; width: 340px;">'+
				'<input type="hidden" class="textbox-value" name="task_name" value="10">'+
			'</span>(秒)';
	aObj.after(editStr);
}

$(document).ready(function(){
	$.fn.zTree.init($("#pathChangeTree"), setting);
});


var PathChangeTaskName="链路变化监测";

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
	//1.初始化链路性能监测任务UI
	initPathChangeTaskAddUI();
});

/**
 * 设置任务策略可编辑
 */
function setPolicyEditable()
{
	$("input[readonly=readonly]").textbox({"readonly":false});
}

/**
 * 保存任务
 */
function saveTask(isActive,taskNum)
{
	var jsonobj = $("#PathChangeForm").serializeObject();
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
	
	//3.处理任务内容
	var policypara="",filterJsonObj={},policy={},filterJson;
	var policypara = getPathPolicypara(jsonobj);//得到链路性能或者链路变化的策略  
	console.log(policypara);
	filterJsonObj["task_type"]=jsonobj["task_type"];
	filterJsonObj["task_subject"]=jsonobj["task_subject"];
	filterJsonObj["task_name"]=jsonobj["task_name"][0];//有待优化
	filterJsonObj["policy_para"]=policypara;
	filterJsonObj["is_cycle"]=jsonobj["is_cycle"];
	if(filterJsonObj["is_cycle"]==1)
		filterJsonObj["task_interval"]=jsonobj["task_interval"];
	filterJsonObj["interval_unit"]=jsonobj["interval_unit"];
	filterJsonObj["send_ip"]=jsonobj["send_ip"];
	filterJsonObj["policy_name"]="策略";
   
 	//4.判断是否激活任务
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
 * 初始化链路变化UI
 */
function initPathChangeTaskAddUI()
{
	//1.1设置缺省任务名
	$("#PathChangeTaskName").textbox("setValue", PathChangeTaskName+"任务"+new Date().toLocaleString());
	
	//1.2任务主体的数据初始化
	$("#PathChangeTask_subject").combobox(
	{
		url:'get_AjaxTanzhenEquip.html',
		valueField:'value',
		textField:'text',
		onLoadSuccess:function()
		{
			var data = $("#PathChangeTask_subject").combobox('getData');
			$("#PathChangeTask_subject").combobox('select', data[0].value);
		},
		error:function()
		{
			alert("任务主体数据初始化失败");
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
				//往nspms_RoundShowRouterAndInterface表中写入数据,方便回显数据
			  $.ajax({
				  type:"POST",
				  url:"addRoundShowRouterAndInterface.html",
				  data:{"taskNum":data.taskNum,"interfaceIdList":interfaceNodeIdsCopy.join(";")},
				  success:function(data)
				  {
					  console.log("插入数据成功");
				  },
				  error:function()
				  {
					  console.log("插入数据失败");
				  }
			  });
	          window.location.href="taskAddUI.html";     
	      },   
	      error : function(XMLHttpRequest, textStatus, errorThrown) {   
	       alert(XMLHttpRequest.status+";"+XMLHttpRequest.readyState+";"+textStatus+";"+errorThrown);  
	     }   
	    });
}

var interfaceNodeIdsCopy=[];

/**
 * 返回链路性能的路由器接口策略参数
 */
function getPathPolicypara(jsonobj)
{
	var deviceNodeIds=[],interfaceNodeIds=[],equipList=[],policypara="";
	var treeObj = $.fn.zTree.getZTreeObj("pathChangeTree");
	var nodes = treeObj.getCheckedNodes(true);
	for(var index in nodes)
	{
		var node = nodes[index];
		console.log(node);
		if(node.pId == null)//设备节点
		{
			deviceNodeIds.push(node.id);
		}else//接口节点
		{
			interfaceNodeIds.push(node.id);
		}
	}
	
	interfaceNodeIdsCopy = interfaceNodeIds;
	
	//ajax获取设备信息
	$.ajax({
		type:"POST",
		data:{"deviceNodeIds":deviceNodeIds.join(";"),"interfaceNodeIds":interfaceNodeIds.join(";")},
		url:"getEquipsByEquipId.html",
		async:false,
		success:function(data)
		{
			equipList = data;
		},
		error:function()
		{
			
		}
	});
	
	var deviceCount = equipList.length;//设备个数
	
	if(jsonobj.is_timeController == 1)
	{
		policypara = policypara+"[TASK]\r\nLINK_BAND_JITTER=" +jsonobj.LINK_BAND_JITTER
    			+"\r\nLINK_LOSS_LIMIT="+jsonobj.LINK_LOSS_LIMIT
    			+"\r\nTestTimeSection="+jsonobj.s_start_time+"-"+jsonobj.e_end_time+
    		"\r\nDEVICE_COUNT="+deviceCount+"\r\n";
	}else{
		policypara = policypara+"[TASK]\r\nLINK_BAND_JITTER=" +jsonobj.LINK_BAND_JITTER
    			+"\r\nLINK_LOSS_LIMIT="+jsonobj.LINK_LOSS_LIMIT
    			+"\r\nTestTimeSection="+" "+"\r\nDEVICE_COUNT="+deviceCount+"\r\n";
	}
	
	for(var deviceIndex in equipList)//遍历设备列表
	{
		var equip = equipList[deviceIndex];
		var equipInteCount = equipList[deviceIndex].equipInteList.length;//设备的接口数
		
		policypara = policypara+"[DEVICE"+deviceIndex+"]\r\n"+"EQUIP_ID="+equip.equipId
			+"\r\nMANAGE_IP="+equip.manageIp+"\r\nSNMP_PORT="+equip.snmpPort+"\r\nSNMP_VERSION="+
			equip.snmpVersion+"\r\nSNMP_RCOMMUNITY="+equip.snmpRcommunity+"\r\nSNMP_RETRY="+equip.snmpRetry
			+"\r\nSNMP_TIMEOUT="+equip.snmpTimeout+"\r\nSNMP_V3_SECURITYNAME="+equip.snmpV3SecurityName
			+"\r\nSNMP_V3_SECURITYLEVEL="+equip.snmpV3SecurityLevel+"\r\nSNMP_V3_SECURITYMODEL="+equip.snmpV3SecurityModel
			+"\r\nSNMP_V3_CONTEXTNAME="+equip.snmpV3ContextName+"\r\nSNMP_V3_CONTEXTENGONEID="+equip.snmpV3ContextEngoneId
			+"\r\nSNMP_V3_AUTHPROTOCOL="+equip.snmpV3AuthProtocol+"\r\nSNMP_V3_AUTHPASSWORD="+equip.snmpV3AuthPassword
			+"\r\nSNMP_V3_PRIVPROTOCOL="+equip.snmpV3PrivProtocol+"\r\nSNMP_V3_PRIVPASSWORD="+equip.snmpV3PrivPassword
			+"\r\nINTERFACE_COUNT="+equipInteCount+"\r\n";
		
		var equipInteList = equipList[deviceIndex].equipInteList;
		for(var equipInteIndex in equipInteList)
		{
			var equipInte = equipInteList[equipInteIndex];
			policypara = policypara+"[DEVICE"+deviceIndex+"_INTERFACE"+equipInteIndex+"]\r\nINTEID="+equipInte.equipInteUnionKey.inteId
			+"\r\nINTETRAFFIC="+equipInte.inteTraffic+"\r\nMEASURETIME="+$('#diyInput'+equipInte.equipInteUnionKey.inteId).val()+"\r\nINTRAFFIC="+equipInte.inTraffic
			+"\r\nOUTTRAFFIC="+equipInte.outTraffic+"\r\nINLOSSRATE="+equipInte.inLossRate+"\r\nOUTLOSSRATE="+equipInte.outLossRate
			+"\r\n";
		}
	}
	
	console.log("链路变化策略参数:"+policypara);
	return policypara;
}