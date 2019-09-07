package cn.zr.networkmonitor.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * 双向时延测量记录表
 * */
@Entity
@Table(name="nspms_bi_delay")
public class BIMeasureRecord {

	@Id
	@Column(name="TEST_NUM")
	private int testNum;				//记录编号	TEST_NUM	BIGINT
	@Column(name="TASK_NUM")
	private int taskNum;				//任务编号	TASK_NUM	BIGINT
	@Column(name="TEST_TIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date testTime;			//测量时间	TEST_TIME	DATETIME
	
	@Transient
	private String testTimeString;	//测量时间的字符串格式，主要用于解决easyui datagrid日期格式显示问题
	@Transient
	private String testTargetName;	//目标名
	
	@Column(name="TEST_SUBJECT")
	private String testSubject;		//测量主体	TEST_SUBJECT	VARCHAR(40)
	@Column(name="TEST_TARGET")
	private String testTarget;		//测量目标	TEST_TARGET	VARCHAR(40) 目标IP
	@Column(name="AVG_DELAY")
	private double avgDelay;			//平均时延	AVG_DELAY	FLOAT
	@Column(name="PKT_LOSS")
	private double pktLoss;			//丢包率	PKT_LOSS	FLOAT
	@Column(name="DELAY_JITTER")
	private double delayJitter;	 //时延抖动	DELAY_JITTER	FLOAT
	 
	public String getTestTimeString() {
		return testTimeString;
	}
	public void setTestTimeString(String testTimeString) {
		this.testTimeString = testTimeString;
	}
	public String getTestTargetName() {
		return testTargetName;
	}
	public void setTestTargetName(String testTargetName) {
		this.testTargetName = testTargetName;
	}
	public int getTestNum() {
		return testNum;
	}
	public void setTestNum(int testNum) {
		this.testNum = testNum;
	}
	
	public int getTaskNum() {
		return taskNum;
	}
	public void setTaskNum(int taskNum) {
		this.taskNum = taskNum;
	}
	public Date getTestTime() {
		return testTime;
	}
	public void setTestTime(Date testTime) {
		this.testTime = testTime;
	}
	public String getTestSubject() {
		return testSubject;
	}
	public void setTestSubject(String testSubject) {
		this.testSubject = testSubject;
	}
	public String getTestTarget() {
		return testTarget;
	}
	public void setTestTarget(String testTarget) {
		this.testTarget = testTarget;
	}
	public double getAvgDelay() {
		return avgDelay;
	}
	public void setAvgDelay(double avgDelay) {
		this.avgDelay = avgDelay;
	}
	public double getPktLoss() {
		return pktLoss;
	}
	public void setPktLoss(double pktLoss) {
		this.pktLoss = pktLoss;
	}
	public double getDelayJitter() {
		return delayJitter;
	}
	public void setDelayJitter(double delayJitter) {
		this.delayJitter = delayJitter;
	}
}
