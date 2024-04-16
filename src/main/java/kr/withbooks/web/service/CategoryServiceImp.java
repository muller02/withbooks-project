package kr.withbooks.web.service;

import kr.withbooks.web.entity.Category;
import kr.withbooks.web.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImp implements  CategoryService{

   @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getList() {

        return  categoryRepository.findAll();
    }

    @Override
    public List<Category> get(Long id) {
        return null;
    }
}
