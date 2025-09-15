CREATE DATABASE exercicioaula11;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Inserindo 5 registros na tabela 'produtos'
INSERT INTO `produtos` (`nome`, `preco`) VALUES
('Notebook Gamer', 4599.90),
('Teclado Mecânico RGB', 349.50),
('Mouse Sem Fio Ergonômico', 189.99),
('Monitor UltraWide 29 polegadas', 1250.00),
('Headset 7.1 Surround', 499.75);

-- Inserindo 5 registros na tabela 'clientes'
INSERT INTO `clientes` (`nome`, `email`) VALUES
('João Silva', 'joao.silva@email.com'),
('Maria Santos', 'maria.santos@email.com'),
('Pedro Oliveira', 'pedro.oliveira@email.com'),
('Ana Costa', 'ana.costa@email.com'),
('Carlos Ferreira', 'carlos.ferreira@email.com');