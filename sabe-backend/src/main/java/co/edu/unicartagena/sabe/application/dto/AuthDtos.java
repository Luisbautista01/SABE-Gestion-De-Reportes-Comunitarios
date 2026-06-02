package co.edu.unicartagena.sabe.application.dto;

import co.edu.unicartagena.sabe.domain.model.RoleName;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

public final class AuthDtos {
    private AuthDtos() {
    }

    public record RegisterRequest(
            @NotBlank String nombres,
            @NotBlank String apellidos,
            @Email @NotBlank String email,
            @Size(min = 6) String password,
            String telefono,
            String documento,
            String barrio,
            String direccion
    ) {
    }

    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {
    }

    public record PasswordRecoveryRequest(@Email @NotBlank String email) {
    }

    public record CreateUserRequest(
            @NotBlank String nombres,
            @NotBlank String apellidos,
            @Email @NotBlank String email,
            @Size(min = 6) String password,
            String telefono,
            RoleName rol,
            String dependencia,
            String cargo
    ) {
    }

    public record AuthResponse(String token, UsuarioResponse usuario) {
    }

    public record UsuarioResponse(Long id, String nombres, String apellidos, String email, String telefono, Set<RoleName> roles) {
    }
}
