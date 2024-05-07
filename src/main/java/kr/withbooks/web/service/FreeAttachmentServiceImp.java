package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.FreeAttachment;
import kr.withbooks.web.repository.FreeAttachmentRepository;

@Service
public class FreeAttachmentServiceImp implements FreeAttachmentService{

    @Autowired
    FreeAttachmentRepository repository;

    @Override
    public List<FreeAttachment> getList(Long freeBoardId) {
        return repository.findAll(freeBoardId);
    }
    
}
