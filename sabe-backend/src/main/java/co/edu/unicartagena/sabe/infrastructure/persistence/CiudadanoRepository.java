package co.edu.unicartagena.sabe.infrastructure.persistence;

import co.edu.unicartagena.sabe.domain.model.Ciudadano;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CiudadanoRepository extends JpaRepository<Ciudadano, Long> {
    Optional<Ciudadano> findByUsuarioEmail(String email);
}
