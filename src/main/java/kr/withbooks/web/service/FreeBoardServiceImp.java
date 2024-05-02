package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.FreeBoardView;
import kr.withbooks.web.repository.FreeBoardRepository;

@Service
public class FreeBoardServiceImp implements  FreeBoardService{

    @Autowired
    private FreeBoardRepository repository;

    // @Override
    // public List<FreeBoardView> getViewById(Long withId) {

    //     List<FreeBoardView> list = freeBoardViewRepository.findById(withId);

    //     return  list;
    // }

    @Override
    public List<FreeBoardView> getListByWithId(Long withId) {
        List<FreeBoardView> list = repository.findAllByWithId(withId);
        // list에 imgs 채워넣기

        return list;
    }
}
