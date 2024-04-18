package kr.withbooks.web.controller.with;

import java.io.File;
import java.io.IOException;
import java.util.*;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.Category;
import kr.withbooks.web.entity.With;
import kr.withbooks.web.entity.WithCategory;
import kr.withbooks.web.service.CategoryService;
import kr.withbooks.web.service.WithCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import kr.withbooks.web.entity.WithView;
import kr.withbooks.web.service.WithService;
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


    @GetMapping("list")
    public String list(Model model) {

        // 데이터베이스에서 정보 가져와 list에 담기
        List<WithView> list = service.getList();

        // 위드별 선택한 주요카테고리 뿌려주기
        for (WithView withView : list) {
            Long withId = withView.getId();
            List<String> categoryNames = service.getWithCategoryNames(withId);
            withView.setCategoryNames(categoryNames);
        }


        // 뷰에 데이터 전달
        model.addAttribute("list", list);
        System.out.println(list);

        return "/with/list";
    }

    @GetMapping("reg")
    public String regForm(Model model){

        List<Category> categories     = categoryService.getList();
        model.addAttribute("categories", categories);

        return "/with/reg";

    }

    @PostMapping("reg")
    public String reg(
                      With with,
                      @RequestParam(name = "category-id", required = false) Long[] categoryIds,
                      @RequestParam(name = "with-img-file", required = false) MultipartFile withImgFile,
                      HttpServletRequest request

    ) throws IOException {

    //With 테이블 등록

        //위드 이미지파일 이름
        String withImgName = "default.png";


        //파일이 없을 때, 기본 이미지 적용
        if(!withImgFile.isEmpty()) {
            //파일이 있을 떄,
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

        System.out.println("복숭아 = " + withCategoryIdList);
        WithCategory withCategory = new WithCategory();
        withCategory.setWithID(withId);
        withCategory.setCategoryId(withCategoryIdList);

        withCategoryService.add(withCategory.getWithID(), withCategory.getCategoryId());

        return "redirect:/with/list";


    }
}
