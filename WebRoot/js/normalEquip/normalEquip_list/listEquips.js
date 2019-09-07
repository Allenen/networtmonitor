       
var m_flag=1;   //用于设置条件的联选效果
 
var m_currentPageNum = 1, m_pageSize = 15, m_totalCount, m_allTotalCount;  //当前页为第一页，页面大小为15
var myChartForEquipKind, myChartForAreaUnit;
var m_legendDataForAreaUnit = [], m_seriesDataForAreaUnit = [];
var m_legendDataForEquipKind = [], m_seriesDataForEquipKind = [];

/**
 * 文档加载完成
 */
$(function(){
	
	initEquipsDatagrid();
	getEquipsByPage(m_currentPageNum, m_pageSize);
	paginationByPage();
	
	myChartForAreaUnit = echarts.init(document.getElementById("areaUnitView"));
	myChartForEquipKind = echarts.init(document.getElementById("equipKindView"));
	
	//显示归属单位和设备类型的结构视图
    showAreaUnitAndEquipKind();
    
    $('#mm_router').menu({
        onClick:function(item){
        	menuListener_router(this, item.name);
        }
    });
});

//将一个表单的数据返回成JSON对象
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
		    }
		    o[this.name].push(this.value || '');
		} 
		else {
			o[this.name] = this.value || '';
	    }
	});
	return o;
};
 
/**
 * 批量删除选中的设备 
 * @return
 */
function deleteSelectEquips()
{
	var opts = $('#equipDatagrid').datagrid('getChecked');
 
	if(opts.length==0)
	{
	    $.messager.alert('消息提示','未选中任何记录!');
	    return;
	}
	$.messager.confirm('消息提示', '确定要删除这  ' + opts.length + ' 个设备?',
		function(r)
		{
			if(!r)
				return ;

    	  var equipNumList="";
    	  $.each(opts, function(i, item)
    	  {
    		  equipNumList = equipNumList+item.equipNum+";";
    	  });
    	  
    	  //批量删除设备
    	  $.ajax( {
    		  type : 'POST',
    		  url : 'deleteEquips.html',
    		  data : {'equipNumList':equipNumList},
    		  success : function(data)
    		  {
				  $.each(opts, function(i, item){
					  var index = $('#equipDatagrid').datagrid('getRowIndex',item);
					  $('#equipDatagrid').datagrid('deleteRow',index);
					  
					  getEquipsByEquipKinds();
				      paginationByEquipKinds();
				      
					  //$('#info').html("设备数：" + EquipDatas.length + "&nbsp;&nbsp;&nbsp;查询设备数："+EquipDatas.length);
				  });
				  showAreaUnitAndEquipKind();
    		  },
    		  error : function(data)
    		  {
    			  alert("服务器error");
    		  }
    	  });
        	  
           
      });
	
     
}


    
//编辑设备
function editEquip(deviceType, deviceId, index)
{
	
	var widthPx, heightPx;
	if(deviceType == "路由器")
	{
		if(index != -1){
			var x = 650;
			var y = index * 25 +150;
			$("#mm_router").menu('show', {
		        left: x,
		        top: y
		    }).data("equipId", deviceId);
			return ;
		}
		widthPx = 1000;
		heightPx = 420;
	}
	else if(deviceType.substring(deviceType.length - 2) == "探针")
	{
		widthPx = 940;
		heightPx = 430;
	}
	else
	{
		widthPx = 940;
		heightPx = 250;
	}
	
	var divElement = document.createElement("div");
	divElement.id = "showEquipUI";
	$(divElement).dialog({
		title: '设备基本信息',
		iconCls: "icon-edit",
        width: widthPx,
        height: heightPx,
        closed: false,
        cache: false,
        href: 'getEquipUI.html?deviceType='+deviceType+'&equipId='+deviceId,
        modal: true,
        draggable: false,
        onClose: function () {  
        	$(this).dialog("destroy").remove();
        }
    });

}
    
    
function closeWin()
{
   $('#win').window('close');
}
    
function closeDialog()
{
   $('#showEquipEditUI').dialog('close');
}

/**
 * 点击设备列表中搜索按钮触发操作  2016-12-27
 * @param value
 * @param name
 * @return
 */
