package kr.withbooks.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/with/debate")
public class WithDebateController {

    @GetMapping("/list")
    public String list() {

        return "with/debate/list";
    }
}
