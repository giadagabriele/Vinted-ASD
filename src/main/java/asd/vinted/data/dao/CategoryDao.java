package asd.vinted.data.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import asd.vinted.data.entity.Category;

public interface CategoryDao extends JpaRepository<Category,Long>{
}
