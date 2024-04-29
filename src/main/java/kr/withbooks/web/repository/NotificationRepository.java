package kr.withbooks.web.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NotificationRepository {

    int countById(Long userId);

    
}