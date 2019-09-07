package cn.zr.networkmonitor.domain;

//用于生成combox的数据格式
public class Combox {
	private int id;
	private String text;//显示的文本
	private String value;//表单提交的值
	private boolean selected;
	private String service_para;//用于多媒体业务的业务参数
	
	public Combox(){}
	
	public Combox(int id, String text) {
		super();
		this.id = id;
		this.text = text;
	}
	
	
	public String getService_para()
	{
		return service_para;
	}

	public void setService_para(String service_para)
	{
		this.service_para = service_para;
	}

	public String getValue()
	{
		return value;
	}

	public void setValue(String value)
	{
		this.value = value;
	}

	public boolean getSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	

}
