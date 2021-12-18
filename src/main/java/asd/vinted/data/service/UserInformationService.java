package asd.vinted.data.service;

import asd.vinted.data.entity.UserInformation;

public interface UserInformationService {
    UserInformation findById(Long i);
    boolean updateUserInformation(UserInformation user);
}
