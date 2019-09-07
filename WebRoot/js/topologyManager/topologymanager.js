
var graph, model;
var panel_flag = false;
var graphElement = null;
var selection = [];
var styles = {};
styles[Q.Styles.SELECTION_COLOR] = "#E21667";

$(function(){
    Q.addCSSRule(".maximize", "margin: 0px !important;position: fixed !important;top: 0px;bottom: 0px;right: 0px;left: 0px;z-index: 1030;height: auto !important; width: auto !important;");
    graph = new Q.Graph("canvas");
	model = graph.graphModel;
    
    graph.styles = styles;

    graph.originAtCenter = false;
    graph.editable = false;
	graph.enableTooltip = false;
	
	
	graph.onElementCreated = onElementCreatedlistener;
	graph.onkeydown = onkeydownlistener;
	graph.ondblclick = ondblclicklistener;
	graph.onstart2 = onstartlistener;
	
	model.selectionChangeDispatcher.addListener(selectionChangelistener);
	model.dataChangeDispatcher.addListener({onEvent: dataChangelistener});

    initToolbar();
    getTopologyImage_and_getBottomImage();

	
	//监听面板调整大小事件，同步graph大小
    $('#center_panel').panel({
        onResize: function (w, h) {
            graph.updateViewport();
        }
    }); 
    
    $('#mm').menu({
        onClick:function(item){
        	menuListener(this, item.name);
        }
    });
    $('#mm_router').menu({
        onClick:function(item){
        	menuListener_router(this, item.name);
        }
    });
});




