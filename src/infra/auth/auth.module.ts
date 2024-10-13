import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt.auth.guards";
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        PassportModule,
        JwtModule.register(
            {
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '10m' }
            }
        )
    ],
    providers: [
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard }
    ]
})
export class AuthModule { }