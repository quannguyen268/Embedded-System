package com.tavi.tavi_mrs.controller.ca_lam_viec;


import com.tavi.tavi_mrs.entities.ca_lam_viec.CaLamViec;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.service.ca_lam_viec.CaLamViecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/ca-lam-viec")
public class CaLamViecController {

    @Autowired
    private CaLamViecService caLamViecService;

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(){
        return Optional.ofNullable(caLamViecService.findAll())
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findByIdAndXoa(@RequestParam("id") int id){
        return caLamViecService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @PostMapping("/upload")
    public ResponseEntity<JsonResult> upload(@RequestBody CaLamViec caLamViec){
        caLamViec.setXoa(false);
        return caLamViecService.save(caLamViec)
                .map(JsonResult::uploaded)
                .orElse(JsonResult.saveError("upload-ca-lam-viec-error"));
    }

    @PutMapping("/update")
    public ResponseEntity<JsonResult> update(@RequestBody CaLamViec caLamViec){
        return caLamViecService.save(caLamViec)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("update-ca-lam-viec-error"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<JsonResult> delete(@RequestParam("id") int id){
        Boolean bool = caLamViecService.deleted(id);
        if(bool){
            return JsonResult.deleted();
        }
        return JsonResult.saveError("delete-ca-lam-viec-error");
    }
}
