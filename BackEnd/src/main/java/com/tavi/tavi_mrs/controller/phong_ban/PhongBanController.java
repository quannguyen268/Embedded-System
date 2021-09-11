package com.tavi.tavi_mrs.controller.phong_ban;


import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.phong_ban.PhongBan;
import com.tavi.tavi_mrs.service.phong_ban.PhongBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/phong-ban")
public class PhongBanController {

    @Autowired
    private PhongBanService phongBanService;

    @GetMapping("/find-all")
    public ResponseEntity<JsonResult> findAll(){
        return Optional.ofNullable(phongBanService.findAll())
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findByIdAndXoa(@RequestParam("id") int id){
        return phongBanService.findByIdAndXoa(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }
}
