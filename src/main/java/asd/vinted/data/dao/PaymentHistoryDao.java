package asd.vinted.data.dao;
import asd.vinted.data.entity.PaymentHistory;
import asd.vinted.data.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentHistoryDao extends JpaRepository<PaymentHistory, Long> {
  List<PaymentHistory> findByProduct(String product);
  List<PaymentHistory> findByUser(long user);
  PaymentHistory save(PaymentHistory paymentHistory);
}

