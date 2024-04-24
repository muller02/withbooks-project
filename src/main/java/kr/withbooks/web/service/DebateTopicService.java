package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.DebateTopic;

public interface DebateTopicService {

    DebateTopic getById(Long id);

    List<DebateTopic> getList(Long roomId);
}
