package co.edu.unicartagena.sabe.infrastructure.security;

import co.edu.unicartagena.sabe.domain.model.RoleName;
import co.edu.unicartagena.sabe.domain.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TokenService {
    private final String secret;
    private final long expirationMinutes;

    public TokenService(
            @Value("${app.security.jwt-secret}") String secret,
            @Value("${app.security.jwt-expiration-minutes}") long expirationMinutes
    ) {
        this.secret = secret;
        this.expirationMinutes = expirationMinutes;
    }

    public String create(Usuario usuario) {
        String roles = usuario.getRoles().stream()
                .map(rol -> rol.getNombre().name())
                .sorted()
                .collect(Collectors.joining(","));
        long expiresAt = Instant.now().plusSeconds(expirationMinutes * 60).getEpochSecond();
        String payload = usuario.getEmail() + "|" + roles + "|" + expiresAt;
        return base64(payload) + "." + sign(payload);
    }

    public Optional<TokenData> verify(String token) {
        String[] parts = token == null ? new String[0] : token.split("\\.");
        if (parts.length != 2) {
            return Optional.empty();
        }
        String payload = new String(Base64.getUrlDecoder().decode(parts[0]), StandardCharsets.UTF_8);
        if (!sign(payload).equals(parts[1])) {
            return Optional.empty();
        }
        String[] fields = payload.split("\\|");
        if (fields.length != 3 || Long.parseLong(fields[2]) < Instant.now().getEpochSecond()) {
            return Optional.empty();
        }
        Set<RoleName> roles = fields[1].isBlank()
                ? Set.of()
                : Set.of(fields[1].split(",")).stream().map(RoleName::valueOf).collect(Collectors.toSet());
        return Optional.of(new TokenData(fields[0], roles));
    }

    private String base64(String payload) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
    }

    private String sign(String payload) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(payload.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception exception) {
            throw new IllegalStateException("No fue posible firmar el token", exception);
        }
    }

    public record TokenData(String email, Set<RoleName> roles) {
    }
}
