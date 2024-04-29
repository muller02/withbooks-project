package kr.withbooks.web.service;

import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;

import java.util.List;

public interface FreeBoardService {

    List<FreeBoardView> getViewById(Long withId);

}
