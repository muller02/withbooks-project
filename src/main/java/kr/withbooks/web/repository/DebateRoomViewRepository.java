package kr.withbooks.web.repository;

import kr.withbooks.web.entity.DebateRoomView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DebateRoomViewRepository {

    List<DebateRoomView> findAll();

    List<DebateRoomView> findAllById(Long withId);

    DebateRoomView findByWithId(Long withId);

}
