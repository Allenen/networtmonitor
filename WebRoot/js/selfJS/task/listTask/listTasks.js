
/**
 * 列表式任务管理的主要功能
 * */
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

//设置任务div的隐藏或者显示
setHiddenOrShowForTaskDiv = function(rec)
{
	var index = rec.id-1;
	for(var idx in divIdList)
	{
		if((idx) != index)
		{
			$(divIdList[idx]).hide();
		}
	}
	
	$(divIdList[index]).show();
};

//初始化任务div
initTaskDiv = function(rec)
{
	var index = rec.id-1;
	$(divNameList[index]).textbox("setValue", rec.text+new Date().toLocaleString());
	
	//任务主体的combox数据初始化
	$(task_subject[index]).combobox(
	{
		url:'get_AjaxTanzhenEquip.html',
		valueField:'text',
		textField:'text',
		onLoadSuccess:function()
		{
			var data = $(task_subject[index]).combobox('getData');
			console.log("任务主体的数据:"+data);
			$(task_subject[index]).combobox('select', data[0].text);
		},
		error:function()
		{
			alert("获取失败");
		}
	});
};



//通用业务性能测量业务类型改变触发事件
commonServiceTypeChangeTrigger = function()
{
	//通用业务性能测量，业务类型改变
	$("input[name=serviceType]").change(function()
	{
		var checkServiceTypeValue = $("input[name=serviceType]:checked").next().html();
		switch(checkServiceTypeValue)
		{
			case "WEB":		//业务类型为WEB业务
				$("#FTPDiv").hide();
				$("#DNSDiv").hide();
				$("#EMAILDiv").hide();
				$("#WEBDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-WEB测量任务"+new Date().toLocaleString());
				break;
			case "FTP":		//业务类型为FTP业务
				$("#WEBDiv").hide();
				$("#DNSDiv").hide();
				$("#EMAILDiv").hide();
				$("#FTPDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-FTP测量任务"+new Date().toLocaleString());
				break;
			case "DNS":		//业务类型为DNS业务
				$("#FTPDiv").hide();
				$("#WEBDiv").hide();
				$("#EMAILDiv").hide();
				$("#DNSDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-DNS测量任务"+new Date().toLocaleString());
				break;
			case "EMAIL":	//业务类型为EMAIL业务
				$("#FTPDiv").hide();
				$("#DNSDiv").hide();
				$("#WEBDiv").hide();
				$("#EMAILDiv").show();
				$("#commonServiceTaskName").textbox("setValue", "通用业务-EMAIL测量任务"+new Date().toLocaleString());
				break;
			default:
				break;
		}
	});
};

//文档加载完成触发
$(function(){
	
	/*用于选中任务的下拉列表的数据初始化*/
$('#taskType').combobox(
{
	url:'getDictsForComboxByDict_type.html?dict_type=RWLB',
	valueField:'id',
	textField:'text',
	onSelect: function(rec)
	{
		console.log("进入设置任务div的隐藏或者显示的方法");
		setHiddenOrShowForTaskDiv(rec); 
		console.log("离开设置任务div的隐藏或者显示的方法");
		
		console.log("进入初始化任务div的方法");
		initTaskDiv(rec);
		console.log("离开初始化任务div的方法");
		
		console.log("进入初始化任务策略的方法");
		initTaskStrategy(rec);
		console.log("离开初始化任务策略的方法");
		
		if(rec.id==5 || rec.id==6)//链路性能或者链路变化
		{
			initRouterAndInterface(rec.id-5);
		}
	}
});

console.log("进入多媒体策略改变触发事件");
multiMediaStrategyChangeTrigger();
console.log("离开多媒体策略改变触发事件");

console.log("进入通用业务性能测量业务类型改变触发事件");
commonServiceTypeChangeTrigger();
console.log("离开通用业务性能测量业务类型改变触发事件");
	
});

	var i=0;
	//增加流记录
