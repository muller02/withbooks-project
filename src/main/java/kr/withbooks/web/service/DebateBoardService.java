package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateBoardView;

import java.util.List;

public interface DebateBoardService {

    List<DebateBoardView> getList(Long id);
}
