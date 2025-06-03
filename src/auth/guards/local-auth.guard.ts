import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // O comportamento padrão do AuthGuard('local') é:
  // 1. Executar a LocalStrategy.
  // 2. Se a estratégia `validate` retornar um usuário, ele é anexado a `request.user`.
  // 3. Se a estratégia `validate` lançar uma exceção (ex: UnauthorizedException) ou retornar `false` ou `null`,
  //    o AuthGuard lançará uma UnauthorizedException por padrão, bloqueando o acesso à rota.
  // Você pode sobrescrever o método `handleRequest` se precisar de um tratamento de erro
  // mais personalizado ou se quiser alterar o que acontece após a validação.
  // Exemplo (geralmente não necessário para o LocalAuthGuard padrão):
  // handleRequest(err, user, info, context, status) {
  //   if (err || !user) {
  //     // Você pode logar 'info' ou 'err' aqui
  //     throw err || new UnauthorizedException('Falha na autenticação via LocalStrategy.');
  //   }
  //   return user; // Retorna o usuário para ser injetado em req.user
  // }
}
