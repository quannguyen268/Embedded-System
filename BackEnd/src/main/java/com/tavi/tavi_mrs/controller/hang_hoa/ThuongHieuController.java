package com.tavi.tavi_mrs.controller.hang_hoa;

import com.tavi.tavi_mrs.entities.hang_hoa.NhomHang;
import com.tavi.tavi_mrs.entities.hang_hoa.ThuongHieu;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.service.hang_hoa.ThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/thuong-hieu")
public class ThuongHieuController {

    @Autowired
    private ThuongHieuService thuongHieuService;

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int idThietBi) {
        return thuongHieuService.findByIdAndXoa(idThietBi, false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }


    @PostMapping("/upload")
    public ResponseEntity<JsonResult> save(@RequestBody ThuongHieu thuongHieu) {
        Boolean bool = thuongHieuService.findByTenThuongHieu(thuongHieu.getTenThuongHieu());
        if(!bool){
            thuongHieu.setXoa(false);
            return thuongHieuService.save(thuongHieu)
                    .map(JsonResult::uploaded)
                    .orElse(JsonResult.saveError("save-hang-hoa-error"));
        }else {
            return JsonResult.saveError("error : ten-thuong-hieu-da-ton-tai");
        }
    }

    @GetMapping("/find-all")
    ResponseEntity<JsonResult> findAllToPage(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ThuongHieu> thuongHieuPage = thuongHieuService.findAllToPage(pageable);
        return Optional.ofNullable(thuongHieuPage)
                .map(thuongHieus -> thuongHieus.getTotalElements() != 0 ? JsonResult.found(PageJson.build(thuongHieus)) : JsonResult.notFound("ThuongHieu/Page"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search")
    ResponseEntity<JsonResult> search(@RequestParam(value = "ten-thuong-hieu", required = false, defaultValue = "") String tenThuongHieu,
                                      @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                      @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ThuongHieu> thuongHieuPage;
        if("".equals(tenThuongHieu)){
            thuongHieuPage = thuongHieuService.findAllToPage(pageable);
        }else {
            thuongHieuPage = thuongHieuService.findByTenThuongHieu(tenThuongHieu,pageable);
        }
        return Optional.ofNullable(thuongHieuPage)
                .map(thuongHieus -> thuongHieus.getTotalElements() != 0 ? JsonResult.found(PageJson.build(thuongHieus)) : JsonResult.notFound("TenThuongHieu/Search"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @PutMapping("/update")
    ResponseEntity<JsonResult> update(@RequestBody ThuongHieu thuongHieu){
        return thuongHieuService.findByIdAndXoa(thuongHieu.getId(),false)
                .map(thuongHieu1 -> {
                    if(!thuongHieu1.getTenThuongHieu().equals(thuongHieu.getTenThuongHieu())){
                        Boolean bool = thuongHieuService.findByTenThuongHieu(thuongHieu.getTenThuongHieu());
                        if(bool){
                            return JsonResult.saveError("ten-thuong-hieu-da-ton-tai");
                        }
                    }
                    return thuongHieuService.save(thuongHieu)
                            .map(JsonResult::updated)
                            .orElse(JsonResult.saveError("update-nhom-hang-error"));
                })
                .orElse(JsonResult.parentNotFound("ThuongHieu"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<JsonResult> delete(@RequestParam("id") int id){
        Boolean bool = thuongHieuService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }
        return JsonResult.saveError("ThuongHieu");
    }
}
