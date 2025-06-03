import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../../usuario/usuario.service';
import { Usuario as PrismaUser } from '@prisma/client';

interface JwtPayload {
  sub: number;
  email: string;
  name?: string;
}

type UserWithoutPassword = Omit<PrismaUser, 'senha'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // O logger será inicializado após a chamada super() permitir o uso do 'this'
  private readonly logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsuarioService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      // Se o logger da instância ainda não puder ser usado (porque 'this' não está disponível),
      // podemos usar um console.error para este erro crítico ou lançar o erro diretamente.
      console.error(
        'FATAL ERROR: JWT_SECRET não está definido nas variáveis de ambiente.',
      );
      // Lançar o erro impede a continuação e a instanciação da estratégia, o que é apropriado aqui.
      throw new Error(
        'FATAL ERROR: JWT_SECRET não está definido nas variáveis de ambiente.',
      );
    }

    // As opções para a estratégia JWT devem ser definidas antes de chamar super()
    const jwtOptions: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    };

    // Chame super() AQUI, antes de qualquer acesso a 'this'
    super(jwtOptions);

    // Agora 'this' está disponível, então podemos inicializar/usar this.logger
    this.logger = new Logger(JwtStrategy.name);
    this.logger.log('JwtStrategy instanciada e configurada.');
    // Você poderia logar o jwtSecret aqui se fosse para debug (não recomendado para produção)
    // this.logger.debug(`Usando JWT_SECRET: ${jwtSecret.substring(0, 5)}...`);
  }

  async validate(payload: JwtPayload): Promise<UserWithoutPassword> {
    this.logger.debug(`Validando payload do JWT: ${JSON.stringify(payload)}`);
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      this.logger.warn(
        `Usuário não encontrado para o ID no token JWT: ${payload.sub}`,
      );
      throw new UnauthorizedException(
        'Usuário não encontrado ou token inválido.',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...result } = user;
    return result;
  }
}
