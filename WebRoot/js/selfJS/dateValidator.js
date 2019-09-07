
var beginDate, endDate,task_name,task_target,targetDevicesAllFlag=false,taskTargetCount=0,task_num;//起始时间，终止时间，任务类别,任务目标,目标设备标识
var deviceManagerIP, deviceName;
/* 用于端性能统计选中时间，显示任务*/
function onSelectedDateForTask(d){
   validateDate(this.id,d,"0");
   getTasksByDate();
  
}

/*用于详细信息选中时间,显示测量数据*/
function onSelectedDateForInfo(d){
	validateDate(this.id,d,"1");
	alert(task_target);
	$('#dg').datagrid({
		height:250,
		singleSelect:true,
		url:'getMeasureData.html?beginDateString='+formatEasyUIDate(beginDate)+'&endDateString='+formatEasyUIDate(endDate)+'&task_name='+task_name+'&task_num='+task_num,
		columns:[[
		          {field:'testTime',title:'测量时间',width:200,
		        	  formatter:function(value,row,index){
		        	  var unixTimestamp = new Date(value);
		        	  return unixTimestamp.toLocaleString();
		          }},
		          {field:'testSubject',title:'目标名',width:100},
		          {field:'testTarget',title:'目标IP',width:100},
		          {field:'avgDelay',title:'平均时延(毫秒)',width:100},
		          {field:'delayJitter',title:'时延抖动(毫秒)',width:100},
		          {field:'pktLoss',title:'丢包率(%)',width:100}
		       ]],
	    onLoadSuccess:function(data){
			$("#recordCount").text(data.total);
		}});
}

/*用于性能分析选中时间，显示右侧数据*/
function onSelectedDateForAnalysis(d){
	validateDate(this.id,d,"2");
}

/* 用于时间校验*/
function onSelectedDate(d){
   validateDate(this.id,d,"4");
  
}
/*用于校验时间，时间格式错误，清空显示框*/
validateDate = function(id,d,flag){
	
	if(flag == "0")//用于端性能统计选中时间
	{
		var dateFlag = (id == "beginDateForTask");
		beginDate = dateFlag ? d : new Date($("#beginDateForTask").datebox('getValue'));	    /*得到起始日期*/
		endDate = dateFlag ? new Date($("#endDateForTask").datebox('getValue')) : d;			    /*得到终止日期*/
		if(dateFlag && beginDate > endDate){
		  $("#beginDateForTask").datebox('setValue', '').datebox("showPanel");
		}
		if(!dateFlag && beginDate > endDate){
		  $("#endDateForTask").datebox('setValue', '').datebox("showPanel");
		}
	}else if(flag == "1")//用于详细信息选中时间
	{
		var dateFlag = (id == "beginDateForInfo");
		beginDate = dateFlag ? d : new Date($("#beginDateForInfo").datebox('getValue'));	    /*得到起始日期*/
		endDate = dateFlag ? new Date($("#endDateForInfo").datebox('getValue')) : d;			    /*得到终止日期*/
		if(dateFlag && beginDate > endDate){
		  $("#beginDateForInfo").datebox('setValue', '').datebox("showPanel");
		}
		if(!dateFlag && beginDate > endDate){
		  $("#endDateForInfo").datebox('setValue', '').datebox("showPanel");
		}
	}else if(flag == "2")//用于性能分析选中时间
	{
		var dateFlag = (id == "beginDateForAnalysis");
		beginDate = dateFlag ? d : new Date($("#beginDateForAnalysis").datebox('getValue'));	    /*得到起始日期*/
		endDate = dateFlag ? new Date($("#endDateForAnalysis").datebox('getValue')) : d;			    /*得到终止日期*/
		if(dateFlag && beginDate > endDate){
		  $("#beginDateForAnalysis").datebox('setValue', '').datebox("showPanel");
		}
		if(!dateFlag && beginDate > endDate){
		  $("#endDateForAnalysis").datebox('setValue', '').datebox("showPanel");
		}
	}else
	{
		var dateFlag = (id == "beginDate");
		beginDate = dateFlag ? d : new Date($("#beginDate").datebox('getValue'));	    /*得到起始日期*/
		endDate = dateFlag ? new Date($("#endDate").datebox('getValue')) : d;			    /*得到终止日期*/
		if(dateFlag && beginDate > endDate){
		  $("#beginDate").datebox('setValue', '').datebox("showPanel");
		}
		if(!dateFlag && beginDate > endDate){
		  $("#endDate").datebox('setValue', '').datebox("showPanel");
		}
	}
	  
	
};

/*根据日期选中任务的测量数据,并设置任务的测量时间*/
getTaskDataByDate = function(){
	
};

