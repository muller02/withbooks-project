package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.WithView;

@Mapper
public interface WithViewRepository {

  // List<WithView> findAll(Long[] categoryIds , String query, Long faceYn);

  List<WithView> findAll(Long[] categoryIds , String query, Long faceYn, Long id, String name, String withTop, String sort, Integer limit, Integer offset);

  WithView findById(Long id);

    List<WithView> findAllByWithIds(List<Long> withIds);

    List<WithView> findByUserId(Long userId);
}
