package kr.withbooks.web.service;

import kr.withbooks.web.repository.WithCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WithCategoryServiceImp implements  WithCategoryService{

    @Autowired
    private WithCategoryRepository repository;

    @Override
    public void add(Long withId, List<Long> withCategoryIdList) {

        repository.save(withId,withCategoryIdList);

    }
}
