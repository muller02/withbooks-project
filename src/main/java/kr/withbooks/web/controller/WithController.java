package kr.withbooks.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.*;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.*;
import kr.withbooks.web.repository.DebateRoomViewRepository;
import kr.withbooks.web.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("with")
public class WithController {

    @Autowired
    private WithService service;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private WithCategoryService withCategoryService;

    @Autowired
    private WithMemberService withMemberService;

    // 서비스 필요할 것 같습니다.
    @Autowired
    private DebateRoomViewRepository debateRoomViewRepository;

    @Autowired
    private  FreeBoardService freeBoardService;

    @GetMapping("list")

    public String list(Model model,
                       @RequestParam(name = "c", required = false) Long[] categoryIds,
                       @RequestParam(name = "q", required = false) String query,
                       @RequestParam(name = "f" , required = false) Long faceYn) {

        //카테고리 모델 얻기
        List<Category> categoryList = categoryService.getList();
        model.addAttribute("categoryList", categoryList );


        //  WithView list 얻기
        List<WithView> list = service.getList(categoryIds,query,faceYn);

        //service 로 이동 시킴 why ? Api에서도 사용해야 하므로
//        // List에 담긴 WithView 를 하나 씩 꺼내고, 해당 WithView의 id를 통해 , 해당 위드에 등록 된 카테고리 이름을
//        // 가지고 와서, withView categoryNames에 담기.
//        for (WithView withView : list) {
//            Long withId = withView.getId();
//            List<String> categoryNames = service.getWithCategoryNames(withId);
//            withView.setCategoryNames(categoryNames);
//        }

        // 뷰에 데이터 전달
        model.addAttribute("list", list);

        return "/with/list";
    }

    @GetMapping("detail")
    public String detail(Model model , @RequestParam( name = "id" , required = false) Long withId ){

        //withId에 해당하는 위드 얻기
        With with = service.get(withId);

        System.out.println(with.toString());

        //withId에 해당하는 위드 카테고리 리스트를 얻기
       List<String> withCategoryNames   = withCategoryService.getListByWithId(withId);

       //withMember 테이블에서 withId에 해당하는 맴버들을 얻기
       List<WithMember> withMemberList = withMemberService.getListById(withId);
        int withMemberCnt = withMemberList.size();

          List<DebateRoomView> debateRoomList =   debateRoomViewRepository.findAllById(withId);
        System.out.println("사과 = " + debateRoomList);


        List<FreeBoardView> freeBoardList =  freeBoardService.getView();



        model.addAttribute("freeBoardList",freeBoardList);
        model.addAttribute("debateRoomList", debateRoomList);
        model.addAttribute("with",with);
        model.addAttribute("withCategoryNames",withCategoryNames);
        model.addAttribute("withMemberCnt",withMemberCnt);




        return "/with/detail";
    }


    @GetMapping("reg")
    public String regForm(Model model){

        // 위드 등록 페이지에서 사용 할 카테고리 이름들을, 카테고리 서비스를 이용해 가지고 오기 
        List<Category> categories = categoryService.getList();
        model.addAttribute("categories", categories);

        return "/with/reg";

    }

    @PostMapping("reg")
    public String reg(
                      With with,
                      // category-id의 체크박스 값들
                      @RequestParam(name = "category-id", required = false) Long[] categoryIds,
                      // with 대표 이미지 파일
                      @RequestParam(name = "with-img-file", required = false) MultipartFile withImgFile,
                      HttpServletRequest request

    ) throws IOException {


    //With 테이블 등록

        //위드 이미지파일 이름
        //파일이 없을 때, 기본 이미지 적용
        String withImgName = "default.png";


        //파일이 있을 떄, 파일을 로컬에 저장
        if(!withImgFile.isEmpty()) {

            withImgName = withImgFile.getOriginalFilename();

            String path = "/image/with";
            String realPath = request.getServletContext().getRealPath(path);

            File file = new File(realPath);
            if (!file.exists())
                file.mkdirs();

            File filePath = new File(realPath + File.separator + withImgName);

            withImgFile.transferTo(filePath);
        }

        with.setWithRegId(1L); // 위드 등록 사용자 id 임시 1L

        with.setImg(withImgName);  //입력 받거나 , 받지 못 했을떄 이미지 이름 지정

        service.add(with);  // with 저장


    //WithCategory 테이블 등록

        Long withId = with.getId();   // 위에서  등록한 with ID 반환받기

        //withcategoryId 배열을 List<Long> 형태로 변환
        List<Long> withCategoryIdList =  Arrays.asList(categoryIds);


        // WithCategory 객체 생성 후 값 지정
        WithCategory withCategory = new WithCategory();
        withCategory.setWithID(withId);
        withCategory.setCategoryId(withCategoryIdList);

        withCategoryService.add(withCategory.getWithID(), withCategory.getCategoryId());

        return "redirect:/with/list";


    }
}
