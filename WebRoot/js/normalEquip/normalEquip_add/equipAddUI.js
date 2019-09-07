

function showEquipUI(deviceType){
	var equipId = guid();
	if(deviceType == "路由器")
	{
		widthPx = 1000;
		heightPx = 450;
	}
	else if(deviceType.substring(deviceType.length - 2) == "探针")
	{
		widthPx = 900;
		heightPx = 430;
	}
	else
	{
		widthPx = 900;
		heightPx = 250;
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
        	$(this).dialog("destroy").remove();
        }
      });
}

function S4()
{
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid()
{
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}



