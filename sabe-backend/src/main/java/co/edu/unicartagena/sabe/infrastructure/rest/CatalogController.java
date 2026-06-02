package co.edu.unicartagena.sabe.infrastructure.rest;

import co.edu.unicartagena.sabe.application.dto.ReportDtos.CatalogResponse;
import co.edu.unicartagena.sabe.application.service.CatalogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalogos")
public class CatalogController {
    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/categorias")
    public List<CatalogResponse> categories() {
        return catalogService.categories();
    }

    @GetMapping("/estados")
    public List<CatalogResponse> statuses() {
        return catalogService.statuses();
    }
}
