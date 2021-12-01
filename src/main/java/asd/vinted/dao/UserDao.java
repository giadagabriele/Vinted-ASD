package asd.vinted.dao;

import asd.vinted.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,Long> {

    User findById(int i);
}
