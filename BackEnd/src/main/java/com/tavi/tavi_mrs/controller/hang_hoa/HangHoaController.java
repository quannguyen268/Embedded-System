package com.tavi.tavi_mrs.controller.hang_hoa;


import com.tavi.tavi_mrs.entities.hang_hoa.HangHoa;

import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.service.hang_hoa.HangHoaService;
import com.tavi.tavi_mrs.service.hang_hoa.NhomHangService;
import com.tavi.tavi_mrs.service.hang_hoa.ThuongHieuService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("api/v1/admin/hang-hoa")
public class HangHoaController {

    @Autowired
    private HangHoaService hangHoaService;

    @Autowired
    private ThuongHieuService thuongHieuService;

    @Autowired
    private NhomHangService nhomHangService;

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int idThietBi) {
        return hangHoaService.findById(idThietBi, false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-all")
    ResponseEntity<JsonResult> findAllToPage(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<HangHoa> hangHoaPage = hangHoaService.findAllToPage(pageable);
        return Optional.ofNullable(hangHoaPage)
                .map(hangHoas -> hangHoas.getTotalElements() != 0 ? JsonResult.found(PageJson.build(hangHoas)) : JsonResult.notFound("HangHoa/Page"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search")
    ResponseEntity<JsonResult> search(@RequestParam(value = "tenHangHoa", required = false, defaultValue = "") String tenHangHoa,
                                      @RequestParam(value = "nhomHangId", required = false, defaultValue = "0") int nhomHangId,
                                      @RequestParam(value = "thuongHieuId", required = false, defaultValue = "0") int thuongHieuId,
                                      @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                      @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (tenHangHoa == "" && nhomHangId == 0 && thuongHieuId == 0) {
            Page<HangHoa> hangHoaPage = hangHoaService.findAllToPage(pageable);
        }
        Page<HangHoa> hangHoaPage = hangHoaService.findByTenHangHoaAndNhomHangAndThuongHieu(tenHangHoa, nhomHangId, thuongHieuId, pageable);

        return Optional.ofNullable(hangHoaPage)
                .map(hangHoas -> hangHoas.getTotalElements() != 0 ? JsonResult.found(PageJson.build(hangHoas)) : JsonResult.notFound("ThietBi/TenHangHoa/NhomHang/ThuongHieu"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search-text")
    ResponseEntity<JsonResult> searchText(@RequestParam(value = "text", required = false, defaultValue = "") String text,
                                      @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                      @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<HangHoa> hangHoaPage;
        if (text.equals("")) {
            hangHoaPage = hangHoaService.findAllToPage(pageable);
        }else {
            hangHoaPage = hangHoaService.search(text, pageable);
        }
        return Optional.ofNullable(hangHoaPage)
                .map(hangHoas -> hangHoas.getTotalElements() != 0 ? JsonResult.found(PageJson.build(hangHoas)) : JsonResult.notFound("ThietBi/TenHangHoa/NhomHang/ThuongHieu"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }


    @PostMapping("/upload")
    @ApiOperation(value = "post hang hoa", response = HangHoa.class)
    public ResponseEntity<JsonResult> post(@RequestBody HangHoa hangHoa,
                                           @RequestParam("nhom-hang-id") int nhomHangId,
                                           @RequestParam("thuong-hieu-id") int thuongHieuId

    ) {
        return nhomHangService.findById(nhomHangId,false)
                .map(nhomHang -> {
                    hangHoa.setNhomHang(nhomHang);
                    return thuongHieuService.findByIdAndXoa( thuongHieuId,false)
                            .map(thuongHieu -> {
                                hangHoa.setThuongHieu(thuongHieu);
                                String time = String.valueOf(System.nanoTime());
                                System.out.println(time);
                                hangHoa.setMa(nhomHang.getMaNhomHang() + "-" + time.substring(4,12));
                                hangHoa.setXoa(false);
                                return hangHoaService.save(hangHoa)
                                        .map(JsonResult::uploaded)
                                        .orElse(JsonResult.saveError("HangHoa"));
                            }).orElse(JsonResult.parentNotFound("Thuong Hieu"));
                }).orElse(JsonResult.parentNotFound("Nhom Hang"));
    }


    @PostMapping("/update")
    @ApiOperation(value = "put hang hoa", response = HangHoa.class)
    public ResponseEntity<JsonResult> update(@RequestBody HangHoa hangHoa,
                                           @RequestParam("nhom-hang-id") int nhomHangId,
                                           @RequestParam("don-vi-id") int donViId,
                                           @RequestParam("thuong-hieu-id") int thuongHieuId) {
        return nhomHangService.findById(nhomHangId,false)
                .map(nhomHang -> {
                    hangHoa.setNhomHang(nhomHang);
                    return thuongHieuService.findByIdAndXoa( thuongHieuId,false)
                            .map(thuongHieu -> {
                                hangHoa.setThuongHieu(thuongHieu);
                                return hangHoaService.save(hangHoa)
                                        .map(JsonResult::uploaded)
                                        .orElse(JsonResult.saveError("HangHoa"));
                            }).orElse(JsonResult.parentNotFound("Thuong Hieu"));
                }).orElse(JsonResult.parentNotFound("Nhom Hangr"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<JsonResult> delete(@RequestParam("id") int id){
        Boolean bool = hangHoaService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }else {
            return JsonResult.saveError("Delete HangHoa");
        }
    }
}
