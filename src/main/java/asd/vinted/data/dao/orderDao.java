package asd.vinted.data.dao;

import asd.vinted.data.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderDao extends JpaRepository<Order,Long> {

}
