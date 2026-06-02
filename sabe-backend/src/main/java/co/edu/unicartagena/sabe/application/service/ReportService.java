package co.edu.unicartagena.sabe.application.service;

import co.edu.unicartagena.sabe.application.dto.ReportDtos.*;
import co.edu.unicartagena.sabe.domain.model.*;
import co.edu.unicartagena.sabe.infrastructure.persistence.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private final ReporteRepository reporteRepository;
    private final CiudadanoRepository ciudadanoRepository;
    private final CategoriaRepository categoriaRepository;
    private final EstadoReporteRepository estadoRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final ActualizacionRepository actualizacionRepository;
    private final NotificacionRepository notificacionRepository;

    public ReportService(
            ReporteRepository reporteRepository,
            CiudadanoRepository ciudadanoRepository,
            CategoriaRepository categoriaRepository,
            EstadoReporteRepository estadoRepository,
            FuncionarioRepository funcionarioRepository,
            UsuarioRepository usuarioRepository,
            ActualizacionRepository actualizacionRepository,
            NotificacionRepository notificacionRepository
    ) {
        this.reporteRepository = reporteRepository;
        this.ciudadanoRepository = ciudadanoRepository;
        this.categoriaRepository = categoriaRepository;
        this.estadoRepository = estadoRepository;
        this.funcionarioRepository = funcionarioRepository;
        this.usuarioRepository = usuarioRepository;
        this.actualizacionRepository = actualizacionRepository;
        this.notificacionRepository = notificacionRepository;
    }

    @Transactional
    public ReportResponse create(String email, CreateReportRequest request) {
        Ciudadano ciudadano = ciudadanoRepository.findByUsuarioEmail(email).orElseThrow();
        Categoria categoria = categoriaRepository.findById(request.categoriaId()).orElseThrow();
        EstadoReporte estado = estadoRepository.findByNombre(ReportStatus.RECIBIDO).orElseThrow();
        Reporte reporte = Reporte.builder()
                .titulo(request.titulo())
                .descripcion(request.descripcion())
                .direccion(request.direccion())
                .latitud(request.latitud())
                .longitud(request.longitud())
                .ciudadano(ciudadano)
                .categoria(categoria)
                .estado(estado)
                .build();
        if (request.evidencias() != null) {
            request.evidencias().stream()
                    .filter(url -> url != null && !url.isBlank())
                    .map(url -> Evidencia.builder().reporte(reporte).url(url).nombreArchivo("evidencia").tipoContenido("image/*").build())
                    .forEach(reporte.getEvidencias()::add);
        }
        Reporte saved = reporteRepository.save(reporte);
        saveUpdate(saved, ciudadano.getUsuario(), estado, "Reporte creado por ciudadano");
        return toResponse(saved);
    }

    public List<ReportResponse> list(String email, boolean onlyMine) {
        if (onlyMine) {
            return reporteRepository.findByCiudadanoUsuarioEmailOrderByCreadoEnDesc(email).stream().map(this::toResponse).toList();
        }
        return reporteRepository.findAll().stream().map(this::toResponse).toList();
    }

    public ReportResponse detail(Long id) {
        return reporteRepository.findById(id).map(this::toResponse).orElseThrow();
    }

    @Transactional
    public ReportResponse changeStatus(Long id, String email, ChangeStatusRequest request) {
        Reporte reporte = reporteRepository.findById(id).orElseThrow();
        EstadoReporte estado = estadoRepository.findByNombre(request.estado()).orElseThrow();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        reporte.setEstado(estado);
        Reporte saved = reporteRepository.save(reporte);
        String comentario = request.comentario() == null || request.comentario().isBlank()
                ? "Cambio de estado a " + request.estado()
                : request.comentario();
        saveUpdate(saved, usuario, estado, comentario);
        notifyCitizen(saved, "Actualizacion del reporte", comentario);
        return toResponse(saved);
    }

    @Transactional
    public ReportResponse assign(Long id, String email, AssignReportRequest request) {
        Reporte reporte = reporteRepository.findById(id).orElseThrow();
        Funcionario funcionario = funcionarioRepository.findById(request.funcionarioId()).orElseThrow();
        EstadoReporte estado = estadoRepository.findByNombre(ReportStatus.ASIGNADO).orElseThrow();
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
        reporte.setFuncionarioAsignado(funcionario);
        reporte.setEstado(estado);
        Reporte saved = reporteRepository.save(reporte);
        String comentario = request.comentario() == null ? "Reporte asignado" : request.comentario();
        saveUpdate(saved, usuario, estado, comentario);
        notifyCitizen(saved, "Reporte asignado", "Tu reporte fue asignado a " + funcionario.getUsuario().nombreCompleto());
        return toResponse(saved);
    }

    public List<UpdateResponse> updates(Long id) {
        return actualizacionRepository.findByReporteIdOrderByCreadoEnDesc(id).stream()
                .map(update -> new UpdateResponse(update.getId(), update.getUsuario().nombreCompleto(), update.getEstado().getNombre(), update.getComentario(), update.getCreadoEn()))
                .toList();
    }

    private void saveUpdate(Reporte reporte, Usuario usuario, EstadoReporte estado, String comentario) {
        actualizacionRepository.save(Actualizacion.builder()
                .reporte(reporte)
                .usuario(usuario)
                .estado(estado)
                .comentario(comentario)
                .build());
    }

    private void notifyCitizen(Reporte reporte, String title, String message) {
        notificacionRepository.save(Notificacion.builder()
                .usuario(reporte.getCiudadano().getUsuario())
                .reporte(reporte)
                .titulo(title)
                .mensaje(message)
                .build());
    }

    private ReportResponse toResponse(Reporte reporte) {
        return new ReportResponse(
                reporte.getId(),
                reporte.getTitulo(),
                reporte.getDescripcion(),
                reporte.getDireccion(),
                reporte.getLatitud(),
                reporte.getLongitud(),
                reporte.getCategoria().getNombre(),
                reporte.getEstado().getNombre(),
                reporte.getCiudadano().getUsuario().nombreCompleto(),
                reporte.getFuncionarioAsignado() == null ? null : reporte.getFuncionarioAsignado().getUsuario().nombreCompleto(),
                reporte.getCreadoEn(),
                reporte.getActualizadoEn(),
                reporte.getEvidencias().stream().map(Evidencia::getUrl).toList()
        );
    }
}
