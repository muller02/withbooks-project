package kr.withbooks.web.service;


import kr.withbooks.web.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {


    List<Category> getList();


    public List<Category> get(Long id);

}
