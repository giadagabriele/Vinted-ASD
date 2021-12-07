package asd.vinted.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import asd.vinted.entity.User;
import asd.vinted.entity.UserInformation;

public interface UserInformationDao extends JpaRepository<UserInformation,Long> {

    UserInformation findById(long id);
    UserInformation findByUserId(long userId);
    //void add(UserInformation user);
    //void update(UserInformation user);
}
