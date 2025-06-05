import java.util.Scanner;

public class Menu {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        CidadaoService cidadaoService = new CidadaoService();
        AbrigoService abrigoService = new AbrigoService();
        RotaService rotaService = new RotaService();

        int opcaoPrincipal;
        do {
            System.out.println("\n=== CIVITAS AI – SIMULADOR DE EVACUAÇÃO ===");
            System.out.println("1. Gerenciar Cidadãos");
            System.out.println("2. Gerenciar Abrigos");
            System.out.println("3. Gerenciar Rotas");
            System.out.println("0. Sair");
            System.out.print("Escolha uma opção: ");
            opcaoPrincipal = scanner.nextInt();

            switch (opcaoPrincipal) {
                case 1:
                    menuCidadao(cidadaoService, scanner);
                    break;
                case 2:
                    menuAbrigo(abrigoService, scanner);
                    break;
                case 3:
                    menuRota(rotaService, scanner);
                    break;
                case 0:
                    System.out.println("Encerrando o sistema. Até logo!");
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
        } while (opcaoPrincipal != 0);

        scanner.close();
    }

    private static void menuCidadao(CidadaoService cidadaoService, Scanner scanner) {
        int opcao;
        do {
            System.out.println("\n--- Menu Cidadão ---");
            System.out.println("1. Cadastrar");
            System.out.println("2. Listar");
            System.out.println("3. Buscar por ID");
            System.out.println("4. Atualizar");
            System.out.println("5. Remover");
            System.out.println("0. Voltar");
            System.out.print("Escolha uma opção: ");
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1: cidadaoService.cadastrar(); break;
                case 2: cidadaoService.listar(); break;
                case 3: cidadaoService.buscarPorId(); break;
                case 4: cidadaoService.atualizar(); break;
                case 5: cidadaoService.remover(); break;
                case 0: break;
                default: System.out.println("Opção inválida.");
            }
        } while (opcao != 0);
    }

    private static void menuAbrigo(AbrigoService abrigoService, Scanner scanner) {
        int opcao;
        do {
            System.out.println("\n--- Menu Abrigo ---");
            System.out.println("1. Cadastrar");
            System.out.println("2. Listar");
            System.out.println("3. Buscar por ID");
            System.out.println("4. Atualizar");
            System.out.println("5. Remover");
            System.out.println("0. Voltar");
            System.out.print("Escolha uma opção: ");
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1: abrigoService.cadastrar(); break;
                case 2: abrigoService.listar(); break;
                case 3: abrigoService.buscarPorId(); break;
                case 4: abrigoService.atualizar(); break;
                case 5: abrigoService.remover(); break;
                case 0: break;
                default: System.out.println("Opção inválida.");
            }
        } while (opcao != 0);
    }

    private static void menuRota(RotaService rotaService, Scanner scanner) {
        int opcao;
        do {
            System.out.println("\n--- Menu Rota ---");
            System.out.println("1. Cadastrar");
            System.out.println("2. Listar");
            System.out.println("3. Buscar por ID");
            System.out.println("4. Atualizar");
            System.out.println("5. Remover");
            System.out.println("0. Voltar");
            System.out.print("Escolha uma opção: ");
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1: rotaService.cadastrar(); break;
                case 2: rotaService.listar(); break;
                case 3: rotaService.buscarPorId(); break;
                case 4: rotaService.atualizar(); break;
                case 5: rotaService.remover(); break;
                case 0: break;
                default: System.out.println("Opção inválida.");
            }
        } while (opcao != 0);
    }
}
