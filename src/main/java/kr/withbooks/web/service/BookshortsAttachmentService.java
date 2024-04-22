package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.BookshortsAttachment;

public interface BookshortsAttachmentService {


    void add(BookshortsAttachment shortsAttachment);

    List<BookshortsAttachment> getListById(Long id);
}
