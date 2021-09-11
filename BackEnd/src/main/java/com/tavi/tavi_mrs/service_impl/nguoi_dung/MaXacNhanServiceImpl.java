package com.tavi.tavi_mrs.service_impl.nguoi_dung;

import com.tavi.tavi_mrs.entities.nguoi_dung.MaXacNhan;
import com.tavi.tavi_mrs.repository.nguoi_dung.MaXacNhanRepo;
import com.tavi.tavi_mrs.service.nguoi_dung.MaXacNhanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaXacNhanServiceImpl implements MaXacNhanService {
    @Autowired
    MaXacNhanRepo maXacNhanRepo;
    private static final Logger LOGGER = LoggerFactory.getLogger(MaXacNhanServiceImpl.class);
    @Override
    public Optional<MaXacNhan> save(MaXacNhan maXacNhan) {
        try{
            return Optional.ofNullable(maXacNhanRepo.save(maXacNhan));
        }catch (Exception ex){
            return Optional.empty();
        }
    }
    @Override
    public Optional<MaXacNhan> findByNguoiDungAndMaToken(int nguoiDungId, String maToken) {
        try {
            return maXacNhanRepo.findByNguoiDungAndMaToken(nguoiDungId, maToken);
        } catch (Exception ex){
            LOGGER.error("find by id nguoi dung and ma error {0}", ex);
            return null;
        }
    }
}