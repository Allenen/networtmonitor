package cn.zr.networkmonitor.util;


import java.util.List;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import cn.zr.networkmonitor.domain.AlarmRec;



public class ParseJson{

	
	/**
	 * 将对象转换为Json字符串
	 * 
	 * @author 
	 
	static String objectToJsonString(){
		//JSONObject jsonObject = JSONObject.fromObject(new User(1, "张三", "男"));
	    return jsonObject.toString();
	}
	*/
	
	/**
	 * 将Json字符串转换为对象
	 * 
	 * @author 高焕杰
	 */
	static void jsonStringToObject(String jsonString){
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
	//	User user = (User)JSONObject.toBean(jsonObject, User.class);
		//System.out.println(user);
	}
	
	/**
	 * 将集合转换为Json字符串
	 * 
	 * @author 高焕杰
	 
	static String collectionToJsonString(){
	//	List<User> userList = new ArrayList<User>();
	//	userList.add(new User(1, "张三", "男"));
	//	userList.add(new User(2, "李四", "女"));
	//	userList.add(new User(3, "王五", "男"));
		JSONArray jsonArray = JSONArray.fromObject(userList);
	    return jsonArray.toString();
	}
	*/

	/**
	 * 将Json字符串转换为集合
	 * 
	 * @author 高焕杰
	 */
	/*public static List<AlarmRec> jsonStringToCollection(String jsonString){
		String[] dateFormats = new String[]{"yyyy-MM-dd HH:mm:ss"};
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
		JSONArray jsonArray = JSONArray.fromObject(jsonString);
		
		List<AlarmRec> alarmRecList = (List<AlarmRec>)JSONArray.toCollection(jsonArray, AlarmRec.class);
		
	    return alarmRecList;
	}*/
	
	/**
	 * 将JSON字符串转化为集合
	 * @param jsonString JSON字符串
	 * @param c class类型
	 * @return
	 */
	public static <T> List<T> jsonStringToCollection(String jsonString, Class c)
	{
		String[] dateFormats = new String[]{"yyyy-MM-dd HH:mm:ss"};
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
		JSONArray jsonArray = JSONArray.fromObject(jsonString);
		List<T> list = (List<T>) JSONArray.toCollection(jsonArray, c);
		return list;
	}
}
