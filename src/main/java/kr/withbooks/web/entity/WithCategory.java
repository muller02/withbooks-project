package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithCategory {
    private Long withID;
    private List<Long> categoryId;

}
