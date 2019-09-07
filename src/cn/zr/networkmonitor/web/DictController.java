package cn.zr.networkmonitor.web;


import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import cn.zr.networkmonitor.domain.Combox;
import cn.zr.networkmonitor.domain.Dict;

import cn.zr.networkmonitor.service.DictService;


/**
 * 字典表的控制器 by zxgm 2016-10-31
 * */
@Controller
public class DictController {
	
	@Autowired
	private DictService dictService;
	

	
	//   weekReportAnalysisForm 中的变量需要全局化
	private String time; 
	private String dayValue;
	private String weekValue;
	private String monthValue;
	private String beginDateValue; 
	private String endDateValue; 
	private String[] checkbox1;//大单位复选框
	private String[] checkbox2;//统计项复选框
	private Date beginDate;//起始日期
	private Date endDate;//终止日期
	private Date date;//选择“天”时   的日期
	private int flag;//用于标识那个时间范围的radio被选中
	
	//通过字典类型得到字典集合
	@RequestMapping("getDictsByDict_type.html")
	@ResponseBody
	public List<Dict> getDictsByDict_type(String dict_type){
		return dictService.getDeviceCategorys(dict_type);
	}
	
	//通过字典类型得到easyui combox格式的数据
	@RequestMapping("getDictsForComboxByDict_type.html")
	@ResponseBody
	public List<Combox> getDictsForComboxByDict_type(String dict_type){
		List<Dict> dictList = dictService.getDeviceCategorys(dict_type);
		List<Combox> comboxList = new ArrayList<Combox>();
		for(Dict dict:dictList){
			Combox combox = new Combox(dict.getDict_numb(),dict.getDict_cont());
			comboxList.add(combox);
		}
		
		return comboxList;
	}
	
	//通过字典表中的字典类型和字典编号得到字典实体
	@RequestMapping("getDictByDictTypeAndDictNumb.html")
	@ResponseBody
	public Dict getDictByDictTypeAndDictNumb(String dict_type, String dict_numb)
	{
		//Map<String, Object> map = new HashMap<String, Object>();
		Dict dict = dictService.getDictByDictTypeAndDictNumb(dict_type, dict_numb);
		//map.put("dict", dict);
		return dict;
	}
	
	 // 对weekReportAnalysis.jsp中的表单进行接收处理并将其值用于weekReportAnalysisTable.html的显示筛选  by TX　2016.11.9
	 
	@RequestMapping("weekReportAnalysisForm.html")
	public void weekReportAnalysisForm(HttpServletRequest req,HttpServletResponse resp) throws UnsupportedEncodingException{
		//System.out.println(" this is weekReportAnalysisForm.html...");
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("text/html;charset=utf-8");
		
		//获得到查询的单位
		checkbox1 = req.getParameterValues("gsdw");
			
		/*List<Dict> list  = dictService.getDeviceCategorys2(checkbox1);
		for(int i=0;i<list.size();i++){
			System.out.println(list.get(i).getDict_cont());
		}*/

		//获得查询的时间
		time = req.getParameter("Time");
		dayValue = req.getParameter("dayValue");
		weekValue = req.getParameter("weekValue");
		monthValue = req.getParameter("monthValue");
		beginDateValue = req.getParameter("beginDateValue");
		endDateValue = req.getParameter("endDateValue");
		if(time!=null){
			if(time.equals("天")){
				try {
					date =new SimpleDateFormat("MM/dd/yyyy").parse(dayValue);
					//System.out.println(date);
					flag=1;
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			if(time.equals("周")){
				System.out.println(weekValue);
				Calendar c = Calendar.getInstance();
				c.set(Calendar.YEAR, 2016);
				
				if(weekValue.equals("thisWeek")){
					int dayOfWeek = c.get(Calendar.DAY_OF_WEEK)-1;
					//System.out.println(dayOfWeek);
					c.add(Calendar.DATE, c.getFirstDayOfWeek()-dayOfWeek);
					beginDate = c.getTime();
					//System.out.println(beginDate);
					c.add(Calendar.DATE, 6);
					endDate = c.getTime();
					//System.out.println(endDate);
				}
				if(weekValue.equals("lastWeek")){
					c.add(Calendar.DATE, -7);
					int dayOfWeek = c.get(Calendar.DAY_OF_WEEK)-1;
					//System.out.println(dayOfWeek);
					c.add(Calendar.DATE, c.getFirstDayOfWeek()-dayOfWeek);
					beginDate = c.getTime();
					//System.out.println(beginDate);
					c.add(Calendar.DATE, 6);
					endDate = c.getTime();
					//System.out.println(endDate);
				}
				if(weekValue.equals("nextWeek")){
					c.add(Calendar.DATE, 7);
					int dayOfWeek = c.get(Calendar.DAY_OF_WEEK)-1;
					//System.out.println(dayOfWeek);
					c.add(Calendar.DATE, c.getFirstDayOfWeek()-dayOfWeek);
					beginDate = c.getTime();
					//System.out.println(beginDate);
					c.add(Calendar.DATE, 6);
					endDate = c.getTime();
					//System.out.println(endDate);
				}
				
				
				
				
				flag=2;
			}
			if(time.equals("月")){
				System.out.println(monthValue);
				Calendar c = Calendar.getInstance();
				c.set(Calendar.YEAR, 2016);
				c.set(Calendar.MONTH,Integer.valueOf(monthValue));
				c.set(Calendar.DAY_OF_MONTH, 1);
				c.add(Calendar.DAY_OF_MONTH, -1);
				endDate = c.getTime();
				c.set(Calendar.DAY_OF_MONTH, 1);
				beginDate = c.getTime();
				flag=3;
			}
			if(time.equals("任意时间")){
				System.out.println(beginDateValue+"     "+endDateValue);
				try {
					beginDate = new SimpleDateFormat("MM/dd/yyyy").parse(beginDateValue);
					endDate = new SimpleDateFormat("MM/dd/yyyy").parse(endDateValue);
					//System.out.println("*&*&*&"+beginDate+"*&*&*&*"+endDate);
				} catch (ParseException e) {
					e.printStackTrace();
				}
				flag=4;
			}
		}
		
		//获得查询的内容
		checkbox2 = req.getParameterValues("ck");
		/*if(checkbox2.length!=0){
			for(int i=0;i<checkbox2.length;i++){
				System.out.println(checkbox2[i]);//可以正确得到对应选项值
			}
		}*/
		
		
		
	}
	
}