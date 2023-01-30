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
import javax.servlet.http.HttpServletRequest;
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
    private final IMemberMapper memberMapper;

    @Autowired
    public MemberService(JavaMailSender mailSender, TemplateEngine templateEngine, IMemberMapper memberMapper) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.memberMapper = memberMapper;
    }

    @Transactional
    public Enum<? extends IResult> sendEmailAuth(UserEntity user, EmailAuthEntity emailAuth, HttpServletRequest request) throws NoSuchAlgorithmException, MessagingException {
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
        context.setVariable("domain", String.format("%s://%s:%d",
                request.getScheme(),
                request.getServerName(),
                request.getServerPort()));

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
        if (existingEmailAuth.getExpiresOn().compareTo(new Date()) < 0) {
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
            user.setPoint(existingPasswordAuth.getPoint());
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
    public Enum<? extends IResult> recoverPasswordSend(EmailAuthEntity emailAuth, HttpServletRequest request) throws MessagingException {
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
        context.setVariable("domain", String.format("%s://%s:%d",
                request.getScheme(),
                request.getServerName(),
                request.getServerPort()));

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

    public Enum<? extends IResult> updatePassword(EmailAuthEntity emailAuth, UserEntity user) {
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

}
