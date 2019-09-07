package cn.zr.networkmonitor.domain;

//用于构建echarts的饼图所需的数据格式
public class Pair {
	private int value;
	private String name;
	
	public Pair(){}
	
	public Pair(int value, String name){
		this.value = value;
		this.name = name;
	}

	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	

}
