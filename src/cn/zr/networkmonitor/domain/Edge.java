package cn.zr.networkmonitor.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.Table;


@Entity
@Table(name="edge")
public class Edge {
	
	@Id
	@Column(name="EDGE_ID", unique=true, nullable=false)
	private String edgeId;				//设备标识	EQUIP_ID
	@Column(name="EDGE_COLOR")
	private String edgeColor;			//设备名称	EQUIP_NAME
	@Column(name="EDGE_WIDTH")
	private int edgeWidth;			//设备类别	EQUIP_KIND
	
	public String getEdgeId() {
		return edgeId;
	}

	public void setEdgeId(String edgeId) {
		this.edgeId = edgeId;
	}
	
	public String getEdgeColor() {
		return edgeColor;
	}

	public void setEdgeColor(String edgeColor) {
		this.edgeColor = edgeColor;
	}
	
	public int getEdgeWidth() {
		return edgeWidth;
	}

	public void setEdgeWidth(int edgeWidth) {
		this.edgeWidth = edgeWidth;
	}

}
