package kr.withbooks.web.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;

public interface FreeBoardService {

    // List<FreeBoardView> getViewById(Long withId);

    List<FreeBoardView> getList(Long withId, int page, String sort);

    int getCount(Long withId);

    FreeBoard getById(Long freeBoardId);

    int reg(FreeBoard freeBoard, MultipartFile[] imgs);

    Long delete(Long id);

    int edit(FreeBoard freeBoard, MultipartFile[] imgs, HttpServletRequest request);

}