/*根据日期选中任务，并设置目标设备等数据*/
getTasksByDate = function(){
	  $('#taskComboboxForPort').combobox({
	  	valueField:'task_num',
	  	textField:'task_name',
	  	url:'ajaxGetAllTasksForCombobox.html?beginDateString='+formatEasyUIDate(beginDate)+'&endDateString='+formatEasyUIDate(endDate),
	  	onSelect:function(rec){
				$('#deviceName').text(rec.task_subject);
				$('#taskNameForInfo').text(rec.task_name);
				task_type = rec.task_type;
				task_name = rec.task_name;
				task_target = rec.task_target;
				task_num = rec.task_num;
				
				var taskTargetList = task_target.split(";");
				$('#dg').datagrid('loadData', []);
				$("#targetDevice").empty();
				$("#targetDevice").append('目标设备:<input id="targetDevicesAll" type="checkbox" value="01"/>全部');
				for(var i=0;i<taskTargetList.length;i++){
					if(taskTargetList[i]!=''){
						alert(taskTargetList[i]);
						$("#targetDevice").append("<input type='checkbox' name='targetDevices' style='margin-left:20;' class='targetDevices'/>"+taskTargetList[i]);
					}
				}
				var checkboxValueList="";
				//点击全部
				$("#targetDevicesAll").on("click",function(){
					checkboxValueList="";
					if(!targetDevicesAllFlag){//默认不选中
						$("input[type=checkbox]").prop("checked",true);
						targetDevicesAllFlag = true;
					}else{
						$("input[type=checkbox]").prop("checked",false);
						targetDevicesAllFlag = false;
					}
					$.ajax({
						type:"POST",
						url:"getMeasureData.html?beginDateString="+formatEasyUIDate(beginDate)+"&endDateString="+formatEasyUIDate(endDate)+"&task_name="+task_name+"&checkboxValueList="+checkboxValueList+'&task_num='+task_num,
						success:function(data){
							$('#dg').datagrid('loadData', data);  
						},
						error:function(){
							alert("查看测量数据失败!");
						}
					});
				});
				
				$("input[class=targetDevices]").on("click",function(){
					checkboxValueList="";
					if(taskTargetCount!=taskTargetList.length){
						$("#targetDevicesAll").prop("checked",false);
					}
					var checkboxList = $("input[class=targetDevices]:checked");
					for(var i=0;i<checkboxList.length;i++){
						checkboxValueList=checkboxList[i].nextSibling.nodeValue+";"+checkboxValueList;
					}
					$.ajax({
						type:"POST",
						url:"getMeasureData.html?beginDateString="+formatEasyUIDate(beginDate)+"&endDateString="+formatEasyUIDate(endDate)+"&task_name="+task_name+"&checkboxValueList="+checkboxValueList+'&task_num='+task_num,
						success:function(data){
							$('#dg').datagrid('loadData', data);  
						},
						error:function(){
							alert("查看测量数据失败!");
						}
					});
					taskTargetCount++;
				});
			},
			onLoadSuccess:function(){
				var data=$(this).combobox('getData');
				if(data.length>0){$(this).combobox('select',data[0].task_num);}
			}
	  });
};

/*用于格式化EasyUI的databox的值*/
formatEasyUIDate = function(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
    var d = date.getDate();
    //return y+'/'+(m<10?('0'+m):m)+'/'+(d<10?('0'+d):d);
    return y+'/'+m+'/'+d;
};

$(function(){
	$('#tt').tree({    
		url:'ajaxGetAllTasksForAnalysis.html',
		onClick: function(node){
			deviceManagerIP = node.managerIP;  
			deviceName = node.text;
		}
	});
});

//计算起始时间和终止时间的时间间隔
var intervalDay = function(beginDate, endDate){
    //var date1 = "2016/8/16", date2 = "2016/8/17";//(包前不包后)
    var d1 = new Date(beginDate);
    var d2 = new Date(endDate);
    var day = (d2.getTime()-d1.getTime())/(24*3600*1000);
    return day;
  };


//性能分析
function selectBIDelayByDate(){
	var beginDateString = formatEasyUIDate(beginDate), endDateString = formatEasyUIDate(endDate);
	var intervalDays = intervalDay(beginDateString,endDateString);
	$.ajax({
		type:"GET",
		url:"selectBIDelayByDate.html?beginDateString="+beginDateString+"&endDateString="+endDateString+"&deviceManagerIP="+deviceManagerIP+"&intervalDay="+intervalDays,
		success:function(data){
			alert(data);
			showEfficiencyAnalysisEast(data);
		},
		error:function(){
			alert("查询设备测量数据失败");
		}
	});
}

var showEfficiencyAnalysisEast = function(data){
	
	//性能分析的数据显示
	var efficiencyAnalysisEast = echarts.init(document.getElementById("efficiencyAnalysisEast"));
	efficiencyAnalysisEastOption = {
		    title : {
		        text: '双数值轴折线',
		        subtext: '纯属虚构'
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer:{
		            show: true,
		            type : 'cross',
		            lineStyle: {
		                type : 'dashed',
		                width : 1
		            }
		        },
		        formatter : function (params) {
		            return params.seriesName + ' : [ '
		                   + params.value[0] + ', '
		                   + params.value[1] + ' ]';
		        }
		    },
		    legend: {
		        data:['数据2']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataZoom : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type: 'value'
		        }
		    ],
		    yAxis : [
		        {
		            type: 'value',
		            axisLine: {
		                lineStyle: {
		                    color: '#dc143c'
		                }
		            }
		        }
		    ],
		    series : [
		        {
		            name:'数据2',
		            type:'line',
		            data:data
		        }
		    ]
		};
	efficiencyAnalysisEast.setOption(efficiencyAnalysisEastOption);
};

var list = [];
//测试通过
function addHour(date, hours){
  //var date = "2016/8/12",hours=20;
//  var d = new Date(date);

  var da= date +" "+hours+":00:00";
  return da;
}
  //测试通过
  function addDay(date, days){
  //  var date = "2016/8/12",days=365;
    var d = new Date(date);
    d.setDate(d.getDate()+days);
    var m=d.getMonth()+1;
    var da=d.getFullYear()+"/"+m+"/"+d.getDate();
    return da;
  }
  //测试通过
  function addMonth(){
    var date = "2016/8/12",months=-1;
    var d = new Date(date);
    d.setMonth(d.getMonth()+months);
    var m=d.getMonth()+1;
    var da=d.getFullYear()+"/"+m+"/"+d.getDate();
    return da;
  }
  //测试通过
  function addYear(){
    var date = "2016/8/12",years=-20;
    var d = new Date(date);
    d.setFullYear(d.getFullYear()+years);
    var m=d.getMonth()+1;
    var da=d.getFullYear()+"/"+m+"/"+d.getDate();
    return da;
  }


 

