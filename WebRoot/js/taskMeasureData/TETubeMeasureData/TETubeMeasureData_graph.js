
/**
 * TE隧道测量数据的js文件 by zxgm 2016-11-8
 * */
 
 var m_index = 0,m_vpnteMeasureRecord = undefined;//用于记录当前显示条数的下标
 /**
  * 显示TE隧道测量数据的图标式表现形式
  */
 function loadView_graph()
 {
	 var TestTime = $("#TestTime").datetimebox("getValue");
	 console.log(TestTime);
	 $.ajax({
		url:"satisfiedTETubeMeasureDataQueryByList.html",
		type:"POST",
		data:{"taskNum":m_taskNum,"startTestTime":TestTime,"endTestTime":null},
		success:function(data)
		{
			m_vpnteMeasureRecord = data;
			 //1. 显示第一条数据记录
			 if(m_vpnteMeasureRecord != null && m_vpnteMeasureRecord.length != 0)
			 {
				 showRecord(0);
				 m_index = 0;	
			 }
			
		},
		error:function()
		{
			console.log("没有符合条件的结果数据");
		}
	});		
 }
 
 /**
  * 选中日期
  */
function onSelectDate(testTime)
{
	var TestTime = $("#TestTime").datetimebox("getValue");

	 $.ajax({
		url:"satisfiedTETubeMeasureDataQueryByList.html",
		type:"POST",
		data:{"taskNum":m_taskNum,"startTestTime":TestTime,"endTestTime":""},
		success:function(data)
		{
			m_vpnteMeasureRecord = data;
			 //1. 显示第一条数据记录
			 if(m_vpnteMeasureRecord != null && m_vpnteMeasureRecord.length != 0)
			 {
				 showRecord(0);
				 m_index = 0;	
			 }
			
		},
		error:function()
		{
			console.log("没有符合条件的结果数据");
		}
	});		
}

/**
 * 首条
 */
function FirstTEMeasureData()
{
	showRecord(0);
	m_index = 0;
	$('#pageNum').html(1);
}

/**
 * 前一条
 */
function PreviousTEMeasureData()
{
	if(m_index !=0 )
	{
		showRecord(--m_index);
	}
}

/**
 * 后一条
 */
function NextTEMeasureData()
{
	if(m_index != (m_vpnteMeasureRecord.length-1))
	{
		showRecord(++m_index);
	}
}

/**
 * 末条
 */
function LastTEMeasureData()
{
	showRecord(m_vpnteMeasureRecord.length-1);
	m_index = m_vpnteMeasureRecord.length-1;
	$('#pageNum').html(m_vpnteMeasureRecord.length);
}

/**
 * 设置显示为第i条数据
 */
function showRecord(i)
{
	$('#TEMeasureTestFrom').html(m_vpnteMeasureRecord[i].testFrom);
	var d = new Date(m_vpnteMeasureRecord[i].testTime);
	var dateString = d.toLocaleDateString()+" "+d.toTimeString().substring(0,8);
	$('#TEMeasureTestTime').html(dateString);
	$('#TEMeasureTestTarget').html(m_vpnteMeasureRecord[i].testTarget);
	$('#TEMeasureFlowId').html(m_vpnteMeasureRecord[i].flowId);
	$('#TEMeasureMaxDelay').html(m_vpnteMeasureRecord[i].maxDelay);
	$('#TEMeasureAvgDelay').html(m_vpnteMeasureRecord[i].avgDelay);
	$('#TEMeasureJitter').html(m_vpnteMeasureRecord[i].jitter);
	$('#TEMeasureLossRate').html(m_vpnteMeasureRecord[i].lossRate);
	$('#TEMeasureLevel').html(m_vpnteMeasureRecord[i].level);
	$('#pageNum').html(m_index+1);
}

	


