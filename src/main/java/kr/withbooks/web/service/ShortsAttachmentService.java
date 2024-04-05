package kr.withbooks.web.service;

import kr.withbooks.web.entity.ShortsAttachment;

import java.util.List;

public interface ShortsAttachmentService {


    void add(ShortsAttachment shortsAttachment);

    List<ShortsAttachment> getListById(Long id);
}
