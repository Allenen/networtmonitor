/** 快捷任务创建相关的js文件 **/

//存储已选目标设备,右侧画布对象,主体设备
var m_chooseTargetDevices = [],m_graphRight = undefined,m_taskSubject = undefined;
/**
 * 文档加载完成
 */
$(function(){
	//1.任务类型下拉列表
	$("#iconTaskType").combobox({
		url:"getTaskNameFromDict.html",
		valueField:"dict_numb",
		textField:"dict_cont",
		onSelect:function(rec)//选中任务触发
		{
			if(rec.dict_numb == 5)
			{
				$("#canvasLeft").hide();
				iconPathTask();
			}else{
				$("#canvasLeft").show();
			}
			$("#iconTaskName").textbox("setValue",rec.dict_cont+new Date().toLocaleString());
			m_chooseTargetDevices.length = 0;//选中下拉选框，清空数组
			isSubject = true;
			m_graphRight.clear();//清空右侧画布
		},
		onLoadSuccess:function(data)//数据加载成功的时候触发
		{
			if(data.length > 0)
				$("#iconTaskType").combobox("select",data[0].dict_numb);
		}
	});
	
	
});