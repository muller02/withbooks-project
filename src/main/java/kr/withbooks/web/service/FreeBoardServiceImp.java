package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;
import kr.withbooks.web.repository.FreeBoardRepository;

@Service
public class FreeBoardServiceImp implements  FreeBoardService{

    @Autowired
    private FreeBoardRepository repository;
    

    @Override
    public List<FreeBoardView> getList(Long withId, int page, String sort) {
        int limit = 10;
        int offset = (page - 1) * limit;
        List<FreeBoardView> list = repository.findAll(withId, page, sort, limit, offset);

        return list;
    }

    @Override
    public int getCount(Long withId) {
        return repository.count(withId);
    }

    @Override
    public FreeBoard getById(Long freeBoardId) {
        return repository.findById(freeBoardId);
    }

    @Override
    public void reg(FreeBoard freeBoard, MultipartFile[] imgs) {
        // DB에 freeboard 저장
    }
}
