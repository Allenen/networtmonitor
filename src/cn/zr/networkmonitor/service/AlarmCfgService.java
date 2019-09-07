package cn.zr.networkmonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.zr.networkmonitor.dao.AlarmCfgDao;
import cn.zr.networkmonitor.domain.AlarmCfg;

@Service
public class AlarmCfgService {
	@Autowired
	private AlarmCfgDao alarmCfgDao;
	
	
	public List<AlarmCfg> getAllAlarmCfgs(){
	    List<AlarmCfg> alarmCfgs = alarmCfgDao.loadAll();
		if(alarmCfgs.size()>0)
			return alarmCfgs;
		return null;
	}

}
