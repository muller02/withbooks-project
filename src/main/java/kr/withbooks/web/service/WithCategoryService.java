package kr.withbooks.web.service;

import org.springframework.stereotype.Service;

import java.util.List;


public interface WithCategoryService {

    void add(Long withId, List<Long> withCategoryIdList);

    List<String> getListByWithId(Long withId);
}
