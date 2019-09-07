package cn.zr.networkmonitor.domain;

import java.io.Serializable;

import javax.persistence.Column;

/**
 * 用于设备接口的联合主键
 * @author lichangjian
 *
 */
public class EquipInteUnionKey implements Serializable
{
	private static final long serialVersionUID = 3213263550817487720L;
	@Column(name="INTEID")
	private int inteId;//接口编号 INTEID INT
	@Column(name="EQUIP_ID")
	private String equipId;//设备标识	EQUIP_ID	VARCHAR(40)
	
	public int getInteId()
	{
		return inteId;
	}
	public void setInteId(int inteId)
	{
		this.inteId = inteId;
	}
	public String getEquipId()
	{
		return equipId;
	}
	public void setEquipId(String equipId)
	{
		this.equipId = equipId;
	}
}
