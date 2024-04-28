package kr.withbooks.web.repository;

import kr.withbooks.web.entity.DebateAttachment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DebateAttachmentRepository {

    void save(List<DebateAttachment> debateAttachments);
}
