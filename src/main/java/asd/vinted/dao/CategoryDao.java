package asd.vinted.dao;

import asd.vinted.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryDao extends JpaRepository<Category,Long>{
}
