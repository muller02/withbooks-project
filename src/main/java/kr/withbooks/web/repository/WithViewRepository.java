package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.WithView;

@Mapper
public interface WithViewRepository {

  List<WithView> findAll(String query);

  WithView findById(Long id);
}
