package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;
import kr.withbooks.web.repository.FreeAttachmentRepository;
import kr.withbooks.web.repository.FreeBoardRepository;

@Service
public class FreeBoardServiceImp implements  FreeBoardService{

    @Autowired
    private FreeBoardRepository repository;

    @Autowired
    private FreeAttachmentRepository freeAttachmentRepository;
    

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
    public int reg(FreeBoard freeBoard, MultipartFile[] imgs) {
        int count = 0;

        // DB에 freeboard 저장
        repository.save(freeBoard);
        Long boardId = freeBoard.getId();
        System.out.println("보드아이디 : " + boardId);

        // 이미지가 왔다면
        // DB에 이미지 저장
        if(!imgs[0].isEmpty())
            for(MultipartFile img : imgs){
                String savedPath = "/image/free-board/" + img.getOriginalFilename();
                count += freeAttachmentRepository.save(boardId, savedPath);
            }

        return count;
    }

    @Override
    public Long delete(Long id) {
        return repository.remove(id);
    }
}
