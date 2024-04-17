package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateRoomView;
import kr.withbooks.web.repository.DebateRoomViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebateRoomServiceImp implements DebateRoomService {

    @Autowired
    private DebateRoomViewRepository repository;

    @Override
    public List<DebateRoomView> getList() {

        List<DebateRoomView> list = repository.findAll();

        return list;
    }
}
