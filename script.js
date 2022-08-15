class Cliente {
    constructor(idCliente, tipoCliente, dataCriacao, codBanco, agencia, conta, saldo) {
        this.idCliente = idCliente;
        this.tipoCliente = tipoCliente;
        this.dataCriacao = dataCriacao;
        this.codBanco = codBanco;
        this.agencia = agencia;
        this.conta = conta;
        this.saldo = saldo;
        this.historico = [];
    }
}

// Criando a Classe para Pessoa Física
class PessoaFisica extends Cliente {
    constructor(idCliente, tipoCliente, dataCriacao, codBanco, agencia, conta, saldo, nome, cpf, email, telefone, dataDeNascimento) {
        super(idCliente, tipoCliente, dataCriacao, codBanco, agencia, conta, saldo)
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.dataDeNascimento = dataDeNascimento;
    }
}

// Criando a Classe para Pessoa Jurídica
class PessoaJuridica extends Cliente {
    constructor(idCliente, tipoCliente, dataCriacao, codBanco, agencia, conta, saldo, nomeFantasia, cnpj, email, telefone, dataDaFundacao) {
        super(idCliente, tipoCliente, dataCriacao, codBanco, agencia, conta, saldo)
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this.dataDaFundacao = dataDaFundacao;
    }
}

// Criando a Classe responsável pelas transações
class Transacao {
    static transferencia(contaOrigem, contaDestino, idTransacao, dataDeTransacao, valorDaTransferencia) {
        if (contaOrigem.saldo >= valorDaTransferencia) {
            contaOrigem.saldo = contaOrigem.saldo - valorDaTransferencia
            contaDestino.saldo = contaDestino.saldo + valorDaTransferencia
            contaOrigem.historico.push({
                idTransacao: idTransacao,
                dataDeTransacao: dataDeTransacao,
                valorDaTransferencia: valorDaTransferencia,
                tipo: "pagamento",
            })
            contaDestino.historico.push({
                idTransacao: idTransacao,
                dataDeTransacao: dataDeTransacao,
                valorDaTransferencia: valorDaTransferencia,
                tipo: "recebimento",
            })
            return "Transferência realizada com sucesso!"
        } else {
            return "Saldo insuficiente para transferência!"
        }
    }
    static deposito(contaDestino, idDeposito, dataDoDeposito, valorDoDeposito) {
        contaDestino.saldo = contaDestino.saldo + valorDoDeposito
        contaDestino.historico.push({
            idDeposito: idDeposito,
            dataDoDeposito: dataDoDeposito,
            valorDoDeposito: valorDoDeposito,
            tipo: "recebimento",
        })
        return "Depósito realizado com sucesso!"
    }
    static pagamentoSalario(contaOrigem, contaDestino, idPagamento, dataDoPagamento, valorDoSalario) {
        if (contaOrigem) {
            if (valorDoSalario > 1000) {
                return "Seu limite máximo para este tipo de operação é de 1000, entre em contato com o banco!"
            }
        }
        if (contaOrigem.saldo >= valorDoSalario) {
            contaOrigem.saldo = contaOrigem.saldo - valorDoSalario
            contaDestino.saldo = contaDestino.saldo + valorDoSalario
            contaOrigem.historico.push({
                idPagamento: idPagamento,
                dataDoPagamento: dataDoPagamento,
                valorDoSalario: valorDoSalario,
                tipo: "recebimento",
            })
            contaDestino.historico.push({
                idPagamento: idPagamento,
                dataDoPagamento: dataDoPagamento,
                valorDoSalario: valorDoSalario,
                tipo: "pagamento",
            })
            return "Pagamento realizado com sucesso!"
        }
        else {
            return "Saldo insuficiente para realizar o pagamento!"
        }
    }
}

// Criando objetos.

const Felipe = new PessoaFisica("01", "Investidor", "09/11/2021", 273, 0001, "01100101", 2500, "Felipe", "000.000.000-00", "felipe@femail.net", 63999351481, "04/08/2000")
const Orbital = new PessoaJuridica("02", "Business", "19/09/2009", 273, 0002, "10011010", 37890, "Orbital Coding Solutions EIRELI", "00.000.000/0001-00", "contato@orbital.dev", 30038700, "24/11/2017")

// Informações sobre o Felipe.
console.log(Felipe.nome) // Retornará Felipe
console.log(Felipe.tipoCliente) // Retornará Investidor
console.log(Felipe.cpf) // Retornará 000.000.000-00
console.log(Felipe.dataDeNascimento) // Retornará 04/08/2000

// Informações sobre o Orbital
console.log(Orbital.nomeFantasia) // Retornará Orbital Codign Solutions EIRELI
console.log(Orbital.tipoCliente) // Retornará Business
console.log(Orbital.email) // Retornará contato@orbital.dev
console.log(Orbital.cnpj) // Reotnrará 00.000.000/0001-00