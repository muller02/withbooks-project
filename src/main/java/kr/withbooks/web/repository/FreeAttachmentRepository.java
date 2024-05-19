package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.FreeAttachment;

@Mapper
public interface FreeAttachmentRepository {

    List<FreeAttachment> findAll(Long freeBoardId);

    int save(Long boardId, String savedPath);

    int remove(Long boardId);
    
}
