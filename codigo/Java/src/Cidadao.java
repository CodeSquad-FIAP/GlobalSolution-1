public class Cidadao {
    private int id;
    private String nome;
    private int idade;
    private String localizacao;
    private String mobilidade; // Ex: "normal", "cadeirante", "idoso"

    public Cidadao(int id, String nome, int idade, String localizacao, String mobilidade) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.localizacao = localizacao;
        this.mobilidade = mobilidade;
    }

    public int getId() { return id; }
    public String getNome() { return nome; }
    public int getIdade() { return idade; }
    public String getLocalizacao() { return localizacao; }
    public String getMobilidade() { return mobilidade; }

    public void setNome(String nome) { this.nome = nome; }
    public void setIdade(int idade) { this.idade = idade; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }
    public void setMobilidade(String mobilidade) { this.mobilidade = mobilidade; }

    @Override
    public String toString() {
        return "Cidadao [ID=" + id + ", Nome=" + nome + ", Idade=" + idade +
                ", Localização=" + localizacao + ", Mobilidade=" + mobilidade + "]";
    }
}
