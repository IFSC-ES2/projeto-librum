# ADR-0011 - Design system, tipografia e organização de assets

## Contexto

O frontend ainda usava o tema padrão do template Vite (cor roxa, dark mode automático, fontes do sistema), sem relação com a identidade dos wireframes do Librum. Cada página tinha estilos próprios e divergentes, sem unidade visual. Também não havia um padrão de onde guardar os assets de imagem.

## Decisão

Adotar um design system com tokens em `frontend/src/styles/tokens.css` (cores, tipografia, raios e sombras), tipografia com Fraunces para títulos, Mulish para a interface e Spectral para o texto de leitura, carregadas via @fontsource. Os componentes compartilhados ficam em `frontend/src/components/ui`. O app shell (Sidebar mais conteúdo) fica em `frontend/src/components` e é aplicado pelo Layout.

Os assets de imagem ficam em `frontend/src/assets`, organizados em subpastas (brand, mascots, genres, books), porque participam do empacotamento do Vite. Arquivos puramente estáticos por caminho absoluto, como o favicon, ficam em `frontend/public`.

## Alternativas consideradas

- Manter o CSS por página: descartado por falta de unidade visual e retrabalho.
- Colocar imagens em public: descartado porque os assets usados nos componentes se beneficiam do empacotamento e do hash de cache do Vite.

## O que isso implica

Todas as páginas passam a consumir os mesmos tokens e componentes, garantindo coesão. Mudar a identidade no futuro afeta apenas os tokens. O Layout mantém a assinatura por children, então as rotas existentes continuam funcionando.
