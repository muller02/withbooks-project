package kr.withbooks.web.service;

import kr.withbooks.web.entity.With;
import kr.withbooks.web.entity.WithView;

import java.util.List;

public interface WithService {
    // 전체 목록 조회
    List<WithView> getList();

    // 카테고리별 목록 조회
    List<With> getList(Long[] categoryId);

    // 목록에서 카테고리 리스트 보여줌
    List<String> getWithCategoryNames(Long withId);

    void add(With with);
}
