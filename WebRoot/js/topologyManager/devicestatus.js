var graph, model;
var datas = [];
var styles = {};
var pre_ui = null;
var cur_id;
var timer = null;
styles[Q.Styles.SELECTION_COLOR] = "#E21667";

$(function(){
	Q.addCSSRule(".maximize", "margin: 0px !important;position: fixed !important;top: 0px;bottom: 0px;right: 0px;left: 0px;z-index: 1030;height: auto !important; width: auto !important;");
    graph = new Q.Graph("canvas");
	model = graph.graphModel;
	
	graph.styles = styles;

    graph.originAtCenter = false;
    graph.editable = false;
	graph.enableTooltip = false;
	
	initToolbar();
	getBottomImage();
	
	graph.onmousemove = onmousemovelistener;
	graph.onclick = onclicklistener;
	graph.ondblclick = ondblclicklistener;
	
	//监听面板调整大小事件，同步graph大小
    $('#center_panel').panel({
        onResize: function (w, h) {
            graph.updateViewport();
        }
    }); 
    

});

function getBottomImage(){
	//设置拓扑管理的背景图
	$.ajax({
		type:"POST",
		url:"getBottomImage.html",
		success:function(data)
		{
			if(data.code == 1){
				var imagePath = "url(images/bottomImages/"+data.imageName+") no-repeat";
				$( "#canvas" ).css({
			 	      "background": imagePath,
			 	     "background-size":"100%",
			 	     "width":"100%"
			 	});
			}
			else
			{
				$.messager.show({
					title:'消息提示',
					msg:'尚未设置底图！',
					timeout:1000,
					showType:'slide'
				});
			}
		}
	 });
}

function initToolbar(){
    var toolbar = document.getElementById("toolbar");
    var buttons = {
			
        zoom: [{name: "放大", icon:"images/toolbar/zoomin_icon.png", action: function(){graph.zoomIn();}},
            {name: "缩小", icon:"images/toolbar/zoomout_icon.png", action: function(){graph.zoomOut();}},
            {name: "1:1", action: function(){graph.scale = 1;}},
            {name: '纵览', icon:"images/toolbar/overview_icon.png", action: function(){this.zoomToOverview();}}
		],
			
        find: {name: '查找', type: "input", action: function(evt, info){  find_element(info);   }},
		
		load:{name: '加载json文件', icon: "images/toolbar/load.png", type: 'file', action: function(evt, info){ load_json_file(info);  }},
		
		refresh:{name: '刷新', action:function(evt, info){  refresh_page();  }}
		
    };
    createToolBar(buttons, toolbar, graph, false, false);
}

function find_element(info){
	 var name = info.input.value;
     if(!name){
         return;
     }
     graph.forEach(function(e){
         if(e instanceof Q.Node && (name == e.name || (e.info && e.info.name == name))){
             graph.setSelection(e);
             ensureVisible(e);
             return false;
         }
     }, graph);
}

function ensureVisible(node){
    var bounds = graph.getUIBounds(node);
    var viewportBounds = graph.viewportBounds;
    if(!viewportBounds.contains(bounds)){
        graph.sendToTop(node);
        graph.centerTo(node.x, node.y);
    }
}

function load_json_file(info){
	var files = info.files;
	if (!files[0]) {
        return;
    }
	var fileReader = new FileReader();
	 
    fileReader.onload = function (evt) {
        graph.clear();
		datas = [];
		graph.parseJSON(fileReader.result);
		model.datas.forEach(function(e){
			datas.push(e);
		});
		graph.clear();
		paintcanvas(graph);
    };
    fileReader.readAsText(files[0], 'utf-8');
}

function refresh_page(){
	//刷新当前页面
	$.ajax({
		type:"POST",
		url:"refresh.html",
		success:function(data)
		{
			window.location.href = "devicestatus.html"; 
		}
	 });	
}

