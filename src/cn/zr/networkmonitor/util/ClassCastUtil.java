package cn.zr.networkmonitor.util;

/**
 * 类型转化工具类
 * @author zhenrong
 *
 */
public class ClassCastUtil
{
	/**
	 * String array convert to Integer array
	 * @param stringArray
	 * @return
	 */
	public static Integer[] stringArrayToIntArray(String[] stringArray)
	{
		Integer[] result = new Integer[stringArray.length];
		for(int i=0;i<stringArray.length;i++)
		{
			int convertResult = Integer.parseInt(stringArray[i]);
			result[i] =  convertResult;
		}
		
		return result;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) 
	{
		String[] str = {};
		//int[] i = stringArrayToIntArray(str);
		
		//System.out.println(i[1]);

	}

}
