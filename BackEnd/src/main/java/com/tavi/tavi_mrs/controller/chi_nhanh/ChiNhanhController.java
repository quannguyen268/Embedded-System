package com.tavi.tavi_mrs.controller.chi_nhanh;


import com.tavi.tavi_mrs.entities.chi_nhanh.ChiNhanh;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.service.chi_nhanh.ChiNhanhService;
import com.tavi.tavi_mrs.service.cong_ty.TongCongTyService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/chi-nhanh")
public class ChiNhanhController {

    @Autowired
    private ChiNhanhService chiNhanhService;

    @Autowired
    private TongCongTyService tongCongTyService;

    @GetMapping("/findById")
    @ApiOperation(value = "find by id", response = ChiNhanh.class)
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int id) {
        return chiNhanhService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/tong-cty")
    @ApiOperation(value = "find by nhom thiet bi", response = ChiNhanh.class, responseContainer = "List")
    public ResponseEntity<JsonResult> findByTongCty(@RequestParam(value = "tong-cty-id", defaultValue = "1", required = false) Integer idTongCty) {
        return Optional.ofNullable(chiNhanhService.findByTongCty(idTongCty))
                .map(rsList -> !rsList.isEmpty() ? JsonResult.found(rsList) : JsonResult.notFound("List of Chi Nhanh"))
                .orElse(JsonResult.serverError("Find By TongCty Error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> themChiNhanh(@RequestBody ChiNhanh chiNhanh,
                                                   @RequestParam(value = "cong-ty-id",required = false)Integer congTyId){
        return tongCongTyService.findById(congTyId)
                .map(tongCongTy -> {
                    chiNhanh.setXoa(false);
                    chiNhanh.setTongCongTy(tongCongTy);
                    return chiNhanhService.save(chiNhanh)
                            .map(JsonResult::uploaded)
                            .orElse(JsonResult.saveError("ChiNhanh"));
                })
                .orElse(JsonResult.notFound("TongCongTy"));
    }

    @PutMapping("/update-info")
    @ApiOperation(value = "update loai thiet bi", response = ChiNhanh.class)
    public ResponseEntity<JsonResult> suaThongTin(@RequestBody ChiNhanh chiNhanh, @RequestParam(value = "cong-ty-id") Integer idTongCongTy){
        return tongCongTyService.findById(idTongCongTy)
                .map(tongCongTy -> {
                    chiNhanh.setTongCongTy(tongCongTy);
                    return chiNhanhService.save(chiNhanh)
                            .map(JsonResult::updated)
                            .orElse(JsonResult.saveError("ChiNhanh"));
                })
                .orElse(JsonResult.notFound("TongCongTy"));
    }

    @PutMapping("/update-image")
    public ResponseEntity<JsonResult> updateAnh(){
        return null;
    }

    @PutMapping("/delete")
    public ResponseEntity<JsonResult> xoa(@RequestParam("chi-nhanh-id")Integer chiNhanhId){
        Boolean bol=chiNhanhService.deleted(chiNhanhId);
        if(bol)
            return JsonResult.deleted();
        return JsonResult.saveError("ChiNhanh");
    }

    @GetMapping("/tim-kiem-tu-do")
    public ResponseEntity<JsonResult> timKiemTuDo(@RequestParam("free-text")String text){
        return Optional.ofNullable(chiNhanhService.timKiemTuDo(text))
                .map(chiNhanhs -> {
                    if(chiNhanhs.size()==0)
                        return JsonResult.notFound("ChiNhanh");
                    return JsonResult.found(chiNhanhs);
                })
                .orElse(JsonResult.notFound("ChiNhanh"));
    }

    @GetMapping("/findAllBranchesByCompanyId")
    public ResponseEntity<JsonResult> timTheoDoanhNghiep(@RequestParam(value = "cong-ty-id",required = false)Integer doanhNghiepId){
        return Optional.ofNullable(chiNhanhService.findAll(doanhNghiepId))
                .map(chiNhanhs -> {
                    if(chiNhanhs.size()==0)
                        return JsonResult.notFound("TongCongTy");
                    return JsonResult.found(chiNhanhs);
                })
                .orElse(JsonResult.notFound("TongCongTy"));
    }

}
