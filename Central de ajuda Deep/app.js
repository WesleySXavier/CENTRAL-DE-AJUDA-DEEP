// ==========================================
// CONEXÃO COM O SUPABASE
// ==========================================
const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON_PUBLICA_AQUI';

// Inicializa o cliente do Supabase
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================================================
// CENTRAL DE AJUDA DEEP - CONFIGURAÇÃO MANUAL DE TÓPICOS
// ==========================================================================

const categoriasConfig = [
    {
        id: 'dados_visita',
        nome: 'Dados da Visita',
        icone: '📋',
        descricao: 'Informações sobre a visita de campo, data, hora, equipe responsável.',
        subcategorias: [
            {
                id: 'visita_geral',
                nome: '1.2 Alguém foi encontrado?',
                topicos: [
                    { titulo: 'Sim', conteudo: 'Quando este campo estiver selecionado, significa que a pesquisa foi produtiva. Nesse caso, a pesquisa deve ser APROVADA.' },
                    { titulo: 'Sim, mas se recusou a responder', conteudo: 'Quando este campo estiver selecionado, significa que o responsável foi localizado, porém se recusou a fornecer informações. Nesse caso, a pesquisa é considerada impedida e deve ser APROVADA.' },
                    { titulo: 'Sim, mas o responsável não estava presente.', conteudo: 'Quando este campo estiver selecionado, significa que havia alguém na propriedade, mas o responsável não estava presente. Nesse caso, a pesquisa deve ser REPROVADA para que seja realizada uma nova tentativa de localizar o responsável.' },
                    { titulo: 'Não', conteudo: 'Quando este campo estiver selecionado, significa que ninguém foi encontrado na propriedade. Nesse caso, a pesquisa deve ser REPROVADA para que seja realizada uma nova tentativa de localizar o proprietário' },
                    { titulo: 'Abandonado', conteudo: 'Quando este campo estiver selecionado, significa que a edificação aparenta estar abandonada. Se houver fotos e coordenadas válidas, a pesquisa pode ser APROVADA. Entretanto, é necessário analisar o caso com atenção. Caso o imóvel apresente indícios de ocupação humana ou características que indiquem que não está efetivamente abandonado, a pesquisa deve ser REPROVADA para que seja realizada uma tentativa de localizar o proprietário.' }
                ]
            },
            {
                id: 'visita_status',
                nome: '1.2.1 Qual motivo de alguém não ter sido contactado?',
                topicos: [
                    { titulo: 'Edificação longe da porteira', conteudo: 'Quando este campo estiver selecionado, significa que a edificação está localizada a uma distância significativa da porteira de acesso à propriedade. Nessa situação, a pesquisa deve ser REPROVADA para que seja realizada uma nova tentativa de localizar o proprietário ou responsável.' },
                    { titulo: 'Propriedade totalmente produtiva', conteudo: 'Quando este campo estiver selecionado, significa que a área não possui moradia e é destinada exclusivamente a atividades produtivas, como plantações, criação de gado, indústrias ou outras atividades econômicas.' }
                ]
            },
            {
                id: 'visita_status 1',
                nome: '1.3 Distância entre o portão/porteira e o imóvel',
                topicos: [
                    { titulo: 'Distância entre o portão/porteira e o imóvel', conteudo: 'Quando a distância informada estiver muito discrepante, acesse o Google Maps e meça a distância entre a porteira e o imóvel. Para isso, clique com o botão direito do mouse no ponto da porteira e selecione a opção "Medir distância". Em seguida, marque o ponto correspondente ao imóvel para obter a distância correta.' }
                ]
            },
            {
                id: 'visita_status 2',
                nome: 'Localização da Visita / Coordenadas',
                topicos: [
                    { titulo: '1.4 Município:', conteudo: 'O município deve estar sempre escrito corretamente, com acentuação e pontuação adequadas.' },
                    { titulo: '1.5 Bairro:', conteudo: 'O bairro deve estar sempre escrito corretamente, com acentuação e pontuação adequadas. É necessário verificar se o bairro informado pelo agente na pesquisa PRODUTIVA está de acordo com a localização identificada no Google Maps. Caso o bairro não seja encontrado no Maps, deve-se considerar correta a informação fornecida pelo agente. Se não houver coerência entre a informação prestada e a localização verificada, deverá ser informado o nome do município no campo correspondente.' },
                    { titulo: '1.6 Logradouro:', conteudo: 'O logradouro deve sempre iniciar com um dos seguintes termos: Rua, Avenida, Rodovia, Travessa, Estrada, Beco, Acesso ou Alameda, seguido do nome identificado no Google Maps. É necessário verificar se o logradouro informado pelo agente na pesquisa PRODUTIVA está de acordo com a localização encontrada no Maps. Caso o logradouro não seja localizado no Maps, deve-se considerar correta a informação fornecida pelo agente. Se o agente não informar um logradouro válido, deverá ser utilizado o logradouro mais próximo da localização indicada no Maps.' },
                    { titulo: '1.1.8 Complemento', conteudo: 'O complemento do endereço é uma informação adicional que detalha a localização exata de um imóvel, como número de apartamento, bloco, sala ou referências específicas.' }
                ]
            }
        ]
    },
    {
        id: 'dados_estrutura',
        nome: 'Dados da Estrutura',
        icone: '🏠',
        descricao: 'Características e tipo de edificação e estado de conservação.',
        subcategorias: [
           {
                id: 'visita_status 3',
                nome: '2.1.1 Status da Estrutura',
                topicos: [
                    { titulo: 'Em Construção', conteudo: 'Quando este campo estiver selecionado, significa que a edificação aparenta estar em construção. Havendo fotos e coordenadas válidas, a pesquisa poderá ser APROVADA. No entanto, é necessário analisar o caso com atenção. Caso o imóvel não apresente características compatíveis com uma construção em andamento, a pesquisa deverá ser REPROVADA para que seja realizada uma nova tentativa de localização do proprietário. Nos casos em que a construção aparentar estar abandonada, deverá ser priorizada a classificação ABANDONADO.' },
                    { titulo: 'Uso Temporário', conteudo: 'Esta classificação deve ser utilizada para imóveis que não possuem morador fixo, como chácaras, sítios, casas de temporada, imóveis para locação temporária, acomodações por plataformas de hospedagem e pousadas. Havendo fotos, coordenadas e observações válidas, a pesquisa poderá ser APROVADA. Contudo, se o imóvel não apresentar características compatíveis com uso temporário, a pesquisa deverá ser REPROVADA.' }
                ]
            }
        ]
    },
    {
        id: 'domiciliar_entrevistado',
        nome: 'Dados Domiciliares - Entrevistado',
        icone: '👤',
        descricao: 'Informações sobre o entrevistado residente no domicílio.',
        subcategorias: [
            {
                id: 'entrevistado_sub1',
                nome: '3.1 Categoria de uso:',
                topicos: [
                    { titulo: 'Comercial', conteudo: 'Categoria destinada a edificações utilizadas para atividades de comércio ou prestação de serviços. Enquadram-se nessa classificação lojas, escritórios, consultórios, restaurantes, academias, salões de beleza e outros estabelecimentos voltados ao atendimento de clientes ou ao exercício de atividades empresariais.' },
                    { titulo: 'Industrial', conteudo: 'Categoria destinada a edificações utilizadas para processos de produção, fabricação, montagem, transformação ou beneficiamento de produtos. Inclui fábricas, indústrias, galpões produtivos e instalações que empregam equipamentos, máquinas e matérias-primas em suas operações.' },
                    { titulo: 'Institucional', conteudo: 'Categoria destinada a edificações voltadas à prestação de serviços de interesse coletivo, educacional, religioso, cultural, assistencial ou governamental. Fazem parte dessa classificação escolas, universidades, hospitais, igrejas, museus, bibliotecas e órgãos públicos.' },
                    { titulo: 'Mista', conteudo: 'Categoria aplicada às edificações que apresentam dois ou mais usos distintos de forma integrada, sem predominância exclusiva de uma única atividade. Como exemplo, podem ser citados prédios com áreas comerciais e residenciais, ou imóveis que combinam atividades de prestação de serviços com moradia.' }
                ]
            },
            {
                id: 'entrevistado_sub2',
                nome: '3.1.1 Tipo do domicílio:',
                topicos: [
                    { titulo: 'Barracão', conteudo: 'Edificação simples, geralmente de construção mais econômica, utilizada para fins residenciais ou de apoio, podendo apresentar estrutura e acabamento básicos em comparação às demais.' },
                    { titulo: 'Condomínio Vertical', conteudo: 'Conjunto residencial composto por unidades habitacionais distribuídas em um ou mais edifícios de múltiplos pavimentos, com áreas comuns compartilhadas entre os moradores, como corredores, elevadores, garagens e áreas de lazer.' },
                    { titulo: 'Condomínio Horizontal', conteudo: 'Conjunto residencial formado por casas ou unidades térreas e/ou assobradadas localizadas em uma área comum fechada, com infraestrutura e espaços de uso coletivo administrados pelo condomínio, mantendo cada unidade sua área privativa.' }
                ]
            },
            {
                id: 'entrevistado_sub3',
                nome: '3.1.2 Descrição do domicílio',
                topicos: [
                    { titulo: 'Residência Unifamiliar', conteudo: 'Edificação simples, geralmente de construção mais econômica, utilizada para fins residenciais ou de apoio, podendo apresentar estrutura e acabamento básicos em comparação às demais.' },
                    { titulo: 'Residência Multifamiliar', conteudo: 'Conjunto residencial composto por unidades habitacionais distribuídas em um ou mais edifícios de múltiplos pavimentos, com áreas comuns compartilhadas entre os moradores, como corredores, elevadores, garagens e áreas de lazer.' },
                    { titulo: 'Habitação de Interesse Social', conteudo: 'Edificação ou unidade habitacional destinada ao atendimento de pessoas e famílias em situação de vulnerabilidade social, com finalidade de moradia, acolhimento ou proteção social. Esta categoria inclui abrigos institucionais, casas de acolhimento, residências assistidas e outras modalidades habitacionais voltadas à garantia de condições dignas de habitação e suporte social aos seus ocupantes.' }
                ]
            },
            {
                id: 'entrevistado_sub4',
                nome: '3.3.1.1 CPF do entrevistado',
                topicos: [
                    { titulo: 'CPF ', conteudo: 'Deve-se modificar o CPF no padrão correto (000.000.000 – 00)' }
                ]
            },
            {
                id: 'entrevistado_sub5',
                nome: '3.3.1.1 CNPJ do entrevistado',
                topicos: [
                    { titulo: 'CNPJ', conteudo: 'Deve-se modificar o CNPJ no padrão correto (00.000.000/0000-00)' }
                ]
            },
            {
                id: 'entrevistado_sub6',
                nome: '3.4 Descrição de atividade econômica (CNAE)',
                topicos: [
                    { titulo: 'CNAE', conteudo: 'A atividade econômica deve ser informada conforme o registro da empresa na Classificação Nacional de Atividades Econômicas (CNAE). Essa informação pode ser consultada no cartão do CNPJ da empresa, disponível no site da Receita Federal, onde constam a atividade econômica principal e, quando houver, as atividades secundárias vinculadas ao estabelecimento. O preenchimento deve considerar a atividade principal exercida no local. E devesse modificar o CNAE no padrão correto (00.00-0-00).' }
                ]
            },
            {
                id: 'entrevistado_sub7',
                nome: '3.1.4 Uso institucional',
                topicos: [
                    { titulo: 'Religioso', conteudo: 'As igrejas que não possuem casa em seus anexos devem ser APROVADAS. No entanto, se houver indícios de moradia e não for encontrado nenhum morador no local, a pesquisa deverá ser REPROVADA, para que seja realizada uma nova tentativa de localizar o morador.' }
                ]
            }
        ]
    },
    {
        id: 'domiciliar_social',
        nome: 'Dados Domiciliares - Social',
        icone: '👥',
        descricao: 'Composição familiar, relações sociais, perfil socioeconômico.',
        subcategorias: [
            {
                id: 'social_sub1',
                nome: '4.4 Quais benefícios sociais ou previdenciários os residentes recebem?',
                topicos: [
                    { titulo: 'CadÚnico', conteudo: 'Se os benefícios Programa Bolsa Família, BPC - LOAS, Cartão Cesta Básica e o Viva Leite estiverem selecionados é obrigatório que o entrevistado tenha o CadÚnico.' }
                ]
            },
            {
                id: 'social_sub2',
                nome: '4.4 4.8 Qual a renda familiar?',
                topicos: [
                    { titulo: 'Renda familiar', conteudo: 'Quando for aposentado a renda deve ser R$ 1.518,01 a R$ 3.036,00.' }
                ]
            },
            {
                id: 'social_sub3',
                nome: 'Comercial e os Dados Domiciliares-Social',
                topicos: [
                    { titulo: 'Dados Domiciliares-Social', conteudo: 'Quando a pesquisa PRODUTIVA for do tipo Comércio, industrial ou institucional, o campo “Dados Domiciliares – Social” deverá ser apagado. Apenas o campo Social deve ser removido; os demais campos de Dados Domiciliares devem ser mantidos.' }
                ]
            }
        ]
    },
    {
        id: 'domiciliar_servicos',
        nome: 'Dados Domiciliares - Serviços',
        icone: '⚙️',
        descricao: 'Serviços disponíveis no domicílio: energia, internet, coleta de lixo.',
        subcategorias: [
            {
                id: 'servicos_sub1',
                nome: '5.1 Possui energia elétrica na moradia ?',
                topicos: [
                    { titulo: 'Energia elétrica', conteudo: 'Caso o entrevistado informe "Não" na pergunta "5.1 Possui energia elétrica na moradia?”, e na pergunta "5.2.1 Qual o Tipo de Acesso à Internet?" seja selecionada qualquer opção de acesso à internet, deverá alterar a resposta da questão 5.1 para "Sim", pois a existência desse tipo de conexão pressupõe a disponibilidade de energia elétrica na moradia.' }
                ]
            }
        ]
    },
    {
        id: 'domiciliar_saneamento',
        nome: 'Dados Domiciliares - Saneamento',
        icone: '💧',
        descricao: 'Condições de saneamento: água, esgoto, drenagem.',
        subcategorias: [
            {
                id: 'saneamento_sub1',
                nome: '6.2.1 Qual a capacidade do reservatório ou da caixa de água?',
                topicos: [
                    { titulo: 'Reservatório ou caixa de água', conteudo: 'Deve-se observar a residência e sua estrutura, pois a capacidade padrão de caixas de água em imóveis residenciais geralmente varia de 500 a 5.000 litros. Caso seja informado um volume incompatível com o tipo de imóvel, por exemplo 20.000 litros em uma residência comum, ajuste para o padrão mínimo compatível. Entretanto, é necessário verificar se o imóvel não se trata de um sítio, chácara ou estabelecimento comercial, situações em que capacidades mais elevadas são comuns.' }
                ]
            },
            {
                id: 'saneamento_sub2',
                nome: '6.4 Qual a forma atual de tratamento de esgoto que utiliza?',
                topicos: [
                    { titulo: 'Tratamento de esgoto ', conteudo: 'Caso o entrevistado informe que utiliza fossa como forma atual de tratamento de esgoto, é obrigatório que as três perguntas subsequentes (6.4.1, 6.4.2 e 6.4.3) estejam respondidas.' }
                ]
            },
            {
                id: 'saneamento_sub3',
                nome: '6.5.1 Caso possua, quantos litros a caixa tem?',
                topicos: [
                    { titulo: ' Quantos litros a caixa tem', conteudo: 'Deve-se observar a residência e sua estrutura, pois a capacidade padrão de uma caixa de gordura residencial geralmente varia de 10 a 50 litros. Caso seja informado um volume incompatível com o tipo de imóvel, por exemplo 100 litros em uma residência comum, ajuste para o padrão mínimo compatível. Entretanto, é necessário verificar se o imóvel não se trata de um sítio, chácara ou restaurante, situações em que capacidades mais elevadas são comuns.' }
                ]
            }
        ]
    },
    {
        id: 'finalizacao',
        nome: 'Dados de Finalização',
        icone: '✔️',
        descricao: 'Direitos, deveres e interesse nos serviços SABESP.',
        subcategorias: [
            {
                id: 'finalizacao_sub1',
                nome: '7.1 Você completou a visita em todas as estruturas da propriedade?',
                topicos: [
                    { titulo: 'Completou a visita em todas as estruturas da propriedade', conteudo: 'Caso o agente de campo não tenha tirado todas as fotos das soluções de água e esgoto, a resposta deve estar marcada como “Não concluiu a visita e/ou o preenchimento do questionário de todas as estruturas da propriedade”. Além disso, no campo de observações, deve ser registrada a justificativa. Caso o agente não tenha informado o motivo, utilizar a mensagem padrão: “ENTREVISTADO NÃO AUTORIZOU FOTOS”.' }
                ]
            },
            {
                id: 'finalizacao_sub2',
                nome: '7.5.1 Assinatura do entrevistado',
                topicos: [
                    { titulo: 'Assinatura do entrevistado', conteudo: 'Caso a assinatura esteja registrada apenas como um risco ou uma única letra, sem caracterizar uma rubrica válida, a assinatura deve ser apagada e, na questão 7.5, deve ser selecionada a opção “Não”.' }
                ]
            }
        ]
    },
    {
        id: 'Informaçoes',
        nome: 'Informaçoes Adicionais',
        icone: '💡',
        descricao: 'Informações gerais e procedimentos adicionais.',
        subcategorias: [
            {
                id: 'Informaçoes_sub1',
                nome: 'Revisita',
                topicos: [
                    { titulo: 'Reprovada', conteudo: 'Quando a pesquisa for uma revisita (Reprovada), também terá que conferir e ajustar os dados para deixá-los corretos e coerentes.' }
                ]
            }
        ]
    }
];

