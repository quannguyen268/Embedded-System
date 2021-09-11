package com.tavi.tavi_mrs.service_impl.phong_ban;

import com.tavi.tavi_mrs.entities.phong_ban.PhongBan;
import com.tavi.tavi_mrs.repository.phong_ban.PhongBanRepo;
import com.tavi.tavi_mrs.service.phong_ban.PhongBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class PhongBanServiceImpl implements PhongBanService {

    private static final Logger LOGGER = Logger.getLogger(PhongBanServiceImpl.class.getName());

    @Autowired
    private PhongBanRepo phongBanRepo;


    @Override
    public List<PhongBan> findAll() {
        try {
            return phongBanRepo.findAll();
        }catch (Exception ex){
            LOGGER.log(Level.SEVERE,"find-all-phong-ban-error : " + ex);
            return null;
        }
    }

    @Override
    public Optional<PhongBan> findByIdAndXoa(int id, boolean xoa) {
        try {
            return phongBanRepo.findByIdAndXoa(id,xoa);
        }catch (Exception ex) {
            LOGGER.log(Level.SEVERE,"find-phong-ban-by-id-error : " + ex);
            return Optional.empty();
        }
    }
}
