package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="nspms_alarm_cfg")
public class AlarmCfg {
	
	@Id
	@Column(name="ALARM_CODE")
	private String alarm_code;
	@Column(name="ALARM_MAINKIND")
	private String alarm_mainkind;
	@Column(name="ALARM_SUBKIND")
	private String alarm_subkind;
	@Column(name="ALARM_LEVEL")
	private String alarm_level;
	@Column(name="ALARM_SHOW")
	private String alarm_show;
	@Column(name="ALARM_MEMO")
	private String alarm_memo;
	
	public String getAlarm_code() {
		return alarm_code;
	}
	public void setAlarm_code(String alarm_code) {
		this.alarm_code = alarm_code;
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
	public String getAlarm_show() {
		return alarm_show;
	}
	public void setAlarm_show(String alarm_show) {
		this.alarm_show = alarm_show;
	}
	public String getAlarm_memo() {
		return alarm_memo;
	}
	public void setAlarm_memo(String alarm_memo) {
		this.alarm_memo = alarm_memo;
	}
	

}
