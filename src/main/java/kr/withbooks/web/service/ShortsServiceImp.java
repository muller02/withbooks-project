package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Shorts;
import kr.withbooks.web.entity.ShortsAttachment;
import kr.withbooks.web.entity.ShortsView;
import kr.withbooks.web.repository.ShortsAttachmentRepository;
import kr.withbooks.web.repository.ShortsRepository;
import kr.withbooks.web.repository.ShortsViewRepository;


@Service
public class ShortsServiceImp  implements  ShrotsService{

    @Autowired
    private ShortsRepository repository;

    @Autowired
    private ShortsViewRepository shortsViewRepository;

    @Autowired
    private ShortsAttachmentRepository shortsAttachmentRepository;

    // shorts 저장
    @Override
    public void add(Shorts shorts) {
        repository.save(shorts);
    }

    // shortsview 가져오기
    @Override
    public List<ShortsView> getView() {
        return  getView(null);
    }


    @Override
    public List<ShortsView> getView(Long bookId) {
        return shortsViewRepository.findAll(bookId);
    }

    @Override
    public List<ShortsAttachment> getAttach() {
        return shortsAttachmentRepository.findAll();
    }

    // shorts 가져오기
    @Override
    public Shorts get(Long shortsId) {
        return repository.findById(shortsId);
    }

    @Override
    public void delete(Long shortsId) {
        
        repository.blindById(shortsId);

    }

    

}
