package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Notification;
import kr.withbooks.web.repository.NotificationRepository;

@Service
public class NotificationServiceImp implements NotificationService{
    
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public int getNotiCount(Long userId) {
        int notiCnt = notificationRepository.countById(userId);
        return notiCnt;
    }

    @Override
    public List<Notification> getList(Long userId) {
        List<Notification> list = notificationRepository.findAllById(userId);
        return list;
    }
}
