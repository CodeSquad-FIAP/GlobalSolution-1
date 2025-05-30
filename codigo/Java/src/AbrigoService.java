import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class AbrigoService {
    private List<Abrigo> abrigos = new ArrayList<>();
    private Scanner scanner = new Scanner(System.in);

    public void cadastrar() {
        System.out.print("ID: ");
        int id = scanner.nextInt(); scanner.nextLine();
        System.out.print("Nome: ");
        String nome = scanner.nextLine();
        System.out.print("Capacidade: ");
        int capacidade = scanner.nextInt(); scanner.nextLine();
        System.out.print("Recursos (ex: alimentos, água): ");
        String recursos = scanner.nextLine();
        System.out.print("Localização: ");
        String localizacao = scanner.nextLine();

        abrigos.add(new Abrigo(id, nome, capacidade, recursos, localizacao));
        System.out.println("✅ Abrigo cadastrado!");
    }

    public void listar() {
        if (abrigos.isEmpty()) {
            System.out.println("Nenhum abrigo cadastrado.");
            return;
        }
        for (Abrigo a : abrigos) {
            System.out.println(a);
        }
    }

    public void buscarPorId() {
        System.out.print("Digite o ID do abrigo: ");
        int id = scanner.nextInt();
        for (Abrigo a : abrigos) {
            if (a.getId() == id) {
                System.out.println(a);
                return;
            }
        }
        System.out.println("Abrigo não encontrado.");
    }

    public void atualizar() {
        System.out.print("ID do abrigo a atualizar: ");
        int id = scanner.nextInt(); scanner.nextLine();
        for (Abrigo a : abrigos) {
            if (a.getId() == id) {
                System.out.print("Novo nome: ");
                a.setNome(scanner.nextLine());
                System.out.print("Nova capacidade: ");
                a.setCapacidade(scanner.nextInt()); scanner.nextLine();
                System.out.print("Novos recursos: ");
                a.setRecursos(scanner.nextLine());
                System.out.print("Nova localização: ");
                a.setLocalizacao(scanner.nextLine());
                System.out.println("✅ Abrigo atualizado!");
                return;
            }
        }
        System.out.println("Abrigo não encontrado.");
    }

    public void remover() {
        System.out.print("ID do abrigo a remover: ");
        int id = scanner.nextInt();
        for (Abrigo a : abrigos) {
            if (a.getId() == id) {
                abrigos.remove(a);
                System.out.println("✅ Abrigo removido!");
                return;
            }
        }
        System.out.println("Abrigo não encontrado.");
    }
}