const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const organizarArquivos = async (pasta) => {
    try {
        const arquivos = await fs.readdir(pasta, { withFileTypes: true });

        for (const arquivo of arquivos) {
            if (arquivo.isFile()) {
                const extensao = path.extname(arquivo.name).slice(1) || 'sem-extensao';
                const pastaDestino = path.join(pasta, extensao);
                const caminhoAntigo = path.join(pasta, arquivo.name);
                const caminhoNovo = path.join(pastaDestino, arquivo.name);

                try {
                    await fs.mkdir(pastaDestino, { recursive: true });
                    await fs.rename(caminhoAntigo, caminhoNovo);

                    eventEmitter.emit('arquivoMovido', {
                        nome: path.basename(arquivo.name),
                        localizacao: path.resolve(caminhoNovo),
                        usuario: os.userInfo().username,
                        url: new URL('file://' + path.resolve(caminhoNovo)).toString()
                    });
                } catch (err) {
                    console.error(`Erro ao processar o arquivo ${arquivo.name}:`, err);
                }
            }
        }
    } catch (err) {
        console.error('Erro ao ler a pasta:', err);
    }
};

module.exports = {
    organizarArquivos,
    eventEmitter
};