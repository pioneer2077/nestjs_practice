import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../Repository/user.repository';
import * as config from 'config';
const jwtConfig = config.get('jwt');
//다른 곳에서도 사용할 수 있도록 Injectable데코레이터 사용
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //passportStrategy 상속, jwtStrategy를 사용하기 위해 Strategy를 인자로 넣어줌
  constructor(private userRepository: UserRepository) {
    //토큰이 유효한지 확인한 후, 해당 토큰의 페이로드에서 가져온 유저 이름으로 유저 객체를 db에서 가져와야함. 그 때 사용할 것
    super({
      secretOrKey: jwtConfig.secret,
      //모듈에 등록한건 토큰 생성을 위해, 여기서는 토큰의 유효성을 검사하기 위해 사용
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //토큰이 어디에서 가져오는지 명시.
      //우린 헤더의 bearer token에서 가져옴
    });
  }
  //그럼 토큰을 생성해서 클라에서 온 토큰이랑 비교 후 페이로드 추출까지 여기서 한다고?

  async validate(payload) {
    //인증 후 페이로드가 들어옴
    const { username } = payload;
    const user = await this.userRepository.findOneBy({ username });
    try {
      const user = await this.userRepository.findOneBy({ username });

      if (!user) {
        throw new UnauthorizedException('유효하지 않은 사용자입니다.');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }
  }
}
