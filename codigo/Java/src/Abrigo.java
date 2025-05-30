public class Abrigo {
    private int id;
    private String nome;
    private int capacidade;
    private String recursos; // Ex: "água, alimentos, primeiros socorros"
    private String localizacao;

    public Abrigo(int id, String nome, int capacidade, String recursos, String localizacao) {
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.recursos = recursos;
        this.localizacao = localizacao;
    }

    public int getId() { return id; }
    public String getNome() { return nome; }
    public int getCapacidade() { return capacidade; }
    public String getRecursos() { return recursos; }
    public String getLocalizacao() { return localizacao; }

    public void setNome(String nome) { this.nome = nome; }
    public void setCapacidade(int capacidade) { this.capacidade = capacidade; }
    public void setRecursos(String recursos) { this.recursos = recursos; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    @Override
    public String toString() {
        return "Abrigo [ID=" + id + ", Nome=" + nome + ", Capacidade=" + capacidade +
                ", Recursos=" + recursos + ", Localização=" + localizacao + "]";
    }
}
