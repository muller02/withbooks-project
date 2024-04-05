package kr.withbooks.web.service;

import kr.withbooks.web.entity.With;

import java.util.List;

public interface WithService {



    List<With> getList();
    List<With> getList(Long[] categoryId);



}
