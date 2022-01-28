package asd.vinted.data.dao;

import asd.vinted.data.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface orderDao extends JpaRepository<Order,Long> {
    List<Order> findByproductID(String product);
    List<Order> findByUserID(long user);

}