let searchTerm = '';

// ==========================================================================
// REGISTRO E MONITORAMENTO DE ACESSOS DIÁRIOS (LOCALSTORAGE + SUPABASE)
// ==========================================================================

const ADMINS_CADASTRADOS = [
    { usuario: 'admin', senha: 'ALTERAR_SENHA' }
]; 

let adminLogado = false;

function obterDataAtual() {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
}

function obterHoraAtual() {
    return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function verificarAcesso() {
    const modal = document.getElementById('modalAcesso');
    const form = document.getElementById('formAcesso');

    if (modal) modal.style.display = 'flex';

    if (form) {
        const novoForm = form.cloneNode(true);
        form.parentNode.replaceChild(novoForm, form);

        novoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const inputAtualizado = document.getElementById('nomeAcessoInput');
            const nome = inputAtualizado ? inputAtualizado.value.trim() : '';
            if (!nome) return;

            await registrarAcesso(nome);
            
            const modalAtualizado = document.getElementById('modalAcesso');
            if (modalAtualizado) modalAtualizado.style.display = 'none';
        });
    }
}

async function registrarAcesso(nome) {
    const dataHoje = obterDataAtual();
    const horaAtual = obterHoraAtual();

    const chaveStorage = `acessos_${dataHoje}`;
    let acessosDia = JSON.parse(localStorage.getItem(chaveStorage)) || [];
    let acessoExistente = acessosDia.find(acesso => acesso.nome.toLowerCase() === nome.toLowerCase());

    if (acessoExistente) {
        acessoExistente.quantidade += 1;
        acessoExistente.ultimaHora = horaAtual;
    } else {
        acessosDia.push({
            nome: nome,
            primeiraHora: horaAtual,
            ultimaHora: horaAtual,
            quantidade: 1
        });
    }
    localStorage.setItem(chaveStorage, JSON.stringify(acessosDia));

    try {
        const { data, error } = await _supabase
            .from('acessos')
            .select('*')
            .ilike('nome_usuario', nome)
            .eq('data_acesso', dataHoje);

        if (!error && data && data.length > 0) {
            await _supabase
                .from('acessos')
                .update({ 
                    quantidade: data[0].quantidade + 1,
                    ultima_hora: horaAtual 
                })
                .eq('id', data[0].id);
        } else {
            await _supabase.from('acessos').insert([{
                nome_usuario: nome,
                data_acesso: dataHoje,
                primeira_hora: horaAtual,
                ultima_hora: horaAtual,
                quantidade: 1
            }]);
        }
    } catch (err) {
        console.log('Aviso ao sincronizar acesso com Supabase:', err);
    }
}

