
/**文件用于日期格式的校验 by zfj 2016-11-8**/

var beginDate = undefined, endDate = undefined;

/* by zfj 2016-11-8
 * 校验日期格式的正确性，起始日期小于终止日期
 * id:表示当前选中的日期的id；d:表示当前选中日期的值；
 * beginDateId:表示起始日期的id；endDateId：表示终止日期的id
 * */
function dateValidator(id,d,beginDateId,endDateId)
{
	var dateFlag = (id == beginDateId);
	beginDate = dateFlag ? d :$("#"+beginDateId).datebox('getValue');	    	/*得到起始日期01/02/2018*/
	endDate = dateFlag ? $("#"+endDateId).datebox('getValue') : d;			    /*得到终止日期02/24/2017*/
	
	var formatBeginDate = new Date(beginDate), formatEndDate = new Date(endDate);
	
	if(dateFlag && (formatBeginDate > formatEndDate))
	{
	  $("#"+beginDateId).datebox('setValue', '');
	}
	if(!dateFlag && (formatBeginDate > formatEndDate))
	{
	  $("#"+endDateId).datebox('setValue', '');
	}
}

/* by zfj 2016-11-22
 * 用于计算两个时间的天数间隔
 * @param beginDate:起始时间,endDate:终止时间2016/11/02
 * @return 返回天数间隔
 * */
function intervalDayFunction(beginDate, endDate)
{
    var d1 = new Date(beginDate);
    var d2 = new Date(endDate);
    var day = (d2.getTime()-d1.getTime())/(24*3600*1000);
    return day;
}

/* by zfj 2016-11-22
 * 格式化时间格式
 * @param date:01/04/2016
 * @return 2016/01/04
 * */
function formatEasyUIDate(date)
{
    var dateArray = date.split("/");
    var y = dateArray[2];
    var m = dateArray[0];
    var d = dateArray[1];
    return y + '/' + m + '/' + d;
}

/* by zfj 2016-11-22
 * 日期增加天数
 * @param date:日期2016/8/12 days:天数
 * @return 添加后的日期
 * */
function addDay(date, days)
{
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    var da = d.getFullYear() + "/" + m + "/" + d.getDate();
    return da;
}

/**
 * 初始化datebox的值
 * d:日期；days：日期+天数
 */
function initDatebox(d,days)
{
	d.setDate(d.getDate()+days);
	var m = d.getMonth()+1;
	return m + "/" + d.getDate() + "/" + d.getFullYear();
}

/**
 * 初始化datetimebox的值
 * d:时间日期; days:日期+天数
 */
function initDateTimeBox(d, days)
{
	d.setDate(d.getDate()+days);
	var m = d.getMonth()+1;
	var dateTime = m+"/"+d.getDate()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	return dateTime;
}
 

