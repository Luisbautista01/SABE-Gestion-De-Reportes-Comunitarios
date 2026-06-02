package co.edu.unicartagena.sabe.infrastructure.persistence;

import co.edu.unicartagena.sabe.domain.model.Actualizacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActualizacionRepository extends JpaRepository<Actualizacion, Long> {
    List<Actualizacion> findByReporteIdOrderByCreadoEnDesc(Long reporteId);
}
