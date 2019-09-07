package cn.zr.networkmonitor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zr.networkmonitor.dao.EdgeDao;
import cn.zr.networkmonitor.domain.Edge;


@Service
@Transactional
@SuppressWarnings("unchecked")
public class EdgeService {

	@Autowired
	private EdgeDao edgeDao;
	
	
	//根据ID获取
	public Edge getEdgeById(String edgeId)
	{
		List<Edge> edges = edgeDao.find("from Edge where edge_id = ?", edgeId);
		if(edges.size()>0)
			return edges.get(0);
		return null;
	}
	
	//添加
	public void addEdge(Edge edge) {
		edgeDao.save(edge);
	}
}
