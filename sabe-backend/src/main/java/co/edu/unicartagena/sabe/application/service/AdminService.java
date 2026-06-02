package co.edu.unicartagena.sabe.application.service;

import co.edu.unicartagena.sabe.application.dto.ReportDtos.NotificationResponse;
import co.edu.unicartagena.sabe.application.dto.ReportDtos.StatsResponse;
import co.edu.unicartagena.sabe.domain.model.ReportStatus;
import co.edu.unicartagena.sabe.infrastructure.persistence.NotificacionRepository;
import co.edu.unicartagena.sabe.infrastructure.persistence.ReporteRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {
    private final ReporteRepository reporteRepository;
    private final NotificacionRepository notificacionRepository;

    public AdminService(ReporteRepository reporteRepository, NotificacionRepository notificacionRepository) {
        this.reporteRepository = reporteRepository;
        this.notificacionRepository = notificacionRepository;
    }

    public StatsResponse stats() {
        Map<String, Long> porEstado = new LinkedHashMap<>();
        Arrays.stream(ReportStatus.values()).forEach(status -> porEstado.put(status.name(), reporteRepository.countByEstadoNombre(status)));
        Map<String, Long> porCategoria = new LinkedHashMap<>();
        reporteRepository.countByCategoria().forEach(row -> porCategoria.put((String) row[0], (Long) row[1]));
        return new StatsResponse(reporteRepository.count(), porEstado, porCategoria);
    }

    public List<NotificationResponse> notifications(String email) {
        return notificacionRepository.findByUsuarioEmailOrderByCreadoEnDesc(email).stream()
                .map(n -> new NotificationResponse(n.getId(), n.getTitulo(), n.getMensaje(), n.isLeida(), n.getCreadoEn(), n.getReporte() == null ? null : n.getReporte().getId()))
                .toList();
    }
}
