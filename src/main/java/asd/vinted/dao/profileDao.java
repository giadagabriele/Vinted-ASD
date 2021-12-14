package asd.vinted.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import asd.vinted.entity.User;

public interface profileDao extends JpaRepository<User,Long>{
    
}
