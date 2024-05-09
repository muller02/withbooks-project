package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.Notification;

@Mapper
public interface NotificationRepository {

    int countById(Long userId);

    List<Notification> findAllById(Long userId);

    
}