function addFlowRecord()
{
	console.log("增加流记录");
	i++;
	var content = '<div id="flowRecord'+i+'"><br/><hr/><table style="margin-top:10px;"><thead>流记录'+i+'</thead>'+
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
			console.log("sendInterval");
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
			console.log("group");
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

//删除指定的流记录
function deleteFlowRecord(id)
{
	var flowRecordObj = $("#flowRecord"+id);
	$(flowRecordObj).remove();
}


//发包间隔选项的改变
$("select[name=time_type]").change(function(){
	
});

//将一个表单的数据返回成JSON对象   
   $.fn.serializeObject = function() {   
		  var o = {};   
		  var a = this.serializeArray();   
		  $.each(a, function() {   
		    if (o[this.name]) {   
		      if (!o[this.name].push) {   
		        o[this.name] = [ o[this.name] ];   
		      }   
		      o[this.name].push(this.value || '');   
		    } else {   
		      o[this.name] = this.value || '';   
		    }   
		  });   
		  return o;   
 }; 
 
//保存任务(保存的任务类型,保存的任务的目标设备id,是否激活)
function saveTask(flag, chooseTargetDevicesId, isActive, taskNum){
	if(taskNum != null)//保存编辑的任务
	{
		console.log("保存编辑的任务的任务编号:"+taskNum);
		//1.删除已有的任务
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
	var jsonobj = $(formIdList[flag-1]).serializeObject();
	console.log(jsonobj);
	//校验时间
	if(jsonobj.e_end_time<jsonobj.s_start_time){
		alert("开始时间大于结束时间！");
		return false;
	}
	
	
	var task_target;
	if(chooseTargetDevicesId != "")
	{
		task_target = getChooseTargetEquips(chooseTargetDevicesId);
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
    
    var policypara = "", filterJsonObj={}, policy={};
    var filterJson;
    
    if(flag == 5 || flag == 6)//链路性能或者链路变化
    {
    	var policypara = getPathPolicypara(jsonobj,flag);//得到链路性能或者链路变化的策略
    	
    	filterJsonObj["task_type"]=jsonobj["task_type"];
	 	filterJsonObj["task_subject"]=jsonobj["task_subject"];
	 	filterJsonObj["task_name"]=jsonobj["task_name"][0];//有待优化
	 	//filterJsonObj["task_target"]=null;
	 	filterJsonObj["policy_para"]=policypara;
	 	filterJsonObj["is_cycle"]=jsonobj["is_cycle"];
	 	
	 	if(filterJsonObj["is_cycle"]==1){
	 		filterJsonObj["task_interval"]=jsonobj["task_interval"];
	 	}
	 	
	 	filterJsonObj["interval_unit"]=jsonobj["interval_unit"];
	 	filterJsonObj["send_ip"]=jsonobj["send_ip"];
	 	filterJsonObj["policy_name"]="策略";
	 	
    }else
    {
    	var choosePolicyName = $("#strategy"+flag).combobox("getValue");//得到策略的名称
    	console.log("选中的策略的名称:"+choosePolicyName);
    	//根据策略的名称得到策略信息
        $.ajax(
        {
        	type:"POST",
        	data:{"choosePolicyName":choosePolicyName},
        	url:"getPolicyparaByPolicyName.html",
        	async:false,							//设置为同步
        	success:function(data)
        	{
        		console.log("保存任务时，得到策略的参数信息成功!");
        		policy = data.policy;
        	},
        	error:function()
        	{
        		console.log("保存任务时，得到策略的参数信息失败!");
        	}
        });
        
        policypara = policy.policy_para;
        filterJsonObj["policy_name"]=policy.policy_name;
        
        jsonobj['task_target']=task_target;
	 	jsonobj['policy_para']= policypara;
	 	
	 	//对jsonobj的内容进行过滤
	 	filterJsonObj["task_type"]=jsonobj["task_type"];
	 	filterJsonObj["task_subject"]=jsonobj["task_subject"];
	 	filterJsonObj["task_name"]=jsonobj["task_name"];
	 	filterJsonObj["task_target"]=jsonobj["task_target"];
	 	filterJsonObj["policy_para"]=jsonobj["policy_para"];
	 	filterJsonObj["is_cycle"]=jsonobj["is_cycle"];
	 	
	 	if(filterJsonObj["is_cycle"]==1){
	 		filterJsonObj["task_interval"]=jsonobj["task_interval"];
	 	}
	 	filterJsonObj["interval_unit"]=jsonobj["interval_unit"];
	 	filterJsonObj["send_ip"]=jsonobj["send_ip"];
	 	
    }
 	
    if(isActive == 1)//激活任务
 	{
 		var currentDate = new Date();
 		console.log("激活任务的时间:"+currentDate);
 		filterJsonObj["start_time"] = currentDate;
 		filterJsonObj["task_stat"] = 1;
 	}
 	
 	filterJson = JSON.stringify(filterJsonObj);
 	console.log("保存的任务的信息:"+filterJson);
 	
 	//采用异步的方式添加任务
 	$.ajax( {   
      type : 'POST',   
      contentType : 'application/json',   
      url : 'addAjaxTask.html',   
      data : filterJson,   
      dataType : 'json',   
      success : function(data) {   
          if(data.message == "5" || data.message == "6")
          {
        	  console.log("被选中的路由器的接口的id:"+interfaceNodeIdsCopy.join(";"));
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
          }
          window.location.href="listTasks.html";     
      },   
      error : function(XMLHttpRequest, textStatus, errorThrown) {   
       alert(XMLHttpRequest.status+";"+XMLHttpRequest.readyState+";"+textStatus+";"+errorThrown);  
     }   
    }); 
 	
}

/*//任务列表中的操作
editlist = function(value,row,index)
{
	console.log("选中的任务:"+$.toJSON(row));
   var task_num = row.task_num;
   var task_name = row.task_name;
   var task_stat = row.task_stat;
   
   var task_type_num = row.task_type_num;
   
   var editContent = '<a href="#" onclick="editTask(\''+task_num+'\',\''+task_type_num+'\')">'+
   						'<i class="icon-edit" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
   					 '</a>'+
     				 '<a href="#" onclick ="activeTask(\''+task_num+'\',\''+task_stat+'\')">'+
     					'<i class="icon-ok" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
     				 '</a>'+
     				 '<a href="#" onclick="measureDataInfo('+task_num+')">'+
     					'<i class="icon-search" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin:3px;"></i>'+
     				 '</a>';
   
   return editContent;
}*/
    
   /* //批量激活任务
activeSelectTasks = function()
{
	var taskNumList="";
	var selectRows = $('#taskList').datagrid("getSelections");
	console.log("选中的行:"+selectRows);
	
	for(var index in selectRows)
	{
		var row = selectRows[index];		//选中的行
		if(row.task_stat != "未激活")
		{
			$.messager.alert('提示','存在已激活的任务');
			return;
		}
		
		console.log("选中的任务号:"+selectRows[index].task_num);
		taskNumList = taskNumList+row.task_num+";";
	}
	
	activeTask(taskNumList, "未激活");
}

//激活任务
activeTask = function(tasknum, taskstat)
{
     if(taskstat!='未激活')
     {
    	 $.messager.alert('提示','任务已激活,不能再次激活');
     }else
     {
         $('#dd').dialog(
         {  
	         title: '激活任务',    
	         width: 300,
	         height: 150,    
	         closed: false,
	         cache: false,   
	         href: 'activeTaskUI.html?tasknum='+tasknum+';',   
	         modal: true
         });
     }
}*/
    
   