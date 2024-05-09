package kr.withbooks.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.repository.FreeLikeRepository;

@Service
public class FreeLikeServiceImp implements FreeLikeService{

    @Autowired
    private FreeLikeRepository repository;

    @Override
    public int getCount(Long freeBoardId) {
        return repository.count(freeBoardId);
    }

    @Override
    public int like(Long freeBoardId, Long userId) {
       return repository.insert(freeBoardId, userId);
    }
    
    @Override
    public int deleteLike(Long freeBoardId, Long userId) {
        return repository.delete(freeBoardId, userId);
    }

    @Override
    public boolean isLiked(Long freeBoardId, Long id) {
        return repository.isLiked(freeBoardId, id);
    }
    
}
