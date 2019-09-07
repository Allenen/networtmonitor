package cn.zr.networkmonitor.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.zr.networkmonitor.domain.AlarmRec;
import cn.zr.networkmonitor.domain.Pair;
import cn.zr.networkmonitor.domain.Task;
import cn.zr.networkmonitor.service.AlarmRecService;
import cn.zr.networkmonitor.test.ManifestIMain;
import cn.zr.networkmonitor.util.ExportExcelUtils;
import cn.zr.networkmonitor.util.ParseJson;

/**
 * 警告控制器 by zfj 2016-10-31
 * */
@Controller
public class AlarmRecController {
	@Autowired
	private AlarmRecService alarmRecService;
	//得到所有的告警记录
	@RequestMapping("listAlarmRecs.html")
	public String getAllAlarmRecs()
	{
		return "forward:/WEB-INF/jsp/alarmInformation/listAlarmRecs.jsp";
	}
	//查询所有的告警记录
	@RequestMapping("listAndSearchAlarmRecs.html")
	public String searchAlarmRecs()
	{
		return "forward:/WEB-INF/jsp/alarmInformation/listAndSearchAlarmRecs.jsp";
	}
	
	//异步获取所有的告警记录
	@RequestMapping("ajaxGetAllUNPAlarmRecs.html")
	@ResponseBody 
	public List<AlarmRec> ajaxGetAllUNPAlarmRecs()
	{
		List<AlarmRec>  returnAlarmRecs = new ArrayList<AlarmRec>();
		List<AlarmRec>  alarmrecs = alarmRecService.getAllUNPandPopAlarmRecs();
		if( alarmrecs != null){
			returnAlarmRecs = alarmrecs;
		}
		return  returnAlarmRecs;

	}
	//异步更新告警记录处理情况
	@RequestMapping(value = "/updateAjaxAlarmRec.html", method = RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateAjaxEquip(HttpEntity<AlarmRec> model)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		AlarmRec alarmRec = model.getBody();
		//System.out.println(alarmRec.getAlarm_first().toLocaleString());
		alarmRecService.updateAlarmRec(alarmRec);
		map.put("success", "true");
		map.put("data", "处理成功");
		return map;
	}
	//异步获取所有
	@RequestMapping("ajaxGetAllAlarmRecs.html")
	@ResponseBody 
	public Map<String, Object> ajaxGetAllEquips()
	{
		Map<String, Object> map = new HashMap<String, Object>();
		List<AlarmRec> alarmRecList =  alarmRecService.getAllAlarmRecsOrderByAlarmNewest();
		
		if (alarmRecList.size() == 0) {
			map.put("data", "null");
		}else {
			map.put("data", alarmRecList);
		}
		
		return map;
	}
	//异步获取所有的设备not order
	@RequestMapping("ajaxGetAllNotorderAlarmRecs.html")
	@ResponseBody 
	public Map<String, Object> ajaxGetAllNotorderEquips()
	{
		Map<String, Object> map = new HashMap<String, Object>();
		List<AlarmRec> alarmRecList =  alarmRecService.getAllAlarmRecs();

		if (alarmRecList.size() == 0) {
			map.put("data", "null");
		}else {
			map.put("data", alarmRecList);
		}
		
		return map;
	}
	//分类查询
	@RequestMapping(value = "/ajaxgetAllMainkind.html",method=RequestMethod.POST)
	@ResponseBody
	public List<Pair> getallKind(){
		List allkinds = alarmRecService.getAlarmRecsByGroupByAlarmMainkind();
		List<Pair> all =  new ArrayList<Pair>();
		for(int i=0;i<allkinds.size();i++){
			Pair pair = new Pair();
			Object[] objects = (Object[]) allkinds.get(i);
			Long longvalue = (Long) objects[1];
			pair.setValue(longvalue.intValue());
			pair.setName((String)objects[0]);
			all.add(pair);
		}
		return all;
		
	}
	//分类查询
	@RequestMapping(value = "/ajaxgetAllSubkind.html",method=RequestMethod.POST)
	@ResponseBody
	public List<Pair> getallsubKind(){
		List allkinds = alarmRecService.getAlarmRecsByGroupByAlarmSubkind();
		List<Pair> all =  new ArrayList<Pair>();
		for(int i=0;i<allkinds.size();i++){
			Pair pair = new Pair();
			Object[] objects = (Object[]) allkinds.get(i);
			Long longvalue = (Long) objects[1];
			pair.setValue(longvalue.intValue());
			pair.setName((String)objects[0]);
			all.add(pair);
		}
		return all;
		
	}
	//分类查询
	@RequestMapping(value = "/ajaxgetAllLevel.html",method=RequestMethod.POST)
	@ResponseBody
	public List<Pair> getallLevel(){
		List allkinds = alarmRecService.getAlarmRecsByGroupByAlarmLevel();
		List<Pair> all =  new ArrayList<Pair>();
		for(int i=0;i<allkinds.size();i++){
			Pair pair = new Pair();
			Object[] objects = (Object[]) allkinds.get(i);
			Long longvalue = (Long) objects[1];
			pair.setValue(longvalue.intValue());
			pair.setName((String)objects[0]);
			all.add(pair);
		}
		return all;
		
	}
	//导出所有的具体的告警信息
	
