package asd.vinted.data.dao;

import asd.vinted.data.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDao extends JpaRepository<Product, Long> {
  List<Product> findByCategory(String category);
  Optional<Product> findByName(String name);
  Product save(ProductDao p);
}
