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

    @Override
    public List<String> getListByWithId(Long withId) {

        //with id 를 통해 , repository에게 위드 아이디에 해당하는 카테고리 이름을 얻기

        return repository.findById(withId);
    }


}
