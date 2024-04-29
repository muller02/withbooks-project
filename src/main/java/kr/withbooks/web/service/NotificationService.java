package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.Notification;


public interface NotificationService {
    

    int getNotiCount(Long userId);

    List<Notification> getList(Long userId);
}
