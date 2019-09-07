//性能分析的数据显示
var efficiencyAnalysisEast = echarts.init(document.getElementById("efficiencyAnalysisEast"));
efficiencyAnalysisEastOption = {
	    title : {
	        text: '未来一周气温变化',
	        subtext: '往返时延(毫秒)'
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['往返时延']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : function (){
	                var list = [];
	                for (var i = 1; i <= 30; i++) {
	                    list.push('2013-03-' + i);
	                }
	                return list;
	            }()
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLabel : {
	                formatter: '{value}'
	            }
	        }
	    ],
	    series : [
	        {
	            name:'往返时延',
	            type:'line',
	            data:[11, 11, 15, 13, 12, 13, 10],
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            }  
	        }
	    ]
	};
efficiencyAnalysisEast.setOption(efficiencyAnalysisEastOption);

//主界面的丢包率
var mainGraphCenter = echarts.init(document.getElementById('mainGraphCenter'));

optionMainGraphCenter = {
title : {
text: '',
subtext: '纯属虚构'
},
tooltip : {
trigger: 'axis'
},
legend: {
data:['','']
},
toolbox: {
show : true,
feature : {
	dataView : {show: true, readOnly: false},
	magicType : {show: true, type: ['line', 'bar']},
	restore : {show: true},
	saveAsImage : {show: true}
}
},
calculable : true,
xAxis : [
{
	type : 'category',
	data : ['1','2','3','4','5','6','7','8','9','10','11','12']
}
],
yAxis : [
{
	type : 'value'
}
],
series : [
{
	name:'',
	type:'bar',
	data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	markPoint : {
			data : [
					{type : 'max', name: '最大值'},
					{type : 'min', name: '最小值'}
			]
	},
	markLine : {
			data : [
					{type : 'average', name: '平均值'}
			]
	}
},
{
	name:'',
	type:'bar',
	data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
	markPoint : {
			data : [
					{name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
					{name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
			]
	},
	markLine : {
			data : [
					{type : 'average', name : '平均值'}
			]
	}
}
]
};
mainGraphCenter.setOption(optionMainGraphCenter);

//主界面的IP可用性
				// 基于准备好的dom，初始化echarts实例
				var mainGraph = echarts.init(document.getElementById('mainGraph'));

				//app.title = '多 Y 轴示例';

	var colors = ['#5793f3', '#d14a61', '#675bba'];

	optionMainGraph = {
	    color: colors,

	    tooltip: {
	        trigger: 'axis'
	    },
	    grid: {
	        right: '20%'
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	        data:['','','']
	    },
	    xAxis: [
	        {
	            type: 'category',
	            axisTick: {
	                alignWithLabel: true
	            },
	            data: ['1','2','3','4','5','6','7','8','9','10','11','12']
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '',
	            min: 0,
	            max: 250,
	            position: 'right',
	            axisLine: {
	                lineStyle: {
	                    color: colors[0]
	                }
	            },
	            axisLabel: {
	                formatter: '{value} ml'
	            }
	        },
	        {
	            type: 'value',
	            name: '',
	            min: 0,
	            max: 250,
	            position: 'right',
	            offset: 80,
	            axisLine: {
	                lineStyle: {
	                    color: colors[1]
	                }
	            },
	            axisLabel: {
	                formatter: '{value} ml'
	            }
	        },
	        {
	            type: 'value',
	            name: '',
	            min: 0,
	            max: 25,
	            position: 'left',
	            axisLine: {
	                lineStyle: {
	                    color: colors[2]
	                }
	            },
	            axisLabel: {
	                formatter: '{value} °C'
	            }
	        }
	    ],
	    series: [
	        {
	            name:'',
	            type:'bar',
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	        {
	            name:'',
	            type:'bar',
	            yAxisIndex: 1,
	            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	        },
	        {
	            name:'',
	            type:'line',
	            yAxisIndex: 2,
	            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        }
	    ]
	};

				// 使用刚指定的配置项和数据显示图表。
				mainGraph.setOption(optionMainGraph);


		