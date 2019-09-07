package cn.zr.networkmonitor.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.AlarmCfgDao;
import cn.zr.networkmonitor.dao.AlarmRecDao;
import cn.zr.networkmonitor.dao.EquipDao;
import cn.zr.networkmonitor.domain.AlarmCfg;
import cn.zr.networkmonitor.domain.AlarmRec;
import cn.zr.networkmonitor.domain.Equip;

@Transactional
@Service
public class AlarmRecService {

	@Autowired
	private AlarmRecDao alarmRecDao;
	@Autowired
	private EquipDao equipDao;
	@Autowired
	private AlarmCfgDao alarmCfgDao;
	
	
	//获取所有未处理的并且需要弹窗显示的告警记录
	public List<AlarmRec> getAllUNPandPopAlarmRecs(){
		  List<AlarmRec> alarmRecs = alarmRecDao.find("from AlarmRec where proc_flag = 0");
		  if(alarmRecs.size()>0){
				for(AlarmRec alarmRec:alarmRecs){
					AlarmCfg alarmCfg = alarmCfgDao.getDiaplayWayBycode(alarmRec.getAlarm_code());
					String alarmshow = alarmCfg.getAlarm_show();
					if(alarmshow==null&&alarmshow.equals("0")){
						
						alarmRecs.remove(alarmRec);
					}else if(alarmshow.equals("1")){
						continue;
					}else{
						alarmRecs.remove(alarmRec);
					}
					}
				return alarmRecs;
			}
	
			return null;
	}
	public void updateAlarmRec(AlarmRec alarmRec){
    	 alarmRecDao.update(alarmRec);
	}
	//时间降序
	public List<AlarmRec> getAllAlarmRecsOrderByAlarmNewest(){
		
	    List<AlarmRec> alarmRecs = alarmRecDao.find("from AlarmRec order by alarm_newest desc");
		if(alarmRecs.size()>0){
			for(AlarmRec alarmRec:alarmRecs){
				Equip equip = equipDao.getEquipsByManageIP(alarmRec.getAlarm_ip());
				if(equip==null){
					alarmRec.setAlarm_equipName("该Ip未管理设备");
				}else{
					alarmRec.setAlarm_equipName(equip.getEquipName());
				}
				Date alarm_first = alarmRec.getAlarm_first();
				Date alerm_newest = alarmRec.getAlarm_newest();
				long keepalarmMin = (alerm_newest.getTime()-alarm_first.getTime())/60000;
				alarmRec.setAlarmKeepMinute((int)keepalarmMin);
				
				}
			return alarmRecs;
		}
			
			
		return null;
	}
	//得到所有的告警信息
     public List<AlarmRec> getAllAlarmRecs(){
		
	    List<AlarmRec> alarmRecs = alarmRecDao.find("from AlarmRec");;
		if(alarmRecs.size()>0){
			for(AlarmRec alarmRec:alarmRecs){
				Equip equip = equipDao.getEquipsByManageIP(alarmRec.getAlarm_ip());
				if(equip==null){
					alarmRec.setAlarm_equipName("该Ip未管理设备");
				}else{
					alarmRec.setAlarm_equipName(equip.getEquipName());
				}
				Date alarm_first = alarmRec.getAlarm_first();
				Date alerm_newest = alarmRec.getAlarm_newest();
				long keepalarmMin = (alerm_newest.getTime()-alarm_first.getTime())/60000;
				alarmRec.setAlarmKeepMinute((int)keepalarmMin);
				
				}
			return alarmRecs;
		}
		
		return null;
	}
     //根据ip以及告警代码获取告警记录
     public AlarmRec getAlarmRecByIpAndAlarmCode(String equip,String alarmcode){
    	 List<AlarmRec> alarmRecs = alarmRecDao.find("from AlarmRec where alarm_ip =? AND alarm_code =?",equip,alarmcode);
    	 if(alarmRecs.size()>0)
 			return alarmRecs.get(0);
 		return null;
    	 
     }
     //存储告警信息
     public void saveAlarmRec(AlarmRec alarmRec){
    	 AlarmRec alarmRec2 = getAlarmRecByIpAndAlarmCode(alarmRec.getAlarm_ip(), alarmRec.getAlarm_code());
    	 if(alarmRec2 ==null){
    		 alarmRecDao.save(alarmRec);
    	 }
    	 else{
    		 alarmRec2.setAlarm_newest(alarmRec.getAlarm_newest());
    		 alarmRecDao.update(alarmRec2);
    	 }
    	 
     }
     //根据设备名等信息获取告警记录
     public List<AlarmRec> getAlarmRecsByEquipName(String equipname){
    	 Equip equip = equipDao.getEquipByEquipname(equipname);
    	 List<AlarmRec> alarmRecs = alarmRecDao.getAlarmRecByAlarmIp(equip.getManageIp());
    	 return  alarmRecs;
     }
     //根据历时时间大小获取告警记录
     public List<AlarmRec> getAlarmRecsByAlarmKeepMinute(int minute){
    	 long minutekeep = minute*60;
    	 List<AlarmRec> alarmRecs = alarmRecDao.find("from AlarmRec where unix_timestamp(ALARM_NEWEST)-unix_timestamp(ALARM_FIRST) > ?",minutekeep);
    	 if(alarmRecs.size()>0)
 			return alarmRecs;
 		return null;
     }
     //分类查询
     public List getAlarmRecsByGroupByAlarmMainkind(){
    	 String hql ="select alarm_mainkind,count(*) from AlarmRec group by alarm_mainkind";
    	 List list = alarmRecDao.createQuery(hql).list();
    	 return list;
     }
     //分类查询
     public List getAlarmRecsByGroupByAlarmSubkind(){
    	 String hql ="select alarm_subkind,count(*) from AlarmRec group by alarm_subkind";
    	 List list = alarmRecDao.createQuery(hql).list();
    	 return list;
     }
     //分类查询
     public List getAlarmRecsByGroupByAlarmLevel(){
    	 String hql ="select alarm_level,count(*) from AlarmRec group by alarm_level";
    	 List list = alarmRecDao.createQuery(hql).list();
    	 return list;
     }

}
