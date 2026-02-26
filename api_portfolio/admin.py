from django.contrib import admin
from .Models import Projeto 

@admin.register(Projeto)
class ProjetoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tecnologia', 'criado_em')