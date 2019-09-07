package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="nspms_equip_inte")
public class EquipInte {

	@EmbeddedId
	private EquipInteUnionKey equipInteUnionKey;
	
	@Column(name="EQUIP_NUM")
	private int equipNum;//设备编号	EQUIP_NUM	BIGINT
	/*@Id
	@Column(name="INTEID")
	private int inteId;//接口编号	INTEID	INT
*/	@Column(name="INTEDESC")
	private String inteDesc;//接口描述	INTEDESC	VARCHAR(128)
	@Column(name="INTETRAFFIC")
	private int inteTraffic;//接口标称带宽	INTETRAFFIC	INT
	@Column(name="MEASURETIME")
	private int measureTime;//测量间隔	MEASURETIME	INT
	@Column(name="INTRAFFIC")
	private double inTraffic;//入带宽利用率阈值	INTRAFFIC	FLOAT
	@Column(name="OUTTRAFFIC")
	private double outTraffic;//出带宽利用率阈值	OUTTRAFFIC	FLOAT
	@Column(name="INLOSSRATE")
	private double inLossRate;//入丢包率阈值	INLOSSRATE	FLOAT
	@Column(name="OUTLOSSRATE")
	private double outLossRate;//出丢包率阈值	OUTLOSSRATE	FLOAT
	@Column(name="MTU")
	private int mtu;//最大传送单元	MTU	INT
	@Column(name="INTESTATUS")
	private String inteStatus;//接口状态	INTESTATUS	VARCHAR(40)
	@Column(name="IFTYPE")
	private String ifType;//接口类型	IFTYPE	VARCHAR(40)
	@Column(name="INTE_IP")
	private String inteIp;//接口IP	INTE_IP	VARCHAR(40)
	@Column(name="INTE_IP_TYPE")
	private int inteIpType;//接口IP类型	INTE_IP_TYPE	TINYINT
	@Column(name="INTE_IP_MASK")
	private String inteIpMask;//接口IP掩码	INTE_IP_MASK	VARCHAR(40)
	
//	@Column(name="EQUIP_ID")
//	private String equipId;//设备标识	EQUIP_ID	VARCHAR(40)
	
    /*@ManyToOne
	@JoinColumn(name="EQUIP_ID")
	private Equip equip;*/
	
	
//	public String getEquipId() {
//		return equipId;
//	}
//
//	public void setEquipId(String equipId) {
//		this.equipId = equipId;
//	}
	
	public EquipInteUnionKey getEquipInteUnionKey()
	{
		return equipInteUnionKey;
	}

	public void setEquipInteUnionKey(EquipInteUnionKey equipInteUnionKey)
	{
		this.equipInteUnionKey = equipInteUnionKey;
	}

	public int getEquipNum() {
		return equipNum;
	}

	public void setEquipNum(int equipNum) {
		this.equipNum = equipNum;
	}

	/*public int getInteId() {
		return inteId;
	}

	public void setInteId(int inteId) {
		this.inteId = inteId;
	}*/

	public String getInteDesc() {
		return inteDesc;
	}

	public void setInteDesc(String inteDesc) {
		this.inteDesc = inteDesc;
	}

	public int getInteTraffic() {
		return inteTraffic;
	}

	public void setInteTraffic(int inteTraffic) {
		this.inteTraffic = inteTraffic;
	}

	public int getMeasureTime() {
		return measureTime;
	}

	public void setMeasureTime(int measureTime) {
		this.measureTime = measureTime;
	}

	public double getInTraffic() {
		return inTraffic;
	}

	public void setInTraffic(double inTraffic) {
		this.inTraffic = inTraffic;
	}

	public double getOutTraffic() {
		return outTraffic;
	}

	public void setOutTraffic(double outTraffic) {
		this.outTraffic = outTraffic;
	}

	public double getInLossRate() {
		return inLossRate;
	}

	public void setInLossRate(double inLossRate) {
		this.inLossRate = inLossRate;
	}

	public double getOutLossRate() {
		return outLossRate;
	}

	public void setOutLossRate(double outLossRate) {
		this.outLossRate = outLossRate;
	}

	public int getMtu() {
		return mtu;
	}

	public void setMtu(int mtu) {
		this.mtu = mtu;
	}

	public String getInteStatus() {
		return inteStatus;
	}

	public void setInteStatus(String inteStatus) {
		this.inteStatus = inteStatus;
	}

	public String getIfType() {
		return ifType;
	}

	public void setIfType(String ifType) {
		this.ifType = ifType;
	}

	/*public String getEquipId() {
		return equipId;
	}

	public void setEquipId(String equipId) {
		this.equipId = equipId;
	}*/

	public String getInteIp() {
		return inteIp;
	}

	public void setInteIp(String inteIp) {
		this.inteIp = inteIp;
	}

	public int getInteIpType() {
		return inteIpType;
	}

	public void setInteIpType(int inteIpType) {
		this.inteIpType = inteIpType;
	}

	public String getInteIpMask() {
		return inteIpMask;
	}

	public void setInteIpMask(String inteIpMask) {
		this.inteIpMask = inteIpMask;
	}

}
