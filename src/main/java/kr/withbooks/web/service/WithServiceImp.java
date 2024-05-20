package kr.withbooks.web.service;

import kr.withbooks.web.entity.With;
import kr.withbooks.web.entity.WithView;
import kr.withbooks.web.repository.WithCategoryRepository;
import kr.withbooks.web.repository.WithRepository;
import kr.withbooks.web.repository.WithViewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WithServiceImp implements WithService {

    @Autowired
    private WithRepository repository;

    @Autowired
    private WithViewRepository viewRepository;

    @Autowired
    private WithCategoryRepository  withCategoryRepository;



    @Override
    public List<WithView> getList(Long[] categoryIds,String query,Long faceYn, Long id, String name, String withTop, String sort, Integer page) {
        // List에 담긴 WithView 를 하나 씩 꺼내고, 해당 WithView의 id를 통해 , 해당 위드에 등록 된 카테고리 이름을
        // 가지고 와서, withView categoryNames에 담기.

        Integer limit = 10;
        Integer offset = (page - 1) * limit;
        List<WithView> list = viewRepository.findAll(categoryIds, query, faceYn, id, name, withTop, sort, limit, offset);


        for (WithView withView : list) {
            Long withId = withView.getId();
            List<String> categoryNames = withCategoryRepository.findById(withId);
            withView.setCategoryNames(categoryNames);
        }

        return list;
    }

    @Override
    public List<WithView> getListByWithIds(List<Long> withIds) {

        List<WithView> list = viewRepository.findAllByWithIds(withIds);



        for (WithView withView : list) {
            Long withId = withView.getId();
            List<String> categoryNames = withCategoryRepository.findById(withId);
            withView.setCategoryNames(categoryNames);
        }


        return list;

    }


    @Override
    public void add(With with) {

        repository.save(with);
    }

    @Override
    public With get(Long withId) {

        With with =  repository.findById(withId);

        return with;
    }

    @Override
    public boolean getName(String withName) {
        With with = repository.findByName(withName);

        return with != null;
    }

    @Override
    public List<WithView> getListByBookId(Long bookId) {
        return viewRepository.findByBookId(bookId);
    }


}