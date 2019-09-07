/** 与通用业务性能测量数据的曲线图相关的javascript文件 */

/**
 * 初始化SMTP服务响应时间、邮件发送时间、POP3服务响应时间和邮件收取时间
 */
 
 /**
  * 初始化SMTP曲线图的结构
  */
 function initSMTPGraphStructure()
 {
	 //SMTP服务响应时间视图
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
                var dynamicViewForSMTPResponseDelay = ec.init(document.getElementById("dynamicViewForSMTPResponseDelay"));

                var timeTicket;

                optionForSMTPResponseDelay = {
                    title : {
                        text: 'SMTP服务响应时间'
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
                    dynamicViewForSMTPResponseDelay.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            false,     // 新增数据是否从队列头部插入
                            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
							axisData  // 坐标轴标签
						]
                    ]);
                }, 2100);

                dynamicViewForSMTPResponseDelay.setOption(optionForSMTPResponseDelay);
            }

    );
	
	 //邮件发送时间视图

    //使用
    require(
            ["echarts","echarts/chart/line", 'echarts/chart/bar'],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForSMTPMailSendDelay = ec.init(document.getElementById("dynamicViewForSMTPMailSendDelay"));

                var timeTicket;

                optionForSMTPMailSendDelay = {
                    title : {
                        text: '邮件发送时间'
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
                    dynamicViewForSMTPMailSendDelay.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            false,     // 新增数据是否从队列头部插入
                            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
							axisData  // 坐标轴标签
						]
                    ]);
                }, 2100);

                dynamicViewForSMTPMailSendDelay.setOption(optionForSMTPMailSendDelay);
            }

    );
 }

 /**
  * 初始化POP3的曲线图结构
  */
 function initPOP3GraphStructure()
 {
	 //POP3服务响应时间视图
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
                var dynamicViewForPOP3ResponseDelay = ec.init(document.getElementById("dynamicViewForPOP3ResponseDelay"));

                var timeTicket;

                optionForPOP3ResponseDelay = {
                    title : {
                        text: 'POP3服务响应时间'
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
                    dynamicViewForPOP3ResponseDelay.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            false,     // 新增数据是否从队列头部插入
                            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
							axisData  // 坐标轴标签
						]
                    ]);
                }, 2100);

                dynamicViewForPOP3ResponseDelay.setOption(optionForPOP3ResponseDelay);
            }

    );
	
	 //邮件收取时间视图

    //使用
    require(
            ["echarts","echarts/chart/line", 'echarts/chart/bar'],
            function(ec){
                //基于准备好的dom，初始化echarts图表
                var dynamicViewForPOP3MailRetrieveDelay = ec.init(document.getElementById("dynamicViewForPOP3MailRetrieveDelay"));

                var timeTicket;

                optionForPOP3MailRetrieveDelay = {
                    title : {
                        text: '邮件收取时间'
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
                    dynamicViewForPOP3MailRetrieveDelay.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            false,     // 新增数据是否从队列头部插入
                            false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
							axisData  // 坐标轴标签
						]
                    ]);
                }, 2100);

                dynamicViewForPOP3MailRetrieveDelay.setOption(optionForPOP3MailRetrieveDelay);
            }

    );
 }