package com.tavi.tavi_mrs.controller.cong_ty;


import com.tavi.tavi_mrs.entities.cong_ty.TongCongTy;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.service.cong_ty.TongCongTyService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/doanh-nghiep")
public class TongCongTyController {

    @Autowired
    private TongCongTyService tongCongTyService;

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> themDoanhNghiep(@RequestBody TongCongTy tongCongTy){
        tongCongTy.setXoa(false);
        return Optional.ofNullable(tongCongTyService.save(tongCongTy))
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("TongCongTy"));
    }

    @PutMapping("/update")
    @ApiOperation(value = "sua-thong-tin-doanh-nghiep", response = TongCongTy.class)
    public ResponseEntity<JsonResult> suaThongTin(@RequestBody TongCongTy tongCongTy){
        return tongCongTyService.save(tongCongTy)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("TongCongTy"));
    }

    @PutMapping("/update-image")
    public ResponseEntity<JsonResult> updateAnh(){
        return null;
    }

    @GetMapping("/delete")
    public ResponseEntity<JsonResult> xoa(@RequestParam("cong-ty-id")Integer tongCongTyId){
        Boolean bol=tongCongTyService.deleted(tongCongTyId);
        if(bol)
            return JsonResult.deleted();
        return JsonResult.saveError("TongCongTy");
    }

    @GetMapping("/findById")
    public ResponseEntity<JsonResult> timBangId(@RequestParam(value = "cong-ty-id",required = false) Integer tongCongtyId){
        return tongCongTyService.findById(tongCongtyId)
                .map(JsonResult::found)
                .orElse(JsonResult.notFound("TongCongTy"));
    }
}
