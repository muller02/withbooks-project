package kr.withbooks.web.controller.with.debate.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/with/debate/board")
public class WithDebateBoardController {

    @GetMapping("/list")
    public String list(@RequestParam(name = "") Long id, Model model) {



        return "null";
    }
}
