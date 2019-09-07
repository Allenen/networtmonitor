package cn.zr.networkmonitor.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="nspms_alarm_rec")
public class AlarmRec {
	@Id
	@Column(name="ALARM_IP")
	private String alarm_ip;
	@Column(name="ALARM_MAINKIND")
	private String alarm_mainkind;
	@Column(name="ALARM_SUBKIND")
	private String alarm_subkind;
	@Column(name="ALARM_LEVEL")
	private String alarm_level;
	@Column(name="ALARM_CODE")
	private String alarm_code;
	@Column(name="ALARM_FIRST")
	private Date alarm_first;
	@Column(name="ALARM_NEWEST")
	private Date alarm_newest;
	@Column(name="PROC_FLAG")
	private int proc_flag;
	
	//告警设备名
	@Transient
	private String alarm_equipName;
	
	//告警历时时间
	@Transient
	private int alarmKeepMinute;
	
	public String getAlarm_equipName() {
		return alarm_equipName;
	}
	public void setAlarm_equipName(String alarmEquipName) {
		alarm_equipName = alarmEquipName;
	}
	public int getAlarmKeepMinute() {
		
		return alarmKeepMinute;
	}
	public void setAlarmKeepMinute(int alarmKeepMinute) {
		this.alarmKeepMinute = alarmKeepMinute;
	}
	public String getAlarm_ip() {
		return alarm_ip;
	}
	public void setAlarm_ip(String alarm_ip) {
		this.alarm_ip = alarm_ip;
	}
	public String getAlarm_mainkind() {
		return alarm_mainkind; 
	}
	public void setAlarm_mainkind(String alarm_mainkind) {
		this.alarm_mainkind = alarm_mainkind;
	}
	public String getAlarm_subkind() {
		return alarm_subkind;
	}
	public void setAlarm_subkind(String alarm_subkind) {
		this.alarm_subkind = alarm_subkind;
	}
	public String getAlarm_level() {
		return alarm_level;
	}
	public void setAlarm_level(String alarm_level) {
		this.alarm_level = alarm_level;
	}
	public String getAlarm_code() {
		return alarm_code;
	}
	public void setAlarm_code(String alarm_code) {
		this.alarm_code = alarm_code;
	}
	public Date getAlarm_first() {
		return alarm_first;
	}
	public void setAlarm_first(Date alarm_first) {
		this.alarm_first = alarm_first;
	}
	public Date getAlarm_newest() {
		return alarm_newest;
	}
	public void setAlarm_newest(Date alarm_newest) {
		this.alarm_newest = alarm_newest;
	}
	public int getProc_flag() {
		return proc_flag;
	}
	public void setProc_flag(int proc_flag) {
		this.proc_flag = proc_flag;
	}
	
	

}
