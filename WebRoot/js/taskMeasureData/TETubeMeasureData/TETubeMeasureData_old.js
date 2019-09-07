
/**
 * TE隧道测量数据的js文件 by zxgm 2016-11-8
 * */
var m_taskTargetArrayForGraph=[];//全局变量存储目标设备的设备名
var m_taskNum;//全局变量存储当前选中任务号
var m_beginDate ,m_endDate;
var m_biMeasureRecords;//全局变量存储所有的测量数据
var m_selectValueString="";//全局变量存储所有选中的目标设备的字符串


var m_vpnteMeasureRecord;

/*文档加载完成-初始化表格列名*/
$(function(){
	var tasknum = $('#task_num').val();//取得任务号
	//列表与视图开关
	$("input:radio[name='showType']").click(function() {
   		if(this.value == 02)//曲线视图
   		{
        	$("#centerTableLayout").hide();
        	$("#centerGraphLayout").show();
        	//曲线图显示
        	loadDataByGraph();
   		}else{				//列表视图
     		$("#centerGraphLayout").hide();
     		$("#centerTableLayout").show();
   		}
	});
	
	//初始化表格列名
	$('#TETubeMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'test_TimeStr',title:'测量时间',width:200},    
	        {field:'maxDelay',title:'最大单向时延',width:100},    
	        {field:'avgDelay',title:'平均单向时延',width:100},
	        {field:'jitter',title:'单向时延抖动',width:100},
	        {field:'lossRate',title:'丢包(‰)', width:100},
	        {field:'bitrate',title:'比特率', width:100},
	        {field:'level',title:'质量', width:100}
	    ]]    
	});  
	
	m_beginDate = $("#start_testTime").datebox('getValue');
	m_endDate=$("#end_testTime").datebox('getValue')

});

/*TE测量数据左侧树形任务列表结构*/
$('#TETubeMeasureDataQueryTree').tree({
	url:'ajaxGetAllTasksByTaskType.html?taskType=4',
    onClick: function(node){
		m_taskNum = node.id;
		m_taskTargetArrayForGraph.length=0;
    	$.ajax({
    		url:"TETubeMeasureDataQueryByList.html",
    		type:"POST",
    		data:{"taskNum":node.id},
    		//dataType:"json",
    		success:function(data){
    			m_vpnteMeasureRecord = data.vpnteMeasureRecords;
    			var task = data.task;
    			setVPNTEValue(task);/*点击任务后设置相应任务的数值*/
    			//console.log(m_vpnteMeasureRecord);
    			$('#TETubeMeasureDataQueryTable').datagrid('loadData',m_vpnteMeasureRecord);/*点击任务后设置相应任务的测量数据(所有的数据)*/
    			
    			//setReportValue(m_vpnteMeasureRecord);//设置丢包率、往返时延、时延抖动的统计值
    			loadDataByGraph();
    			
    		},
    		error:function(){
    			console.log("加载双向时延列表式测量数据失败");
    		}
    	});
 	}
      
}); 

//用以存储当前是第几个被显示
var m_flag = 0;
//以图标形式显示数据
function loadDataByGraph(){
	console.log(m_vpnteMeasureRecord);//正常获取到全局变量的数据
	
	//默认为显示第一条数据
	$('#TEMeasureTestFrom').html(m_vpnteMeasureRecord[0].test_From);
	$('#TEMeasureTestTime').html(m_vpnteMeasureRecord[0].test_TimeStr);
	$('#TEMeasureTestTarget').html(m_vpnteMeasureRecord[0].test_Target);
	$('#TEMeasureFlowId').html(m_vpnteMeasureRecord[0].flowId);
	$('#TEMeasureMaxDelay').html(m_vpnteMeasureRecord[0].maxDelay);
	$('#TEMeasureAvgDelay').html(m_vpnteMeasureRecord[0].avgDelay);
	$('#TEMeasureJitter').html(m_vpnteMeasureRecord[0].jitter);
	$('#TEMeasureLossRate').html(m_vpnteMeasureRecord[0].lossRate);
	$('#TEMeasureLevel').html(m_vpnteMeasureRecord[0].level);
	
}
/*
 * 图标式显示下的相关函数
 * */
