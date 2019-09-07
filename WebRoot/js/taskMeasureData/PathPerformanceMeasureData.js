
/**
 * 双向时延测量数据的js文件 by zxgm 2016-10-31
 * */
var m_taskTargetArrayForGraph=[];//全局变量存储目标设备的设备名
var m_taskNum;//全局变量存储当前选中任务号
var m_beginDate ,m_endDate;
var m_pathPerformanceMeasureRecords;//全局变量存储所有的测量数据
var m_selectValueString="";//全局变量存储所有选中的目标设备的字符串

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
	$('#PathPerformanceMeasureDataQueryTable').datagrid({       
	    columns:[[    
	        {field:'testTimeString',title:'测量时间',width:200},    
	        {field:'equipName',title:'设备名称',width:100},    
	        {field:'inteId',title:'接口标识',width:100,align:'right'},
	        {field:'inteStatus',title:'接口状态',width:100},
	        {field:'inteTraffic',title:'标称带宽(Mbps)', width:100},
	        {field:'measureTime',title:'扫描间隔(秒)', width:100},
	        {field:'inTraffic',title:'入带宽利用率(%)', width:100},
	        {field:'outTraffic',title:'出带宽利用率(%)', width:100},
	        {field:'inLossRate',title:'入丢包率(%)', width:100},
	        {field:'outLossRate',title:'出丢包率(%)', width:100}
	    ]]    
	});  
	
	m_beginDate = $("#start_testTime").datebox('getValue');
	m_endDate=$("#end_testTime").datebox('getValue')

});

/*双向时延测量数据左侧树形任务列表结构*/
$('#PathPerformanceMeasureDataQueryTree').tree({
	url:'ajaxGetAllTasksByTaskType.html?taskType=5',
    onClick: function(node){
		m_taskNum = node.id;
		m_taskTargetArrayForGraph.length=0;
    	$.ajax({
    		url:"pathPerformanceMeasureDataQueryByList.html",
    		type:"POST",
    		data:{"taskNum":node.id},
    		dataType:"json",
    		success:function(data){
    			m_pathPerformanceMeasureRecords = data.pathPerformanceMeasureRecords;
    			var task = data.task;
    			setPathPerformanceValue(task);/*点击任务后设置相应任务的数值*/
    			
    			$('#PathPerformanceMeasureDataQueryTable').datagrid('loadData',m_pathPerformanceMeasureRecords);/*点击任务后设置相应任务的测量数据(所有的数据)*/
    			
    			setReportValue(m_pathPerformanceMeasureRecords);//设置丢包率、往返时延、时延抖动的统计值
    			//loadDataByGraph();
    			
    		},
    		error:function(){
    			console.log("加载链路性能测量数据失败");
    		}
    	});
 	}
      
}); 

//设置丢包率、往返时延、时延抖动的统计值
/*丢包率:平均丢包率avgPktLoss 最大丢包率 maxPktLoss 最小丢包率 minPktLoss
 * 往返时延:平均往返时延avgDelay 最大往返时延 maxAvgDelay 最小往返时延 minAvgDelay
 * 时延抖动：平均时延抖动avgDelayJitter 最大时延抖动 maxDelayJitter 最小时延抖动 minDelayJitter
 * */
