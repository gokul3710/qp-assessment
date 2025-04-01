import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from './guards/user.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleGuard } from './guards/role.guard';
import { AdminGuard } from './guards/admin.guard';
import { JSendInterceptor } from './interceptors/jsend.interceptor';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [JwtStrategy, UserGuard, RoleGuard, UserGuard, AdminGuard, JSendInterceptor
    ],
    exports: [JwtStrategy, JwtModule, UserGuard, PassportModule, RoleGuard, UserGuard,AdminGuard, JSendInterceptor],
})
export class CommonModule { }
