.data
msg: .asciiz "Resultado: "

.text
main:
    li $t0, 10        # coloca 10 em $t0
    li $t1, 20        # coloca 20 em $t1
    
    add $t2, $t0, $t1 # $t2 = $t0 + $t1

    # imprimir mensagem
    li $v0, 4
    la $a0, msg
    syscall

    # imprimir resultado
    li $v0, 1
    move $a0, $t2
    syscall

    # encerrar programa
    li $v0, 10
    syscall