function setReportValue(pathPerformanceMeasureRecords)
{
	var totalAvgDelay=0, totalDelayJitter=0, totalPktLoss=0;//总平均时延， 总时延抖动， 总丢包率
	var maxAvgDelay, maxDelayJitter, maxPktLoss;
	var minAvgDelay, minDelayJitter, minPktLoss;
	var length = pathPerformanceMeasureRecords.length;
	if(pathPerformanceMeasureRecords.length != 0)//测量记录不为空
	{
		maxAvgDelay = pathPerformanceMeasureRecords[0].avgDelay;
		maxDelayJitter = pathPerformanceMeasureRecords[0].delayJitter;
		maxPktLoss = pathPerformanceMeasureRecords[0].pktLoss;
		
		minAvgDelay = maxAvgDelay;
		minDelayJitter = maxDelayJitter;
		minPktLoss = maxPktLoss;
		
		for(var i=0;i<pathPerformanceMeasureRecords.length;i++)
		{
			var avgDelay = pathPerformanceMeasureRecords[i].avgDelay;
			var delayJitter = pathPerformanceMeasureRecords[i].delayJitter;
			var pktLoss = pathPerformanceMeasureRecords[i].pktLoss;
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
		
		$("#avgPktLoss").text(totalPktLoss/length);
		$("#avgDelay").text(totalAvgDelay/length);
		$("#avgDelayJitter").text(totalDelayJitter/length);
		
		$("#maxPktLoss").text(maxPktLoss);
		$("#minPktLoss").text(minPktLoss);
		$("#maxAvgDelay").text(maxAvgDelay);
		$("#minAvgDelay").text(minAvgDelay);
		$("#maxDelayJitter").text(maxDelayJitter);
		$("#minDelayJitter").text(minDelayJitter);
	}else//测量记录为空
	{
		$("#avgPktLoss").text(0);
		$("#avgDelay").text(0);
		$("#avgDelayJitter").text(0);
		
		$("#maxPktLoss").text(0);
		$("#minPktLoss").text(0);
		$("#maxAvgDelay").text(0);
		$("#minAvgDelay").text(0);
		$("#maxDelayJitter").text(0);
		$("#minDelayJitter").text(0);
	}
	
	
	
}

/*点击任务后设置相应任务的数值*/
function setPathPerformanceValue(task)
{
	$('#taskName').textbox('setValue',task.task_name);//设置任务名称
	$('#task_num').textbox('setValue', task.task_num);//设置任务号
	$('#task_subject').textbox('setValue', task.task_subject);//设置执行探针设备
	
	var taskTarget = task.task_target;					//目标设备标识列表 （可以为空）
	
	if(taskTarget != "")								//目标设备标识列表不为空
	{
		/*根据设备标识得到设备*/
		$.ajax({
			url:"getEquipsByEquipIdList.html",
			type:"POST",
			data:{"equipIdList":taskTarget},
			success:function(data)
			{
				var taskTargetArrayName = [];
				var taskTargetArrayIp = [];
				for(var i=0;i<data.length;i++)
				{
					console.log(data[i].equipName);
					taskTargetArrayName.push(data[i].equipName);
					taskTargetArrayIp.push(data[i].manageIp);
				}
				
				//设置目标设备
				$('#targetEquipDiv').empty();
				var length = taskTargetArrayName.length;
				for(var i=0;i<length;i++)
				{
					if(taskTargetArrayName[i] != "")
					{
						m_taskTargetArrayForGraph.push(taskTargetArrayName[i]);
						var inputElement = "<label><input class ='equipNameCheckbox' onclick='getAllSelect()' type='checkbox' value ='"+taskTargetArrayIp[i]+"'>"+taskTargetArrayName[i]+"</label>";
						$( "#targetEquipDiv" ).append(inputElement);
					}
				}
			},
			error:function()
			{
				
			}
		});
	}else{												//目标设备为空
		$('#targetEquipDiv').empty();					//清空Div
	}
	
	
}

/*双向时延测量数据选中起始时间和结束时间触发时间*/
function onSelectDateTime(d)
{
	dateValidator(this.id, d);//时间校验
	
	
	//根据条件得到满足条件的数据
	$.ajax({
		type:"POST",
		url:"satisfiedPathPerformanceMeasureDataQueryByList.html",
		data:{"startTestTime":m_beginDate,"endTestTime":m_endDate,"taskNum":m_taskNum,"taskTargetIdString":m_selectValueString},
		success:function(data)
		{
			console.log(data);
			$('#PathPerformanceMeasureDataQueryTable').datagrid('loadData',data);//加载双向时延测量数据
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
var m_isAllChecked = true;//是否所有的被选中
function checkAll()
{
	//true:所有class属性为equipNameCheckbox的复选框全部勾选;false://所有class属性为equipNameCheckbox的复选框全部不勾选
	m_isAllChecked ? $('.equipNameCheckbox').prop("checked",true):$('.equipNameCheckbox').prop("checked",false);
	m_isAllChecked = !m_isAllChecked;
	
	$('#PathPerformanceMeasureDataQueryTable').datagrid('loadData',m_pathPerformanceMeasureRecords);/*点击任务后设置相应任务的测量数据(所有的数据)*/
	//setvalue(BIMeasureRecordDatas);//设置显示的值
}

/*勾选目标设备的复选框*/
function getAllSelect()
{
	m_selectValueString = "";//清空
	if(!m_isAllChecked)
	{
		$('#checkAll').prop("checked",false);
	}
	//var selectvalue= [];//被选中的值
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
		$('#PathPerformanceMeasureDataQueryTable').datagrid('loadData',m_pathPerformanceMeasureRecords);/*点击任务后设置相应任务的测量数据(所有的数据)*/
		//setvalue(BIMeasureRecordDatas);//设置显示的值
		return;
	}
	
	//根据条件查询数据
	$.ajax({
		type:"POST",
		url:"satisfiedPathPerformanceMeasureDataQueryByList.html",
		data:{"startTestTime":m_beginDate,"endTestTime":m_endDate,"taskNum":m_taskNum,"taskTargetIdString":m_selectValueString},
		success:function(data)
		{
			console.log(data);
			$('#PathPerformanceMeasureDataQueryTable').datagrid('loadData',data);//加载数据
		},
		error:function()
		{
			
		}
		
	});

}

/*曲线图显示*/
function loadDataByGraph()
{
	/**
	 * 1.入利用率
	 */
	//路径配置
    require.config({
       paths:{
           echarts:"echarts/build/dist"
       }
    });

    //使用
    require(
            ["echarts","echarts/chart/line"],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForIntraffic = ec.init(document.getElementById("dynamicViewForIntraffic"));

                var timeTicket;

                option = {
                    title : {
                        text: '入利用率'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:m_taskTargetArrayForGraph
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            saveAsImage : {show: true}
                        }
                    },
                    dataZoom : {
                        show : false,
                        start : 0,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            name:'时间',
                            boundaryGap : true,
                            data : (function (){
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale: true,
                            name : '(%)',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
                        	name:m_taskTargetArrayForGraph[0],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        },
                        {
                            name:m_taskTargetArrayForGraph[1],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        }
                    ]
                };
                var lastData = 11;
                var axisData;
                clearInterval(timeTicket);
                timeTicket = setInterval(function (){
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                    // 动态数据接口 addData
                    dynamicViewForIntraffic.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            true,     // 新增数据是否从队列头部插入
                            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        ],
                        [
                              1,        // 系列索引
                              Math.round(Math.random() * 1000), // 新增数据
				            true,    // 新增数据是否从队列头部插入
				            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
				            axisData  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                dynamicViewForIntraffic.setOption(option);
            }

    );
	/**
	 * 2.出利用率
	 */
  //路径配置
    require.config({
       paths:{
           echarts:"echarts/build/dist"
       }
    });

    //使用
    require(
            ["echarts","echarts/chart/line"],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForOuttraffic = ec.init(document.getElementById("dynamicViewForOuttraffic"));

                var timeTicket;

                option = {
                    title : {
                        text: '出利用率'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:m_taskTargetArrayForGraph
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            saveAsImage : {show: true}
                        }
                    },
                    dataZoom : {
                        show : false,
                        start : 0,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            name:'时间',
                            boundaryGap : true,
                            data : (function (){
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale: true,
                            name : '出利用率(%)',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
                        	name:m_taskTargetArrayForGraph[0],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        },
                        {
                            name:m_taskTargetArrayForGraph[1],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        }
                    ]
                };
                var lastData = 11;
                var axisData;
                clearInterval(timeTicket);
                timeTicket = setInterval(function (){
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                    // 动态数据接口 addData
                    dynamicViewForOuttraffic.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            true,     // 新增数据是否从队列头部插入
                            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        ],
                        [
                              1,        // 系列索引
                              Math.round(Math.random() * 1000), // 新增数据
				            true,    // 新增数据是否从队列头部插入
				            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
				            axisData  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                dynamicViewForOuttraffic.setOption(option);
            }

    );
	/**
	 * 3.入丢包率
	 */
  //路径配置
    require.config({
       paths:{
           echarts:"echarts/build/dist"
       }
    });

    //使用
    require(
            ["echarts","echarts/chart/line"],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForInlossRate = ec.init(document.getElementById("dynamicViewForInlossRate"));

                var timeTicket;

                option = {
                    title : {
                        text: '入丢包率'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:m_taskTargetArrayForGraph
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            saveAsImage : {show: true}
                        }
                    },
                    dataZoom : {
                        show : false,
                        start : 0,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            name:'时间',
                            boundaryGap : true,
                            data : (function (){
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale: true,
                            name : '入丢包率(%)',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
                        	name:m_taskTargetArrayForGraph[0],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        },
                        {
                            name:m_taskTargetArrayForGraph[1],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        }
                    ]
                };
                var lastData = 11;
                var axisData;
                clearInterval(timeTicket);
                timeTicket = setInterval(function (){
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                    // 动态数据接口 addData
                    dynamicViewForInlossRate.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            true,     // 新增数据是否从队列头部插入
                            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        ],
                        [
                              1,        // 系列索引
                              Math.round(Math.random() * 1000), // 新增数据
				            true,    // 新增数据是否从队列头部插入
				            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
				            axisData  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                dynamicViewForInlossRate.setOption(option);
            }

    );
	/**
	 * 4.出丢包率
	 */
  //路径配置
    require.config({
       paths:{
           echarts:"echarts/build/dist"
       }
    });

    //使用
    require(
            ["echarts","echarts/chart/line"],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForOutlossRate = ec.init(document.getElementById("dynamicViewForOutlossRate"));

                var timeTicket;

                option = {
                    title : {
                        text: '出丢包率'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:m_taskTargetArrayForGraph
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            saveAsImage : {show: true}
                        }
                    },
                    dataZoom : {
                        show : false,
                        start : 0,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            name:'时间',
                            boundaryGap : true,
                            data : (function (){
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale: true,
                            name : '出丢包率(%)',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
                        	name:m_taskTargetArrayForGraph[0],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        },
                        {
                            name:m_taskTargetArrayForGraph[1],
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        }
                    ]
                };
                var lastData = 11;
                var axisData;
                clearInterval(timeTicket);
                timeTicket = setInterval(function (){
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                    // 动态数据接口 addData
                    dynamicViewForOutlossRate.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            true,     // 新增数据是否从队列头部插入
                            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        ],
                        [
                              1,        // 系列索引
                              Math.round(Math.random() * 1000), // 新增数据
				            true,    // 新增数据是否从队列头部插入
				            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
				            axisData  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                dynamicViewForOutlossRate.setOption(option);
            }

    );
}


