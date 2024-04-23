package kr.withbooks.web.repository;

import kr.withbooks.web.entity.DebateTopic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DebateTopicRepository {

    DebateTopic findById(Long id);
}
