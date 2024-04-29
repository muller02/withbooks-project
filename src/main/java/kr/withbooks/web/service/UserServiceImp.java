package kr.withbooks.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.repository.NotificationRepository;
import kr.withbooks.web.repository.UserRepository;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository repository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public User getById(Long userId) {
        User user = repository.findById(userId);
        return user;
    }

    @Override
    public int getNotiCount(Long userId) {
        int notiCnt = notificationRepository.countById(userId);
        return notiCnt;
    }

    @Override
    public void modify(User user) {
        repository.update(user);
    }
    
}
