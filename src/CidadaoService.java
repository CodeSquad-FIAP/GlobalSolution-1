import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CidadaoService {
    private List<Cidadao> cidadaos = new ArrayList<>();
    private Scanner scanner = new Scanner(System.in);

    public void cadastrar() {
        System.out.print("ID: ");
        int id = scanner.nextInt(); scanner.nextLine();
        System.out.print("Nome: ");
        String nome = scanner.nextLine();
        System.out.print("Idade: ");
        int idade = scanner.nextInt(); scanner.nextLine();
        System.out.print("Localização: ");
        String localizacao = scanner.nextLine();
        System.out.print("Mobilidade (normal, idoso, cadeirante): ");
        String mobilidade = scanner.nextLine();

        cidadaos.add(new Cidadao(id, nome, idade, localizacao, mobilidade));
        System.out.println("✅ Cidadão cadastrado com sucesso!");
    }

    public void listar() {
        if (cidadaos.isEmpty()) {
            System.out.println("Nenhum cidadão cadastrado.");
            return;
        }
        for (Cidadao c : cidadaos) {
            System.out.println(c);
        }
    }

    public void buscarPorId() {
        System.out.print("Digite o ID do cidadão: ");
        int id = scanner.nextInt();
        for (Cidadao c : cidadaos) {
            if (c.getId() == id) {
                System.out.println(c);
                return;
            }
        }
        System.out.println("Cidadão não encontrado.");
    }

    public void atualizar() {
        System.out.print("ID do cidadão a atualizar: ");
        int id = scanner.nextInt(); scanner.nextLine();
        for (Cidadao c : cidadaos) {
            if (c.getId() == id) {
                System.out.print("Novo nome: ");
                c.setNome(scanner.nextLine());
                System.out.print("Nova idade: ");
                c.setIdade(scanner.nextInt()); scanner.nextLine();
                System.out.print("Nova localização: ");
                c.setLocalizacao(scanner.nextLine());
                System.out.print("Nova mobilidade: ");
                c.setMobilidade(scanner.nextLine());
                System.out.println("✅ Atualizado com sucesso!");
                return;
            }
        }
        System.out.println("Cidadão não encontrado.");
    }

    public void remover() {
        System.out.print("ID do cidadão a remover: ");
        int id = scanner.nextInt();
        for (Cidadao c : cidadaos) {
            if (c.getId() == id) {
                cidadaos.remove(c);
                System.out.println("✅ Removido com sucesso!");
                return;
            }
        }
        System.out.println("Cidadão não encontrado.");
    }
}
