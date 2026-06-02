package co.edu.unicartagena.sabe.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI sabeOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("SABE API")
                        .version("1.0.0")
                        .description("API REST para reportes comunitarios de San Bernardo del Viento, Cordoba.")
                        .contact(new Contact().name("Equipo SABE")))
                .components(new Components().addSecuritySchemes("bearerAuth",
                        new SecurityScheme()
                                .name("bearerAuth")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("SABE-HMAC")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
