package asd.vinted.data.service;

import asd.vinted.data.entity.CallRequest;


import java.util.List;

public interface CallRequestService {
    List<CallRequest> findAllRequestsByUserRequestId(Long idUsr);
    List<CallRequest> findAllRequestsByUserResponseId(Long idUsr);
    List<CallRequest> findAllRequestsStatusZeroByUserId(Long idUsr);
    boolean saveRequest(CallRequest callReq);
    void acceptRequest(CallRequest cr);
    void cancelRequest(Long id);
}
