package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name="bottomimage")
public class MultipartFileDomain {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="imageId")
	private int imageId;//图片唯一编号
	@Column(name="imagePath")
	private String imagePath;//图片的路径
	@Column(name="imageName")
	private String imageName;//图片名称
	@Column(name="isFlag")
	private int isFlag;//是否设置为底图 1:设置为底图;0：不设置为底图
	
	@Transient
	private MultipartFile imgFile;
	
	
	public int getIsFlag() {
		return isFlag;
	}

	public void setIsFlag(int isFlag) {
		this.isFlag = isFlag;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public int getImageId() {
		return imageId;
	}

	public void setImageId(int imageId) {
		this.imageId = imageId;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}


	public MultipartFile getImgFile() {
		return imgFile;
	}

	public void setImgFile(MultipartFile imgFile) {
		this.imgFile = imgFile;
	}
	
	
}
