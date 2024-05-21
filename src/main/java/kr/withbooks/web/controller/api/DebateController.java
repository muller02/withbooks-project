package kr.withbooks.web.controller.api;

import kr.withbooks.web.entity.DebateRoomView;
import kr.withbooks.web.service.DebateRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("apiDebateController")
@RequestMapping("/api/with/debate")
public class DebateController {

    @Autowired
    private DebateRoomService debateRoomService;

    @GetMapping
    public List<DebateRoomView> list(@RequestParam(name = "id") Long withId) {

        List<DebateRoomView> list  = debateRoomService.getListById(withId);
        return  list;

    }

}
