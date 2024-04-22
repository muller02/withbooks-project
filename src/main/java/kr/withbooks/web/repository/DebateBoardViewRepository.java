package kr.withbooks.web.repository;

import kr.withbooks.web.entity.DebateBoardView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DebateBoardViewRepository {

    List<DebateBoardView> findAllById(Long roomId);

    DebateBoardView findById(Long id);
}