	@RequestMapping(value = "/exportAllColAlarmRecExcel.html",method=RequestMethod.POST)
	public void exportAllColAlarmRecExcel(@RequestParam("alarmRecs") String alarmRecs,HttpServletResponse response)
	{
		//System.out.println(alarmRecs);
		List<AlarmRec> alarmRecs2 = ParseJson.jsonStringToCollection(alarmRecs,AlarmRec.class);
		String title = "所有告警信息导出";  
	    String[] rowsName = new String[]{"序号","告警设备名称","告警IP地址","告警主类别","告警子类别","首次告警时间","最新告警时间","历时（分钟）","告警等级"};  
	    List<Object[]>  dataList = new ArrayList<Object[]>();  
	    Object[] objs = null;  
//	  
//	   //System.out.println("数据填充完毕");
	   for (int i = 0; i < alarmRecs2.size(); i++) {  
	    AlarmRec alarmRec = alarmRecs2.get(i);  
	    objs = new Object[rowsName.length];
	    objs[0]=i+1;
	    objs[1]=alarmRec.getAlarm_equipName();
	    objs[2] = alarmRec.getAlarm_ip();
	    objs[3] = alarmRec.getAlarm_mainkind();
	    objs[4] = alarmRec.getAlarm_subkind();  
	    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    objs[5] = df.format(alarmRec.getAlarm_first()); 
	    objs[6] = df.format(alarmRec.getAlarm_newest()); 
	   // System.out.println(alarmRec.getAlarm_newest());
	    //System.out.println(df.format(alarmRec.getAlarm_newest()));
	   
	    objs[7] = alarmRec.getAlarmKeepMinute();
	    objs[8] =  alarmRec.getAlarm_level();
	    dataList.add(objs);  
	   }  
	   
		ExportExcelUtils excelUtils = new ExportExcelUtils(title, rowsName, dataList);
	    try  
          {  
              String fileName = "Excel-" + String.valueOf(System.currentTimeMillis()).substring(4, 13) + ".xls";  
              String headStr = "attachment; filename=\"" + fileName + "\"";   
              response.setContentType("APPLICATION/OCTET-STREAM");  
              response.setHeader("Content-Disposition", headStr);  
              ServletOutputStream out = response.getOutputStream(); 
              excelUtils.export().write(out);  
          }  
          catch (IOException e)  
          {  
              e.printStackTrace();  
          }  
		
		
	}
	//导出所有的告警信息 
	@RequestMapping(value = "/exportAlarmRecExcel.html",method=RequestMethod.POST)
	public void exportAlarmRecExcel(@RequestParam("alarmRecs") String alarmRecs,HttpServletResponse response)
	{
		//System.out.println(alarmRecs);
		List<AlarmRec> alarmRecs2 = ParseJson.jsonStringToCollection(alarmRecs,AlarmRec.class);
		String title = "最新告警信息导出";  
	    String[] rowsName = new String[]{"序号","告警时间","设备名称","告警名称","告警等级","历时（分钟）","告警IP地址"};  
	    List<Object[]>  dataList = new ArrayList<Object[]>();  
	    Object[] objs = null;  
//	  
//	   //System.out.println("数据填充完毕");
	   for (int i = 0; i < alarmRecs2.size(); i++) {  
	    AlarmRec alarmRec = alarmRecs2.get(i);  
	    objs = new Object[rowsName.length];
	    objs[0]=i+1;
	    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    objs[1] = df.format(alarmRec.getAlarm_newest()); 
	   // System.out.println(alarmRec.getAlarm_newest());
	    //System.out.println(df.format(alarmRec.getAlarm_newest()));
	    objs[2] = alarmRec.getAlarm_equipName();  
	    objs[3] = alarmRec.getAlarm_subkind();  
	    objs[4] = alarmRec.getAlarm_level();
	    objs[5] = alarmRec.getAlarmKeepMinute();  
	    objs[6] = alarmRec.getAlarm_ip();  
	    dataList.add(objs);  
	   }  
	   
		ExportExcelUtils excelUtils = new ExportExcelUtils(title, rowsName, dataList);
	    try  
          {  
              String fileName = "Excel-" + String.valueOf(System.currentTimeMillis()).substring(4, 13) + ".xls";  
              String headStr = "attachment; filename=\"" + fileName + "\"";   
              response.setContentType("APPLICATION/OCTET-STREAM");  
              response.setHeader("Content-Disposition", headStr);  
              ServletOutputStream out = response.getOutputStream(); 
              excelUtils.export().write(out);  
          }  
          catch (IOException e)  
          {  
              e.printStackTrace();  
          }  
		
		
	}
}
