package cn.zr.networkmonitor.web;

import java.io.IOException;


import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class Refresh {
	//上传图片 ,上传成功后，显示上传后的结果(拓扑图上传)
	@RequestMapping("refresh.html")
	public void uploadTopologyImage(HttpServletResponse response){
		try {
			response.getWriter().write("success");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
