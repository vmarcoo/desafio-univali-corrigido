# Desafio UNIVALI - Vaga Programador Júnior (Núcleo de Desenvolvimento de Software)
### Autor: Marco Vinícius da Costa Busato - Acadêmico de Ciência da Computação (UNIVALI)

## Link para acessar a aplicação: https://vmarcoo.github.io/desafio-univali/

O seguinte projeto consiste em uma aplicação web que realiza o cadastro de itens, utilizando o LocalStorage para o armazenamento dos dados.

- *O código foi escrito do zero, por mim, buscando criar os métodos de validação por conta própria utilizando HTML, CSS e JS puros (sem a utilização de frameworks), objetivando demonstrar meu conhecimento acerca das linguagens e seus recursos, bem como minha lógica em variadas situações.* 

- *É provável que alguns bugs tenham passado despercebidos, fruto da não utilização de frameworks, componentização mais avançada e ferramentas de validação mais robustas. Coloco-me inteiramente à disposição para consertá-los, caso julguem ser necessário.*

- A aplicação inicia em uma tela de preenchimento de formulário, com um menu de navegação lateral interativo e um sistema de navegação estruturada no topo. Os campos de preenchimento do formulário possuem características específicas de validação:

1. Nome: Apenas letras (optei por incluir espaços também na RegEx) com no máximo 50 caracteres. *Obrigatório*
2. Unidade de medida: Select de opções (litro(s), quilograma(s), unidade(s)). *Obrigatório*
3. Quantidade: Valor numérico seguido pela unidade de medida selecionada. 
4. Preço: Campo monetário preenchido da direita para a esquerda, com a utilização de uma máscara. É possível cadastrar um produto com preço R$0,00 (considerando que possa ter saído gratuitamente) *Obrigatório*
5. Perecibilidade: Checkbox que avalia se o produto é ou não perecível. *Obrigatório*
6. Validade: Formato PT-BR obrigatório apenas em produtos perecíveis. Produtos vencidos são cadastrados em cor *vermelha*, indicando que venceram. 
7. Fabricação: Formato PT-BR que não pode exceder a data atual. *Obrigatório*

- O botão *salvar* salva as informações do formulário no LocalStorage, que serão listadas caso o usuário clique no botão *cancelar*.

- Os itens podem ser editados e/ou excluídos na página de listagem.

- Foi feito uma estruturação em módulos, separando as validações dos inpus em arquivos distintos, no intuito de facilitar a leitura e manutenção da aplicação. Além dos arquivos `.css` e da estilização diretamente nos arquivos 
`.html`, lancei mão de recursos de media queries para tornar a experiência mobile do usuário mais agradável. 

- Foi utilizada a biblioteca _Flatpickr_, que facilita a formatação dos padrões de data internacional (MM/DD/AAAA) para nacional (DD/MM/AAAA).

- O arquivo `/script.js` declara e exporta as principais variáveis na execução da aplicação, para que possam ser utilizadas em outros locais quando necessário. Há a presença de _event listeners_ que aguardam o preenchimento dos campos do formulário, para que então sejam feitas as respectivas verificações.

### Reforço meu enorme interesse nesta oportunidade, que será extremamente aproveitada na construção de minha carreira profissional. Estou 100% disposto a tudo e espero ser selecionado.
