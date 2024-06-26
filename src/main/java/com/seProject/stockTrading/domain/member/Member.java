package com.seProject.stockTrading.domain.member;

import com.seProject.stockTrading.domain.enums.MemberRole;
import com.seProject.stockTrading.domain.post.Post;
import com.seProject.stockTrading.domain.tradeRecord.TradeRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static com.seProject.stockTrading.domain.enums.MemberRole.USER;

@Entity
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //비밀번호
    private Long password;
    //아이디
    private String username;
    //닉네임
    private String nickname;
    //사용자 이름
    private String name;
    //사용자 전화번호
    private Long number;
    //사용자 잔고
    @Column(nullable = false)
    private Long balance = 0L;
    //사용자 권한
    @Enumerated(EnumType.STRING)
    private MemberRole role = USER;

}
