package kr.withbooks.web.controller.with.debate;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.DebateAttachment;
import kr.withbooks.web.entity.DebateBoard;
import kr.withbooks.web.entity.DebateBoardView;
import kr.withbooks.web.entity.DebateRoom;
import kr.withbooks.web.entity.DebateTopic;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.DebateBoardService;
import kr.withbooks.web.service.DebateRoomService;
import kr.withbooks.web.service.DebateTopicService;

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
        @RequestParam(name = "files", required = false) List<MultipartFile> files, 
        Long roomId,
        Long topicId,
        String title,
        String content,
        // @RequestParam(name = "text-area", required = false) String content,
        // @RequestParam(required = false , name = "book-id") Long bookId,
        HttpServletRequest request){



        // DebateBoard board = DebateBoard.builder().roomId(roomId).topicId(topicId).title(title).content(content).userId(4L).build();

        // String fileName = null;

        // String fileFullPath = null;

        // for(int i=0; i<files.size(); i++){

        //     if (!files.get(i).isEmpty()) {

        //         fileName = files.get(i).getOriginalFilename();

        //         String path = "/image/debate";
        //         String realPath = request.getServletContext().getRealPath(path);
        //         File file = new File(realPath);
        //         if(!file.exists())
        //             file.mkdirs();              

        //         File filePath = new File(realPath+File.separator+fileName);
                
        //         files.get(i).transferTo(filePath);
                
            
        //         DebateAttachment debateAttachment = DebateAttachment.builder().
        //         //for문을 돌면서 다중 파일 이미지 이름을 db(shorts_attachment)에 저장
        //         // DebateAttachmentService.add(shortsAttachment);
        //     }
        // }
   
        return "redirect:/with/debate/board/list";

    }
}
