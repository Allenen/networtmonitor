/**
 * 任务创建中目标设备的移动
 */

//点击移动按钮移动项
function moveOptionButtonTrigger(obj, direction)
{
    var leftDivObj, rightDivObj;
    var parentNode = $(obj).parent().parent();
    if(direction === "leftToRight")
    {
        leftDivObj = $(parentNode).children().eq(0).children();
        rightDivObj =$(parentNode) .children().eq(2).children();
    }else{
        leftDivObj = $(obj).parent().parent().prev().children().eq(2).children();
        rightDivObj = $(obj).parent().parent().prev().children().eq(0).children();
    }

    moveAction(leftDivObj, rightDivObj);
}


//双击移动效果(目标设备列表)
function moveOptionDbclickTrigger(obj, direction)
{
    var rightDivObj;
    if (direction === "leftToRight")
    {
        rightDivObj = $(obj).parent().parent().children().eq(2).children();
    }else{
        rightDivObj = $(obj).parent().parent().children().eq(0).children();
    }

    var leftDivObj = obj;
    moveAction(leftDivObj, rightDivObj);
}

//移动的动作
function moveAction(leftDivObj, rightDivObj)
{
    var leftSelectOption = $(leftDivObj).children();
    for(var i=0;i<leftSelectOption.length;i++)
    {
        if (leftSelectOption.eq(i).is(":selected"))
        {
            $( rightDivObj).append(leftSelectOption.eq(i));
        }
    }
}

//返回已选目标设备
function getChooseTargetEquips(DLatencyChooseTargetDevicesId)
{
	 var rightOption = $(DLatencyChooseTargetDevicesId).children();
	 
	 var task_target="";
	 for(var i=0;i<rightOption.length;i++)
	 {
		 task_target = task_target+rightOption.eq(i).val()+";";
	 }
	 
	 return task_target;
}