const { organizarArquivos, eventEmitter } = require('./organizarArquivo');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function iniciarOrganizacao() {
    rl.question('Digite a pasta a ser organizada: ', (pasta) => {
        const caminhoAbsoluto = path.resolve(pasta);

        eventEmitter.on('arquivoMovido', ({ nome, localizacao, usuario, url }) => {
            console.log(`Arquivo "${nome}" movido para ${localizacao}`);
            console.log(`Usuário: ${usuario}`);
            console.log(`URL do arquivo: ${url}\n`);
        });

        console.log(`\nIniciando organização dos arquivos em: ${caminhoAbsoluto}\n`);

        organizarArquivos(caminhoAbsoluto)
            .then(() => {
                console.log('\nOrganização concluída!');
                rl.close();
            })
            .catch(err => {
                console.error('Ocorreu um erro:', err);
                rl.close();
            });
    });
}

iniciarOrganizacao();

rl.on('close', () => {
    console.log('\nPrograma encerrado.');
    process.exit(0);
});