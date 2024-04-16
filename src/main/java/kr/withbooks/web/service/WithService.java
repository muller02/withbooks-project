package kr.withbooks.web.service;

import kr.withbooks.web.entity.With;
import kr.withbooks.web.entity.WithView;

import java.util.List;

public interface WithService {
    List<WithView> getList();

    // List<With> getList(Long[] categoryId);

}
