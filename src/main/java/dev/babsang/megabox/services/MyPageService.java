package dev.babsang.megabox.services;

import dev.babsang.megabox.entities.member.EmailAuthEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.member.RecoverMyPageResult;
import dev.babsang.megabox.enums.member.SendEmailAuthResult;
import dev.babsang.megabox.enums.member.VerifyEmailAuthResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IMemberMapper;
import dev.babsang.megabox.mappers.IMyPageMapper;
import dev.babsang.megabox.utils.CryptoUtils;
import dev.babsang.megabox.vos.movie.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service(value = "dev.babsang.megabox.services.MyPageService")
public class MyPageService {
    private final IMyPageMapper myPageMapper;
    private final IMemberMapper memberMapper;
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Autowired
    public MyPageService(IMyPageMapper myPageMapper, IMemberMapper memberMapper, JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.myPageMapper = myPageMapper;
        this.memberMapper = memberMapper;
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public BookingEntity getMovieVosById(String id) { return this.myPageMapper.selectMovieVosById(id); }

    public Enum<? extends IResult> myPageAuth(UserEntity signedUser) {
        if (signedUser == null) {
            return RecoverMyPageResult.NO_USER;
        }

        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> updateUser(UserEntity signedUser, UserEntity newUser) {
        if (signedUser == null) {
            return RecoverMyPageResult.NO_USER;
        }
        UserEntity userByContact = this.myPageMapper.selectUserByContact(newUser.getContact());
        if (userByContact != null && !signedUser.getEmail().equals(userByContact.getEmail())) {
            return RecoverMyPageResult.DUPLICATE;
        }

        signedUser.setContact(newUser.getContact());
        signedUser.setBirthday(newUser.getBirthday());
        signedUser.setName(newUser.getName());
        signedUser.setEmail(newUser.getEmail());
        signedUser.setAddressPostal(newUser.getAddressPostal());
        signedUser.setAddressPrimary(newUser.getAddressPrimary());
        signedUser.setAddressSecondary(newUser.getAddressSecondary());

        return this.myPageMapper.updateUser(signedUser) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    public Enum<? extends IResult> updatePassword(UserEntity signedUser, UserEntity newUser) {
        if (signedUser == null) {
            return RecoverMyPageResult.NO_USER;
        }

        signedUser.setPassword(CryptoUtils.hashSha512(newUser.getPassword()));

        return this.myPageMapper.updateUser(signedUser) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    public Enum<? extends IResult> deleteUser(UserEntity user) {

        return this.myPageMapper.deleteUser(user) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    public BookingVo[] getBookingHistory(String id) { return this.myPageMapper.selectBookingById(id);}

    @Transactional
    public Enum<? extends IResult> sendEmailAuth(UserEntity user, EmailAuthEntity emailAuth) throws NoSuchAlgorithmException, MessagingException {

        UserEntity existingUser = this.memberMapper.selectUserByEmail(user.getEmail());

        if (existingUser == null) {
            return CommonResult.FAILURE;
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
        helper.setSubject("[메가박스] 개인정보 수정 인증 번호");
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

}
