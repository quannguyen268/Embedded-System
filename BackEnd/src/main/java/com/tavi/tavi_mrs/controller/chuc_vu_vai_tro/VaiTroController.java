package com.tavi.tavi_mrs.controller.chuc_vu_vai_tro;

import com.tavi.tavi_mrs.entities.chuc_vu_vai_tro.VaiTro;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PageJson;
import com.tavi.tavi_mrs.service.chuc_vu_vai_tro.VaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/vai-tro")
public class VaiTroController {

    @Autowired
    private VaiTroService vaiTroService;

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(){
        return Optional.ofNullable(vaiTroService.findAll())
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findByIdAndXoa(@RequestParam("id") int id){
        return vaiTroService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-all-to-page")
    public ResponseEntity<JsonResult> findAllToPage(@RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                                    @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<VaiTro> vaiTroHeThongPage = vaiTroService.findAllToPage(pageable);
        return Optional.ofNullable(vaiTroHeThongPage)
                .map(vaiTroHeThongs -> vaiTroHeThongs.getTotalElements() != 0 ? JsonResult.found(PageJson.build(vaiTroHeThongs)) : JsonResult.notFound("VaiTroHeThong/Page"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @GetMapping("/search")
    public ResponseEntity<JsonResult> search(@RequestParam(value = "ten-vai-tro", required = false, defaultValue = "") String tenVaiTro,
                                             @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                             @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        Pageable pageable = PageRequest.of(page-1,size);
        Page<VaiTro> vaiTroHeThongPage;
        if("".equals(tenVaiTro)){
            vaiTroHeThongPage = vaiTroService.findAllToPage(pageable);
        }else{
            vaiTroHeThongPage = vaiTroService.findByTenVaiTro(tenVaiTro,pageable);
        }
        return Optional.ofNullable(vaiTroHeThongPage)
                .map(vaiTroHeThongs -> vaiTroHeThongs.getTotalElements() != 0 ? JsonResult.found(PageJson.build(vaiTroHeThongs)) : JsonResult.notFound("TenVaiTroHeThong/Search"))
                .orElse(JsonResult.serverError("Internal Server error"));
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody VaiTro vaiTro){
        vaiTro.setXoa(false);
        return vaiTroService.save(vaiTro)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("upload-vai-tro-error"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody VaiTro vaiTro){
        return vaiTroService.save(vaiTro)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("update-vai-tro-error"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<JsonResult> delete(@RequestParam("id") int id){
        Boolean bool = vaiTroService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }
        return JsonResult.saveError("VaiTro");
    }
}
