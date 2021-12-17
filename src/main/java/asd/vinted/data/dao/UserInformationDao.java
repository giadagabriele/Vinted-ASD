package asd.vinted.data.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import asd.vinted.data.entity.User;
import asd.vinted.data.entity.UserInformation;

public interface UserInformationDao extends JpaRepository<UserInformation,Long> {

    UserInformation findById(long id);
    UserInformation findByUserId(long userId);
    //void add(UserInformation user);
    //void update(UserInformation user);
   // @Query("update User u set u.active = false where u.lastLoginDate < :date")
    //void update(UserInformation user);
}
