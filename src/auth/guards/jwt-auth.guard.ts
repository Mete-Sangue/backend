import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger, // Opcional, para logging
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name); // Opcional

  // O método canActivate é chamado antes do handleRequest.
  // O AuthGuard('jwt') internamente chama a JwtStrategy.
  // Se a estratégia for bem-sucedida, o usuário é anexado a request.user.
  // Se a estratégia falhar (ex: token inválido, expirado, ou o método validate da estratégia retorna null/false ou lança erro),
  // o AuthGuard lançará uma UnauthorizedException.

  // Você pode sobrescrever `canActivate` para lógica mais complexa antes da validação do token,
  // mas geralmente não é necessário para a validação JWT padrão.
  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   // Adicione sua lógica de ativação personalizada aqui
  //   // por exemplo, verificar um header específico antes de prosseguir
  //   return super.canActivate(context); // Chama a lógica padrão do AuthGuard
  // }

  // Você pode sobrescrever `handleRequest` para personalizar o que acontece após
  // a tentativa de validação da JwtStrategy.
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    // err: Erro lançado pela estratégia ou pelo Passport.
    // user: O usuário retornado pelo método `validate` da JwtStrategy, ou `false` se a autenticação falhou.
    // info: Informações adicionais, como uma mensagem de erro da biblioteca jwt (ex: JsonWebTokenError, TokenExpiredError).

    if (info) {
      // Logar a informação do erro do token pode ser útil para depuração
      this.logger.debug(
        `Informação da validação do JWT: ${info.name} - ${info.message}`,
      );
    }

    if (err || !user) {
      // Lança uma exceção se houver um erro ou se o usuário não for validado.
      // A mensagem de 'info' pode ser mais específica sobre o problema do token.
      throw (
        err ||
        new UnauthorizedException(info?.message || 'Acesso não autorizado.')
      );
    }

    // Se a autenticação for bem-sucedida, 'user' (retornado pela JwtStrategy.validate) é retornado
    // e o NestJS o injetará em `request.user`.
    return user;
  }
}
