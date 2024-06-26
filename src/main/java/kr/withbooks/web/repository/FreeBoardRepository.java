package kr.withbooks.web.repository;


import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper
public interface FreeBoardRepository {

    List<FreeBoardView> findAll(Long withId, int page, String sort, int limit, int offset);

    int count(Long withId);

    FreeBoard findById(Long freeBoardId);

    int save(FreeBoard freeBoard);

    Long remove(Long id);

    int update(FreeBoard freeBoard);

    List<FreeBoardView> findAllNotice(Long withId);

}
