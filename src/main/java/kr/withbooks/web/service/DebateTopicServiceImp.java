package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateTopic;
import kr.withbooks.web.repository.DebateTopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DebateTopicServiceImp implements DebateTopicService {

    @Autowired
    private DebateTopicRepository debateTopicRepository;

    @Override
    public DebateTopic getById(Long id) {

        DebateTopic debateTopic = debateTopicRepository.findById(id);
        return debateTopic;
    }
}