function paintcanvas(){
	var len = 0, size = 0;
	datas.forEach(function(e){
		if(e instanceof Q.Node) len ++;
	});
	size = len;
	datas.forEach(function(e)
	{
		if(e instanceof Q.Node)
		{
			var equipId = e.properties.deviceId;
			var equipType = e.properties.deviceType;
			var node = null;
			$.ajax({
				type:"POST",
				url:"getEquipById.html",
				data:{"equipId": equipId},
				success:function(result)
				{
					
					if(result.code == 0)
						return ;
					var equip = result.equip;
					var equipName = equip.equipName;
					if(equipType.substring(equipType.length - 2) == "探针"){
						node = createCustomNode_probe(e.x, e.y, e.image, equipType, equipName, equipId);
					}
					else{
						node = createCustomNode(e.x, e.y, e.image, equipType, equipName, equipId);
					}
					graph.addElement(node);
					len --;
					if(len == 0) draw_edge(size);
				}
			});
			
		}
	}); 
}

function draw_edge(size)
{

	datas.forEach(function(e){
		if(e instanceof Q.Edge)
		{
			var From, To;
			
			
			var from_id = e.from.properties.deviceId;
			var to_id = e.to.properties.deviceId;
			var len = model.datas.length;
			for(var j = 0; j < len; j ++ )
			{
				var n = model.datas[j];
				if(n.properties.id == from_id) From = n;
				if(n.properties.id == to_id) To = n;
			}
			var edge = graph.createEdge(From, To);
			edge.setStyle(Q.Styles.EDGE_BUNDLE, false);
			edge.setStyle(Q.Styles.ARROW_TO, false);
			if(e.edgeType && e.edgeType != Q.Consts.EDGE_TYPE_DEFAULT)
				edge.edgeType = e.edgeType;
			edge.name = e.name;
			var edgeId = e.get("edgeId");
			edge.set("edgeId", edgeId);

		}
	}); 
}

//graph鼠标移动监听事件
function onmousemovelistener(evt)
{
	if(pre_ui != null)
	{
		var uiBounds = this.getUIBounds(pre_ui);
		var left = uiBounds.x;
		var right = left + uiBounds.width;
		var top = uiBounds.y;
		var bottom = top + uiBounds.height;
		var point = this.toLogical(evt);
		var cur_x = point.x;
		var cur_y = point.y;
		if(cur_x > left && cur_x < right && cur_y > top && cur_y < bottom){}
		else
		{
			pre_ui.showDetail = !pre_ui.showDetail;
			destroy();
			pre_ui = null;
		}
	}
				
	var element = evt.getData();
				
	if(element)
	{
		if(element instanceof Q.Edge)
			return ;
		if(pre_ui != element)
		{
			if(pre_ui != null)
			{
				pre_ui.showDetail = !pre_ui.showDetail;
			}
			pre_ui = element;
			element.showDetail = !element.showDetail;
			
			var equip_type = element.properties.equip_type;
			var equipId = element.properties.id;
			cur_id = equipId;
			$.ajax({
				type: "POST",
				url: "getEquipById.html",
				data: {"equipId": equipId},
				success: function(result)
				{
					if(result.code == 0)
						return ;
					var equip = result.equip;
					var equip_name = equip.equipName;
					var ip = equip.manageIp;
					var areaUnit = equip.areaUnit;
					var keepUnit = equip.keepUnit;
					var node = null;
					if(equip_type.substring(equip_type.length - 2) == "探针"){
						var probeType = equip.probeType;
						if(probeType == null || probeType == "")
							probeType = equip_type;
						var cpuUsed = equip.cpuUsed;
						var nicUsed = equip.nicUsed;
						var memUsed = equip.memUsed;
						var tasklist = null;
						var SIZE = 0;
						var table_data = [];
						if(result.code == 2)
							tasklist = result.tasklist;
						if(tasklist != null){
							SIZE = tasklist.length;
							
							for(var p = 0; p < SIZE; p ++){
								var task_num = tasklist[p].task_num;
								var task_name = tasklist[p].task_name;
								var tasktarget = tasklist[p].task_target;
								var numof_tasktarget = 0; 
								if(tasktarget != null){
									numof_tasktarget = tasktarget.split(";").length;
								}
								table_data.push([task_num.toString(), task_name.substring(0,6), numof_tasktarget.toString()]);
							}
							SIZE += 1;
						}
						element.set("managerIp", ip);
						element.set("probe_type", probeType);
						element.set("cpu", formatNumber(cpuUsed * 100, 2, "%"));
						element.set("memory", formatNumber(memUsed * 100, 2, "%"));
						element.set("network_card", formatNumber(nicUsed * 100, 2, "%"));
						var H = probe_h + SIZE * table_rect_height;
						element.image = Q.Shapes.getRect(-probe_w / 2, -H / 2, probe_w, H, probe_r, probe_r);
						if(result.code == 2)
							element.set('tableData', {data: table_data});
					}
					else{
						element.set("managerIp", ip);
						element.set("area_unit", areaUnit);
						element.set("keep_unit", keepUnit);
					}
				}
			});
			if(equip_type.substring(equip_type.length - 2) == "探针"){
				timer = setInterval(
					function A(){
						$.ajax({
							type: "POST",
							url: "getEquipById.html",
							data: {"equipId": cur_id},
							success: function(result)
							{
								if(result.code == 0)
									return ;
								var equip = result.equip;
								var cpuUsed = equip.cpuUsed;
								var nicUsed = equip.nicUsed;
								var memUsed = equip.memUsed;
								element.set("cpu", formatNumber(cpuUsed * 100, 2, "%"));
								element.set("memory", formatNumber(memUsed * 100, 2, "%"));
								element.set("network_card", formatNumber(nicUsed * 100, 2, "%"));
							}
						});
				},1000);
			}
		}   
		return;
	}
}

