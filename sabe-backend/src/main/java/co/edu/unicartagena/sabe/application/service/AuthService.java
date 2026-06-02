package co.edu.unicartagena.sabe.application.service;

import co.edu.unicartagena.sabe.application.dto.AuthDtos.*;
import co.edu.unicartagena.sabe.domain.model.*;
import co.edu.unicartagena.sabe.infrastructure.persistence.*;
import co.edu.unicartagena.sabe.infrastructure.security.TokenService;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final CiudadanoRepository ciudadanoRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthService(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            CiudadanoRepository ciudadanoRepository,
            FuncionarioRepository funcionarioRepository,
            AdministradorRepository administradorRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            TokenService tokenService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.ciudadanoRepository = ciudadanoRepository;
        this.funcionarioRepository = funcionarioRepository;
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @Transactional
    public AuthResponse registerCitizen(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("El correo ya esta registrado");
        }
        Rol rol = rolRepository.findByNombre(RoleName.CIUDADANO).orElseThrow();
        Usuario usuario = Usuario.builder()
                .nombres(request.nombres())
                .apellidos(request.apellidos())
                .email(request.email().toLowerCase())
                .password(passwordEncoder.encode(request.password()))
                .telefono(request.telefono())
                .roles(Set.of(rol))
                .build();
        usuarioRepository.save(usuario);
        ciudadanoRepository.save(Ciudadano.builder()
                .usuario(usuario)
                .documento(request.documento())
                .barrio(request.barrio())
                .direccion(request.direccion())
                .build());
        return new AuthResponse(tokenService.create(usuario), toResponse(usuario));
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email().toLowerCase(), request.password()));
        Usuario usuario = usuarioRepository.findByEmail(request.email().toLowerCase()).orElseThrow();
        return new AuthResponse(tokenService.create(usuario), toResponse(usuario));
    }

    @Transactional
    public UsuarioResponse createUser(CreateUserRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("El correo ya esta registrado");
        }
        RoleName roleName = request.rol() == null ? RoleName.FUNCIONARIO : request.rol();
        Rol rol = rolRepository.findByNombre(roleName).orElseThrow();
        Usuario usuario = usuarioRepository.save(Usuario.builder()
                .nombres(request.nombres())
                .apellidos(request.apellidos())
                .email(request.email().toLowerCase())
                .password(passwordEncoder.encode(request.password()))
                .telefono(request.telefono())
                .roles(Set.of(rol))
                .build());
        if (roleName == RoleName.FUNCIONARIO) {
            funcionarioRepository.save(Funcionario.builder()
                    .usuario(usuario)
                    .dependencia(request.dependencia() == null ? "Planeacion municipal" : request.dependencia())
                    .cargo(request.cargo())
                    .build());
        }
        if (roleName == RoleName.ADMINISTRADOR) {
            administradorRepository.save(Administrador.builder().usuario(usuario).area("Administracion SABE").build());
        }
        return toResponse(usuario);
    }

    public UsuarioResponse currentUser(String email) {
        return usuarioRepository.findByEmail(email).map(this::toResponse).orElseThrow();
    }

    public String recoveryMessage(String email) {
        return usuarioRepository.existsByEmail(email.toLowerCase())
                ? "Se genero una solicitud de recuperacion. Integre aqui su proveedor de correo."
                : "Si el correo existe, recibira instrucciones.";
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getEmail(),
                usuario.getTelefono(),
                usuario.getRoles().stream().map(Rol::getNombre).collect(Collectors.toSet())
        );
    }
}
