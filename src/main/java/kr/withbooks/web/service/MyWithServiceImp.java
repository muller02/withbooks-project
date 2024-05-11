package kr.withbooks.web.service;

import kr.withbooks.web.repository.MyWithRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyWithServiceImp implements  MyWithService{


    @Autowired
    private MyWithRepository repository;

    @Override
    public List<Long> getListByUserId(Long userId) {




        return repository.findByUserId(userId);
    }
}
