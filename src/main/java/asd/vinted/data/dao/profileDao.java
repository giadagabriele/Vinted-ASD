package asd.vinted.data.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import asd.vinted.data.entity.User;

public interface profileDao extends JpaRepository<User,Long>{
    
}
