package com.tavi.tavi_mrs.controller.phieu_tra_khach;

import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.entities.phieu_tra_khach.PhieuTraKhach;
import com.tavi.tavi_mrs.service.nguoi_dung.NguoiDungService;
import com.tavi.tavi_mrs.service.phieu_tra_khach.PhieuTraKhachService;
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
@RequestMapping("api/v1/admin/phieu-tra-khach")
public class PhieuTraKhachController {

    @Autowired
    private PhieuTraKhachService phieuTraKhachService;

    @Autowired
    private NguoiDungService nguoiDungService;

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                              @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<PhieuTraKhach> phieuTraKhachPage = phieuTraKhachService.findAll(pageable);
        return Optional.ofNullable(phieuTraKhachPage)
                .map(phieuTraKhaches -> phieuTraKhaches.getTotalElements() != 0 ? JsonResult.found(PageJson.build(phieuTraKhaches)) : JsonResult.notFound("PhieuTraKhach/Page"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/find-by-nguoi-dung")
    public ResponseEntity<JsonResult> findByNguoiDung(@RequestParam("nguoid-dung-id") int nguoiDungId,
                                                      @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                                      @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<PhieuTraKhach> phieuTraKhachPage = phieuTraKhachService.findByNguoiDung(nguoiDungId,pageable);
        return Optional.ofNullable(phieuTraKhachPage)
                .map(phieuTraKhaches -> phieuTraKhaches.getTotalElements() != 0 ? JsonResult.found(PageJson.build(phieuTraKhaches)) : JsonResult.notFound("PhieuTraKhach/Page"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int id){
        return phieuTraKhachService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/search")
    public ResponseEntity<JsonResult> search(@RequestParam(value = "ngay-dau", defaultValue = "1970-01-01", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngayDau,
                                             @RequestParam(value = "ngay-cuoi", defaultValue = "2099-12-31", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngayCuoi,
                                             @RequestParam(value = "trang-thai", defaultValue = "1", required = false) int trangThai,
                                             @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<PhieuTraKhach> phieuTraKhachPage = phieuTraKhachService.findByThoiGianAndTrangThai(ngayDau,ngayCuoi,trangThai,pageable);
        return Optional.ofNullable(phieuTraKhachPage)
                .map(phieuTraKhaches -> phieuTraKhaches.getTotalElements() != 0 ? JsonResult.found(PageJson.build(phieuTraKhaches)) : JsonResult.notFound("PhieuTraKhach/Page"))
                .orElse(JsonResult.serverError("Internal Server Error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestParam("nguoi-dung-id") int nguoiDungId,
                                             @RequestBody PhieuTraKhach phieuTraKhach){
        return nguoiDungService.findById(nguoiDungId,false)
                .map(nguoiDung -> {
                    phieuTraKhach.setNguoiDung(nguoiDung);
                    phieuTraKhach.setTrangThai(1);
                    phieuTraKhach.setXoa(false);
                    return phieuTraKhachService.save(phieuTraKhach)
                            .map(JsonResult::uploaded)
                            .orElse(JsonResult.saveError("save-phieu-tra-khach"));
                }).orElse(JsonResult.parentNotFound("NguoiDung"));
    }


    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody PhieuTraKhach phieuTraKhach){
        return phieuTraKhachService.save(phieuTraKhach)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("save-phieu-tra-khach"));
    }

    @PutMapping("/trang-thai")
    public ResponseEntity<JsonResult> setTrangThai(@RequestParam("id") int id,
                                                   @RequestParam("trang-thai") int trangThai) {
        Boolean bool = phieuTraKhachService.setTrangThai(id,trangThai);
        if(bool){
            return JsonResult.success("Thay doi trang thai thanh cong");
        }else {
            return JsonResult.serverError("Thay doi trang thai that bai");
        }
    }
}