function searchEquip(value,name)
{
	m_equipConditionTest = value;
	getEquipsByEquipKinds();
	paginationByEquipKinds();
}
    
/**
 * 勾选全部复选框  
 * @return
 */
function checkAll()
{
	//1.全部复选框未被勾选
	if( m_flag == 1)
	{
		$('label input[type=checkbox]').prop("checked",true);
	   	m_flag=0;
	}
	else//2.全部复选框已被勾选
	{
		$('label input[type=checkbox]').prop("checked",false);
		m_flag=1;
    }
	
	getEquipsByPage(m_currentPageNum, m_pageSize);
    paginationByPage();
 }

var m_selectValueContent = [], m_satisfyConditionData;
    
/**
 * 选中筛选条件，显示筛选结果
 * */
function getallselect()
{
	m_selectValueContent.length = 0;
	
	//1.全部被勾选，再次勾选某设备类型，去除全部勾选框选中
	if(m_flag==0)
	{
		$('#checkall').prop("checked", false);
	}

	var selectValue = [];
	var loadData = [];
	
	$('label input[type=checkbox]:checked').each(function(){
	      selectValue.push($(this).val());
	      m_selectValueContent.push(this.nextSibling.nodeValue);
	});

	var totalEquipKindNums = $('label input[type=checkbox]').length-1;
	//2.如果没有筛选条件
	if(selectValue.length==0)
	{
	   //$('#equipDatagrid').datagrid('loadData', EquipDatas);
	}
	else if(selectValue.length == totalEquipKindNums)//3.1 所有设备类型都被勾选，则全部复选框也被勾选
	{
		$('#checkall').prop("checked",true);//勾选全部复选框
    	m_flag = 0;
    }
    
    getEquipsByEquipKinds();
    paginationByEquipKinds();
}
  
    //编辑设备中的数据
function editlist(value,row,index)
{
	var equipId = row.equipId;
    var equipType = row.equipKind;
    return '<a href="javascript:void(0);" onclick="editEquip(\''+equipType+'\',\''+equipId+'\',\''+index+'\')"><i class="icon-edit" style="width:16px;height:16px;display:inline-block;vertical-align:middle;"></i></a>';
}




/**
 * 分页工具栏(根据设备类型条件)  2016-12-27
 * @return
 */
function paginationByEquipKinds()
{
	//用于分页工具栏的实现   
    var pager = $('#equipDatagrid').datagrid('getPager');
    
    $(pager).pagination({
    	pageList: [15],
    	pageSize:15,
    	total: m_satisfyConditionData.length,      
    	onSelectPage:function(pageNo, pageSize){
		var start =(pageNo-1)*pageSize;
		var end = start+pageSize;
		$('#equipDatagrid').datagrid('loadData',m_satisfyConditionData.slice(start,end));
		$(pager).pagination('refresh',{
		  total:m_satisfyConditionData.length,
		  pageNumber:pageNo
		});
		
	  }
      
    });  
}

/**
 * 分页工具栏  
 * @return
 */
function paginationByPage()
{
	 //用于分页工具栏的实现   
    var pager = $('#equipDatagrid').datagrid('getPager');
    
    $(pager).pagination({
    	pageList: [15],
    	pageSize:15,
    	total: m_totalCount,      
    	onSelectPage:function(m_currentPageNum, pageSize)
    	{
    		getEquipsByPage(m_currentPageNum, m_pageSize);
    		//刷新分页工具的页码
    		$(pager).pagination('refresh',{
    			total:m_totalCount,
    			pageNumber:m_currentPageNum
			});
    	}
    }); 
}

//搜索栏中的设备名或者管理IP
var m_equipConditionTest="";

/**
 * 分页获取满足设备类型的设备信息
 *  2016-12-27
 * @return
 */
