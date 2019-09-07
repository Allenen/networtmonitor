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

import cn.zr.networkmonitor.dao.TopologyImageManagerDao;
import cn.zr.networkmonitor.domain.TopologyImageManager;

@Service
@Transactional
public class TopologyImageManagerService {

	@Autowired
	public TopologyImageManagerDao topologyImageManagerDao;
	
	//得到所有的拓扑管理中的图片
	public List<TopologyImageManager> getAllTopologyImages() {
		return topologyImageManagerDao.loadAll();
	}

	//将上传的图片存储到服务器端，并在数据库中存储图片的路径信息(拓扑图)
	public boolean uploadTopologyImage(String pic_data, TopologyImageManager topologyImageManager, String realPathString) {
		BASE64Decoder decode = new BASE64Decoder();
		byte[] b = null;
		try {
			b = decode.decodeBuffer(pic_data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		String absolutePath = realPathString + "/images/topologyImages/" + topologyImageManager.getTopologyImageName();
		topologyImageManager.setTopologyImagePath(absolutePath);
		topologyImageManager.setIsFlag(0);
		
		FileOutputStream fileOutputStream=null;
		try {
			fileOutputStream = new FileOutputStream(absolutePath);
			fileOutputStream.write(b, 0, b.length);
			topologyImageManagerDao.save(topologyImageManager);
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
	
	//设置显示在拓扑管理中的图标
	public void setTopologyImagevisible(String topologyImageIdList, String preImageIdList){
		String[] visible_id = topologyImageIdList.split(";");
		String[] invisible_id = preImageIdList.split(";");
		
		for(String topologyImageId:invisible_id){
			if (topologyImageId != null && !topologyImageId.equals("")) 
				topologyImageManagerDao.get(Integer.parseInt(topologyImageId)).setIsFlag(0);
		}
		
		for(String topologyImageId:visible_id){
			if (topologyImageId != null && !topologyImageId.equals("")) 
				topologyImageManagerDao.get(Integer.parseInt(topologyImageId)).setIsFlag(1);
		}

	}

	//设置显示在拓扑管理中的图标
	public void setTopologyImage(String topologyImageIdList,
			String initCheckboxCheckedIdList) {
		String[] a = topologyImageIdList.split(";");
		int size = a.length;
		int len = Integer.parseInt(a[0]);
		for(int i = size - len + 1; i < size; i ++)
			topologyImageManagerDao.get(Integer.parseInt(a[i])).setIsFlag(0);
		for(int i = 1; i < size - len + 1; i ++)
			topologyImageManagerDao.get(Integer.parseInt(a[i])).setIsFlag(1);
		
//		String[] initCheckboxCheckeds = initCheckboxCheckedIdList.split(";");
//		String[] topologyImageIds = topologyImageIdList.split(";");
		
		
//		for(String initCheckboxId:initCheckboxCheckeds){
//			if (initCheckboxId != null && !initCheckboxId.equals("")) {
//				topologyImageManagerDao.get(Integer.parseInt(initCheckboxId)).setIsFlag(0);
//			}
//		}
//		
//		for(String topologyImageId:topologyImageIds){
//			if (topologyImageId != null && !topologyImageId.equals("")) {
//				topologyImageManagerDao.get(Integer.parseInt(topologyImageId)).setIsFlag(1);
//			}
//		}
	}

	//得到需要显示的拓扑图
	public List<TopologyImageManager> getTopologyImage() {
		return topologyImageManagerDao.find("from TopologyImageManager where isFlag=1");
	}
	
	//删除拓扑配置
	public void deleteTopologyImageById(String topologyImageId)
	{
		TopologyImageManager topologyImageManager = topologyImageManagerDao.get(Integer.parseInt(topologyImageId));
		//MultipartFileDomain domain = multipartFileDao.get(Integer.parseInt(bottomImageId));
		topologyImageManagerDao.remove(topologyImageManager);
		//multipartFileDao.remove(domain);
	}

}
