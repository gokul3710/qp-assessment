import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
    return (req as any).args[0].user
});
