package cn.zr.networkmonitor.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

//用于得到默认的任务
@Entity
@Table(name="nspms_default_task")
public class DefaultTask {

	@Id
	@Column(name="TASK_TYPE")
	private int task_type;				//任务类别	TASK_TYPE	TINYINT
	@Column(name="TASK_SUBJECT")
	private String task_subject;		//任务主体	TASK_SUBJECT	VARCHAR(40)
	@Column(name="TASK_NAME")
	private String task_name;			//任务名称	TASK_NAME	VARCHAR(128)
	@Column(name="TASK_TARGET")
	private String task_target;			//任务目标	TASK_TARGET	LONGTEXT
	@Column(name="POLICY_PARA")
	private String policy_para;			//策略参数	POLICY_PARA	LONGTEXT
	@Column(name="IS_CYCLE")
	private int is_cycle;				//周期性测量	IS_CYCLE	TINYINT
	@Column(name="TASK_INTERVAL")
	private int task_interval;			//测量间隔/上报间隔	TASK_INTERVAL	BIGINT
	@Column(name="INTERVAL_UNIT")
	private String interval_unit;		//度量单位	INTERVAL_UNIT	VARCHAR(2)
	@Column(name="SEND_IP")
	private String send_ip;				//上报IP	SEND_IP	VARCHAR(40)
	@Column(name="START_TIME")
	private Date start_time;			//触发时间	START_TIME	DATETIME
	@Column(name="END_TIME")
	private Date end_time;				//终止时间	END_TIME	DATETIME
	@Column(name="TASK_STAT")
	private int task_stat;				//任务状态	TASK_STAT	TINYINT
	@Column(name="LEVEL")
	private int level;					//优先级	LEVEL	TINYINT
	@Column(name="RESEND_INTERVAL")
	private int resend_interval;		//失败后重发间隔	RESEND_INTERVAL	INT
	@Column(name="RESEND_COUNT")
	private int resend_count;			//重发计数	RESEND_COUNT	INT
	@Column(name="TASK_OVER_TIME")
	private Date task_over_time;		//任务完成时间	TASK_OVER_TIME	DATETIME
	@Column(name="POLICY_NAME")
	private String policy_name;			//任务所选的策略的名称	POLICY_NAME	VARCHAR(128)
	@Column(name="SEND_NOTICE")
	private int send_notice;			//是否通知上层程序，向FW上报	SEND_NOTICE	TINYINT
	@Transient
	private List<Equip> equipList = new ArrayList<Equip>();		//用于存储任务目标的设备集合(用于生成树)
	public int getTask_type() {
		return task_type;
	}
	public void setTask_type(int taskType) {
		task_type = taskType;
	}
	public String getTask_subject() {
		return task_subject;
	}
	public void setTask_subject(String taskSubject) {
		task_subject = taskSubject;
	}
	public String getTask_name() {
		return task_name;
	}
	public void setTask_name(String taskName) {
		task_name = taskName;
	}
	public String getTask_target() {
		return task_target;
	}
	public void setTask_target(String taskTarget) {
		task_target = taskTarget;
	}
	public String getPolicy_para() {
		return policy_para;
	}
	public void setPolicy_para(String policyPara) {
		policy_para = policyPara;
	}
	public int getIs_cycle() {
		return is_cycle;
	}
	public void setIs_cycle(int isCycle) {
		is_cycle = isCycle;
	}
	public int getTask_interval() {
		return task_interval;
	}
	public void setTask_interval(int taskInterval) {
		task_interval = taskInterval;
	}
	public String getInterval_unit() {
		return interval_unit;
	}
	public void setInterval_unit(String intervalUnit) {
		interval_unit = intervalUnit;
	}
	public String getSend_ip() {
		return send_ip;
	}
	public void setSend_ip(String sendIp) {
		send_ip = sendIp;
	}
	public Date getStart_time() {
		return start_time;
	}
	public void setStart_time(Date startTime) {
		start_time = startTime;
	}
	public Date getEnd_time() {
		return end_time;
	}
	public void setEnd_time(Date endTime) {
		end_time = endTime;
	}
	public int getTask_stat() {
		return task_stat;
	}
	public void setTask_stat(int taskStat) {
		task_stat = taskStat;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getResend_interval() {
		return resend_interval;
	}
	public void setResend_interval(int resendInterval) {
		resend_interval = resendInterval;
	}
	public int getResend_count() {
		return resend_count;
	}
	public void setResend_count(int resendCount) {
		resend_count = resendCount;
	}
	public Date getTask_over_time() {
		return task_over_time;
	}
	public void setTask_over_time(Date taskOverTime) {
		task_over_time = taskOverTime;
	}
	public String getPolicy_name() {
		return policy_name;
	}
	public void setPolicy_name(String policyName) {
		policy_name = policyName;
	}
	public int getSend_notice() {
		return send_notice;
	}
	public void setSend_notice(int sendNotice) {
		send_notice = sendNotice;
	}
	public List<Equip> getEquipList() {
		return equipList;
	}
	public void setEquipList(List<Equip> equipList) {
		this.equipList = equipList;
	}
	
	
}
