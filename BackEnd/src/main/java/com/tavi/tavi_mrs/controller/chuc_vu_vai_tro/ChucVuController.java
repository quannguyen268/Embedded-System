package com.tavi.tavi_mrs.controller.chuc_vu_vai_tro;


import com.tavi.tavi_mrs.entities.chuc_vu_vai_tro.ChucVu;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.service.chuc_vu_vai_tro.ChucVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/chuc-vu")
public class ChucVuController {

    @Autowired
    private ChucVuService chucVuService;

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(){
        return Optional.ofNullable(chucVuService.findAll())
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findByIdAndXoa(@RequestParam("id") int id){
        return chucVuService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-all-to-page")
    public ResponseEntity<JsonResult> findAllToPage(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                                    @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<ChucVu> chucVuPage = chucVuService.findAllToPage(pageable);
        return Optional.ofNullable(chucVuPage)
                .map(chucVus -> chucVus.getTotalElements() != 0 ? JsonResult.found(PageJson.build(chucVus)) : JsonResult.notFound("ChucVu/Page"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search")
    public ResponseEntity<JsonResult> search(@RequestParam(value = "ten-chuc-vu", required = false, defaultValue = "") String tenChucVu,
                                             @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<ChucVu> chucVuPage;
        if("".equals(tenChucVu)){
            chucVuPage = chucVuService.findAllToPage(pageable);
        }else{
            chucVuPage = chucVuService.findByTenChucVu(tenChucVu,pageable);
        }
        return Optional.ofNullable(chucVuPage)
                .map(chucVus -> chucVus.getTotalElements() != 0 ? JsonResult.found(PageJson.build(chucVus)) : JsonResult.notFound("TenChucVu/Search"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody ChucVu chucVu){
        chucVu.setXoa(false);
        return chucVuService.save(chucVu)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("upload-chuc-vu-error"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody ChucVu chucVu){
        return chucVuService.save(chucVu)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("update-chuc-vu-error"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<JsonResult> delete(@RequestParam("id") int id){
        Boolean bool = chucVuService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }
        return JsonResult.saveError("ChucVu");
    }
}
