public class Rota {
    private int id;
    private String origem;
    private String destino;
    private String nivelRisco; // Ex: "baixo", "moderado", "alto"
    private String status;     // Ex: "ativa", "bloqueada", "em manutenção"

    public Rota(int id, String origem, String destino, String nivelRisco, String status) {
        this.id = id;
        this.origem = origem;
        this.destino = destino;
        this.nivelRisco = nivelRisco;
        this.status = status;
    }

    public int getId() { return id; }
    public String getOrigem() { return origem; }
    public String getDestino() { return destino; }
    public String getNivelRisco() { return nivelRisco; }
    public String getStatus() { return status; }

    public void setOrigem(String origem) { this.origem = origem; }
    public void setDestino(String destino) { this.destino = destino; }
    public void setNivelRisco(String nivelRisco) { this.nivelRisco = nivelRisco; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "Rota [ID=" + id + ", Origem=" + origem + ", Destino=" + destino +
                ", Nível de Risco=" + nivelRisco + ", Status=" + status + "]";
    }
}
