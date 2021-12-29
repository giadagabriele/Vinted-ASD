package asd.vinted.data.dao;

import asd.vinted.data.entity.Product;
import asd.vinted.data.entity.payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface paymentdao extends JpaRepository<payment,Long> {

}
