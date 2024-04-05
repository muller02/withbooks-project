package kr.withbooks.web.service;

import kr.withbooks.web.entity.With;
import kr.withbooks.web.repository.WithRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WithServiceImp  implements  WithService{

    @Autowired
    private WithRepository repository;

    @Override
    public List<With> getList() {


        return getList(null);
    }

    @Override
    public List<With> getList(Long[] categoryId) {
        return repository.findAll(categoryId);
    }
}
