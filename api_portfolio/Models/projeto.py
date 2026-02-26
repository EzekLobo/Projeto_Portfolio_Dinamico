from django.db import models

class Projeto(models.Model): 
    titulo = models.CharField(max_length=150)
    descricao = models.TextField()
    tecnologia = models.CharField(max_length=100)
    link_github = models.URLField(max_length=255, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    capa = models.ImageField(upload_to='projetos/', null=True, blank=True)

    def __str__(self):
        return self.titulo