/** 与通用业务性能测量数据的曲线图相关的javascript文件 */

/**
 * 初始化服务响应时间、页面下载时间结构
 */
function initResponseDelayAndPageDelay()
{
	//服务响应时间视图
	//路径配置
    require.config({
       paths:{
           echarts:"echarts/build/dist"
       }
    });

    //使用
    require(
            ["echarts","echarts/chart/line", 'echarts/chart/bar'],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForResponseDelay = ec.init(document.getElementById("dynamicViewForResponseDelay"));

                var timeTicket;

                option = {
                    title : {
                        text: '服务响应时间'
                    },
                    tooltip : {
                        trigger: 'axis'
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
                            name : '毫秒',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
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
                    dynamicViewForResponseDelay.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            false,     // 新增数据是否从队列头部插入
                            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
							axisData  // 坐标轴标签
						]
                    ]);
                }, 2100);

                dynamicViewForResponseDelay.setOption(option);
            }

    );
    
    
  //页面下载时间视图
	//路径配置
    require.config({
       paths:{
           echarts:"echarts/build/dist"
       }
    });

    //使用
    require(
            ["echarts","echarts/chart/line", 'echarts/chart/bar'],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForPageDelay = ec.init(document.getElementById("dynamicViewForPageDelay"));

                var timeTicket;

                option = {
                    title : {
                        text: '页面下载时间'
                    },
                    tooltip : {
                        trigger: 'axis'
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
                            name : '毫秒',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
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
                    dynamicViewForPageDelay.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            false,     // 新增数据是否从队列头部插入
                            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
							axisData  // 坐标轴标签
						]
                    ]);
                }, 2100);

                dynamicViewForPageDelay.setOption(option);
            }
    );
  
}