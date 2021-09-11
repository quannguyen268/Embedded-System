package com.tavi.tavi_mrs.service_impl.nguoi_dung;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;
import com.tavi.tavi_mrs.security.SecurityConstants;

import java.util.Date;


@Service
public class JWTService {

    //Tạo token
    public String generateToken(String username, long expirationTime) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);
        return SecurityConstants.TOKEN_PREFIX + JWT.create()
                .withSubject(username)
                .withExpiresAt(expiryDate)
//                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
    }

    //Giải mã token
    public String decode(String token) {
        try{
        return JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()))
                .build().verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                .getSubject();}
        catch (Exception ex){
            System.err.println(ex);
            return null;
        }
    }
}
