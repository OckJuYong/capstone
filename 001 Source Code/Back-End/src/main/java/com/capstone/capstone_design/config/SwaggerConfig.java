package com.capstone.capstone_design.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        String jwtSchemeName = "bearerAuth";
        SecurityScheme securityScheme = new SecurityScheme()
            .name(jwtSchemeName)
            .type(SecurityScheme.Type.HTTP) // HTTP 방식을 사용
            .scheme("bearer") // Bearer 토큰 방식을 사용
            .bearerFormat("JWT"); // 토큰 형식은 JWT

        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);

        return new OpenAPI()
                .components(new Components().addSecuritySchemes(jwtSchemeName, securityScheme))
                .info(apiInfo())
                .addSecurityItem(securityRequirement);
    }

    private Info apiInfo() {
        return new Info()
                .title("MobiSync Swagger")
                .description("MobiSync REST API")
                .version("1.0.0");
    }
}
