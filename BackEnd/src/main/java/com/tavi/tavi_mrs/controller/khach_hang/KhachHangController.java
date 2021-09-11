package com.tavi.tavi_mrs.controller.khach_hang;


import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.entities.khach_hang.KhachHang;
import com.tavi.tavi_mrs.service.khach_hang.KhachHangService;
import com.tavi.tavi_mrs.utils.DateTimeUtils;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/khach-hang")
public class KhachHangController {

    @Autowired
    private KhachHangService khachHangService;


    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int id){
        return Optional.ofNullable(khachHangService.findByIdAndXoa(id,false))
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                              @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<KhachHang> khachHangPage = khachHangService.findAll(pageable);

        return Optional.ofNullable(khachHangPage)
                .map(khachHangs -> khachHangs.getTotalElements() != 0 ? JsonResult.found(PageJson.build(khachHangs)) : JsonResult.notFound("KhachHang/Page"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search")
    ResponseEntity<JsonResult> search(@RequestParam(value = "ten-khach-hang", defaultValue = "", required = false) String tenKhachHang,
                                      @RequestParam(value = "dien-thoai", defaultValue = "", required = false) String dienThoai,
                                      @RequestParam(value = "email", defaultValue = "", required = false) String email,
                                      @RequestParam(value = "facebook", defaultValue = "", required = false) String facebook,
                                      @RequestParam(value = "dia-chi", defaultValue = "", required = false) String diaChi,
                                      @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                      @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<KhachHang> khachHangPage;
        if(tenKhachHang == "" && dienThoai == "" && email == "" && facebook =="" && diaChi==""){
            khachHangPage= khachHangService.findAll( pageable);
        }
        else {
           khachHangPage = khachHangService.findByTenKhachHangAndDienThoaiAndEmail(tenKhachHang, dienThoai, email, facebook, diaChi, pageable);
        }
        return Optional.ofNullable(khachHangPage)
                .map(khachHangs -> khachHangs.getTotalElements() != 0 ? JsonResult.found(PageJson.build(khachHangs)) : JsonResult.notFound("TenKhachHang/DienThoai/Email"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search-text")
    ResponseEntity<JsonResult> searchText(@RequestParam(name = "text",required = false, defaultValue = "")String text,
                                          @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                          @RequestParam(name = "size", defaultValue = "5", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<KhachHang> khachHangPage;
        if(text.equals("")){
            khachHangPage= khachHangService.findAll( pageable);
        }
        else {
            khachHangPage = khachHangService.search(text, pageable);
        }
        System.out.println(khachHangPage.toString());
        return Optional.ofNullable(khachHangPage)
                .map(khachHangs -> khachHangs.getTotalElements() != 0 ? JsonResult.found(PageJson.build(khachHangs)) : JsonResult.notFound("TenKhachHang/DienThoai/Email"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/count")
    ResponseEntity<JsonResult> count(){
        return Optional.ofNullable(khachHangService.countCustomer())
                .map(c -> c>=0 ? JsonResult.success(c) : JsonResult.badRequest("Count Custormer"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/count-new-custormer")
    ResponseEntity<JsonResult> countNewCustormer( @RequestParam(name = "start-date", defaultValue = "1970-01-01T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate start,
                                                  @RequestParam(name = "end-date", defaultValue = "9999-12-31T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate end){
        return Optional.ofNullable(khachHangService.countNewMember( DateTimeUtils.asDate(start), DateTimeUtils.asDate(end)))
                .map(c -> c>=0 ? JsonResult.success(c) : JsonResult.badRequest("Count Custormer"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/count-transaction")
    ResponseEntity<JsonResult> countTransaction( @RequestParam(name = "start-date", defaultValue = "1970-01-01T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate start,
                                                 @RequestParam(name = "end-date", defaultValue = "9999-12-31T00:00:00+00:00", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate end){
        return Optional.ofNullable(khachHangService.countCustomerTransaction( DateTimeUtils.asDate(start), DateTimeUtils.asDate(end)))
                .map(c -> c>=0 ? JsonResult.success(c) : JsonResult.badRequest("Count Custormer"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }


    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody KhachHang khachHang){
        khachHang.setTrangThai(1);
        khachHang.setXoa(false);
        return khachHangService.save(khachHang)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("upload-khach-hang-error"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody KhachHang khachHang){
        return khachHangService.save(khachHang)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("update-khach-hang-error"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<JsonResult> delete(@RequestParam("id")int id){
        Boolean bool = khachHangService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }
        return JsonResult.saveError("delete-khach-hang-error");
    }

}
