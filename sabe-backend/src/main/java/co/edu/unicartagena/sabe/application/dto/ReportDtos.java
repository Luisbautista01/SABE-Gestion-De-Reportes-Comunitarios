package co.edu.unicartagena.sabe.application.dto;

import co.edu.unicartagena.sabe.domain.model.ReportStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public final class ReportDtos {
    private ReportDtos() {
    }

    public record CreateReportRequest(
            @NotBlank String titulo,
            @NotBlank String descripcion,
            @NotBlank String direccion,
            BigDecimal latitud,
            BigDecimal longitud,
            @NotNull Long categoriaId,
            List<String> evidencias
    ) {
    }

    public record ChangeStatusRequest(@NotNull ReportStatus estado, String comentario) {
    }

    public record AssignReportRequest(@NotNull Long funcionarioId, String comentario) {
    }

    public record EvidenceRequest(@NotBlank String url, String nombreArchivo, String tipoContenido) {
    }

    public record ReportResponse(
            Long id,
            String titulo,
            String descripcion,
            String direccion,
            BigDecimal latitud,
            BigDecimal longitud,
            String categoria,
            ReportStatus estado,
            String ciudadano,
            String funcionarioAsignado,
            LocalDateTime creadoEn,
            LocalDateTime actualizadoEn,
            List<String> evidencias
    ) {
    }

    public record CatalogResponse(Long id, String nombre, String descripcion) {
    }

    public record UpdateResponse(Long id, String usuario, ReportStatus estado, String comentario, LocalDateTime creadoEn) {
    }

    public record NotificationResponse(Long id, String titulo, String mensaje, boolean leida, LocalDateTime creadoEn, Long reporteId) {
    }

    public record StatsResponse(long total, Map<String, Long> porEstado, Map<String, Long> porCategoria) {
    }
}
