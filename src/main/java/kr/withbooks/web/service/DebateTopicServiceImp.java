package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateTopic;
import kr.withbooks.web.repository.DebateTopicRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DebateTopicServiceImp implements DebateTopicService {

    @Autowired
    private DebateTopicRepository repository;

    @Override
    public DebateTopic getById(Long id) {

        DebateTopic debateTopic = repository.findById(id);
        return debateTopic;
    }

    @Override
    public List<DebateTopic> getList(Long roomId) {
        List<DebateTopic> list = repository.findAll(roomId);
        return list;
    }
}
