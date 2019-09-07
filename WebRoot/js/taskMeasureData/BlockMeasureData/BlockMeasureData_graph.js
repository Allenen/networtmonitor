
/**
 * 阻断测量数据的js文件 by zxgm 2016-11-4
 * */

 /**
  * 初始化阻断状态曲线图
  */
 function initZDView()
 {
	//1. 柱状图的目标设备下拉选框数据初始化
	 $("#targetEquipCombobox").combobox({
		 url:"getTargetEquipsByTaskNum.html?taskNum="+m_taskNum,
		 valueField:"valueText",
		 textField:"textText",
		 onLoadSuccess:function()
		 {
			var data = $('#targetEquipCombobox').combobox('getData');
			if(data.length > 0)
				$('#targetEquipCombobox').combobox('select',data[0].valueText);
		 },
		 onSelect:function(record)
		 {
			 var targetEquipId = record.valueText,targetEquipName = record.textText;
			 console.log(JSON.stringify(record));
		 }
	 }); 
	 
	 //2. 初始化阻断状态图形结构
	 initBlockStatusStructure();

 }
 
 /**
  * 初始化阻断状态图形结构
  */
 function initBlockStatusStructure()
 {
	 //2. 阻断测量数据阻断状态
	//路径配置
    require.config({
       paths:{
           echarts:"echarts/build/dist"
       }
    });

    //使用
    require(
            ["echarts",'echarts/chart/bar'],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var blockStatusDynamicShow = ec.init(document.getElementById("blockStatusDynamicShow"));

                var timeTicket;

                option = {
                    title : {
                        text: '阻断状态'
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
                            name : '阻断状态',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
                        	name:m_taskTargetArrayForGraph[0],
                            type:'bar',
							barWidth:80,
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
                //var lastData = 11;
                var axisData;
                clearInterval(timeTicket);
                timeTicket = setInterval(function (){
                    //lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    //lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                    // 动态数据接口 addData
                    blockStatusDynamicShow.addData([
                        
                        [
                              0,        // 系列索引
                              Math.round(Math.random() * 1000), // 新增数据
				            false,    // 新增数据是否从队列头部插入
				            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
				            axisData  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                blockStatusDynamicShow.setOption(option);
            }
    );
 }


