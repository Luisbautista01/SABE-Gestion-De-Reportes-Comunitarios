package co.edu.unicartagena.sabe.infrastructure.rest;

import co.edu.unicartagena.sabe.application.dto.ReportDtos.NotificationResponse;
import co.edu.unicartagena.sabe.application.dto.ReportDtos.StatsResponse;
import co.edu.unicartagena.sabe.application.service.AdminService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/admin/estadisticas")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public StatsResponse stats() {
        return adminService.stats();
    }

    @GetMapping("/notificaciones")
    public List<NotificationResponse> notifications(Authentication authentication) {
        return adminService.notifications(authentication.getName());
    }
}
