package asd.vinted.data.dao;

import asd.vinted.data.entity.CallRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CallRequestDao extends JpaRepository<CallRequest,Long>{
    List<CallRequest> findByUserOfRequest_Id(long id);

    @Query("select c from CallRequest c where c.userOfResponse.id = ?1 ")
    List<CallRequest> findAllByUserOfResponse_Id(long id);

    @Query("select c from CallRequest c where c.userOfRequest.id = ?1 ")
    List<CallRequest> findAllByUserOfRequest_Id(long id);

    @Query("select c from CallRequest c where c.userOfResponse.id = ?1 and c.status=0")
    List<CallRequest> findStatusZeroByUserOfResponse_Id(long id);

    @Query("update CallRequest c set c.status=1 where c.id = ?1 ")
    void accept(long id);
    @Query("update CallRequest c set c.status=2 where c.id = ?1 ")
    void cancel(long id);


}
