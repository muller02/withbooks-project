package kr.withbooks.web.util;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.DebateAttachment;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * storeFileName = saveImg
 */
@Component
public class FileStore3 {

    // 파일을 disk 에 저장
    public List<DebateAttachment> storeFiles(String path, List<MultipartFile> multipartFiles, HttpServletRequest request) throws IOException {
        List<DebateAttachment> storeFileResult = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                DebateAttachment debateAttachment = storeFile(path, multipartFile, request);
                storeFileResult.add(debateAttachment);
            }
        }
        return storeFileResult;
    }

    public DebateAttachment storeFile(String path, MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName(originalFilename);

//        String path = "/image/debate/board";
//        String realPath = request.getServletContext().getRealPath(path);
        String realPath = getUploadFilePath(path, storeFileName, request);

        File pathFile = new File(realPath);

        if(!pathFile.exists())
            pathFile.mkdirs();

        multipartFile.transferTo(new File(realPath+File.separator+storeFileName));

        return DebateAttachment.builder()
                .originalImg(originalFilename)
                .saveImg(storeFileName)
                .build();

    }

    // disk 에 저장된 파일 삭제
    public void deleteFile(List<DebateAttachment> debateAttachment, HttpServletRequest request) {
        if (CollectionUtils.isEmpty(debateAttachment)) {
            return;
        }

        for (DebateAttachment attachment : debateAttachment) {
            deleteFile(attachment.getSaveImg(), request);
        }
    }

    public void deleteFile(String path, List<DebateAttachment> debateAttachment, HttpServletRequest request) {
        if (CollectionUtils.isEmpty(debateAttachment)) {
            return;
        }

        for (DebateAttachment attachment : debateAttachment) {
            deleteFile(path, attachment.getSaveImg(), request);
        }
    }

    private void deleteFile(String storeFileName, HttpServletRequest request) {
        String uploadFilePath = getUploadFilePath(storeFileName, request);
        File file = new File(uploadFilePath);
        if (file.exists()) {
            file.delete();
        }
    }

    private void deleteFile(String path, String storeFileName, HttpServletRequest request) {
        String uploadFilePath = getUploadFilePath(path, storeFileName, request);
        File file = new File(uploadFilePath);
        if (file.exists()) {
            file.delete();
        }
    }

    private String getUploadFilePath(String storeFileName, HttpServletRequest request) {
        // storeFileName = saveImg
        String path = "/image/debate/board";
        String realPath = request.getServletContext().getRealPath(path);
        return realPath + File.separator + storeFileName;
    }

    private String getUploadFilePath(String path, String storeFileName, HttpServletRequest request) {
        // storeFileName = saveImg
        String realPath = request.getServletContext().getRealPath(path);
        return realPath + File.separator + storeFileName;
    }


    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        String storeFileName = uuid + "." + ext;
        return storeFileName;
    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        String ext = originalFilename.substring(pos + 1);
        return ext;
    }
}
