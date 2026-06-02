package co.edu.unicartagena.sabe.infrastructure.rest;

import co.edu.unicartagena.sabe.application.dto.ReportDtos.*;
import co.edu.unicartagena.sabe.application.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CIUDADANO')")
    public ReportResponse create(Authentication authentication, @Valid @RequestBody CreateReportRequest request) {
        return reportService.create(authentication.getName(), request);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','FUNCIONARIO')")
    public List<ReportResponse> listAll(Authentication authentication) {
        return reportService.list(authentication.getName(), false);
    }

    @GetMapping("/mis-reportes")
    @PreAuthorize("hasRole('CIUDADANO')")
    public List<ReportResponse> myReports(Authentication authentication) {
        return reportService.list(authentication.getName(), true);
    }

    @GetMapping("/{id}")
    public ReportResponse detail(@PathVariable Long id) {
        return reportService.detail(id);
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','FUNCIONARIO')")
    public ReportResponse changeStatus(Authentication authentication, @PathVariable Long id, @Valid @RequestBody ChangeStatusRequest request) {
        return reportService.changeStatus(id, authentication.getName(), request);
    }

    @PatchMapping("/{id}/asignar")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ReportResponse assign(Authentication authentication, @PathVariable Long id, @Valid @RequestBody AssignReportRequest request) {
        return reportService.assign(id, authentication.getName(), request);
    }

    @GetMapping("/{id}/actualizaciones")
    public List<UpdateResponse> updates(@PathVariable Long id) {
        return reportService.updates(id);
    }
}
