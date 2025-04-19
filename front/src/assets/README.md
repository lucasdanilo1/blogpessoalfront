# Estrutura de Estilos do Blog Pessoal

Este documento descreve a estrutura de estilos e temas utilizados no sistema de Blog Pessoal.

## Cores do Sistema

O sistema utiliza um conjunto padronizado de cores para manter a consistência visual:

- **Cor de fundo principal**: #F9F7FF
- **Cor de texto primária**: #333333
- **Cor de texto secundária**: #666666
- **Cor de fundo dos cards**: #FFFFFF
- **Cor primária**: #4CAF50
- **Cor de destaque**: #3F51B5
- **Cor de alerta**: #F44336

## Arquivos de Estilo

Os arquivos principais de estilo são:

- **variables.scss**: Contém todas as variáveis de cores, espaçamentos e bordas usadas no sistema
- **styles.scss**: Arquivo de estilos globais que importa as variáveis e aplica os estilos base
- **app.component.scss**: Estilos específicos do componente principal

## Como Usar

Para manter a consistência dos estilos, sempre importe o arquivo de variáveis nos componentes:

```scss
@import '../../../assets/variables';

.my-component {
  background-color: $background-color;
  color: $text-color-primary;
}
```

## Classes Utilitárias

O sistema fornece classes utilitárias para uso comum:

- **.card**: Estilo padrão para cards
- **.container**: Container responsivo com largura máxima
- **.text-primary**: Cor de texto primária
- **.text-secondary**: Cor de texto secundária 