//返回第一条数据
function FirstTEMeasureData(){
	$('#TEMeasureTestFrom').html(m_vpnteMeasureRecord[0].test_From);
	$('#TEMeasureTestTime').html(m_vpnteMeasureRecord[0].test_TimeStr);
	$('#TEMeasureTestTarget').html(m_vpnteMeasureRecord[0].test_Target);
	$('#TEMeasureFlowId').html(m_vpnteMeasureRecord[0].flowId);
	$('#TEMeasureMaxDelay').html(m_vpnteMeasureRecord[0].maxDelay);
	$('#TEMeasureAvgDelay').html(m_vpnteMeasureRecord[0].avgDelay);
	$('#TEMeasureJitter').html(m_vpnteMeasureRecord[0].jitter);
	$('#TEMeasureLossRate').html(m_vpnteMeasureRecord[0].lossRate);
	$('#TEMeasureLevel').html(m_vpnteMeasureRecord[0].level);
}
//返回上一条数据
function PreviousTEMeasureData(){
	if(m_flag==0){
		alert("当前为第一个值！");
	}else{
		m_flag--;
		$('#TEMeasureTestFrom').html(m_vpnteMeasureRecord[m_flag].test_From);
		$('#TEMeasureTestTime').html(m_vpnteMeasureRecord[m_flag].test_TimeStr);
		$('#TEMeasureTestTarget').html(m_vpnteMeasureRecord[m_flag].test_Target);
		$('#TEMeasureFlowId').html(m_vpnteMeasureRecord[m_flag].flowId);
		$('#TEMeasureMaxDelay').html(m_vpnteMeasureRecord[m_flag].maxDelay);
		$('#TEMeasureAvgDelay').html(m_vpnteMeasureRecord[m_flag].avgDelay);
		$('#TEMeasureJitter').html(m_vpnteMeasureRecord[m_flag].jitter);
		$('#TEMeasureLossRate').html(m_vpnteMeasureRecord[m_flag].lossRate);
		$('#TEMeasureLevel').html(m_vpnteMeasureRecord[m_flag].level);
	}
}
//返回下一条数据
function NextTEMeasureData(){
	if(m_flag==(m_vpnteMeasureRecord.length-1)){
		alert("当前值为最后一个值！");
	}else{
		m_flag++;
		$('#TEMeasureTestFrom').html(m_vpnteMeasureRecord[m_flag].test_From);
		$('#TEMeasureTestTime').html(m_vpnteMeasureRecord[m_flag].test_TimeStr);
		$('#TEMeasureTestTarget').html(m_vpnteMeasureRecord[m_flag].test_Target);
		$('#TEMeasureFlowId').html(m_vpnteMeasureRecord[m_flag].flowId);
		$('#TEMeasureMaxDelay').html(m_vpnteMeasureRecord[m_flag].maxDelay);
		$('#TEMeasureAvgDelay').html(m_vpnteMeasureRecord[m_flag].avgDelay);
		$('#TEMeasureJitter').html(m_vpnteMeasureRecord[m_flag].jitter);
		$('#TEMeasureLossRate').html(m_vpnteMeasureRecord[m_flag].lossRate);
		$('#TEMeasureLevel').html(m_vpnteMeasureRecord[m_flag].level);
	}
}
//返回最后一条数据
function LastTEMeasureData(){
	console.log(m_vpnteMeasureRecord.length);
	m_flag = m_vpnteMeasureRecord.length-1;
	$('#TEMeasureTestFrom').html(m_vpnteMeasureRecord[m_flag].test_From);
	$('#TEMeasureTestTime').html(m_vpnteMeasureRecord[m_flag].test_TimeStr);
	$('#TEMeasureTestTarget').html(m_vpnteMeasureRecord[m_flag].test_Target);
	$('#TEMeasureFlowId').html(m_vpnteMeasureRecord[m_flag].flowId);
	$('#TEMeasureMaxDelay').html(m_vpnteMeasureRecord[m_flag].maxDelay);
	$('#TEMeasureAvgDelay').html(m_vpnteMeasureRecord[m_flag].avgDelay);
	$('#TEMeasureJitter').html(m_vpnteMeasureRecord[m_flag].jitter);
	$('#TEMeasureLossRate').html(m_vpnteMeasureRecord[m_flag].lossRate);
	$('#TEMeasureLevel').html(m_vpnteMeasureRecord[m_flag].level);
}



