package kr.withbooks.web.repository;

import kr.withbooks.web.entity.DebateTopic;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DebateTopicRepository {

    DebateTopic findById(Long id);

    List<DebateTopic> findAll(Long roomId);
}
