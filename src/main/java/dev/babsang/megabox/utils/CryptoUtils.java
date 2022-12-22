package dev.babsang.megabox.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CryptoUtils {

    public static String hashSha512(String input) {
        try {
            StringBuilder passwordSaltHashBuilder = new StringBuilder();
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(input.getBytes(StandardCharsets.UTF_8));
            for (byte hashByte : md.digest()) {
                passwordSaltHashBuilder.append(String.format("%02x", hashByte));
            }
            return passwordSaltHashBuilder.toString();
        } catch (NoSuchAlgorithmException ignored) {
            return null;
        }

    }
    private CryptoUtils() {
        //생성자를 만들어서 객체화를 못하게 함
    }
}

    // 1. hashSha512 메서드 로직 완성하기
    // - input으로 "test1234"들어오면
//"42128a86a70f94b3cbdb1b1d350f543f549f3cdb221398345847979d51e0c68b7948da6e97e9194ec0589dd48e82b2db0e15cce3748e196eea6371e3e147b616" 반환되게
    // - 이 메서드는 throws 시그니처를 사용하지 않음. 고로 NoSuchAlgorithmException 발생 시 null 반환 하도록 조치.
    // 2. CryptoUtils 클래스 객체화 못하게 막기

