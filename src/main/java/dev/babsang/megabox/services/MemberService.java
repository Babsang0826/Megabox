package dev.babsang.megabox.services;

import dev.babsang.megabox.entities.member.EmailAuthEntity;
import dev.babsang.megabox.entities.member.KakaoUserEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.member.RegisterResult;
import dev.babsang.megabox.enums.member.SendEmailAuthResult;
import dev.babsang.megabox.enums.member.VerifyEmailAuthResult;
import dev.babsang.megabox.enums.member.idResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IMemberMapper;
import dev.babsang.megabox.utils.CryptoUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service(value = "dev.babsang.megabox.services.MemberService")

public class MemberService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final IMemberMapper memberMapper;//변수로 만들때 I는 빼고 만드는게 국룰

    @Autowired
    public MemberService(JavaMailSender mailSender, TemplateEngine templateEngine, IMemberMapper memberMapper) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.memberMapper = memberMapper;
    }
//
//    public UserEntity getUserEmail(EmailAuthEntity email) {
//        return this.memberMapper.selectUserByEmail(email.getEmail());
//    }

    @Transactional
    public Enum<? extends IResult> sendEmailAuth(UserEntity user, EmailAuthEntity emailAuth) throws NoSuchAlgorithmException, MessagingException { //UserEntity에게 이메일 검증을 요청하겠다. user은 controller에서 받아온다.
        UserEntity existingUser = this.memberMapper.selectUserByEmail(user.getEmail());
        System.out.println(existingUser);
        if (existingUser != null) {
            return SendEmailAuthResult.EMAIL_DUPLICATED;
        }
        String authCode = RandomStringUtils.randomNumeric(6);
        String authSalt = String.format("%s%s%f%f",
                user.getEmail(),
                authCode,
                Math.random(),
                Math.random());

        StringBuilder authSaltHashBuilder = new StringBuilder();
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(authSalt.getBytes(StandardCharsets.UTF_8));

        for (byte hashByte : md.digest()) {
            authSaltHashBuilder.append(String.format("%02x", hashByte));
        }
        authSalt = authSaltHashBuilder.toString();

        Date createdOn = new Date();
        Date expiresOn = DateUtils.addMinutes(createdOn, 5);

        emailAuth.setEmail(user.getEmail());
        emailAuth.setCode(authCode);
        emailAuth.setSalt(authSalt);
        emailAuth.setCreatedOn(createdOn);
        emailAuth.setExpiresOn(expiresOn);
        emailAuth.setExpired(false);
        System.out.println(user.getEmail());
        if (this.memberMapper.insertEmailAuth(emailAuth) == 0) {
            return CommonResult.FAILURE;
        }


        Context context = new Context();
        context.setVariable("code", emailAuth.getCode());

        String text = this.templateEngine.process("member/registerEmailAuth", context);
        MimeMessage mail = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mail, "UTF-8");
        helper.setFrom("ljh525769@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("[메가박스] 회원가입 인증 번호");
        helper.setText(text, true);
        this.mailSender.send(mail);

        return CommonResult.SUCCESS;

    }

    @Transactional
    public Enum<? extends IResult> verifyEmailAuth(EmailAuthEntity emailAuth) {
        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByEmailCodeSalt(
                emailAuth.getEmail(),
                emailAuth.getCode(),
                emailAuth.getSalt());
        if (existingEmailAuth == null) {
            return CommonResult.FAILURE;
        }
        if (existingEmailAuth.getExpiresOn().compareTo(new Date()) < 0) { //만료되었다.
            return VerifyEmailAuthResult.EXPIRED;

        }
        existingEmailAuth.setExpired(true);
        if (this.memberMapper.updateEmailAuth(existingEmailAuth) == 0) {
            return CommonResult.FAILURE;
        }

        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> register(UserEntity user, UserEntity newUser) {
        UserEntity userByContact = this.memberMapper.selectUserByContact(newUser.getContact());
        if (userByContact != null && !user.getEmail().equals(userByContact.getEmail())) {
            return RegisterResult.CONTACT;
        }
        user.setPassword(CryptoUtils.hashSha512(user.getPassword()));
        if (this.memberMapper.insertUser(user) == 0) {
            return CommonResult.FAILURE;
        }
        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> idDuplicated(UserEntity user) {
        UserEntity existingUser = this.memberMapper.selectUserById(user.getId());
        if (existingUser != null) {
            return idResult.id_DUPLICATED;
        } else {
            return CommonResult.SUCCESS;
        }
    }

    public Enum<? extends IResult> login(UserEntity user) {
        UserEntity existingPasswordAuth = this.memberMapper.selectUserByEmails(
                user.getId(), CryptoUtils.hashSha512(user.getPassword()));
        if (existingPasswordAuth != null) {
            System.out.println("로그인 성공");
            user.setEmail(existingPasswordAuth.getEmail());
            user.setContact(existingPasswordAuth.getContact());
            user.setPassword(existingPasswordAuth.getPassword());
            user.setName(existingPasswordAuth.getName());
            user.setAddressPostal(existingPasswordAuth.getAddressPostal());
            user.setAddressSecondary(existingPasswordAuth.getAddressSecondary());
            user.setAddressPrimary(existingPasswordAuth.getAddressPrimary());
            user.setBirthday(existingPasswordAuth.getBirthday());
            user.setAdminFlag(existingPasswordAuth.getAdminFlag());
            return CommonResult.SUCCESS;
        }

        return CommonResult.FAILURE;
    }

    public Enum<? extends IResult> recoverId(UserEntity user) {
        UserEntity existingNameAuth = this.memberMapper.selectUserByNameBirthdayContact(
                user.getName(), user.getBirthday(), user.getContact());

        if (existingNameAuth == null) {
            return CommonResult.FAILURE;
        }
        user.setId(existingNameAuth.getId());
        return CommonResult.SUCCESS;
    }

    public Enum<? extends IResult> recoverPassword(UserEntity user) {
        UserEntity existingNameAuth = this.memberMapper.selectUserByIdNameBirthdayContact(
                user.getId(), user.getName(), user.getBirthday(), user.getContact());
        if (existingNameAuth == null) {
            return CommonResult.FAILURE;
        }
        user.setPassword(existingNameAuth.getPassword());
        return CommonResult.SUCCESS;

    }

    public Enum<? extends IResult> resetPasswordEmail(UserEntity user) {
        UserEntity existingUser = this.memberMapper.selectUserByEmail(user.getEmail());
        if (existingUser == null) {
            return CommonResult.FAILURE;
        }
        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> recoverPasswordSend(EmailAuthEntity emailAuth) throws MessagingException {
        UserEntity recoverStudy = this.memberMapper.selectUserByEmail(emailAuth.getEmail());
        if (recoverStudy == null) {
            return CommonResult.FAILURE;
        }
        String authCode = RandomStringUtils.randomNumeric(6);
        String authSalt = String.format("%s%s%f%f",
                authCode,
                emailAuth.getEmail(),
                Math.random(),
                Math.random());
        authSalt = CryptoUtils.hashSha512(authSalt);
        Date createdOn = new Date();
        Date expiresOn = DateUtils.addMinutes(createdOn, 5);
        emailAuth.setCode(authCode);
        emailAuth.setSalt(authSalt);
        emailAuth.setCreatedOn(createdOn);
        emailAuth.setExpiresOn(expiresOn);
        emailAuth.setExpired(false);
        if (this.memberMapper.insertEmailAuth(emailAuth) == 0) {
            return CommonResult.FAILURE;
        }

        Context context = new Context();
        context.setVariable("email", emailAuth.getEmail());
        context.setVariable("code", emailAuth.getCode());
        context.setVariable("salt", emailAuth.getSalt());

        String text = this.templateEngine.process("member/userPasswordResetEmail", context);
        MimeMessage mail = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mail, "UTF-8");
        helper.setFrom("ljh525769@gmail.com");
        helper.setTo(emailAuth.getEmail());
        helper.setSubject("[메가박스] 비밀번호 재설정 인증 링크");
        helper.setText(text, true);
        this.mailSender.send(mail);

        return CommonResult.SUCCESS;
    }

    public Enum<? extends IResult> recoverPasswordCheck(EmailAuthEntity emailAuth) {
        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByIndex(emailAuth.getIndex());
        if (existingEmailAuth == null || !existingEmailAuth.isExpired()) {
            return CommonResult.FAILURE;
        }
        emailAuth.setCode(existingEmailAuth.getCode());
        emailAuth.setSalt(existingEmailAuth.getSalt());
        return CommonResult.SUCCESS;
    }


    public Enum<? extends IResult> recoverPasswordAuth(EmailAuthEntity emailAuth) {
        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByEmailCodeSalt(
                emailAuth.getEmail(),
                emailAuth.getCode(),
                emailAuth.getSalt());

        if (existingEmailAuth == null) {
            return CommonResult.FAILURE;
        }
        if (new Date().compareTo(existingEmailAuth.getExpiresOn()) > 0) {
            return CommonResult.FAILURE;

        }
        existingEmailAuth.setExpired(true);
        if (this.memberMapper.updateEmailAuth(existingEmailAuth) == 0) {
            return CommonResult.FAILURE;
        }
        return CommonResult.SUCCESS;
    }

    public Enum<? extends IResult> updatePassword(EmailAuthEntity emailAuth, UserEntity user) { //user는 이메일과 패스워드만 가지고 있다.
        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByEmailCodeSalt(
                emailAuth.getEmail(),
                emailAuth.getCode(),
                emailAuth.getSalt());

        if (existingEmailAuth == null || !existingEmailAuth.isExpired()) {
            return CommonResult.FAILURE;
        }

        UserEntity existingUser = this.memberMapper.selectUserByEmail(existingEmailAuth.getEmail());
        existingUser.setPassword(CryptoUtils.hashSha512(user.getPassword()));

        if (this.memberMapper.updateUser(existingUser) == 0) {
            return CommonResult.FAILURE;
        }
        return CommonResult.SUCCESS;
    }


    public String getKakaoAccessToken(String code) throws IOException {
        URL url = new URL("https://kauth.kakao.com/oauth/token");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        int responseCode;
        try (OutputStreamWriter outputStreamWriter = new OutputStreamWriter(connection.getOutputStream())) {
            try (BufferedWriter bufferedWriter = new BufferedWriter(outputStreamWriter)) {
                StringBuilder requestBuilder = new StringBuilder();
                requestBuilder.append("grant_type=authorization_code");
                requestBuilder.append("&client_id=ab3e0e3a866959cb53f8a5d683ad4cd7");
                requestBuilder.append("&redirect_uri=http://localhost:8080/member/kakao");
                requestBuilder.append("&code=").append(code);
                bufferedWriter.write(requestBuilder.toString());
                bufferedWriter.flush();
                responseCode = connection.getResponseCode();
            }
            System.out.println("응답 코드 : " + responseCode);
        }
        StringBuilder responseBuilder = new StringBuilder();
        try (InputStreamReader inputStreamReader = new InputStreamReader(connection.getInputStream())) {
            try (BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    responseBuilder.append(line);
                }
            }
            System.out.println("응답 내용 :" + responseBuilder);
        }
        JSONObject responseObject = new JSONObject(responseBuilder.toString());
        return responseObject.getString("access_token");
    }

    public UserEntity getKakaoUserInfo(String accessToken) throws IOException {
        URL url = new URL("https://kapi.kakao.com/v2/user/me");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Authorization", String.format("Bearer %s", accessToken));
        connection.setRequestMethod("GET");
        int responseCode = connection.getResponseCode();
        StringBuilder responseBuilder = new StringBuilder();
        try (InputStreamReader inputStreamReader = new InputStreamReader(connection.getInputStream())) {
            try (BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    responseBuilder.append(line);
                }
            }
        }
        System.out.println("응답 내용 : " + responseBuilder);
        JSONObject responseObject = new JSONObject(responseBuilder.toString());
        JSONObject propertyObject = responseObject.getJSONObject("properties");
        String email = String.valueOf(responseObject.getLong("id"));

        UserEntity user = this.memberMapper.selectUserByEmail(email);
        if (user == null) {
            user = new UserEntity();
            user.setEmail(email);
            user.setId(email);
            user.setPassword(""); //카카오 로그인은 비밀번호 못땡겨옴
            user.setName("");
            user.setBirthday("");
            user.setContact(email);
            user.setAddressPrimary("");
            user.setAddressPostal("");
            user.setAddressSecondary(""); //빈 문자열로 하면 웹에서 입력안해도 Insert 가능

            this.memberMapper.insertUser(user);
        }
        return user;
    }


}