/*点击任务后设置相应任务的数值*/
function setVPNTEValue(task)
{
	$('#taskName').textbox('setValue',task.task_name);//设置任务名称
	$('#task_num').textbox('setValue', task.task_num);//设置任务号
	$('#task_subject').textbox('setValue', task.task_subject);//设置执行探针设备
	
}

/*TE测量数据选中起始时间和结束时间触发时间*/
function onSelectDateTime(d)
{
	dateValidator(this.id, d);//时间校验
	
	
	//根据条件得到满足条件的数据
	$.ajax({
		type:"POST",
		url:"satisfiedTETubeMeasureDataQueryByList.html",
		data:{"startTestTime":m_beginDate,"endTestTime":m_endDate,"taskNum":m_taskNum},
		success:function(data)
		{
			console.log(data);
			$('#TETubeMeasureDataQueryTable').datagrid('loadData',data);//加载双向时延测量数据
		},
		error:function()
		{
			console.log("查询条件失败");
		}
	});
	
	//更新测量数据
	
}

/*日期校验。结束时间大于起始时间*/
function dateValidator(id,d)
{
	var dateFlag = (id == "start_testTime");
	
	m_beginDate = dateFlag ? d : $("#start_testTime").datebox('getValue');	    /*得到起始日期*/
	m_endDate = dateFlag ? $("#end_testTime").datebox('getValue') : d;			    /*得到终止日期*/
	
	beginDate2 = new Date(m_beginDate);
	endDate2 = new Date(m_endDate);
	if(dateFlag && beginDate2 > endDate2){
	  $("#start_testTime").datebox('setValue', '').datebox("showPanel");
	}
	if(!dateFlag && beginDate2 > endDate2){
	  $("#end_testTime").datebox('setValue', '').datebox("showPanel");
	}
}

/*选中复选按钮全部复选框*/
/*var m_isAllChecked = true;//是否所有的被选中
function checkAll()
{
	//true:所有class属性为equipNameCheckbox的复选框全部勾选;false://所有class属性为equipNameCheckbox的复选框全部不勾选
	m_isAllChecked ? $('.equipNameCheckbox').prop("checked",true):$('.equipNameCheckbox').prop("checked",false);
	m_isAllChecked = !m_isAllChecked;
	
	$('#TETubeMeasureDataQueryTable').datagrid('loadData',m_biMeasureRecords);点击任务后设置相应任务的测量数据(所有的数据)
}*/

/*勾选目标设备的复选框*/
/*function getAllSelect()
{
	m_selectValueString = "";//清空
	if(!m_isAllChecked)
	{
		$('#checkAll').prop("checked",false);
	}
	
	var selectValue=[];//被选中的值
	var loadData = [];//满足条件的数据
	var loaddata =[];//满足条件的数据
		
	$('.equipNameCheckbox:checked').each(function(){
		selectValue.push($(this).val());
	});
	
	m_selectValueString = selectValue.join(";");//设置选中的目标设备的id字符串

	//如果没有选中的值
	if(selectValue.length == 0)
	{
		$('#TETubeMeasureDataQueryTable').datagrid('loadData',m_biMeasureRecords);点击任务后设置相应任务的测量数据(所有的数据)
		return;
	}
	
	//根据条件查询数据
	$.ajax({
		type:"POST",
		url:"satisfiedTETubeMeasureDataQueryByList.html",
		data:{"startTestTime":m_beginDate,"endTestTime":m_endDate,"taskNum":m_taskNum,"taskTargetIdString":m_selectValueString},
		success:function(data)
		{
			console.log(data);
			$('#TETubeMeasureDataQueryTable').datagrid('loadData',data);//加载数据
		},
		error:function()
		{
			
		}
		
	});

}*/
	


