# Paulo Xavier · Psicólogo

Site pessoal e currículo de Paulo Xavier, psicólogo (CRP-20/09816) no SUAS e mestre em Antropologia Social. Boa Vista/RR.

Site: https://paulusxavier.github.io/vita/


Arquivos: `index.html` (conteúdo), `estilo.css` (toda a folha de estilo, organizada em tokens, base, cabeçalho, abertura, seções, componentes, rodapé, modo escuro, movimento reduzido e impressão) e `site.js` (navegação, links externos, mascote, offline e PDF).

Mascote: **Paulus** apresenta o Paulo ao longo da leitura (balão com falas por seção e comentários nas indicações; arte avulsa em `imagens/paulus.svg`). As falas ficam nos objetos `falas` e `notas` em `site.js`. Em telas estreitas e com movimento reduzido o balão não abre sozinho.

Ao alterar `estilo.css`, `site.js` ou a lista de imagens, aumente `VERSION` em `sw.js` para que o cache seja renovado.

Ordem das seções: Início, Currículo (com a indicação do CREPOP), Produção, Interesses, Psicologia em Roraima, Leituras e fontes, Contato e Referências.

Psicologia em Roraima: panorama da distribuição de psicólogas(os) (do país ao CRAS), registros de psicólogas(os) no SUAS de Roraima (Censo SUAS 2025, por município e módulo), produção sobre a atuação no CRAS e lacunas de pesquisa.

Leituras e fontes: livros, sites científicos (SciELO, BVS Saúde, PubMed), sites da profissão (APA e CFP) e mapas (Mapa Social do MDS e RAPS no NovaSAGE).

Imagens: ficam todas na pasta `imagens/` (capas do CREPOP em `imagens/crepop/`, capas de livros em `imagens/livros/`).

Fundamentação científica: as seções Interesses e Psicologia em Roraima citam literatura revisada (CRAS/SUAS, migração e Warao, prevenção, gamificação e psicometria); as obras constam em Referências, em ABNT. Alguns itens têm volume e páginas a completar a partir do texto original.

Dados e discussão (out. 2026): Áreas de interesse trazem fluxos da Operação Acolhida (entradas, saídas, interiorizações), saúde mental de migrantes (MSF, 2022; Charlson et al., 2019) e o III LNUD (Fiocruz, 2017), cada um com a ressalva do que o dado não permite concluir. Charlson et al. (2019) foi citado de memória: conferir volume, páginas e DOI no texto original.

Redesenho (out. 2026): identidade nova, ancorada em Boa Vista (2°49′N, a única capital brasileira inteira no hemisfério norte). Paleta em verde de floresta, ouro de lavrado e azul de rio, as cores da bandeira de Roraima. Fontes pelo Google Fonts (Newsreader nos títulos e Public Sans no texto), guardadas em cache pelo `sw.js` após a primeira visita. Abertura com nome em destaque e foto; texto corrido justificado, com hifenização automática em pt-BR (títulos, legendas, tabelas e rótulos seguem alinhados à esquerda); Início com ficha lateral fixa; índice lateral "Nesta seção" nas seções longas em telas largas (gerado em `site.js` a partir dos `h3.sub`). Ícones, favicon e imagem de compartilhamento (`og.png`) refeitos na nova paleta.

Os nomes de variáveis do CSS vêm de versões anteriores: `--azul` é a cor principal (verde), `--sepia` é o ouro e `--ardosia` é o verde-acinzentado de apoio.

Ajuste de tipografia (out. 2026): nome da abertura reduzido (de até 142 px para até 72 px), subtítulo, texto de apresentação e citação menores, foto mais compacta; todo o texto corrido passou a ser justificado (bloco "texto justificado" no fim de `estilo.css`).
