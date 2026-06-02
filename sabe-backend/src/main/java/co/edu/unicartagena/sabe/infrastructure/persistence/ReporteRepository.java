package co.edu.unicartagena.sabe.infrastructure.persistence;

import co.edu.unicartagena.sabe.domain.model.ReportStatus;
import co.edu.unicartagena.sabe.domain.model.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findByCiudadanoUsuarioEmailOrderByCreadoEnDesc(String email);

    List<Reporte> findByFuncionarioAsignadoIdOrderByCreadoEnDesc(Long funcionarioId);

    long countByEstadoNombre(ReportStatus estado);

    @Query("select r.categoria.nombre, count(r) from Reporte r group by r.categoria.nombre order by count(r) desc")
    List<Object[]> countByCategoria();
}
