
	/**
 * 路由器及接口的js文件
 * */

var routerAndInterfaceTrees = ["#pathPerformanceTree", "#pathChangeTree", "#editPathPerformanceTree", "#editPathChangeTree"];
var interfaceNodeIdsCopy=[];
/*得到链路性能或者链路变化的策略*/
 getPathPolicypara = function(jsonobj,flag)
 {
	var nodes = $(routerAndInterfaceTrees[flag-5]).tree('getChecked');
	var deviceNodeIds=[], interfaceNodeIds=[], policypara="";
	for(var index in nodes)
	{
		if(nodes[index].children != null)//设备节点
		{
			deviceNodeIds.push(nodes[index].id);
		}else							//接口节点
		{
			interfaceNodeIds.push(nodes[index].id);
		}
	}
	
	interfaceNodeIdsCopy = interfaceNodeIds;
	console.log("routerAndInterface:"+interfaceNodeIdsCopy.join(";"));
	var equipList = [];
	
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
	
	if(flag == 5)
	{	
		console.log(jsonobj.TestTimeSection);
		if(jsonobj.TestTimeSection==1){
			policypara = policypara+"[TASK]\r\nTestTimeSection="+jsonobj.s_start_time+"-"+jsonobj.e_end_time+"\r\nDEVICE_COUNT="+deviceCount+"\r\n";
		}else{
			policypara = policypara+"[TASK]\r\nTestTimeSection="+" "+"\r\nDEVICE_COUNT="+deviceCount+"\r\n";
		}
		
	}else
	{
		policypara = policypara+"[TASK]\r\nLINK_BAND_JITTER=" +jsonobj.LINK_BAND_JITTER
			+"\r\nLINK_LOSS_LIMIT="+jsonobj.LINK_LOSS_LIMIT
			+"\r\nTestTimeSection="+jsonobj.s_start_time+"-"+jsonobj.e_end_time+
		"\r\nDEVICE_COUNT="+deviceCount+"\r\n";
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
			policypara = policypara+"[DEVICE"+deviceIndex+"_INTERFACE"+equipInteIndex+"]\r\nINTEID="+equipInte.inteId
			+"\r\nINTETRAFFIC="+equipInte.inteTraffic+"\r\nMEASURETIME="+equipInte.measureTime+"\r\nINTRAFFIC="+equipInte.inTraffic
			+"\r\nOUTTRAFFIC="+equipInte.outTraffic+"\r\nINLOSSRATE="+equipInte.inLossRate+"\r\nOUTLOSSRATE="+equipInte.outLossRate
			+"\r\n";
		}
	}
	
	console.log("链路性能策略参数:"+policypara);
	return policypara;
 };

/*初始化路由器及接口数据,列出所有的路由器及接口*/
function initRouterAndInterface(flag)
{
	$(routerAndInterfaceTrees[flag]).tree({
		method:'get',
		animate:true,
		checkbox:true,
		lines:true,
		url:'getRouterAndInterface.html?equip_kind=路由器',
		formatter:function(node){
		var s = node.text;
		if(node.children)
		{
			var content = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接口扫描间隔:<span class="textbox" style="width: 125px;height:16px;">'+
			'<input id="_easyui_textbox_input40" type="text" class="textbox-text validatebox-text" autocomplete="off" tabindex="" placeholder="" style="text-align: start; margin: 0px; padding-top: 0px; padding-bottom: 0px; height: 22px; line-height: 22px; width: 340px;">'+
			'<input type="hidden" class="textbox-value" name="task_name" value="10">'+
		'</span>(秒)';
			s += content;
		}
		
		return s;
	}
	});
}

/*列表式路由器及接口回显*/
function roundShowRouterAndInterface(flag, taskNum)//任务号
{
	$(routerAndInterfaceTrees[flag]).tree({
		method: "GET",
		animate: true,
		checkbox: true,
		lines: true,
		url: "getRoundShowRouterAndInterface.html?equip_kind=路由器&taskNum="+taskNum,
		formatter: function(node){
			var s = node.text;
			if(node.children)
    		{
    			var content = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接口扫描间隔：<span class="textbox" style="width: 125px;height:16px;">'+
    			'<input id="_easyui_textbox_input40" type="text" class="textbox-text validatebox-text" autocomplete="off" tabindex="" placeholder="" style="text-align: start; margin: 0px; padding-top: 0px; padding-bottom: 0px; height: 22px; line-height: 22px; width: 340px;">'+
    			'<input type="hidden" class="textbox-value" name="task_name" value="10">'+
    			'</span>(秒)';
    			s += content;
    		}
    		
    		return s;
		}
	});
}
	
	