function getTopologyImage_and_getBottomImage(){
	//获得所有设置为显示的拓扑图
	var toolbox = document.getElementById("toolbox");
	$.ajax({
		type:"POST",
		url:"getTopologyImage.html",
		success:function(data){
			for(var i = 0; i < data.length; i ++){
				var imagepath = "images/topologyImages/"+data[i].topologyImageName;
				var imgtype = "Node";
				var devicename = data[i].topologyImageName;
				var devicetype = data[i].topologyImageType;
				createDNDImage(toolbox, imagepath, imgtype, devicename, devicetype);
			}
		},
		error:function(){
			alert("获取拓扑图失败");
		}
	});
	
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

function createImg(srcPath,imagePath,imgElementType,deviceName,deviceType)
{
	var toolbox = document.getElementById("toolbox");
	var imgElement = document.createElement("img");
	imgElement.setAttribute("src",srcPath);
 
	imgElement.setAttribute("draggable","true");
	imgElement.setAttribute("ondragstart","drag(event)");
	imgElement.setAttribute("title", imgElementType);
	imgElement.setAttribute("image",imagePath);
	imgElement.setAttribute("type",imgElementType);
	imgElement.setAttribute("label",deviceName);
	imgElement.setAttribute("deviceType",deviceType);
	
	toolbox.appendChild(imgElement);
    return imgElement;
} 

function ensureVisible(node){
    var bounds = graph.getUIBounds(node);
    var viewportBounds = graph.viewportBounds;
    if(!viewportBounds.contains(bounds)){
        graph.sendToTop(node);
        graph.centerTo(node.x, node.y);
    }
}

function setInteractionMode(evt, info){
    graph.interactionMode = info.value;
    currentInteractionMode = info.value;
    if(info.value == Q.Consts.INTERACTION_MODE_CREATE_EDGE){
        graph.edgeUIClass = info.edgeUIClass;
        graph.edgeType = info.edgeType;
    }
}


function initToolbar(){
    var toolbar = document.getElementById("toolbar");
    var buttons = {
        interactionModes:[{name: "默认模式", value: Q.Consts.INTERACTION_MODE_DEFAULT, selected: true, icon:'images/toolbar/default_icon.png', action: setInteractionMode},
            {name: '框选模式', value: Q.Consts.INTERACTION_MODE_SELECTION, icon:'images/toolbar/rectangle_selection_icon.png', action: setInteractionMode},
            {name: '浏览模式', value: Q.Consts.INTERACTION_MODE_VIEW, icon:'images/toolbar/pan_icon.png', action: setInteractionMode}],
	    
        edge: [
			{name: '普通连线', value: Q.Consts.INTERACTION_MODE_CREATE_EDGE, icon:'images/toolbar/edge_icon.png', action: setInteractionMode},
			{name: '正交直线', value: Q.Consts.INTERACTION_MODE_CREATE_EDGE, icon:'images/toolbar/edge_orthogonal_icon.png', action: setInteractionMode, edgeType: Q.Consts.EDGE_TYPE_ORTHOGONAL_HORIZONTAL}
		],	
		
        zoom: [{name: "放大", icon:"images/toolbar/zoomin_icon.png", action: function(){graph.zoomIn();}},
            {name: "缩小", icon:"images/toolbar/zoomout_icon.png", action: function(){graph.zoomOut();}},
            {name: "1:1", action: function(){graph.scale = 1;}},
            {name: '纵览', icon:'images/toolbar/overview_icon.png', action: function(){this.zoomToOverview();}},
        ],
			
        find: {name: '查找', type: "input", action: function(evt, info){  find_element(info);   }},
		
		save:{name: '保存拓扑JSON文件', icon: 'images/toolbar/save.png', action:function(evt, info){   onsavelistener();	 }},
		
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


function load_json_file(info){
	var files = info.files;
	if (!files[0]) {
        return;
    }
	var fileReader = new FileReader();
	fileReader.onload = function (evt) {
		graph.clear();
		graph.parseJSON(fileReader.result);
		model.datas.forEach(function(e){
			
			if(e instanceof Q.Node)
			{
				var equipId = e.get("deviceId");
				$.ajax({
					type: "POST",
					url: "getEquipByEquipId1.html",
					data: {"equipId": equipId},
					success: function(data){
						var equip = data.equip;
						e.name = equip.equipName;
					}
				});
			}
		});
    };
    fileReader.readAsText(files[0], 'utf-8');
}

function refresh_page(){
	//刷新当前页面
	$.ajax({
		type: "POST",
		url: "refresh.html",
		success:function(data)
		{
			window.location.href = "topologymanager.html"; 
		}
	 });	
}

function onsavelistener(){

	$("#save_dialog").dialog({
		title: "保存当前拓扑图",
		autoOpen: false,
		collapsible: true,
	    modal: true,
	    buttons: [
	    { //设置下方按钮数组  
           text: 'OK',  
           iconCls: 'icon-ok',  
           handler: function()
           {  
        	   
        	   var filename = $("#filename").val();
        	   if(filename == "请输入文件名"){

        		   return ;
        	   }
        	   else{
        		   $('#save_dialog').dialog('close'); 
        	   }  
        	    
        	   $.ajax({
                   type: "POST",
                   url: "saveTopology.html",
                   data: {"json": JSON.stringify(graph.toJSON()), "filename": filename},
                   dataType: "json",
                   success: function(data)
                   {
                     if (data.code == 0) 
                     {
                    	 $.messager.show({
         					title: '消息提示',
         					msg: '保存拓扑成功!',
         					timeout: 1500,
         					showType: 'slide' });
                      }
                   }
                });
           }
	    },
	    {  
           text: 'Cancel',  
           iconCls: "icon-cancel",
           handler: function()
           {  
        	   $('#dd').dialog('close');  
           }  
	    }] 
	});
}

function openInterfaceDialog(element)
{
	var deviceId = element.get("deviceId");
	var deviceType = element.get("deviceType");
	
	var divElement = document.createElement("div");
	divElement.id = "showEquipInterface";
	$(divElement).dialog({
		title: '设备接口信息',
		iconCls: "icon-edit",
        width: 1100,
        height: 250,
        closed: false,
        cache: false,
        href: 'getEquipInterfaceInfo.html?deviceType='+deviceType+'&equipId='+deviceId,
        modal: true,
        draggable: false,
        onClose: function () {  
        	$(this).dialog("destroy").remove();
        }
    });
}

function opendialog(element){
	var deviceId = element.get("deviceId");
	var deviceType = element.get("deviceType");
	
	var widthPx, heightPx;
	if(deviceType == "路由器")
	{
		widthPx = 900;
		heightPx = 450;
	}
	else if(deviceType.substring(deviceType.length - 2) == "探针")
	{
		widthPx = 820;
		heightPx = 420;
	}
	else
	{
		widthPx = 800;
		heightPx = 230;
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
        	element.name = $('input[name=equipName]')[0].value;
        	$(this).dialog("destroy").remove();
        }
    });
}

function onElementCreatedlistener(element, evt) {
	
    if (element instanceof Q.Edge) {

		element.setStyle(Q.Styles.ARROW_TO, false);
		element.name = "";
		var edgeId = guid();
		element.set("edgeId", edgeId);
		$.ajax({
			type: "POST",
			url: "addEdge.html",
			data: {"edgeId": edgeId},
			success: function(data){
				Q.log(data);
			}
		});
        return;
    }
	if(element instanceof Q.Node){
		var widthPx,heightPx;
		var deviceType = evt.dataTransfer.getData("deviceType");
		var equipId = guid();
		element.set("deviceType", deviceType);
		element.set("deviceId", equipId);
	  
		if(deviceType == "路由器")
		{
			widthPx = 900;
			heightPx = 450;
		}
		else if(deviceType.substring(deviceType.length - 2) == "探针")
		{
			widthPx = 820;
			heightPx = 420;
		}
		else
		{
			widthPx = 800;
			heightPx = 230;
		}
		
		var div_Element = document.createElement("div");
		div_Element.id = "showEquipUI";
		var close_after_save_flag = 0;
		$(div_Element).dialog({
			title: '设备基本信息',
			iconCls: "icon-edit",
	        width: widthPx,
	        height: heightPx,
	        closed: false,
	        cache: false,
	        href: 'addEquip.html?deviceType=' + deviceType + '&equipId=' + equipId,
	        modal: true,
	        draggable: false,
	        onClose: function () {  
	        	//Q.log($("input[name=is_saved_flag]"));
	        	var is_saved_flag = $("input[name=is_saved_flag]")[0].value;
	        	//Q.log(is_saved_flag);
	        	if(is_saved_flag == "no"){
	        		model.remove(element); 
	        		return ;
	        	} 
	        	element.name = $('input[name=equipName]')[0].value;
	        	$("input[name=is_saved_flag]").val("no");
	        	$(this).dialog("destroy").remove();
	        }
	      });			
	}
	
} 

function onkeydownlistener(evt)
{
	var c = evt.key;
	if(c == "Delete" && selection){
		model.remove(selection);
		selection = [];
	}
}

function selectionChangelistener(evt){
	if(evt.kind == "add"){
		if(evt.data.length > 0){
			evt.data.forEach(function(e){selection.push(e);});
		}
		else {
			selection.push(evt.data);
		}
	}
	else if(evt.kind == "clear"){
		selection = [];
	}
}

function dataChangelistener(evt)
{
	
}

function ondblclicklistener(evt)
{
	var element = graph.getElementByMouseEvent(evt);
	if(!element) return;
	opendialog(element);
	
}

function doNothing(){  
    window.event.returnValue = false;  
    return false;  
}  
/**
 * 上下文菜单触发动作
 * @param menu
 * @param type
 * @return
 */
function menuListener(menu, type){
    var element = $(menu).data("node");
    switch(type)
    {
    case 1:  //编辑
    	opendialog(element);
    	break;
    case 2:  //重命名
    	
    	break;
    case 3:  //删除
    	model.remove(element);
    	break;
    }
}
function menuListener_router(menu, type)
{
	var element = $(menu).data("node");
    switch(type)
    {
    case 1:  //编辑基本信息
    	opendialog(element);
    	break;
    case 2:  //编辑接口信息
    	openInterfaceDialog(element);
    	break;
    case 3:  //重命名
    	
    	break;
    case 4:  //删除
    	model.remove(element);
    	break;
    }
}

function onstartlistener(evt){
	
	var element = evt.getData();
	if(element instanceof Q.Node){
		if(element.get("deviceType") == "路由器"){
			$("#mm_router").menu('show', {
		        left: evt.x,
		        top: evt.y,
		    }).data("node", element);
		}else{
			$("#mm").menu('show', {
		        left: evt.x,
		        top: evt.y,
		    }).data("node", element);
		};
	};

}

function S4()
{
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid()
{
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
