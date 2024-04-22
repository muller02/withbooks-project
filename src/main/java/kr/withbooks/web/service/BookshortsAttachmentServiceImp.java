package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.BookshortsAttachment;
import kr.withbooks.web.repository.BookshortsAttachmentRepository;

@Service
public class BookshortsAttachmentServiceImp implements BookshortsAttachmentService{

    @Autowired
    private BookshortsAttachmentRepository repository;

    @Override
    public void add(BookshortsAttachment shortsAttachment) {

        repository.save(shortsAttachment);


    }

    @Override
    public List<BookshortsAttachment> getListById(Long id) {
        // 북쇼츠 id와 같은 attachment 객체 리스트를 가지고 온다.


        return repository.findAllById(id);
    }
}