function opendialog(element){
	var deviceId = element.get("id");
	var deviceType = element.get("equip_type");
	
	var widthPx, heightPx;
	if(deviceType == "路由器")
	{
		widthPx = 900;
		heightPx = 430;
	}
	else if(deviceType.substring(deviceType.length - 2) == "探针")
	{
		widthPx = 820;
		heightPx = 400;
	}
	else
	{
		widthPx = 800;
		heightPx = 210;
	}
	
	var equip_info_dialog = document.createElement("div");
	
	$(equip_info_dialog).dialog({
		title: '设备基本信息',
		iconCls: 'icon-search',
        width: widthPx,
        height: heightPx,
        closed: false,
        cache: false,
        href: 'viewEquipInfo.html?deviceType='+deviceType+'&equipId='+deviceId,
        modal: true,
        draggable: false,
        onClose: function () 
        {  
        	$(this).dialog("destroy").remove();
        }
    });
}

//graph鼠标点击事件("更多信息"点击事件)
function onclicklistener(evt){
	var element = evt.getData();
		
	if(!element || !pre_ui)
		return ;
		
	var uiBounds = this.getUIBounds(pre_ui);
	var left = uiBounds.x;
	var right = left + uiBounds.width;
	var top = uiBounds.y;
	var bottom = top + uiBounds.height;
	var point = this.toLogical(evt);
	var cur_x = point.x;
	var cur_y = point.y;

	var type = element.properties.equip_type;
	var table_x, table_y, W, H;
	if(type.substring(type.length - 2) == "探针")
	{
		table_x = probe_table_x;
		table_y = probe_table_y;
		W = probe_w;
		H = probe_h;
	}
	else
	{
		table_x = node_table_x;
		table_y = node_table_y;
		W = node_w;
		H = node_h;
	}
	if(element){
		if(cur_x > left + table_x && cur_x < left + W - 10 && cur_y > top + table_y && cur_y < top + H){
			opendialog(element);
		}

	}
}

function ondblclicklistener(evt)
{

}

var edgeTimer = setInterval(
		function A(){
			model.datas.forEach(function(e){
				if(e instanceof Q.Edge){
					var edgeId = e.get("edgeId");
					$.ajax({
						type: "POST",
						url: "getEdgeById.html",
						data: {"edgeId": edgeId},
						success: function(data){
							if(data.exist == 0)
								return ;
							var eg = data.edge;
							e.setStyle(Q.Styles.EDGE_COLOR, eg.edgeColor);
							e.setStyle(Q.Styles.EDGE_WIDTH, eg.edgeWidth);
						}
					});
				}
				
			});
	},1000);

var nodeTimer = setInterval(
		function A(){
			model.datas.forEach(function(e){
				if(e instanceof Q.Node){
					if(Q.randomBool())
			          {
			              e.setStyle(Q.Styles.RENDER_COLOR, "#00FFFF");
			              return;
			          }
			          e.setStyle(Q.Styles.RENDER_COLOR, "#FF7F00");
				}
				
			});
	},1000);


function destroy(){
    clearTimeout(timer);
}