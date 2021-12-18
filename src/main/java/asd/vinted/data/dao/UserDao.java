package asd.vinted.data.dao;

import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);
    //UserDto findById(long id);
    UserDto findByEmail(String email);
    User findByEmailEqualsIgnoreCase(String email);
    boolean existsByUsernameEqualsIgnoreCase(String username);
}
