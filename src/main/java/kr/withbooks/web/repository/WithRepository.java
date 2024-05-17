package kr.withbooks.web.repository;

import kr.withbooks.web.entity.With;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithRepository {

    List<With> findAll();

    void save(With with);

    With findById(Long wihtId);

    With findByName(String withName);
}
