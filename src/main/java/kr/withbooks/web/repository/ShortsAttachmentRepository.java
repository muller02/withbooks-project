package kr.withbooks.web.repository;

import kr.withbooks.web.entity.ShortsAttachment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ShortsAttachmentRepository {
    void save(ShortsAttachment shortsAttachment);
    List<ShortsAttachment> findAll();

    List<ShortsAttachment> findAllById(Long id);
}
