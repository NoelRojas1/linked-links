import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetSessionCookie = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies['session'] as string;
  },
);
