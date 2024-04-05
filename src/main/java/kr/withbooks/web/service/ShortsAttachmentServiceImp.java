package kr.withbooks.web.service;

import kr.withbooks.web.entity.ShortsAttachment;
import kr.withbooks.web.repository.ShortsAttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShortsAttachmentServiceImp implements  ShortsAttachmentService{

    @Autowired
    private ShortsAttachmentRepository repository;

    @Override
    public void add(ShortsAttachment shortsAttachment) {

        repository.save(shortsAttachment);


    }

    @Override
    public List<ShortsAttachment> getListById(Long id) {
        // 북쇼츠 id와 같은 attachment 객체 리스트를 가지고 온다.


        return repository.findAllById(id);
    }
}
