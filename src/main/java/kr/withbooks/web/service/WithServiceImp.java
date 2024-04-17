package kr.withbooks.web.service;

import kr.withbooks.web.entity.With;
import kr.withbooks.web.entity.WithView;
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

    @Override
    public List<WithView> getList() {
        return viewRepository.findAll(null);

    }

    @Override
    public List<With> getList(Long[] categoryId) {
        return repository.findAll(categoryId);
    }

    @Override
    public List<String> getWithCategoryNames(Long withId) {

        return  viewRepository.findAllByWithId(withId);
    }

}
