package kr.withbooks.web.repository;


import kr.withbooks.web.entity.FreeBoardView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FreeBoardViewRepository {

    List<FreeBoardView> findById(Long withId);



}
