package cn.zr.networkmonitor.util;

/**
 * 对数组进行操作的工具类
 * @author zhenrong
 *
 */
public class ArraysOperationUtil
{
	
	/**
	 * 返回组合两个数组的数据
	 * @param a
	 * @param b
	 * @return
	 */
	public static Integer[] combi(Integer[] a,Integer[] b)
	{
		Integer[] o = new Integer[a.length+b.length];
		for(int i=0;i<a.length;i++)
			o[i]=a[i];
		for(int j=0;j<b.length;j++)
			o[a.length]=b[j];
		return o;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args)
	{

	}

}
