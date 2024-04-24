package kr.withbooks.web.controller.with.debate;

import kr.withbooks.web.entity.*;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.DebateBoardService;
import kr.withbooks.web.service.DebateRoomService;
import kr.withbooks.web.service.DebateTopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/with/debate/board")
public class BoardController {

    @Autowired
    private DebateBoardService debateBoardService;

    @Autowired
    private DebateRoomService debateRoomService;

    @Autowired
    private BookService bookService;

    @Autowired
    private DebateTopicService debateTopicService;

    @GetMapping("/list")
    public String list(
            @RequestParam(name = "rid") Long roomId,
            @RequestParam(name = "tid", required = false) Long topicId,
            Model model) {

        List<DebateBoardView> list = debateBoardService.getList(roomId, topicId);
        model.addAttribute("list", list);

        List<DebateTopic> topicList = debateTopicService.getList(roomId);
        model.addAttribute("topicList", topicList);


        if (topicId != null) {
            DebateTopic findTopic = debateTopicService.getById(topicId);
            model.addAttribute("selectedOption", findTopic.getId());
        }

        return "with/debate/board/list";
    }

    @GetMapping("/detail")
    public String detail(
            @RequestParam Long id,
            Model model) {

        DebateBoardView findBoard = debateBoardService.getById(id);

        Long roomId = findBoard.getRoomId();
        DebateRoom findRoom = debateRoomService.getById(roomId);

        Long bookId = findRoom.getBookId();
        Book book = bookService.get(bookId);

        model.addAttribute("board", findBoard);
        model.addAttribute("book", book);

        return "with/debate/board/detail";
    }
}
