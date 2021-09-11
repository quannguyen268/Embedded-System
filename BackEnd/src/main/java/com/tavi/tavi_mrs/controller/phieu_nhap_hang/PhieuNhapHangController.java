package com.tavi.tavi_mrs.controller.phieu_nhap_hang;


import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.entities.phieu_nhap_hang.PhieuNhapHang;
import com.tavi.tavi_mrs.service.nguoi_dung.NguoiDungService;
import com.tavi.tavi_mrs.service.nha_cung_cap.NhaCungCapService;
import com.tavi.tavi_mrs.service.phieu_nhap_hang.PhieuNhapHangService;
import com.tavi.tavi_mrs.utils.DateTimeUtils;
import com.tavi.tavi_mrs.utils.ExcelUtils;
import io.swagger.annotations.ApiOperation;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/phieu-nhap-hang")
public class PhieuNhapHangController {
    @Autowired
    PhieuNhapHangService phieuNhapHangService;

    @Autowired
    NguoiDungService nguoiDungService;

    @Autowired
    NhaCungCapService nhaCungCapService;

    @Value("${spring.upload.folder-upload}")
    private String UPLOAD_DIRECTORY;

    @Value("${spring.upload.link-prefix}")
    private String URL_UPLOAD_FILE;

    @PostMapping("/upload")
    @ApiOperation(value = "post phieu nhap hang ", response = PhieuNhapHang.class)
    public ResponseEntity<JsonResult> post(@RequestBody PhieuNhapHang phieuNhapHang,
                                           @RequestParam("nguoi-dung-id") int nugoiDungId,
                                           @RequestParam("nha-cung-cap-id") int nhaCungCapId

    ) {
        return nguoiDungService.findById( nugoiDungId,false)
                .map(nguoiDung -> {
                    phieuNhapHang.setNguoiDung(nguoiDung);
                    return nhaCungCapService.findByIdAndXoa( nhaCungCapId,false)
                            .map(nhaCungCap -> {
//                                DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
                                LocalDateTime now = LocalDateTime.now();
                                Date out = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
                                phieuNhapHang.setThoiGian(out);
                                phieuNhapHang.setNhaCungCap(nhaCungCap);
                                phieuNhapHang.setXoa(false);
                                return phieuNhapHangService.save(phieuNhapHang)
                                        .map(JsonResult::uploaded)
                                        .orElse(JsonResult.saveError("PhieuNhapHang"));
                            }).orElse(JsonResult.parentNotFound("NhaCungCap"));
                }).orElse(JsonResult.parentNotFound("NguoiDung"));
    }

    @PutMapping("/update")
    @ApiOperation(value = "post phieu nhap hang ", response = PhieuNhapHang.class)
    public ResponseEntity<JsonResult> put(@RequestBody PhieuNhapHang phieuNhapHang,
                                          @RequestParam("nguoi-dung-id") int nugoiDungId,
                                          @RequestParam("nha-cung-cap-id") int nhaCungCapId

    ) {
        return nguoiDungService.findById( nugoiDungId,false)
                .map(nguoiDung -> {
                    phieuNhapHang.setNguoiDung(nguoiDung);
                    return nhaCungCapService.findByIdAndXoa( nhaCungCapId,false)
                            .map(nhaCungCap -> {
                                phieuNhapHang.setNhaCungCap(nhaCungCap);
                                LocalDateTime now = LocalDateTime.now();
                                Date out = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
                                phieuNhapHang.setThoiGian(out);
                                return phieuNhapHangService.save(phieuNhapHang)
                                        .map(JsonResult::updated)
                                        .orElse(JsonResult.saveError("PhieuNhapHang "));
                            }).orElse(JsonResult.parentNotFound("NhaCungCap"));
                }).orElse(JsonResult.parentNotFound("NguoiDung"));
    }

    @GetMapping("/search")
    public ResponseEntity<JsonResult> f(@RequestParam(value = "ma-phieu-nhap", required = false, defaultValue = "") String maPhieu,
                                        @RequestParam(name = "ngay-dau", defaultValue = "1970-01-01T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayDau,
                                        @RequestParam(name = "ngay-cuoi", defaultValue = "9999-12-31T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate ngayCuoi,
                                        @RequestParam(name = "nha-cung-cap-id", defaultValue = "0", required = false) int nhaCungCapId,
                                        @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                        @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<PhieuNhapHang> phieuNhapHangPage;
        if (maPhieu == "" && ngayDau == null && ngayCuoi == null && nhaCungCapId == 0) {
            phieuNhapHangPage = phieuNhapHangService.fingAll(pageable);
        }
        else {
            phieuNhapHangPage = phieuNhapHangService.findByNhaCungCapAndThoiGianAndMaPhieu(maPhieu, DateTimeUtils.asDate(ngayDau), DateTimeUtils.asDate(ngayCuoi), nhaCungCapId, pageable);
        }
        return Optional.ofNullable(phieuNhapHangPage)
                .map(phieuNhapHangs -> phieuNhapHangs.getTotalElements() != 0 ? JsonResult.found(PageJson.build(phieuNhapHangs)) : JsonResult.notFound("PhieuNhap/MaPhieu/ThoiGian/NhaCungCap"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("phieu-nhap-hang-id") int phieuNhapHangId){
        return phieuNhapHangService.findById(phieuNhapHangId)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }


//    @GetMapping("find-by-chi-nhanh")
//    public ResponseEntity<JsonResult> findByChiNhanhAndText(@RequestParam(value = "chi-nhanh-id", defaultValue = "0", required = false) int chiNhanhId,
//                                                            @RequestParam(value = "text", defaultValue = "", required = false) String text,
//                                                            @RequestParam(name = "page", defaultValue = "1", required = false) int page,
//                                                            @RequestParam(name = "size", defaultValue = "10", required = false) int size){
//        Pageable pageable = PageRequest.of(page-1,size);
//        Page<PhieuNhapHang> phieuNhapHangPage = phieuNhapHangService.findByChiNhanhAndText(chiNhanhId,text, pageable);
//        return Optional.ofNullable(phieuNhapHangPage)
//                .map(phieuNhapHangs -> phieuNhapHangs.getTotalElements() != 0 ? JsonResult.found(PageJson.build(phieuNhapHangs)) : JsonResult.notFound("PhieuNhapHang/Search"))
//                .orElse(JsonResult.serverError("Internal Server Error"));
//    }

    @DeleteMapping("/delete")
    public  ResponseEntity<JsonResult> delete(@RequestParam("id") int id){
        Boolean bool = phieuNhapHangService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }
        return JsonResult.saveError("phieuNhapHang");
    }

    @GetMapping("/excel")
    public ResponseEntity<JsonResult> getExcel(@RequestParam("list-phieu-nhap-hang") List<PhieuNhapHang> phieuNhapHangs) {
        XSSFWorkbook workbook = ExcelUtils.createDanhSachPhieuNhapExcel(phieuNhapHangs);
        try{
            String fileName = "DanhSachPhieuNhapHang_" + LocalDateTime.now().getNano() + ".xlsx";
            File file = new File(UPLOAD_DIRECTORY + fileName);
            file.getParentFile().mkdirs();
            FileOutputStream outFile;
            outFile = new FileOutputStream(file);
            workbook.write(outFile);
            outFile.close();
            return JsonResult.uploaded(URL_UPLOAD_FILE + fileName);
        }catch (IOException ex){
            ex.printStackTrace();
            return JsonResult.badRequest("Create Excel fail");
        }
    }

}
