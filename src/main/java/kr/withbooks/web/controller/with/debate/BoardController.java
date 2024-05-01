package kr.withbooks.web.controller.with.debate;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.*;
import kr.withbooks.web.service.*;
import kr.withbooks.web.util.FileStore;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
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

    @Autowired
    private DebateAttachmentService debateAttachmentService;

    @Autowired
    private DebateCommentService debateCommentService;

    @Autowired
    private FileStore fileStore;

    @GetMapping("/list")
    public String list(
            @RequestParam(name = "rid") Long roomId,
            @RequestParam(name = "tid", required = false) Long topicId,
            Model model) {

        List<DebateBoardView> list = debateBoardService.getList(roomId, topicId);
        model.addAttribute("list", list);

        log.info("list = {}", list);

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

        DebateBoard findBoard = debateBoardService.getById(id);
        Long roomId = findBoard.getRoomId();
        Long topicId = findBoard.getTopicId();
        List<DebateCommentView> debateCommentViewList = debateCommentService.getListById(id);


        DebateRoom findRoom = debateRoomService.getById(roomId);
        Long bookId = findRoom.getBookId();
        Book book = bookService.get(bookId);

        DebateTopic findTopic = debateTopicService.getById(topicId);
        log.info("findTopic = {}", findTopic);

        List<DebateAttachment> imgList = debateAttachmentService.getListById(id);
        log.info("imgList = {}", imgList);

        model.addAttribute("board", findBoard);
        model.addAttribute("book", book);
        model.addAttribute("topic", findTopic);
        model.addAttribute("imgList", imgList);
        model.addAttribute("debateCommentList", debateCommentViewList);

        System.out.println(debateCommentViewList);
        

        return "with/debate/board/detail";
    }

    @GetMapping("/reg")
    public String reg(
        @RequestParam(name = "rid") Long roomId,
        Model model){

        List<DebateTopic> topicList = debateTopicService.getList(roomId);
        model.addAttribute("topicList", topicList);

        return "with/debate/board/reg"; 
    }

    @PostMapping("/reg")
    public String reg(
            @ModelAttribute BoardForm boardForm,
            @RequestParam("rid") Long roomId,
            HttpServletRequest request) throws IOException {

        Long userId = 4L;

        // board
        DebateBoard board = DebateBoard.builder()
                .roomId(roomId)
                .userId(userId)
                .title(boardForm.getTitle())
                .content(boardForm.getContent())
                .topicId(boardForm.getTopicId())
                .build();

        Long boardId = debateBoardService.save(board);
        log.info("board id is {}", boardId);

        List<DebateAttachment> debateAttachments = fileStore.storeFiles(boardForm.getFiles(), request);
        log.info("debateAttachments is {}", debateAttachments);

        debateAttachmentService.add(boardId, debateAttachments);

        return "redirect:/with/debate/board/list?rid=" + roomId;

    }
}
