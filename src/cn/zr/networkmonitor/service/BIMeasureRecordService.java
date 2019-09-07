package cn.zr.networkmonitor.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.BIMeasureRecordDao;
import cn.zr.networkmonitor.domain.BIMeasureRecord;
import cn.zr.networkmonitor.util.DateFormatUtil;

@Service
@Transactional
@SuppressWarnings("unchecked")
public class BIMeasureRecordService {
	
	@Autowired
	private BIMeasureRecordDao biMeasureRecordDao;
	
	//获取所有的实体信息   by TX 2016.11.2
	public List<BIMeasureRecord> getAllBIMeasureRecords()
	{
		return biMeasureRecordDao.loadAll();
	}
	
	//根据任务ID得到测量数据
	public List<BIMeasureRecord> getBIMeasureRecordsByTaskNum(int taskNum)
	{
		List<BIMeasureRecord> biMeasureRecords = biMeasureRecordDao.find("from BIMeasureRecord where taskNum = ?",taskNum);
		
		return biMeasureRecords;
	}

	
	//（目标设备字符串，起始时间，结束时间，选中任务）
	public List<BIMeasureRecord> getBIMeasureRecords(String targetDeviceList,
			String beginTime, String endTime, int taskNum) {
		String hql="from BIMeasureRecord";
		boolean targetDeviceFlag = false;
		String[] targetDevices = targetDeviceList.split(";");
		if (!targetDeviceList.equals("")&&targetDevices.length != 0) {//选中设备类型
			targetDeviceFlag = true;
			hql+=" where (testTarget = ?";
			for(int i = 1;i<targetDevices.length;i++)
				hql+=" or testTarget=?";
			hql+=")";
		}
		
		if (targetDeviceFlag) {
			hql+=" and testTime between '"+beginTime+"' and '"+endTime+"' and taskNum = '"+taskNum+"'";
		}else {
			hql+=" where testTime between '"+beginTime+"' and '"+endTime+"' and taskNum = '"+taskNum+"'";
		}
		
		if (targetDeviceFlag) {
			return biMeasureRecordDao.find(hql,targetDevices);
		}else{
			return biMeasureRecordDao.find(hql);
		}
		
	}

