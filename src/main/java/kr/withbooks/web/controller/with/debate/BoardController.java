package kr.withbooks.web.controller.with.debate;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.DebateAttachment;
import kr.withbooks.web.entity.DebateBoard;
import kr.withbooks.web.entity.DebateBoardView;
import kr.withbooks.web.entity.DebateCommentView;
import kr.withbooks.web.entity.DebateRoom;
import kr.withbooks.web.entity.DebateTopic;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.DebateAttachmentService;
import kr.withbooks.web.service.DebateBoardService;
import kr.withbooks.web.service.DebateCommentService;
import kr.withbooks.web.service.DebateRoomService;
import kr.withbooks.web.service.DebateTopicService;
import kr.withbooks.web.util.FileStore;
import lombok.extern.slf4j.Slf4j;

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
            @AuthenticationPrincipal CustomUserDetails userDetails,
            Model model) {

        System.out.println("진입  토마토 ");
        DebateBoard findBoard = debateBoardService.getById(id);
        Long roomId = findBoard.getRoomId();
        Long topicId = findBoard.getTopicId();
        List<DebateCommentView> debateCommentList = debateCommentService.getListById(id);


        DebateRoom findRoom = debateRoomService.getById(roomId);
        Long bookId = findRoom.getBookId();
        Book book = bookService.getById(bookId);
        System.out.println("진입  토마토 ");

        DebateTopic findTopic = debateTopicService.getById(topicId);
        log.info("findTopic = {}", findTopic);

        List<DebateAttachment> imgList = debateAttachmentService.getListById(id);
        log.info("imgList = {}", imgList);

        model.addAttribute("board", findBoard);
        model.addAttribute("book", book);
        model.addAttribute("topic", findTopic);
        model.addAttribute("imgList", imgList);
        model.addAttribute("debateCommentList", debateCommentList);
        // model.addAttribute("userId", userDetails.getId());

        System.out.println("debateCommentList : " + debateCommentList);
        

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

    @GetMapping("/edit")
    public String edit(@RequestParam("id") Long id, Model model) {
        DebateBoard debateBoard = debateBoardService.getById(id);
        List<DebateTopic> topicList = debateTopicService.getList(debateBoard.getRoomId());

        model.addAttribute("board", debateBoard);
        model.addAttribute("topicList", topicList);
        return "with/debate/board/edit";
    }
}
