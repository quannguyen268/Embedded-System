package com.tavi.tavi_mrs.controller.phieu_tra_hang_nhap;


import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.entities.phieu_tra_hang_nhap.PhieuTraHangNhap;
import com.tavi.tavi_mrs.service.nguoi_dung.NguoiDungService;
import com.tavi.tavi_mrs.service.nha_cung_cap.NhaCungCapService;
import com.tavi.tavi_mrs.service.phieu_tra_hang_nhap.PhieuTraHangNhapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/phieu-tra-hang-nhap")
public class PhieuTraHangNhapController {

    @Autowired
    private PhieuTraHangNhapService phieuTraHangNhapService;

    @Autowired
    private NhaCungCapService nhaCungCapService;

    @Autowired
    private NguoiDungService nguoiDungService;

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                              @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<PhieuTraHangNhap> phieuTraHangNhapPage = phieuTraHangNhapService.findAll(pageable);
        return Optional.ofNullable(phieuTraHangNhapPage)
                .map(phieuTraHangNhaps -> phieuTraHangNhaps.getTotalElements() != 0 ? JsonResult.found(PageJson.build(phieuTraHangNhaps)) : JsonResult.notFound("PhieuTraHangNhap/Page"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int id){
        return phieuTraHangNhapService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/search")
    public ResponseEntity<JsonResult> search(@RequestParam(value = "ten-nha-cung-cap", defaultValue = "", required = false) String tenNhaCungCap,
                                             @RequestParam(value = "ngay-dau", defaultValue = "1970-01-01", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngayDau,
                                             @RequestParam(value = "ngay-cuoi", defaultValue = "2099-12-31", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngayCuoi,
                                             @RequestParam(value = "trang-thai", defaultValue = "1", required = false) int trangThai,
                                             @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<PhieuTraHangNhap> phieuTraHangNhapPage;
        if("".equals(tenNhaCungCap) && ngayDau == null && ngayCuoi == null){
            phieuTraHangNhapPage = phieuTraHangNhapService.findAll(pageable);
        }else {
            System.out.println(trangThai);
            System.out.println(size);
            phieuTraHangNhapPage = phieuTraHangNhapService.findByNhaCungCapAndThoiGianAndTrangThai(tenNhaCungCap, ngayDau,ngayCuoi,trangThai, pageable);
        }
        return Optional.ofNullable(phieuTraHangNhapPage)
                .map(phieuTraHangNhaps -> phieuTraHangNhaps.getTotalElements() != 0 ? JsonResult.found(PageJson.build(phieuTraHangNhaps)) : JsonResult.notFound("PhieuTraHangNhap/Search"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestParam("nguoi-dung-id")int nguoiDungId,
                                            @RequestParam("nha-cung-cap-id") int nhaCungCapId,
                                            @RequestBody PhieuTraHangNhap phieuTraHangNhap){
        return nguoiDungService.findById(nguoiDungId,false)
                .map(nguoiDung -> {
                    phieuTraHangNhap.setNguoiDung(nguoiDung);
                    return nhaCungCapService.findByIdAndXoa(nhaCungCapId,false)
                            .map(nhaCungCap -> {
                                phieuTraHangNhap.setNhaCungCap(nhaCungCap);
                                phieuTraHangNhap.setTrangThai(1);
                                phieuTraHangNhap.setXoa(false);
                                return phieuTraHangNhapService.save(phieuTraHangNhap)
                                        .map(JsonResult::uploaded)
                                        .orElse(JsonResult.saveError("Phieu Tra Hang Nhap"));
                            }).orElse(JsonResult.parentNotFound("NhaCungCap"));
                }).orElse(JsonResult.parentNotFound("NguoiDung"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody PhieuTraHangNhap phieuTraHangNhap){
        return phieuTraHangNhapService.save(phieuTraHangNhap)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("Phieu Tra Hang Nhap"));
    }

    @PutMapping("/trang-thai")
    public ResponseEntity<JsonResult> setTrangThai(@RequestParam("id") int id,
                                                   @RequestParam("trang-thai") int trangThai) {
        Boolean bool = phieuTraHangNhapService.setTrangThai(id,trangThai);
        if(bool){
            return JsonResult.success("Thay doi trang thai thanh cong");
        }else {
            return JsonResult.serverError("Thay doi trang thai that bai");
        }
    }

}
