package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.FreeBoardView;

public interface FreeBoardService {

    // List<FreeBoardView> getViewById(Long withId);

    List<FreeBoardView> getListByWithId(Long withId);

}
