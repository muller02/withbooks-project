package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateRoom;
import kr.withbooks.web.entity.DebateRoomView;

import java.util.List;

public interface DebateRoomService {

    List<DebateRoomView> getList();

    DebateRoom getById(Long id);

    List<DebateRoomView> getListById(Long withId);


    Long add(DebateRoom debateRoom);
}
