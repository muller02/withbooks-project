package kr.withbooks.web.service;

import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;
import kr.withbooks.web.repository.FreeBoardRepository;
import kr.withbooks.web.repository.FreeBoardViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FreeBoardServiceImp implements  FreeBoardService{

    @Autowired
    private FreeBoardViewRepository freeBoardViewRepository;

    @Override
    public List<FreeBoardView> getViewById(Long withId) {

        List<FreeBoardView> list = freeBoardViewRepository.findById(withId);

        return  list;
    }
}
