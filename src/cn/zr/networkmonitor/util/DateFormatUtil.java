package cn.zr.networkmonitor.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatUtil {
	
	//毫秒, 秒, 分, 时, 天, 月, 年
	public enum TimeType
	{
		MILLISECOND, SECOND, MINUTE, HOUR, DAY, MONTH, YEAR
	}
	
	//格式化日期类型
	public static Date formatDate(String dateString, String pattern)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		Date date = null;
		try {
			date = simpleDateFormat.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	/**
	 * by zxgm 2016-11-27
	 * 日期格式转化 11/03/2016 00:00:00格式转化为2016-11-03 00:00:00
	 * @param str：待转化日期
	 * @return 转化后日期
	 */
	public static String stringConvertToString(String str)
	{
		String[] strArray = str.split("/");
		String month = strArray[0];
		String day = strArray[1];
		String yearDateTime = strArray[2];
		String[] yearDateTimeArray = yearDateTime.split(" ");
		if(yearDateTimeArray.length == 1)//11/03/2016没有具体的时间
		{
			return yearDateTime+"-"+month+"-"+day;
		}else
		{
			String year = yearDateTimeArray[0];
			String dateTime = yearDateTimeArray[1];
			return year+"-"+month+"-"+day+" "+dateTime;
		}
		
	}
	
	/**
	 * 日期相减
	 * @param beginDate 起始时间
	 * @param endDate 终止时间
	 * @param timeType 返回类型
	 * @return 返回时间
	 */
	public static double getTime(Date beginDate, Date endDate, TimeType timeType)
	{
		long time =  endDate.getTime() - beginDate.getTime();
		long intervalTime = 0;
		switch (timeType)
		{
		case MILLISECOND:
			intervalTime = time;
			break;
		case SECOND:
			intervalTime = time/1000;
			break;
		case MINUTE:
			intervalTime = time/60/1000;
			break;
		case HOUR:
			intervalTime = time/(60*60)/1000;
			break;
		case DAY:
			intervalTime = time/(60*60*24)/1000;
			break;
		case MONTH:
					
			break;
		case YEAR:
			
			break;

		default:
			break;
		}
		
		return intervalTime;
	}
}
