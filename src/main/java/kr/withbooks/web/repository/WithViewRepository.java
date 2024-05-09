package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.WithView;

@Mapper
public interface WithViewRepository {

  List<WithView> findAll(Long[] categoryIds , String query, Long faceYn);

  WithView findById(Long id);

    List<String> findAllByWithId(Long withId);
}