function getEquipsByEquipKinds()
{
	//获取分页的设备数据
	$.ajax({
		type:"POST",
		url:"getEquipsByEquipKinds.html",
		async:false,
		data:{"equipKindString":m_selectValueContent.join(";"),"equipConditionTest":m_equipConditionTest},
		success:function(data)
		{
			m_satisfyConditionData = data;
			if(m_satisfyConditionData.length == 0)
			{
				$.messager.show({
					title: '消息提示',
					msg: '没有设备信息！',
					timeout: 1000,
					showType: 'slide'
				});
			}else
			{
				$("#info").html("设备数："+m_allTotalCount+"&nbsp;&nbsp;&nbsp;查询设备数："+m_satisfyConditionData.length);
				$('#equipDatagrid').datagrid('loadData',m_satisfyConditionData.slice(0,15));
			}
		},
		error:function()
		{
			$.messager.show({
				title: '消息提示',
				msg: '获取分页的设备信息失败！',
				timeout: 1000,
				showType: 'slide'
			});
		}
	});
}

/**
 * 分页获取设备信息
 * @return
 */
function getEquipsByPage(m_currentPageNum, m_pageSize)
{
	$.ajax({
		type: "POST",
		url: "getEquipsByPage.html",
		async: false,
		data: {"currentPageNum": m_currentPageNum, "pageSize": m_pageSize},
		success: function(data)
		{
			var page = data.page;//页面对象
			m_totalCount = page.totalCount;
			m_allTotalCount = page.totalCount;
			if(page.totalCount == 0)
			{
				alert("没有设备数据");
			}else
			{
				$("#info").html("设备数："+m_allTotalCount+"&nbsp;&nbsp;&nbsp;查询设备数："+page.totalCount);
				$('#equipDatagrid').datagrid('loadData',page.result);
			}
		},
		error:function()
		{
			alert("获取分页的设备信息失败");
		}
	});
}

/**
 * 初始化设备列表格式  
 * @return
 */
function initEquipsDatagrid()
{
	$('#equipDatagrid').datagrid({
        toolbar: '#toolbar',
        pagination: true,
        fitColumns: true,
        striped: true,
        selectOnCheck: false,
        columns:
        [[
          {
        	  field: 'checked',
              title: '',
              align: 'center',
              checkbox: true,
              width: '10%'
          },
          {
        	  field: 'equipNum',
              title: '序号',
              align: 'center',
              width: '10%',
              algin: 'center'
          },
          {
        	  field: 'equipName',
              title: '设备名称',
              align: 'center',
              width: '18%',
              algin: 'center'
          },
          {
              field: 'equipId',
              title: '设备标识',
              align: 'center',
              width: '10%',
              algin: 'center'
          },
          {
              field: 'equipKind',
              title: '设备类别',
              align: 'center',
              width: '18%',
              algin: 'center'
          },
          {
              field: 'manageIp',
              title: '管理ip',
              align: 'center',
              width: '14%',
              algin: 'center'
          },
          {
              field: 'areaUnit',
              title: '归属大单位',
              align: 'center',
              width: '10%',
              algin: 'center'
          },
          {
              field: 'probeState',
              title: '状态',
              align: 'center',
              width: '10%',
              algin: 'center',
              formatter:function(value,row,index)
              {
        	  	if(value == 0)
        	  	{
        	  		return "离线";
        	  	}else if(value == 1)
        	  	{
        	  		return "在线";
        	  	}
              }
          },
          {
              field: 'editlist',
              title: '操作',
              align: 'center',
              width: '8%',
              algin: 'center',
                  formatter: editlist
           }
         ]]
        });
}
   
    /**
 * 用于归属单位和设备类型的视图设置  2016-12-8
 */
