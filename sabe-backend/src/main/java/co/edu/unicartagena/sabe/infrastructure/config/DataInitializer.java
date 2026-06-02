package co.edu.unicartagena.sabe.infrastructure.config;

import co.edu.unicartagena.sabe.domain.model.*;
import co.edu.unicartagena.sabe.infrastructure.persistence.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedData(
            RolRepository rolRepository,
            EstadoReporteRepository estadoRepository,
            CategoriaRepository categoriaRepository,
            UsuarioRepository usuarioRepository,
            AdministradorRepository administradorRepository,
            FuncionarioRepository funcionarioRepository,
            CiudadanoRepository ciudadanoRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            for (RoleName roleName : RoleName.values()) {
                rolRepository.findByNombre(roleName).orElseGet(() -> rolRepository.save(Rol.builder().nombre(roleName).descripcion("Rol " + roleName.name()).build()));
            }
            for (ReportStatus status : ReportStatus.values()) {
                estadoRepository.findByNombre(status).orElseGet(() -> estadoRepository.save(EstadoReporte.builder().nombre(status).descripcion("Estado " + status.name()).build()));
            }
            seedCategory(categoriaRepository, "Infraestructura", "Vias, puentes, alumbrado y espacios publicos.");
            seedCategory(categoriaRepository, "Medio ambiente", "Residuos, cuerpos de agua, arbolado y contaminacion.");
            seedCategory(categoriaRepository, "Seguridad", "Riesgos, convivencia y situaciones de emergencia.");
            seedCategory(categoriaRepository, "Servicios publicos", "Agua, energia, aseo y saneamiento.");

            seedUser(usuarioRepository, rolRepository, administradorRepository, funcionarioRepository, ciudadanoRepository, passwordEncoder,
                    "admin@sabe.gov.co", "Admin", "SABE", RoleName.ADMINISTRADOR);
            seedUser(usuarioRepository, rolRepository, administradorRepository, funcionarioRepository, ciudadanoRepository, passwordEncoder,
                    "funcionario@sabe.gov.co", "Funcionario", "Municipal", RoleName.FUNCIONARIO);
            seedUser(usuarioRepository, rolRepository, administradorRepository, funcionarioRepository, ciudadanoRepository, passwordEncoder,
                    "ciudadano@sabe.gov.co", "Ciudadano", "Demo", RoleName.CIUDADANO);
        };
    }

    private void seedCategory(CategoriaRepository repository, String name, String description) {
        repository.findByNombreIgnoreCase(name).orElseGet(() -> repository.save(Categoria.builder().nombre(name).descripcion(description).build()));
    }

    private void seedUser(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            AdministradorRepository administradorRepository,
            FuncionarioRepository funcionarioRepository,
            CiudadanoRepository ciudadanoRepository,
            PasswordEncoder passwordEncoder,
            String email,
            String names,
            String lastNames,
            RoleName roleName
    ) {
        if (usuarioRepository.existsByEmail(email)) {
            return;
        }
        Usuario usuario = usuarioRepository.save(Usuario.builder()
                .nombres(names)
                .apellidos(lastNames)
                .email(email)
                .password(passwordEncoder.encode("Sabe1234"))
                .telefono("3000000000")
                .roles(Set.of(rolRepository.findByNombre(roleName).orElseThrow()))
                .build());
        if (roleName == RoleName.ADMINISTRADOR) {
            administradorRepository.save(Administrador.builder().usuario(usuario).area("Gobierno digital").build());
        } else if (roleName == RoleName.FUNCIONARIO) {
            funcionarioRepository.save(Funcionario.builder().usuario(usuario).dependencia("Planeacion municipal").cargo("Gestor de incidencias").build());
        } else {
            ciudadanoRepository.save(Ciudadano.builder().usuario(usuario).documento("1000000000").barrio("Centro").direccion("San Bernardo del Viento").build());
        }
    }
}
