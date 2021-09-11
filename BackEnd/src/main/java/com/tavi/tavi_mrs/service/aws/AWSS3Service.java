package com.tavi.tavi_mrs.service.aws;

import org.springframework.web.multipart.MultipartFile;

public interface AWSS3Service {
    String uploadFile(MultipartFile multipartFile);

    Boolean deleteFileFromS3Bucket(String fileUrl);
}
