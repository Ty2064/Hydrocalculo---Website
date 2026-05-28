#include <stdio.h>

int main() 
{
    char nome[50];                                // Array para armazenar o nome (até 50 caracteres)

    printf("Digite seu nome: ");
    scanf("%s", nome);                            // Lê o nome (use fgets para espaços se preferir)

    printf("Ola, %s! Bem-vindo ao C.\n", nome);
    printf("Obrigado por usar o programa!\n");
    return 0;
}