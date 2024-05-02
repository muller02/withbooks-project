package kr.withbooks.web.repository;


import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FreeBoardRepository {

    // List<FreeBoard> findAll();

    List<FreeBoardView> findAllByWithId(Long withId);



}