	public List<BIMeasureRecord> getBIMeasureData(String beginDateString,
			String endDateString, String taskName, String checkboxValueListString, String taskNum) {
		Date beginDate=null, endDate=null;
		String[] checkboxValueList;
		
		List<BIMeasureRecord> biMeasureRecordsCopy = new ArrayList<BIMeasureRecord>();
		biMeasureRecordsCopy.clear();
		if (checkboxValueListString != "") {
			checkboxValueList = checkboxValueListString.split(";");
			System.out.println(checkboxValueList.length);
		}
		
		try {
			beginDate = new SimpleDateFormat("yyyy/MM/dd").parse(beginDateString);
			endDate = new SimpleDateFormat("yyyy/MM/dd").parse(endDateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		if(taskName.contains("双向")){
			List<BIMeasureRecord> biMeasureRecords = biMeasureRecordDao.find("from BIMeasureRecord where testTime between ? and ? and taskNum=?", beginDate, endDate,Integer.parseInt(taskNum));
			if (checkboxValueListString == "") {
				return biMeasureRecords;
			}else{
				checkboxValueList = checkboxValueListString.split(";");
				for(BIMeasureRecord measureRecord:biMeasureRecords){
					for (int i = 0; i < checkboxValueList.length; i++) {
						if (measureRecord.getTestTarget().equals(checkboxValueList[i])) {
							biMeasureRecordsCopy.add(measureRecord);
						}
					}
				}
				return biMeasureRecordsCopy;
			}
			
		}
		return null;
	}

	/*根据时间条件、管理ip查询双向时延测量数据*/
	public List<BIMeasureRecord> getBIMeasureData(String beginDateString,
			String endDateString, String deviceManagerIP) {
		//Map<String, Date> dateMap = stringConvertToDate(beginDateString, endDateString);
		//List<BIMeasureRecord> biMeasureRecords = biMeasureRecordDao.find("from BIMeasureRecord where testTime between ? and ? and testTarget=?", dateMap.get("beginDate"), dateMap.get("endDate"), deviceManagerIP);
		
		//return new ArrayList<BIMeasureRecord>();
			Date beginDate=null, endDate=null;
		try {
			beginDate = new SimpleDateFormat("yyyy/MM/dd").parse(beginDateString);
			endDate = new SimpleDateFormat("yyyy/MM/dd").parse(endDateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		List<BIMeasureRecord> biMeasureRecords = biMeasureRecordDao.find("from BIMeasureRecord where testTime between ? and ? and testTarget=?", beginDate, endDate, deviceManagerIP);
		
		return biMeasureRecords;
	}
	
	/*util将日期的字符串转化为日期工具方法  mm/dd/yyyy HH:mm:ss转化为yyyy-mm-dd HH:mm:ss*/
	private Date stringConvertToDate(String datetimeStr)
	{
		Date datetimeDate = null;
		try {
			datetimeDate = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse(datetimeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return datetimeDate;
	}
	

	/*根据时间条件、任务号查询双向时延测量数据*/
	public List<BIMeasureRecord> getBIMeasureRecordsByCondition(
			String startTestTime, String endTestTime, String taskNum) {
		Date beginDate = stringConvertToDate(startTestTime);
		Date endDate = stringConvertToDate(endTestTime);
		return biMeasureRecordDao.find("from BIMeasureRecord where testTime between ? and ? and taskNum = ?",beginDate, endDate, Integer.parseInt(taskNum));
	}

	/*满足日期、目标设备和任务号条件双向时延测量数据查询 by zxgm 2016-11-3 */
	public List<BIMeasureRecord> getBIMeasureRecordsByCondition(
			String startTestTime, String endTestTime, String taskNum,
			String taskTargetIdString) {
		//Date beginDate = stringConvertToDate(startTestTime);
		//Date endDate = stringConvertToDate(endTestTime);
		startTestTime = DateFormatUtil.stringConvertToString(startTestTime);
		endTestTime = DateFormatUtil.stringConvertToString(endTestTime);
		
		String hql="from BIMeasureRecord";
		boolean targetDeviceFlag = false;
		String[] targetDevices = new String[5];
		if (!taskTargetIdString.equals("")) {//选中设备类型
			targetDeviceFlag = true;
			targetDevices = taskTargetIdString.split(";");
			hql+=" where (testTarget = ?";
			for(int i = 1;i<targetDevices.length;i++)
				hql+=" or testTarget=?";
			hql+=")";
		}
		
		if (targetDeviceFlag) {
			hql+=" and testTime > '"+startTestTime+"' and testTime < '"+endTestTime+"' and taskNum = '"+taskNum+"'";
		}else {
			hql+=" where testTime > '"+startTestTime+"' and testTime < '"+endTestTime+"' and taskNum = '"+taskNum+"'";
		}
		
		if (targetDeviceFlag) {
			return biMeasureRecordDao.find(hql,targetDevices);
		}else{
			return biMeasureRecordDao.find(hql);
		}
		//return null;
	}

	/* by zxgm 2016-11-10
	 * 根据管理Ip获取测量总记录数
	 * managerIp：管理ip
	 * */
	public List<BIMeasureRecord> getBIMeasureRecordsByManagerIp(String managerIp) {
		return biMeasureRecordDao.find("from BIMeasureRecord where testSubject = ?", managerIp);
	}


	/* by zxgm 2016-11-10
	 * 得到符合条件的测量记录
	 * paraValue:丢包率；parse:起始日期；parse2:终止日期
	 * */
	public List<BIMeasureRecord> getBIMeasureRecordsByPktLossAndEquipAndTime(
			String paraValue, Date parse, Date parse2) {
		return biMeasureRecordDao.find("from BIMeasureRecord where pktLoss <? and testTime between ? and ?", Double.parseDouble(paraValue),parse,parse2);
	}

	/* by zxgm 2016-11-10
	 * 得到非忙次数
	 * paraValue:非忙率门限值
	 * */
	public List<BIMeasureRecord> getBIMeasureRecordsByPktLoss(String paraValue) {
		return biMeasureRecordDao.find("from BIMeasureRecord where pktLoss<?",Double.parseDouble(paraValue));
	}

	/* by zxgm 2016-11-11
	 * 根据任务编号，起始日期，终止日期，测量主体，测量目标获得双向时延测量记录
	 * taskNum:任务编号,beginDateString:起始日期,endDateString:终止日期,testSubject:测量主体,testTarget:测量目标
	 * */
	public List<BIMeasureRecord> getBIMeasureRecordsByCondition(String taskNum,
			Date beginDate, Date endDate, String testSubject,
			String testTarget) {
		return biMeasureRecordDao.find("from BIMeasureRecord where taskNum = ? and testTime between ? and ? and testSubject=? and testTarget=?",
				Integer.parseInt(taskNum), beginDate, endDate, testSubject, testTarget);
	}
}
