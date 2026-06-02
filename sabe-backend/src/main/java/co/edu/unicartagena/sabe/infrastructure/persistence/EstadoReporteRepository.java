package co.edu.unicartagena.sabe.infrastructure.persistence;

import co.edu.unicartagena.sabe.domain.model.EstadoReporte;
import co.edu.unicartagena.sabe.domain.model.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstadoReporteRepository extends JpaRepository<EstadoReporte, Long> {
    Optional<EstadoReporte> findByNombre(ReportStatus nombre);
}
