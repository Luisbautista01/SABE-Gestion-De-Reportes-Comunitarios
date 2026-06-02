package co.edu.unicartagena.sabe.application.service;

import co.edu.unicartagena.sabe.application.dto.ReportDtos.CatalogResponse;
import co.edu.unicartagena.sabe.infrastructure.persistence.CategoriaRepository;
import co.edu.unicartagena.sabe.infrastructure.persistence.EstadoReporteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogService {
    private final CategoriaRepository categoriaRepository;
    private final EstadoReporteRepository estadoRepository;

    public CatalogService(CategoriaRepository categoriaRepository, EstadoReporteRepository estadoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.estadoRepository = estadoRepository;
    }

    public List<CatalogResponse> categories() {
        return categoriaRepository.findAll().stream()
                .map(c -> new CatalogResponse(c.getId(), c.getNombre(), c.getDescripcion()))
                .toList();
    }

    public List<CatalogResponse> statuses() {
        return estadoRepository.findAll().stream()
                .map(e -> new CatalogResponse(e.getId(), e.getNombre().name(), e.getDescripcion()))
                .toList();
    }
}
