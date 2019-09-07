package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

//用于拓扑管理的图片资源
@Entity
@Table(name="topologyimage")
public class TopologyImageManager {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="topologyImageId")
	private int topologyImageId;//编号
	@Column(name="topologyImageName")
	private String topologyImageName;//图片名称
	@Column(name="topologyImagePath")
	private String topologyImagePath;//图片路径
	@Column(name="topologyImageType")
	private String topologyImageType;//图片所属类型
	@Column(name="isFlag")
	private int isFlag;//是否设置显示 1:设置为显示;0：设置为不显示
	
	@Transient
	private MultipartFile imgFile;
	
	
	public int getIsFlag() {
		return isFlag;
	}
	public void setIsFlag(int isFlag) {
		this.isFlag = isFlag;
	}
	public MultipartFile getImgFile() {
		return imgFile;
	}
	public void setImgFile(MultipartFile imgFile) {
		this.imgFile = imgFile;
	}
	public int getTopologyImageId() {
		return topologyImageId;
	}
	public void setTopologyImageId(int topologyImageId) {
		this.topologyImageId = topologyImageId;
	}
	public String getTopologyImageName() {
		return topologyImageName;
	}
	public void setTopologyImageName(String topologyImageName) {
		this.topologyImageName = topologyImageName;
	}
	public String getTopologyImagePath() {
		return topologyImagePath;
	}
	public void setTopologyImagePath(String topologyImagePath) {
		this.topologyImagePath = topologyImagePath;
	}
	public String getTopologyImageType() {
		return topologyImageType;
	}
	public void setTopologyImageType(String topologyImageType) {
		this.topologyImageType = topologyImageType;
	}
	
	
}
