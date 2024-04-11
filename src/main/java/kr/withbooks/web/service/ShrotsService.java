package kr.withbooks.web.service;

import kr.withbooks.web.entity.Shorts;
import kr.withbooks.web.entity.ShortsAttachment;
import kr.withbooks.web.entity.ShortsView;

import java.util.List;

public interface ShrotsService {

    void add(Shorts shorts);
    List<ShortsView> getView(Long booId);
    List<ShortsView> getView();
    List<ShortsAttachment> getAttach();
    Shorts get(Long shortsId);
}
