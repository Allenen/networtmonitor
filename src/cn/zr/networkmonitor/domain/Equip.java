package cn.zr.networkmonitor.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name="nspms_equip")
public class Equip {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="EQUIP_NUM")
	private int equipNum;				//设备编号	EQUIP_NUM	
	@Column(name="EQUIP_ID")
	private String equipId;				//设备标识	EQUIP_ID
	@Column(name="EQUIP_NAME")
	private String equipName;			//设备名称	EQUIP_NAME
	@Column(name="EQUIP_KIND")
	private String equipKind;			//设备类别	EQUIP_KIND
	@Column(name="PROBE_TYPE")
	private String probeType;			//探针型号	PROBE_TYPE
	@Column(name="MANAGE_IP")
	private String manageIp;			//管理IP	MANAGE_IP
	@Column(name="AREA_UNIT")
	private String areaUnit;			//归属单位	AREA_UNIT
	@Column(name="KEEP_UNIT")
	private String keepUnit;			//维护单位	KEEP_UNIT
	@Column(name="KEEP_PERSON")
	private String keepPerson;			//联系人	KEEP_PERSON
	@Column(name="KEEP_PHONE")
	private String keepPhone;			//联系电话	KEEP_PHONE
	@Column(name="PROBE_ROUTER")
	private String probeRouter;			//探针挂接路由器	PROBE_ROUTER
	@Column(name="PROBE_STATE")
	private int probeState;				//探针状态	PROBE_STATE
	@Column(name="SNMP_PORT")
	private int snmpPort;				//SNMP端口	SNMP_PORT
	@Column(name="SNMP_VERSION")
	private String snmpVersion;			//SNMP版本	SNMP_VERSION
	@Column(name="SNMP_RCOMMUNITY")
	private String snmpRcommunity;		//路由器读共同体名	SNMP_RCOMMUNITY
	@Column(name="SNMP_RETRY")
	private int snmpRetry;				//重试次数	SNMP_RETRY
	@Column(name="SNMP_TIMEOUT")
	private int snmpTimeout;			//超时时间	SNMP_TIMEOUT
	@Column(name="SNMP_V3_SECURITYNAME")
	private String snmpV3SecurityName;	//V3安全名	SNMP_V3_SECURITYNAME
	@Column(name="SNMP_V3_SECURITYLEVEL")
	private String snmpV3SecurityLevel;	//V3安全等级	SNMP_V3_SECURITYLEVEL
	@Column(name="SNMP_V3_SECURITYMODEL")
	private String snmpV3SecurityModel;	//V3安全模型	SNMP_V3_SECURITYMODEL
	@Column(name="SNMP_V3_CONTEXTNAME")
	private String snmpV3ContextName;	//V3上下文名	SNMP_V3_CONTEXTNAME
	@Column(name="SNMP_V3_CONTEXTENGONEID")
	private String snmpV3ContextEngoneId;//V3上下文引擎	SNMP_V3_CONTEXTENGONEID
	@Column(name="SNMP_V3_AUTHPASSWORD")
	private String snmpV3AuthPassword;	//V3认证口令	SNMP_V3_AUTHPASSWORD
	@Column(name="SNMP_V3_AUTHPROTOCOL")
	private String snmpV3AuthProtocol;	//V3认证协议	SNMP_V3_AUTHPROTOCOL
	@Column(name="SNMP_V3_PRIVPROTOCOL")
	private String snmpV3PrivProtocol;	//V3私有协议	SNMP_V3_PRIVPROTOCOL
	@Column(name="SNMP_V3_PRIVPASSWORD")
	private String snmpV3PrivPassword;	//V3私有口令	SNMP_V3_PRIVPASSWORD
	@Column(name="PROBE_COMM_TIME")
	private Date probeCommTime;			//探针联络时间	PROBE_COMM_TIME
	@Column(name="PROBE_ENABLE")
	private int probeEnable;			//探针功能启用状态	PROBE_ENABLE
	@Column(name="POSITON_X")
	private float positionX;			//设备X座标	POSITON_X
	@Column(name="POSITON_Y")
	private float positionY;			//设备Y座标	POSITON_Y
	@Column(name="GETIF")
	private int getIf;					//获取接口信息	GETIF
	@Column(name="IS_PROXY")
	private int isProxy;				//是否代理路由器	IS_PROXY
	@Column(name="SNMP_WCOMMUNITY")
	private String snmpWcommunity;		//路由器写共同体名	SNMP_WCOMMUNITY
	@Column(name="MEM_USED")
	private double memUsed;				//内存利用率	MEM_USED
	@Column(name="CPU_USED")
	private double cpuUsed;				//CPU利用率	CPU_USED
	@Column(name="NIC_USED")
	private double nicUsed;				//网卡利用率	NIC_USED
	@Column(name="ROUTER_MAP")
	private String routerMap;			//探针管理路由器地址映射	ROUTER_MAP
	@Column(name="REG_STATE")
	private int regState;				//注册状态	REG_STATE
	@Column(name="CARD_ID")
	private String cardId;				//卡标识	CARD_ID
	
	@Transient
	private List<EquipInte> equipInteList = new ArrayList<EquipInte>();//保存设备的接口信息
	

	@Column(name="VALIDTIME")
	private Date validTime;				//有效期	VALIDTIME
	

	
	/*@OneToMany(mappedBy="equip",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<EquipInte> equipInteList = new ArrayList<EquipInte>();//设备接口*/
	
	/*
	public List<EquipInte> getEquipInteList() {
		return equipInteList;
	}

	public void setEquipInteList(List<EquipInte> equipInteList) {
		this.equipInteList = equipInteList;
	}*/
	
	
	public int getEquipNum() {
		return equipNum;
	}

	public List<EquipInte> getEquipInteList() {
		return equipInteList;
	}

	public void setEquipInteList(List<EquipInte> equipInteList) {
		this.equipInteList = equipInteList;
	}

	public void setEquipNum(int equipNum) {
		this.equipNum = equipNum;
	}

	public String getEquipId() {
		return equipId;
	}

	public void setEquipId(String equipId) {
		this.equipId = equipId;
	}

	public String getEquipName() {
		return equipName;
	}

	public void setEquipName(String equipName) {
		this.equipName = equipName;
	}

	public String getEquipKind() {
		return equipKind;
	}

	public void setEquipKind(String equipKind) {
		this.equipKind = equipKind;
	}

	public String getProbeType() {
		return probeType;
	}

	public void setProbeType(String probeType) {
		this.probeType = probeType;
	}

	public String getManageIp() {
		return manageIp;
	}

	public void setManageIp(String manageIp) {
		this.manageIp = manageIp;
	}

	public String getAreaUnit() {
		return areaUnit;
	}

	public void setAreaUnit(String areaUnit) {
		this.areaUnit = areaUnit;
	}

	public String getKeepUnit() {
		return keepUnit;
	}

	public void setKeepUnit(String keepUnit) {
		this.keepUnit = keepUnit;
	}

	public String getKeepPerson() {
		return keepPerson;
	}

	public void setKeepPerson(String keepPerson) {
		this.keepPerson = keepPerson;
	}

	public String getKeepPhone() {
		return keepPhone;
	}

	public void setKeepPhone(String keepPhone) {
		this.keepPhone = keepPhone;
	}

	public String getProbeRouter() {
		return probeRouter;
	}

	public void setProbeRouter(String probeRouter) {
		this.probeRouter = probeRouter;
	}

	public int getProbeState() {
		return probeState;
	}

	public void setProbeState(int probeState) {
		this.probeState = probeState;
	}

	public int getSnmpPort() {
		return snmpPort;
	}

	public void setSnmpPort(int snmpPort) {
		this.snmpPort = snmpPort;
	}

	public String getSnmpVersion() {
		return snmpVersion;
	}

	public void setSnmpVersion(String snmpVersion) {
		this.snmpVersion = snmpVersion;
	}

	public String getSnmpRcommunity() {
		return snmpRcommunity;
	}

	public void setSnmpRcommunity(String snmpRcommunity) {
		this.snmpRcommunity = snmpRcommunity;
	}

	public int getSnmpRetry() {
		return snmpRetry;
	}

	public void setSnmpRetry(int snmpRetry) {
		this.snmpRetry = snmpRetry;
	}

	public int getSnmpTimeout() {
		return snmpTimeout;
	}

	public void setSnmpTimeout(int snmpTimeout) {
		this.snmpTimeout = snmpTimeout;
	}

	public String getSnmpV3SecurityName() {
		return snmpV3SecurityName;
	}

	public void setSnmpV3SecurityName(String snmpV3SecurityName) {
		this.snmpV3SecurityName = snmpV3SecurityName;
	}

	public String getSnmpV3SecurityLevel() {
		return snmpV3SecurityLevel;
	}

	public void setSnmpV3SecurityLevel(String snmpV3SecurityLevel) {
		this.snmpV3SecurityLevel = snmpV3SecurityLevel;
	}

	public String getSnmpV3SecurityModel() {
		return snmpV3SecurityModel;
	}

	public void setSnmpV3SecurityModel(String snmpV3SecurityModel) {
		this.snmpV3SecurityModel = snmpV3SecurityModel;
	}

	public String getSnmpV3ContextName() {
		return snmpV3ContextName;
	}

	public void setSnmpV3ContextName(String snmpV3ContextName) {
		this.snmpV3ContextName = snmpV3ContextName;
	}

	public String getSnmpV3ContextEngoneId() {
		return snmpV3ContextEngoneId;
	}

	public void setSnmpV3ContextEngoneId(String snmpV3ContextEngoneId) {
		this.snmpV3ContextEngoneId = snmpV3ContextEngoneId;
	}

	public String getSnmpV3AuthPassword() {
		return snmpV3AuthPassword;
	}

	public void setSnmpV3AuthPassword(String snmpV3AuthPassword) {
		this.snmpV3AuthPassword = snmpV3AuthPassword;
	}

	public String getSnmpV3AuthProtocol() {
		return snmpV3AuthProtocol;
	}

	public void setSnmpV3AuthProtocol(String snmpV3AuthProtocol) {
		this.snmpV3AuthProtocol = snmpV3AuthProtocol;
	}

	public String getSnmpV3PrivProtocol() {
		return snmpV3PrivProtocol;
	}

	public void setSnmpV3PrivProtocol(String snmpV3PrivProtocol) {
		this.snmpV3PrivProtocol = snmpV3PrivProtocol;
	}

	public String getSnmpV3PrivPassword() {
		return snmpV3PrivPassword;
	}

	public void setSnmpV3PrivPassword(String snmpV3PrivPassword) {
		this.snmpV3PrivPassword = snmpV3PrivPassword;
	}

	public Date getProbeCommTime() {
		return probeCommTime;
	}

	public void setProbeCommTime(Date probeCommTime) {
		this.probeCommTime = probeCommTime;
	}

	public int getProbeEnable() {
		return probeEnable;
	}

	public void setProbeEnable(int probeEnable) {
		this.probeEnable = probeEnable;
	}

	public float getPositionX() {
		return positionX;
	}

	public void setPositionX(float positionX) {
		this.positionX = positionX;
	}

	public float getPositionY() {
		return positionY;
	}

	public void setPositionY(float positionY) {
		this.positionY = positionY;
	}

	public int getGetIf() {
		return getIf;
	}

	public void setGetIf(int getIf) {
		this.getIf = getIf;
	}

	public int getIsProxy() {
		return isProxy;
	}

	public void setIsProxy(int isProxy) {
		this.isProxy = isProxy;
	}

	public String getSnmpWcommunity() {
		return snmpWcommunity;
	}

	public void setSnmpWcommunity(String snmpWcommunity) {
		this.snmpWcommunity = snmpWcommunity;
	}

	public double getMemUsed() {
		return memUsed;
	}

	public void setMemUsed(double memUsed) {
		this.memUsed = memUsed;
	}

	public double getCpuUsed() {
		return cpuUsed;
	}

	public void setCpuUsed(double cpuUsed) {
		this.cpuUsed = cpuUsed;
	}

	public double getNicUsed() {
		return nicUsed;
	}

	public void setNicUsed(double nicUsed) {
		this.nicUsed = nicUsed;
	}

	public String getRouterMap() {
		return routerMap;
	}

	public void setRouterMap(String routerMap) {
		this.routerMap = routerMap;
	}

	public int getRegState() {
		return regState;
	}

	public void setRegState(int regState) {
		this.regState = regState;
	}

	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public Date getValidTime() {
		return validTime;
	}

	public void setValidTime(Date validTime) {
		this.validTime = validTime;
	}


	/*@Transient				//数据库表格中不会生成相应的列
	public List<EquipInte> equipInteList;*/
}
