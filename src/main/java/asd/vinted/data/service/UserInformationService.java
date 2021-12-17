package asd.vinted.data.service;

import asd.vinted.entity.UserInformation;

public interface UserInformationService {
    UserInformation findById(Long i);
    boolean updateUserInformation(UserInformation user);
}
