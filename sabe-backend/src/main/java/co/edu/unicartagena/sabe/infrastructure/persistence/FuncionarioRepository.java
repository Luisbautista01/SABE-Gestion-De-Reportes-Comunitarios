package co.edu.unicartagena.sabe.infrastructure.persistence;

import co.edu.unicartagena.sabe.domain.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
