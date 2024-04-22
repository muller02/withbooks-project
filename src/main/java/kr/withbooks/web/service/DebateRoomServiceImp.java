package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateRoom;
import kr.withbooks.web.entity.DebateRoomView;
import kr.withbooks.web.repository.DebateRoomRepository;
import kr.withbooks.web.repository.DebateRoomViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebateRoomServiceImp implements DebateRoomService {

    @Autowired
    private DebateRoomViewRepository debateRoomViewRepository;

    @Autowired
    private DebateRoomRepository debateRoomRepository;

    @Override
    public List<DebateRoomView> getList() {

        List<DebateRoomView> list = debateRoomViewRepository.findAll();

        return list;
    }

    @Override
    public DebateRoom getById(Long id) {

        DebateRoom findRoom = debateRoomRepository.findById(id);

        return findRoom;
    }
}
