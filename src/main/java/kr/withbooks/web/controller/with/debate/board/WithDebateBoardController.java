package kr.withbooks.web.controller.with.debate.board;

import kr.withbooks.web.entity.DebateBoardView;
import kr.withbooks.web.service.DebateBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/with/debate/board")
public class WithDebateBoardController {

    @Autowired
    private DebateBoardService debateBoardService;

    @GetMapping("/list")
    public String list(@RequestParam(name = "rid") Long id, Model model) {

        List<DebateBoardView> list = debateBoardService.getList(id);
        System.out.println("list: " + list);
        model.addAttribute("list", list);

        return "with/debate/board/list";
    }
}
