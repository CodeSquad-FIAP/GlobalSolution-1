-- Criação das tabelas

CREATE TABLE cidadao (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    idade INT,
    localizacao VARCHAR(100),
    mobilidade VARCHAR(50)
);

CREATE TABLE abrigo (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    capacidade INT,
    recursos VARCHAR(255),
    localizacao VARCHAR(100)
);

CREATE TABLE rota (
    id INT PRIMARY KEY,
    origem VARCHAR(100),
    destino VARCHAR(100),
    nivel_risco VARCHAR(50),
    status VARCHAR(50)
);

-- Inserção de dados de exemplo

INSERT INTO cidadao VALUES
(1, 'Aline Costa', 30, 'Zona Sul', 'normal'),
(2, 'João Pedro', 75, 'Centro', 'idoso'),
(3, 'Clara Silva', 28, 'Zona Norte', 'cadeirante');

INSERT INTO abrigo VALUES
(1, 'Abrigo Central', 100, 'alimentos, água, kits de primeiros socorros', 'Centro'),
(2, 'Abrigo Escola Verde', 80, 'água e cobertores', 'Zona Norte');

INSERT INTO rota VALUES
(1, 'Zona Norte', 'Centro', 'baixo', 'ativa'),
(2, 'Zona Sul', 'Centro', 'alto', 'bloqueada'),
(3, 'Centro', 'Zona Leste', 'moderado', 'ativa');

-- Atualizações (exemplos)

UPDATE abrigo SET capacidade = 90 WHERE id = 1;
UPDATE rota SET status = 'bloqueada' WHERE id = 3;

-- Remoções (exemplos)

DELETE FROM cidadao WHERE id = 3;
