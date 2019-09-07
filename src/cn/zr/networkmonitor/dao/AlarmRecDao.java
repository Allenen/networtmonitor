package cn.zr.networkmonitor.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import cn.zr.networkmonitor.domain.AlarmRec;

@Repository
public class AlarmRecDao extends BaseDao<AlarmRec> {
	  //根据ip获取告警记录
    public List<AlarmRec> getAlarmRecByAlarmIp(String alarmIp){
   	 List<AlarmRec> alarmRecs = this.find("from AlarmRec where alarm_ip = ?",alarmIp);
   	 if(alarmRecs.size()>0)
			return alarmRecs;
		return null;
   	 
    }
}
