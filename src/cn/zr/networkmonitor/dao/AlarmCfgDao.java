package cn.zr.networkmonitor.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import cn.zr.networkmonitor.domain.AlarmCfg;
import cn.zr.networkmonitor.domain.AlarmRec;

@Repository
public class AlarmCfgDao extends BaseDao<AlarmCfg> {
	//根据告警码获取需要显示的方式
	public AlarmCfg getDiaplayWayBycode(String alarmcode){
		 List<AlarmCfg> AlarmCfgs = this.find("from AlarmCfg where alarm_code = ?",alarmcode);
	   	 if(AlarmCfgs.size()>0)
				return AlarmCfgs.get(0);
			return null;
	   	 
	  }
}
