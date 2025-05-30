import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class RotaService {
    private List<Rota> rotas = new ArrayList<>();
    private Scanner scanner = new Scanner(System.in);

    public void cadastrar() {
        System.out.print("ID: ");
        int id = scanner.nextInt(); scanner.nextLine();
        System.out.print("Origem: ");
        String origem = scanner.nextLine();
        System.out.print("Destino: ");
        String destino = scanner.nextLine();
        System.out.print("Nível de risco (baixo, moderado, alto): ");
        String nivelRisco = scanner.nextLine();
        System.out.print("Status (ativa, bloqueada): ");
        String status = scanner.nextLine();

        rotas.add(new Rota(id, origem, destino, nivelRisco, status));
        System.out.println("✅ Rota cadastrada!");
    }

    public void listar() {
        if (rotas.isEmpty()) {
            System.out.println("Nenhuma rota cadastrada.");
            return;
        }
        for (Rota r : rotas) {
            System.out.println(r);
        }
    }

    public void buscarPorId() {
        System.out.print("Digite o ID da rota: ");
        int id = scanner.nextInt();
        for (Rota r : rotas) {
            if (r.getId() == id) {
                System.out.println(r);
                return;
            }
        }
        System.out.println("Rota não encontrada.");
    }

    public void atualizar() {
        System.out.print("ID da rota a atualizar: ");
        int id = scanner.nextInt(); scanner.nextLine();
        for (Rota r : rotas) {
            if (r.getId() == id) {
                System.out.print("Nova origem: ");
                r.setOrigem(scanner.nextLine());
                System.out.print("Novo destino: ");
                r.setDestino(scanner.nextLine());
                System.out.print("Novo nível de risco: ");
                r.setNivelRisco(scanner.nextLine());
                System.out.print("Novo status: ");
                r.setStatus(scanner.nextLine());
                System.out.println("✅ Rota atualizada!");
                return;
            }
        }
        System.out.println("Rota não encontrada.");
    }

    public void remover() {
        System.out.print("ID da rota a remover: ");
        int id = scanner.nextInt();
        for (Rota r : rotas) {
            if (r.getId() == id) {
                rotas.remove(r);
                System.out.println("✅ Rota removida!");
                return;
            }
        }
        System.out.println("Rota não encontrada.");
    }
}