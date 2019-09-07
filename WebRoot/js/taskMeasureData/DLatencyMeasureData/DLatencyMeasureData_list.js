/** 与双向时延任务的列表相关的javascript文件 */

/**
 * 文档加载完成后触发
 */
$(function(){
	
	//1. 起始时间和结束时间默认初始化(起始时间小于结束时间一天)
	$("#start_testTime").datetimebox("setValue",initDateTimeBox(new Date(),0));
	$("#end_testTime").datetimebox("setValue",initDateTimeBox(new Date(),1));
	
	//2. 双向时延测量表格的格式初始化
	$('#DLatencyMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'testTimeString',title:'测量时间',width:'30%'},    
	        {field:'testTargetName',title:'目标名',width:'15%'},    
	        {field:'testTarget',title:'目标IP',width:'15%'},
	        {field:'avgDelay',title:'平均时延(毫秒)',width:'15%'},
	        {field:'delayJitter',title:'时延抖动(毫秒)', width:'15%'},
	        {field:'pktLoss',title:'丢包率(%)', width:'15%'}
	    ]]    
	});
});

/**
 * 选择按钮后，显示符合条件的双向时延测量数据
 */
function showSatisfiedDLatencyMeasureData()
{
	//1. 得到选中的任务号
	var taskNum = m_taskNum;
	
	//2. 得到选中的目标设备标识
	var checkedEquipNameDom = $(".equipNameCheckbox:checked");
	var checkedEquipIds = [];	//选中的目标设备标识
	for(var i = 0;i < checkedEquipNameDom.length;i++)
		checkedEquipIds.push(checkedEquipNameDom[i].value);
	
	//3. 得到起始时间和结束时间
	var startTestTime = $("#start_testTime").datetimebox("getValue"),endTestTime = $("#end_testTime").datetimebox("getValue");
	
	//4. 得到符合条件的双向时延测量数据
	//var biMeasureRecords = undefined;
	$.ajax({
		url:"satisfiedDLatencyMeasureDataQueryByList.html",
		type:"POST",
		data:{"taskNum":taskNum,"taskTargetIdString":checkedEquipIds.join(";"),
			"startTestTime":startTestTime,"endTestTime":endTestTime},
		success:function(data)
		{
			m_biMeasureRecords = data;
			$('#DLatencyMeasureDataQueryTable').datagrid('loadData',data);//加载双向时延测量数据
			if(m_biMeasureRecords != null)
				setReportValue(m_biMeasureRecords);//5. 设置丢包率、往返时延和时延抖动的值
		},
		error:function()
		{
			console.log("没有符合条件的结果数据");
		}
	});
}

/*选中复选按钮全部复选框*/
var m_isAllChecked = false;//全部复选框未被选中
function checkAll()
{
	//true:所有class属性为equipNameCheckbox的复选框全部勾选;false://所有class属性为equipNameCheckbox的复选框全部不勾选
	!m_isAllChecked ? $('.equipNameCheckbox').prop("checked",true):$('.equipNameCheckbox').prop("checked",false);
	m_isAllChecked = !m_isAllChecked;
	
	$('#DLatencyMeasureDataQueryTable').datagrid('loadData',m_biMeasureRecords);/*点击任务后设置相应任务的测量数据(所有的数据)*/
}

/**
 * 勾选目标设备的复选框
 */
function getAllSelect()
{
	var checkedItemLength = $(".equipNameCheckbox:checked").length;
	var itemLength = $(".equipNameCheckbox").length;
	if(checkedItemLength == itemLength)
	{
		$("#checkAll").prop("checked",true);
		m_isAllChecked = true;
	}else
	{
		$("#checkAll").prop("checked",false);
		m_isAllChecked = false;
	}

	showSatisfiedDLatencyMeasureData();
}

/*丢包率:平均丢包率avgPktLoss 最大丢包率 maxPktLoss 最小丢包率 minPktLoss
 * 往返时延:平均往返时延avgDelay 最大往返时延 maxAvgDelay 最小往返时延 minAvgDelay
 * 时延抖动：平均时延抖动avgDelayJitter 最大时延抖动 maxDelayJitter 最小时延抖动 minDelayJitter
 * */
function setReportValue(biMeasureRecords)
{
	var totalAvgDelay=0, totalDelayJitter=0, totalPktLoss=0;//总平均时延， 总时延抖动， 总丢包率
	var maxAvgDelay, maxDelayJitter, maxPktLoss;
	var minAvgDelay, minDelayJitter, minPktLoss;
	var length = biMeasureRecords.length;
	if(biMeasureRecords.length != 0)//测量记录不为空
	{
		maxAvgDelay = biMeasureRecords[0].avgDelay;
		maxDelayJitter = biMeasureRecords[0].delayJitter;
		maxPktLoss = biMeasureRecords[0].pktLoss;
		
		minAvgDelay = maxAvgDelay;
		minDelayJitter = maxDelayJitter;
		minPktLoss = maxPktLoss;
		
		for(var i=0;i<biMeasureRecords.length;i++)
		{
			var avgDelay = biMeasureRecords[i].avgDelay;
			var delayJitter = biMeasureRecords[i].delayJitter;
			var pktLoss = biMeasureRecords[i].pktLoss;
			if(maxAvgDelay < avgDelay)
			{
				maxAvgDelay = avgDelay;
			}
			if(maxDelayJitter < delayJitter)
			{
				maxDelayJitter = delayJitter;
			}
			if(maxPktLoss < pktLoss)
			{
				maxPktLoss = pktLoss
			}
			
			if(minAvgDelay > avgDelay)
			{
				minAvgDelay = avgDelay;
			}
			if(minDelayJitter > delayJitter)
			{
				minDelayJitter = delayJitter;
			}
			if(minPktLoss > pktLoss)
			{
				minPktLoss = pktLoss;
			}
			totalAvgDelay = totalAvgDelay+avgDelay;
			totalDelayJitter = totalDelayJitter+delayJitter;
			totalPktLoss = totalPktLoss+pktLoss;
		}
		
		$("#avgPktLoss_list").text(totalPktLoss/length);
		$("#avgDelay_list").text(totalAvgDelay/length);
		$("#avgDelayJitter_list").text(totalDelayJitter/length);
		
		$("#maxPktLoss_list").text(maxPktLoss);
		$("#minPktLoss_list").text(minPktLoss);
		$("#maxAvgDelay_list").text(maxAvgDelay);
		$("#minAvgDelay_list").text(minAvgDelay);
		$("#maxDelayJitter_list").text(maxDelayJitter);
		$("#minDelayJitter_list").text(minDelayJitter);
	}else//测量记录为空
	{
		$("#avgPktLoss_list").text(50);
		$("#avgDelay_list").text(50);
		$("#avgDelayJitter_list").text(50);
		
		$("#maxPktLoss_list").text(100);
		$("#minPktLoss_list").text(0);
		$("#maxAvgDelay_list").text(100);
		$("#minAvgDelay_list").text(0);
		$("#maxDelayJitter_list").text(100);
		$("#minDelayJitter_list").text(0);
	}
}

/**
 * 校验双向时延测量数据列表的日期
 */
function onSelectDateTime(selectedDate)
{
	dateValidator(this.id,selectedDate,"start_testTime","end_testTime");
}