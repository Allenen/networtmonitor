package cn.zr.networkmonitor.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import sun.misc.BASE64Decoder;

import cn.zr.networkmonitor.dao.MultipartFileDao;
import cn.zr.networkmonitor.dao.TopologyImageManagerDao;
import cn.zr.networkmonitor.domain.MultipartFileDomain;
import cn.zr.networkmonitor.domain.TopologyImageManager;

@Service
@Transactional
public class MultipartFileService {
	
	@Autowired
	private MultipartFileDao multipartFileDao;
	
	@Autowired
	private TopologyImageManagerDao topologyImageManagerDao;

	//将上传的图片存储到服务器端，并在数据库中存储图片的路径信息
//	public boolean uploadBottomImage(MultipartFileDomain multipartFileDomain, String realPathString) {
//		
//		MultipartFile file = multipartFileDomain.getImgFile();
//		String originalFileName = file.getOriginalFilename();
//		String absolutePath=realPathString+"/images/bottomImages/"+originalFileName;
//		multipartFileDomain.setImagePath(absolutePath);
//		multipartFileDomain.setImageName(originalFileName);
//		multipartFileDomain.setIsFlag(0);
//		
//		FileOutputStream fileOutputStream=null;
//		InputStream fileInputStream=null;
//		try {
//			fileOutputStream = new FileOutputStream(absolutePath);
//			int byteCount = 0;
//			byte[] bytes = new byte[1024];
//			fileInputStream = file.getInputStream();
//			while ((byteCount=fileInputStream.read(bytes))!=-1) {
//				fileOutputStream.write(bytes, 0, byteCount);
//			}
//			multipartFileDao.save(multipartFileDomain);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}finally{
//			try {
//				fileInputStream.close();
//				fileOutputStream.close();
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			
//		}
//		
//		return true;
//		
//	}
	public boolean uploadBottomImage(MultipartFileDomain multipartFileDomain, String pic_data, String realPathString) 
	{
		BASE64Decoder decode = new BASE64Decoder();
		byte[] b = null;
		try {
			b = decode.decodeBuffer(pic_data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		String bottomImageName = multipartFileDomain.getImageName();
		String absolutePath = realPathString + "/images/bottomImages/" + bottomImageName;
		multipartFileDomain.setImagePath(absolutePath);
		multipartFileDomain.setIsFlag(0);
		System.out.println(bottomImageName + "  海贼王  " + absolutePath);
		
		FileOutputStream fileOutputStream=null;
		try {
			fileOutputStream = new FileOutputStream(absolutePath);
			fileOutputStream.write(b, 0, b.length);
			multipartFileDao.save(multipartFileDomain);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				fileOutputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}
		
		return true;
		
	}

	//得到所有的底图信息
	public List<MultipartFileDomain> getAllBottomImages() {
		return multipartFileDao.loadAll();
	}
	
	//删除底图
	public void deleteBottomImageById(String bottomImageId)
	{
		MultipartFileDomain domain = multipartFileDao.get(Integer.parseInt(bottomImageId));
		multipartFileDao.remove(domain);
	}

	/*//通过图片的ID删除图片
	public void deleteBottomImageById(String bottomImageId) {
		TopologyImageManager domain = topologyImageManagerDao.get(Integer.parseInt(bottomImageId));
		topologyImageManagerDao.remove(domain);
	}*/

	//设置底图
	public void setBottomImage(String bottomImageId, String initRadioCheckedId) {
		multipartFileDao.get(Integer.parseInt(bottomImageId)).setIsFlag(1);
		if (initRadioCheckedId != null) {
			multipartFileDao.get(Integer.parseInt(initRadioCheckedId)).setIsFlag(0);
		}
		
	}

	//获取设置的底图
	public List<MultipartFileDomain> getBottomImage() {
		List<MultipartFileDomain> multipartFileDomains = multipartFileDao.find("from MultipartFileDomain where isFlag=1");
		return multipartFileDomains;
	}

	

}
