package kr.withbooks.web.controller.with.debate;

import kr.withbooks.web.entity.DebateRoomView;
import kr.withbooks.web.service.DebateRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/with/debate")
public class WithDebateController {

    @Autowired
    private DebateRoomService debateRoomService;

    @GetMapping("/list")
    public String list(Model model) {

        List<DebateRoomView> list  = debateRoomService.getList();

        model.addAttribute("list", list);
        System.out.println("list: " + list);

        return "with/debate/list";
    }
}
