from django.db import models

class MensagemOi(models.Model):
    # Identifica para qual placa a mensagem vai (ex: pico_w_01)
    dispositivo_alvo = models.CharField(max_length=50)
    nome_visitante = models.CharField(max_length=100)
    # Atributo para saber se o Pico W já leu e mostrou essa mensagem específica
    lida = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome_visitante} -> {self.dispositivo_alvo}"