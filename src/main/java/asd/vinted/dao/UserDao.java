package asd.vinted.dao;

import asd.vinted.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User,Long> {
    User findByEmailAndPassword(String email,String password);
    User findById(int id);
    User findByEmail(String email);
    User findByEmailEqualsIgnoreCase(String email);
   // boolean existsByUsernameEqualsIgnoreCase(String username);
}
