package asd.vinted.data.service.impl;


import asd.vinted.data.dao.CallRequestDao;
import asd.vinted.data.dao.CategoryDao;
import asd.vinted.data.entity.CallRequest;
import asd.vinted.data.entity.Category;
import asd.vinted.data.service.CallRequestService;
import asd.vinted.data.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CallRequestServiceImpl implements CallRequestService {

    @Autowired
    CallRequestDao callRequestDao;


    @Override
    public List<CallRequest> findAllRequestsByUserRequestId(Long idUsr) {
        return callRequestDao.findAllByUserOfRequest_Id(idUsr);
    }

    @Override
    public List<CallRequest> findAllRequestsByUserResponseId(Long idUsr) {
        return callRequestDao.findAllByUserOfResponse_Id(idUsr);
    }

    @Override
    public List<CallRequest> findAllRequestsStatusZeroByUserId(Long idUsr) {
        return callRequestDao.findStatusZeroByUserOfResponse_Id(idUsr);
    }

    @Override
    public boolean saveRequest(CallRequest callReq) {
        try {
            callRequestDao.save(callReq);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
       return  true;
    }

    @Override
    public void acceptRequest(CallRequest cr) {
        callRequestDao.save(cr);
    }
    @Override
    public void cancelRequest(Long id) {
        callRequestDao.cancel(id);
    }

}
