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
    private ShortsRepository shortsRepository;

    @Autowired
    private ShortsViewRepository shortsViewRepository;

    @Autowired
    private ShortsAttachmentRepository shortsAttachmentRepository;

    @Override
    public void add(Shorts shorts) {
        shortsRepository.save(shorts);
    }
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
}