// ==========================================================================
// LÓGICA DO PAINEL DO ADMINISTRADOR E RELATÓRIOS
// ==========================================================================

function abrirModalLogin() {
    document.getElementById('modalLoginAdmin').classList.add('active');
    document.getElementById('adminUsuario').focus();
    document.getElementById('loginErro').style.display = 'none';
}

function fecharModalLogin() {
    document.getElementById('modalLoginAdmin').classList.remove('active');
    document.getElementById('formLoginAdmin').reset();
}

async function abrirModalRelatorio() {
    document.getElementById('modalRelatorio').classList.add('active');
    await carregarRelatorioAcessos();
}

async function carregarRelatorioAcessos() {
    const periodoFiltro = document.getElementById('filtroData') ? document.getElementById('filtroData').value : 'hoje';
    const tbody = document.getElementById('tabelaRelatorioBody');
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px; color: #6b7280;">Carregando dados...</td></tr>';
    }

    const agora = new Date();
    let dataInicioStr = '';
    let dataFimStr = agora.toISOString().split('T')[0];

    let dInicio = new Date();
    if (periodoFiltro === 'hoje') {
        dInicio.setHours(0, 0, 0, 0);
        dataInicioStr = dInicio.toISOString().split('T')[0];
    } else if (periodoFiltro === 'ontem') {
        dInicio.setDate(agora.getDate() - 1);
        dataInicioStr = dInicio.toISOString().split('T')[0];
        dataFimStr = dataInicioStr;
    } else if (periodoFiltro === '7dias') {
        dInicio.setDate(agora.getDate() - 7);
        dataInicioStr = dInicio.toISOString().split('T')[0];
    } else if (periodoFiltro === 'mes') {
        dInicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
        dataInicioStr = dInicio.toISOString().split('T')[0];
    }

    let registrosBrutos = [];

    try {
        const { data, error } = await _supabase
            .from('acessos')
            .select('*')
            .gte('data_acesso', dataInicioStr)
            .lte('data_acesso', dataFimStr);

        if (!error && data) {
            registrosBrutos = data;
        }
    } catch (err) {
        console.log('Erro ao buscar do Supabase, usando localStorage:', err);
    }

    let mapaUsuarios = {};
    registrosBrutos.forEach(item => {
        const nome = item.nome_usuario || 'Anônimo';
        if (!mapaUsuarios[nome]) {
            mapaUsuarios[nome] = {
                nome: nome,
                primeiraHora: item.primeira_hora || '--:--',
                ultimaHora: item.ultima_hora || '--:--',
                quantidade: 0
            };
        }
        mapaUsuarios[nome].quantidade += (item.quantidade || 1);
        if (item.ultima_hora && item.ultima_hora > mapaUsuarios[nome].ultimaHora) {
            mapaUsuarios[nome].ultimaHora = item.ultima_hora;
        }
        if (item.primeira_hora && item.primeira_hora < mapaUsuarios[nome].primeiraHora) {
            mapaUsuarios[nome].primeiraHora = item.primeira_hora;
        }
    });

    let acessosFiltrados = Object.values(mapaUsuarios);

    if (tbody) {
        tbody.innerHTML = '';
        let totalAcessos = 0;
        let visitantesUnicos = acessosFiltrados.length;

        if (visitantesUnicos === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px; color: #6b7280;">Nenhum registro encontrado para este período.</td></tr>';
        } else {
            acessosFiltrados.sort((a, b) => b.quantidade - a.quantidade);

            acessosFiltrados.forEach(item => {
                totalAcessos += item.quantidade;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight: 600;">${escapeHtml(item.nome)}</td>
                    <td>${item.primeiraHora}</td>
                    <td>${item.ultimaHora}</td>
                    <td><span class="badge-count">${item.quantidade}x</span></td>
                `;
                tbody.appendChild(tr);
            });
        }

        const statVisitantesEl = document.getElementById('statVisitantes');
        const statAcessosTotaisEl = document.getElementById('statAcessosTotais');
        if (statVisitantesEl) statVisitantesEl.innerText = visitantesUnicos;
        if (statAcessosTotaisEl) statAcessosTotaisEl.innerText = totalAcessos;
    }

    await carregarRankingMes(agora);
}

async function carregarRankingMes(agora) {
    const primeiroDiaMes = new Date(agora.getFullYear(), agora.getMonth(), 1).toISOString().split('T')[0];
    const ultimoDiaMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).toISOString().split('T')[0];

    let registrosMes = [];
    try {
        const { data, error } = await _supabase
            .from('acessos')
            .select('*')
            .gte('data_acesso', primeiroDiaMes)
            .lte('data_acesso', ultimoDiaMes);

        if (!error && data) {
            registrosMes = data;
        }
    } catch (err) {
        console.log('Erro ao buscar ranking do mês:', err);
    }

    const contagemMes = {};
    registrosMes.forEach(item => {
        const nome = item.nome_usuario || 'Anônimo';
        contagemMes[nome] = (contagemMes[nome] || 0) + (item.quantidade || 1);
    });

    const rankingOrdenado = Object.entries(contagemMes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const containerRanking = document.getElementById('rankingMesList');
    if (!containerRanking) return;

    if (rankingOrdenado.length === 0) {
        containerRanking.innerHTML = `
            <div class="user-rank-item" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eee;">
                <span>1. -</span>
                <span class="rank-badge" style="background: #e2e8f0; padding: 2px 8px; border-radius: 12px; font-size: 12px;">0 acessos</span>
            </div>`;
        return;
    }

    containerRanking.innerHTML = rankingOrdenado.map((item, index) => `
        <div class="user-rank-item" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eee;">
            <span>${index + 1}. ${escapeHtml(item[0])}</span>
            <span class="rank-badge" style="background: #e2e8f0; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${item[1]} ${item[1] === 1 ? 'acesso' : 'acessos'}</span>
        </div>
    `).join('');
}

function fecharModalRelatorio() {
    document.getElementById('modalRelatorio').classList.remove('active');
}

function alternarEstadoAdmin() {
    const btnAdmin = document.getElementById('btnAdminLogin');
    const btnRelatorio = document.getElementById('btnVerAcessos');

    if (adminLogado) {
        adminLogado = false;
        btnRelatorio.style.display = 'none';
        btnAdmin.innerHTML = '⚙️ Acesso Restrito (Admin)';
        btnAdmin.classList.remove('logado');
    } else {
        abrirModalLogin();
    }
}

function processarLoginAdmin(e) {
    e.preventDefault();
    const usuarioInput = document.getElementById('adminUsuario').value.trim();
    const senhaInput = document.getElementById('adminSenha').value.trim();
    const erroDiv = document.getElementById('loginErro');

    const credencialValida = ADMINS_CADASTRADOS.find(admin => admin.usuario === usuarioInput && admin.senha === senhaInput);

    if (credencialValida) {
        adminLogado = true;
        fecharModalLogin();
        document.getElementById('btnVerAcessos').style.display = 'inline-block';
        
        const btnAdmin = document.getElementById('btnAdminLogin');
        btnAdmin.innerHTML = '❌ Sair do Modo Admin';
        btnAdmin.classList.add('logado');
    } else {
        erroDiv.style.display = 'block';
    }
}

// ==========================================================================
// PERSISTÊNCIA DE ESTADO DA INTERFACE
// ==========================================================================

function saveCategoriaExpanded(categoriaId, isExpanded) {
    localStorage.setItem('categoria_expanded_' + categoriaId, isExpanded);
}

function loadCategoriaExpanded(categoriaId) {
    const saved = localStorage.getItem('categoria_expanded_' + categoriaId);
    return saved === 'true';
}

function saveSubcategoriaExpanded(subcatId, isExpanded) {
    localStorage.setItem('subcat_expanded_' + subcatId, isExpanded);
}

function loadSubcategoriaExpanded(subcatId) {
    return localStorage.getItem('subcat_expanded_' + subcatId) === 'true';
}

// ==========================================================================
// UTILITÁRIOS
// ==========================================================================

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
}

function escapeRegex(string) {
    if (!string) return '';
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text, term) {
    if (!term || !text) return escapeHtml(text);
    var regex = new RegExp('(' + escapeRegex(term) + ')', 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

// ==========================================================================
// RENDERIZAÇÃO DE CATEGORIAS
// ==========================================================================

function renderCategorias() {
    var grid = document.getElementById('categoriasGrid');
    if (!grid) return;
    var html = '';

    for (var c = 0; c < categoriasConfig.length; c++) {
        var cat = categoriasConfig[c];
        var subcats = cat.subcategorias || [];
        var hasMatch = true;

        if (searchTerm) {
            hasMatch = false;
            for (var s = 0; s < subcats.length; s++) {
                var topicos = subcats[s].topicos || [];
                for (var i = 0; i < topicos.length; i++) {
                    var item = topicos[i];
                    if (item.titulo.toLowerCase().indexOf(searchTerm) !== -1 ||
                        (item.conteudo && item.conteudo.toLowerCase().indexOf(searchTerm) !== -1) ||
                        subcats[s].nome.toLowerCase().indexOf(searchTerm) !== -1) {
                        hasMatch = true;
                        break;
                    }
                }
                if (hasMatch) break;
            }
        }

        if (searchTerm && !hasMatch) continue;

        html += '<div class="categoria-card" data-categoria-id="' + cat.id + '">';
        html += '<div class="card-header" onclick="toggleCategoria(\'' + cat.id + '\')">';
        html += '<div class="categoria-icon">' + cat.icone + '</div>';
        html += '<div class="categoria-info">';
        html += '<h3>' + escapeHtml(cat.nome) + '</h3>';
        html += '<p>' + escapeHtml(cat.descricao) + '</p>';
        html += '</div>';
        html += '<div class="expand-icon">▼</div>';
        html += '</div>';
        html += '<div class="card-content">';
        html += renderSubcategorias(subcats);
        html += '</div>';
        html += '</div>';
    }

    grid.innerHTML = html;

    for (var d = 0; d < categoriasConfig.length; d++) {
        var catId = categoriasConfig[d].id;
        if (loadCategoriaExpanded(catId) || searchTerm) {
            var card = document.querySelector('.categoria-card[data-categoria-id="' + catId + '"]');
            if (card) card.classList.add('expanded');
        }

        var subcats = categoriasConfig[d].subcategorias || [];
        for (var s = 0; s < subcats.length; s++) {
            if (loadSubcategoriaExpanded(subcats[s].id) || searchTerm) {
                var subcatEl = document.querySelector('.subcategoria-item[data-subcat-id="' + subcats[s].id + '"]');
                if (subcatEl) subcatEl.classList.add('expanded');
            }
        }
    }
}

function renderSubcategorias(subcats) {
    if (!subcats.length) {
        return '<div class="empty-subitens">📭 Nenhuma aba cadastrada aqui.</div>';
    }

    var html = '';
    for (var s = 0; s < subcats.length; s++) {
        var subcat = subcats[s];
        if (searchTerm) {
            var subcatMatch = subcat.nome.toLowerCase().indexOf(searchTerm) !== -1;
            var topicosMatch = false;
            var topicos = subcat.topicos || [];

            for (var i = 0; i < topicos.length; i++) {
                if (topicos[i].titulo.toLowerCase().indexOf(searchTerm) !== -1 ||
                    (topicos[i].conteudo && topicos[i].conteudo.toLowerCase().indexOf(searchTerm) !== -1)) {
                    topicosMatch = true;
                    break;
                }
            }
            if (!subcatMatch && !topicosMatch) continue;
        }

        var subcatNomeHighlight = highlightText(subcat.nome, searchTerm);

        html += '<div class="subcategoria-item" data-subcat-id="' + subcat.id + '">';
        html += '<div class="subcategoria-header" onclick="event.stopPropagation(); toggleSubcategoria(\'' + subcat.id + '\')">';
        html += '<h4>🔷 ' + subcatNomeHighlight + '</h4>';
        html += '<span class="subcategoria-expand-icon">▼</span>';
        html += '</div>';
        html += '<div class="subcategoria-content">';
        html += '<div class="subitens-list">';
        html += renderSubitens(subcat.topicos || []);
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }

    if (searchTerm && html === '') {
        return '<div class="empty-subitens">📭 Nenhum resultado encontrado nesta categoria.</div>';
    }

    return html;
}

function renderSubitens(topicos) {
    if (!topicos.length) {
        return '<div class="empty-subitens">📭 Nenhum tópico nesta aba.</div>';
    }

    var html = '';
    for (var i = 0; i < topicos.length; i++) {
        var item = topicos[i];
        if (searchTerm) {
            var tituloMatch = item.titulo.toLowerCase().indexOf(searchTerm) !== -1;
            var conteudoMatch = item.conteudo && item.conteudo.toLowerCase().indexOf(searchTerm) !== -1;
            if (!tituloMatch && !conteudoMatch) continue;
        }

        var tituloHighlight = highlightText(item.titulo, searchTerm);

        html += '<div class="subitem" data-subitem-index="' + i + '">';
        html += '<div class="subitem-header" onclick="event.stopPropagation(); toggleSubitem(this)">';
        html += '<div class="subitem-titulo">';
        html += '<span class="sub-icon">🔸</span>';
        html += '<span>' + tituloHighlight + '</span>';
        html += '</div>';
        html += '<span class="subitem-expand">▼</span>';
        html += '</div>';
        html += '<div class="subitem-conteudo">';
        if (item.conteudo) {
            html += '<p>' + highlightText(item.conteudo, searchTerm) + '</p>';
        } else {
            html += '<p><em>Sem conteúdo adicional.</em></p>';
        }
        html += '</div>';
        html += '</div>';
    }

    return html;
}

function toggleCategoria(categoriaId) {
    var card = document.querySelector('.categoria-card[data-categoria-id="' + categoriaId + '"]');
    if (card) {
        card.classList.toggle('expanded');
        saveCategoriaExpanded(categoriaId, card.classList.contains('expanded'));
    }
}

function toggleSubcategoria(subcatId) {
    var subcatEl = document.querySelector('.subcategoria-item[data-subcat-id="' + subcatId + '"]');
    if (subcatEl) {
        subcatEl.classList.toggle('expanded');
        saveSubcategoriaExpanded(subcatId, subcatEl.classList.contains('expanded'));
    }
}

function toggleSubitem(element) {
    var subitem = element.closest('.subitem');
    if (subitem) {
        var wasExpanded = subitem.classList.contains('expanded');
        subitem.classList.toggle('expanded');
        if (!wasExpanded) {
            setTimeout(function() {
                subitem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                var listContainer = subitem.closest('.subitens-list');
                if (listContainer) {
                    var desiredScrollTop = subitem.offsetTop - listContainer.offsetTop - 10;
                    listContainer.scrollTo({ top: desiredScrollTop, behavior: 'smooth' });
                }
            }, 200);
        }
    }
}

function performSearch() {
    var input = document.getElementById('search');
    searchTerm = input.value.trim().toLowerCase();
    renderCategorias();
    updateStats();
}

var searchDebounceTimer;
function handleSearch() {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(performSearch, 300);
}

function updateStats() {
    var stats = document.getElementById('statsInfo');
    if (!stats) return;
    var total = 0;
    for (var i = 0; i < categoriasConfig.length; i++) {
        var subcats = categoriasConfig[i].subcategorias || [];
        for (var s = 0; s < subcats.length; s++) {
            total += (subcats[s].topicos || []).length;
        }
    }
    stats.textContent = '📌 ' + categoriasConfig.length + ' categorias • ' + total + ' tópicos cadastrados';
}

// ==========================================================================
// INICIALIZAÇÃO E EVENTOS
// ==========================================================================

function init() {
    verificarAcesso();
    renderCategorias();
    updateStats();

    var searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    var btnAdminLogin = document.getElementById('btnAdminLogin');
    if (btnAdminLogin) {
        btnAdminLogin.addEventListener('click', alternarEstadoAdmin);
    }

    var btnVerAcessos = document.getElementById('btnVerAcessos');
    if (btnVerAcessos) {
        btnVerAcessos.addEventListener('click', abrirModalRelatorio);
    }

    var formLogin = document.getElementById('formLoginAdmin');
    if (formLogin) {
        formLogin.addEventListener('submit', processarLoginAdmin);
    }

    var filtroDataSelect = document.getElementById('filtroData');
    if (filtroDataSelect) {
        filtroDataSelect.addEventListener('change', carregarRelatorioAcessos);
    }
}

window.toggleCategoria = toggleCategoria;
window.toggleSubcategoria = toggleSubcategoria;
window.toggleSubitem = toggleSubitem;
window.fecharModalLogin = fecharModalLogin;
window.fecharModalRelatorio = fecharModalRelatorio;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}