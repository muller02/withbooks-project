package kr.withbooks.web.service;

import kr.withbooks.web.entity.User;

public interface UserService {

    User getById(Long userId);

    void modify(User user);

    String getNickNameById(Long userId);

    void join(User user);


    

    Integer emailCheck(String email);
    
    // User get(Long id, );
}
