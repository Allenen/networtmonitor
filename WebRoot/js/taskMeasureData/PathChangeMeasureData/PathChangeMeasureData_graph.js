
/**
 * 链路性能测量数据的js文件 by zxgm 2016-10-31
 * */

/*曲线图显示*/
function initTrafficAndLossRate()
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