function showAreaUnitAndEquipKind()
{
	
    //为归属单位准备数据 by  2017-01-05
    prepareDataForAreaUnit();
    

    optionForAreaUnit = {
	    title : {
	        text: '归属单位',
	        textStyle:{
            	color:'#5c3317'
            }
	    },
	    tooltip : {
	        trigger: 'item'
	    },
	    legend: {
	        x : 'center',
	        y : 'bottom',
	        data:m_legendDataForAreaUnit
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    series : [
	        {
	            name:'归属单位',
	            type:'pie',
	            label:{
                	normal:{
                		show:true,
                		//position:'top',
                		formatter: '{d}% \n{b}',
                		textStyle:{
                			color:'#5c3317'
                		}
                	}
                },
                center : ['50%', '50%'],
	            radius : ['30%', '70%'],
	            avoidLabelOverlap: false,

	            data:m_seriesDataForAreaUnit
	        }
	    ]
	};
    myChartForAreaUnit.clear();	                    
    myChartForAreaUnit.setOption(optionForAreaUnit,true);
    
    
	//为设备类型准备数据
	prepareDataForEquipKind();
	
    optionForEquipKind = {
    		title: {
		        text: '设备类型',
		        textStyle:{
		        	color:'#5c3317'
		        }
		    },
		    tooltip: {
		        trigger: 'item'
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataView: {show: true, readOnly: true},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
		    calculable: true,
		    grid: {
		    	show:true,
		    	borderColor:'#5c3317',
		        borderWidth: 1,
		        x: 30,
		        y: 75,
		        y2: 40
		    },
		    xAxis:{

		            data: m_legendDataForEquipKind
		    },
		    yAxis: [
		        {
		            type: 'value',
		            axisLabel:{
		            	textStyle:{
		            		color:'#5c3317'
		            	}
		            },
		            axisTick:{
		            	lineStyle:{
		            		color:'#5c3317'
		            	}
		            },
		            show: true
		        }
		    ],
		    series: [
		        {
		            name: '设备类型',
		            type: 'bar',
		            center : ['50%', '50%'],
		            barCategoryGap:'50%',
		            label:{
		            	normal:{
		            		show:true,
		            		position:'top',
		            		formatter: '{c}',
		            		textStyle:{
		            			color:'#5c3317'
		            		}
		            	}
		            },
		            itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                  '#2EC7C9','#B6A2DE','#5AB1EF','#FFB980','#8D98B3',
                                   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                ];
                                return colorList[params.dataIndex];
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}\n{c}'
                            }
                        }
		            },
		            
		            data: m_seriesDataForEquipKind
		        }
		    ]
    };
    myChartForEquipKind.clear();
    myChartForEquipKind.setOption(optionForEquipKind, true);


	
}


/**
 * 为归属单位准备数据  2017-01-05
 * @return
 */
function prepareDataForAreaUnit()
{
	m_legendDataForAreaUnit = [];
	m_seriesDataForAreaUnit = [];
	//获取归属单位的数据，采用key-value的形式 例如沈阳-10
	$.ajax({
		url:"getAreaUnitNameCount.html",
		type:"POST",
		async:false,
		success:function(data)
		{
    		for(var k in data)
    		{
    			m_legendDataForAreaUnit.push(k);
    			m_seriesDataForAreaUnit.push({value:data[k],name:k});
    		}
		},
		error:function()
		{
			console.log("获取归属单位信息失败");
		}
	});
}


/**
 * 为设备类型准备数据  2017-01-05
 * @return
 */
function prepareDataForEquipKind()
{
	m_legendDataForEquipKind = [];
	m_seriesDataForEquipKind = [];
	//获取设备类型数据，采用key-value的形式 例如路由器-12
	$.ajax({
		url:"getEquipKindNameCount.html",
		type:"POST",
		async:false,
		success:function(data)
		{
    		for(var k in data)
    		{
    			m_legendDataForEquipKind.push(k);
    			m_seriesDataForEquipKind.push(data[k]);
    		}
		},
		error:function()
		{
			console.log("获取设备类型信息失败");
		}
	});
}

function openInterfaceDialog(equipId)
{
	
	var divElement = document.createElement("div");
	divElement.id = "showEquipInterface";
	$(divElement).dialog({
		title: '设备接口信息',
		iconCls: "icon-edit",
        width: 1100,
        height: 250,
        closed: false,
        cache: false,
        href: 'getEquipInterfaceInfo.html?deviceType=路由器&equipId='+equipId,
        modal: true,
        draggable: false,
        onClose: function () {  
        	$(this).dialog("destroy").remove();
        }
    });
}

function menuListener_router(menu, type)
{
	var equipId = $(menu).data("equipId");
    switch(type)
    {
    case 1:  //编辑基本信息
    	editEquip("路由器", equipId, -1);
    	break;
    case 2:  //编辑接口信息
    	openInterfaceDialog(equipId);
    	break;
    }
}
  