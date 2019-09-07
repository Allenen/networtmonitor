/**
* 用于动态生成easyui的tab
* @param title
* @param url
* @return
*/
var setting = {
	view: {	showLine: false    },
	data: {
		simpleData: {
            enable: true
        }
    }
};

var zNodes_managerNavigation =[
    { id:1, pId:0, name:"设备管理", open:true, iconOpen:"images/menu/设备管理_开.png", iconClose:"images/menu/设备管理_关.png" },
    { id:11, pId:1, name:"设备列表", icon:"images/menu/设备列表.png",click:"addTab('设备列表','listEquips.html')"},
    { id:12, pId:1, name:"设备添加", icon:"images/menu/设备添加.png",click:"addTab('设备添加','equipAddUI.html')"},

    { id:2, pId:0, name:"拓扑管理", open:true, iconOpen:"images/menu/拓扑管理_开.png",iconClose:"images/menu/拓扑管理_关.png"},
    
    { id:21, pId:2, name:"拓扑管理", icon:"images/menu/拓扑管理.png",click:"addTab('拓扑管理','topologymanager.html')"},
    { id:21, pId:2, name:"设备状态", icon:"images/menu/拓扑管理.png",click:"addTab('设备状态','devicestatus.html')"},
    { id:22, pId:2, name:"底图设置", icon:"images/menu/底图设置.png",click:"addTab('底图设置','bottomManager.html')"},
    { id:23, pId:2, name:"域管理设置", icon:"images/menu/域管理设置.png",click:"addTab('域管理设置','topologyimagemanager.html')"},

    { id:3, pId:0, name:"任务管理", open:true ,iconOpen:"images/menu/任务管理_开.png",iconClose:"images/menu/任务管理_关.png"},
    { id:31, pId:3, name:"任务列表",icon:"images/menu/任务列表.png",click:"addTab('任务列表','listTasks.html')"},
    { id:32, pId:3, name:"任务创建",icon:"images/menu/普通方式创建.png",click:"addTab('任务创建','taskAddUI.html')"},

    { id:4, pId:0, name:"用户管理", open:true,iconOpen:"images/menu/用户管理_开.png",iconClose:"images/menu/用户管理_关.png" },
    { id:41, pId:4, name:"用户列表", icon:"images/menu/用户列表.png",click:"addTab('用户列表','usermanager.html')"},

    { id:5, pId:0, name:"告警信息", open:true,iconOpen:"images/menu/告警信息_开.png",iconClose:"images/menu/告警信息_关.png" },
    { id:51, pId:5, name:"最新告警信息",icon:"images/menu/最新告警信息.png",click:"addTab('最新告警信息','listAlarmRecs.html')"},

];
 
 $(document).ready(function(){
     $.fn.zTree.init($("#managerNavigationTree"), setting, zNodes_managerNavigation);
 });

function addTab(title, url){
	var tt = $("#tt");
	if(tt.tabs('exists', title))
	{
		tt.tabs('select', title);
	}
	else
	{
		var content='<iframe scrolling="auto" frameborder="0" src="'+url+'" style="overflow:hidden;width:100%;height:99%;"></iframe>';
        tt.tabs('add',{
            title:title,
            content:content,
            closable:true
        });
	}
}
/**
 * 退出当前登录页面
 */
function exit(){
	$.ajax({   
        type : 'POST',   
        url : 'exit.html',   
        success : function(data) {
        	if(data == "success"){
        		window.location.href = "login.html";
        	}
        },   
        error : function(XMLHttpRequest, textStatus, errorThrown) {}   
    });
}
/**
 * 用户页面
 */

function usermanager(){
	addTab("用户列表", "usermanager.html");
}